import { findScriptByIdUseCase } from '.';
import type { Script } from '../../domain/entities/script';
import { ScriptStatus } from '../../domain/enums/script-status';
import type { ScriptRepository } from '../../domain/repositories/script-repository';
import type { UserData } from '../../types/user';
import { findUserByidUseCase } from '../user';
import { findUserScriptByRelationUseCase } from '../user-script';
import { deleteUserScriptUseCase } from '../user-script';
import { createScriptHistoriesUseCase } from '../script-histories';

type ChangeScriptStatusDTO = {
  script_id: string;
  user_id: string;
  status: string;
  observation?: string;
};

export class ChangeScriptStatusUseCase {
  constructor(private readonly scriptRepository: ScriptRepository) {}

  async execute({ script_id, user_id, status, observation }: ChangeScriptStatusDTO) {
    const foundUser = await findUserByidUseCase.execute(user_id);
    const foundScript = await findScriptByIdUseCase.execute(script_id);
    const foundUseScript = await findUserScriptByRelationUseCase.execute(foundUser!.id, foundScript!.id);

    if (!this.validateRole(foundUser!.role, status as ScriptStatus))
      throw new Error('User role is not allowed to assume this script status');

    if (
      !this.validateNewStatusExists(status as ScriptStatus) ||
      !this.validateNextStatus(foundScript!.status, status as ScriptStatus)
    )
      foundScript!.status = ScriptStatus.ERROR;

    console.log(foundScript!);

    this.resolveScriptStatus(foundScript!, status as ScriptStatus);

    console.log(foundScript!);

    await this.deleteUserScript(foundUseScript!.id);
    await this.updateScriptStatus(foundScript!);
    await this.createHistoric(foundUser!, foundScript!, observation || '');

    return;
  }

  private validateRole(role: string, newStatus: ScriptStatus): boolean {
    console.log(role, newStatus);
    console.log(newStatus === ScriptStatus.AWAITING_REVIEW || newStatus === ScriptStatus.REJECTED);

    switch (role) {
      case 'ANALYST':
        return newStatus === ScriptStatus.AWAITING_REVIEW || newStatus === ScriptStatus.REJECTED;
      case 'REVIEWER':
        return newStatus === ScriptStatus.AWAITING_APPROVAL;
      case 'APPROVER':
        return newStatus === ScriptStatus.APPROVED || newStatus === ScriptStatus.REJECTED;
      default:
        return false;
    }
  }

  private validateNewStatusExists(newStatus: ScriptStatus): boolean {
    return Object.values(ScriptStatus).includes(newStatus);
  }

  private validateNextStatus(currentStatus: ScriptStatus, newStatus: ScriptStatus): boolean {
    switch (currentStatus) {
      case ScriptStatus.IN_ANALYSIS:
        return newStatus === ScriptStatus.AWAITING_REVIEW || newStatus === ScriptStatus.REJECTED;
      case ScriptStatus.IN_REVIEW:
        return newStatus === ScriptStatus.AWAITING_APPROVAL || newStatus === ScriptStatus.REJECTED;
      case ScriptStatus.IN_APPROVAL:
        return newStatus === ScriptStatus.APPROVED || newStatus === ScriptStatus.REJECTED;
      default:
        return false;
    }
  }

  private async deleteUserScript(UserScriptId: string): Promise<void> {
    await deleteUserScriptUseCase.execute(UserScriptId);
  }

  private async updateScriptStatus(script: Script): Promise<void> {
    script.is_assumed = false;

    if (script.status === ScriptStatus.APPROVED) {
      script.approver_count += 1;

      if (script.approver_count === 3) {
        script.status = ScriptStatus.APPROVED;
      } else {
        script.status = ScriptStatus.AWAITING_APPROVAL;
      }
    }

    await this.scriptRepository.update(script);
  }

  private async createHistoric(user: UserData, script: Script, observation: string): Promise<void> {
    const action = `Script has changed to ${script.status}`;

    await createScriptHistoriesUseCase.execute({
      script_id: script.id,
      user_id: user.id,
      action,
      observation,
    });
  }

  private resolveScriptStatus(script: Script, newStatus: ScriptStatus) {
    script.is_assumed = false;

    if (newStatus !== ScriptStatus.APPROVED) {
      script.status = newStatus;
      return;
    }

    script.approver_count += 1;

    if (script.approver_count === 3) script.status = ScriptStatus.APPROVED;

    script.status = ScriptStatus.AWAITING_APPROVAL;
  }
}
