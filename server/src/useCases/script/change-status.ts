import { findScriptByIdUseCase } from '.';
import type { Script } from '../../domain/entities/script';
import { ScriptStatus } from '../../domain/enums/script-status';
import type { ScriptRepository } from '../../domain/repositories/script-repository';
import { findUserByidUseCase } from '../user';
import { findUserScriptByRelationUseCase } from '../user-script';
import { deleteUserScriptUseCase } from '../user-script';
import { createScriptHistoriesUseCase, findScriptHistoriesActionByRelationUseCase } from '../script-histories';
import { ForbiddenException } from '../../domain/exceptions/forbidden';
import type { ChangeScriptStatusBody, UserData } from '../../types/index.ts';

export class ChangeScriptStatusUseCase {
  constructor(private readonly scriptRepository: ScriptRepository) {}

  async execute({ script_id, user_id, status, observation }: ChangeScriptStatusBody) {
    const user = await findUserByidUseCase.execute(user_id);
    const script = await findScriptByIdUseCase.execute(script_id);
    const user_script = await findUserScriptByRelationUseCase.execute(user!.id, script!.id);

    await this.validate(user!, script!, status);

    this.resolveScriptStatus(script!, status as ScriptStatus);

    await this.deleteUserScript(user_script!.id);
    await this.updateScriptStatus(script!);
    await this.createHistoric(user!, script!, observation || '', status as ScriptStatus);

    return;
  }

  private async validate(user: UserData, script: Script, new_status: string): Promise<void> {
    const statusToVerifyIsAlreadyVoted = new_status === ScriptStatus.APPROVED || new_status === ScriptStatus.REJECTED;

    if (!this.validateRole(user.role, new_status as ScriptStatus))
      throw new ForbiddenException('User role is not allowed to assume this script status');

    if (
      !this.validateStatusExists(new_status as ScriptStatus) ||
      !this.validateStatus(script.status, new_status as ScriptStatus)
    )
      script.status = ScriptStatus.ERROR;

    if (statusToVerifyIsAlreadyVoted) await this.verifyUserAlreadyApproved(script.id, user.id);
  }

  private validateRole(role: string, newStatus: ScriptStatus): boolean {
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

  private validateStatusExists(new_status: ScriptStatus): boolean {
    return Object.values(ScriptStatus).includes(new_status);
  }

  private validateStatus(current_status: ScriptStatus, new_status: ScriptStatus): boolean {
    switch (current_status) {
      case ScriptStatus.IN_ANALYSIS:
        return new_status === ScriptStatus.AWAITING_REVIEW || new_status === ScriptStatus.REJECTED;
      case ScriptStatus.IN_REVIEW:
        return new_status === ScriptStatus.AWAITING_APPROVAL || new_status === ScriptStatus.REJECTED;
      case ScriptStatus.IN_APPROVAL:
        return new_status === ScriptStatus.APPROVED || new_status === ScriptStatus.REJECTED;
      default:
        return false;
    }
  }

  private async deleteUserScript(user_script_id: string): Promise<void> {
    await deleteUserScriptUseCase.execute(user_script_id);
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

  private async createHistoric(
    user: UserData,
    script: Script,
    observation: string,
    request_status: ScriptStatus
  ): Promise<void> {
    let action = `Script has changed to ${script.status}`;

    if (request_status === ScriptStatus.APPROVED && request_status !== script.status)
      action = `${user.name} has ${ScriptStatus.VOTED} `;

    await createScriptHistoriesUseCase.execute({
      script_id: script.id,
      user_id: user.id,
      action,
      observation,
    });
  }

  private resolveScriptStatus(script: Script, new_status: ScriptStatus) {
    script.is_assumed = false;

    if (new_status !== ScriptStatus.APPROVED) {
      script.status = new_status;
      return;
    }

    if (script.approver_count + 1 === 3) {
      script.status = ScriptStatus.APPROVED;
      return;
    }

    script.approver_count++;
    script.status = ScriptStatus.AWAITING_APPROVAL;
  }

  private async verifyUserAlreadyApproved(script_id: string, user_id: string) {
    const histories = await findScriptHistoriesActionByRelationUseCase.execute(script_id, user_id, ScriptStatus.VOTED);

    if (histories.length > 0) throw new ForbiddenException('User already approved this script');

    return;
  }
}
