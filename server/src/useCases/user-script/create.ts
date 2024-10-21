import { UserScript } from '../../domain/entities/user-script';
import { ScriptStatus } from '../../domain/enums/script-status';
import { UserRoles } from '../../domain/enums/user-roles';
import type { UserScriptRepository } from '../../domain/repositories/user-script-repository';
import { findUserByidUseCase } from '../user';
import type { CreateUserScriptBody, UserData } from '../../types/index.ts';
import type { Script } from '../../domain/entities/script';
import { findScriptByIdUseCase, updateScriptUseCase } from '../script';
import { createScriptHistoriesUseCase, findScriptHistoriesActionByRelationUseCase } from '../script-histories';
import { ForbiddenException } from '../../domain/exceptions/forbidden';
import { ConflictException } from '../../domain/exceptions/conflict';

export class CreateUserScriptUseCase {
  constructor(private readonly repository: UserScriptRepository) {}

  async execute({ script_id, user_id }: CreateUserScriptBody): Promise<UserScript> {
    const user = await findUserByidUseCase.execute(user_id);
    const script = await findScriptByIdUseCase.execute(script_id);

    await this.validate(user!, script!);

    const userScript = new UserScript(user_id, script_id);

    script!.status = this.changeToAssumedStatus(script!.status);

    await this.repository.create(userScript);
    await this.updateScript(script!);
    await this.createHistoric(user!, script!);

    return userScript;
  }

  private async createHistoric(user: UserData, script: Script): Promise<void> {
    const action = `Script has changed to ${script.status}`;

    await createScriptHistoriesUseCase.execute({
      script_id: script.id,
      user_id: user.id,
      action,
    });
  }

  private async validate(user: UserData, script: Script): Promise<void> {
    if (script.is_assumed) throw new Error('Script is already assumed');

    if (script.status === ScriptStatus.APPROVED || script.status === ScriptStatus.REJECTED)
      throw new ConflictException('Script is already finished');

    if (!this.validateRole(user.role, script!.status))
      throw new ForbiddenException('User role is not allowed to assume this script status');

    await this.verifyUserAlreadyApproved(script.id, user.id);

    return;
  }

  private async updateScript(script: Script): Promise<void> {
    script.is_assumed = true;

    await updateScriptUseCase.execute(script);
  }

  private validateRole(role: string, status: ScriptStatus): boolean {
    switch (role) {
      case UserRoles.ANALYST:
        return status === ScriptStatus.AWAITING_ANALYSIS;
      case UserRoles.REVIEWER:
        return status === ScriptStatus.AWAITING_REVIEW;
      case UserRoles.APPROVER:
        return status === ScriptStatus.AWAITING_APPROVAL;
      default:
        return false;
    }
  }

  private changeToAssumedStatus(status: ScriptStatus): ScriptStatus {
    switch (status) {
      case ScriptStatus.AWAITING_ANALYSIS:
        return ScriptStatus.IN_ANALYSIS;
      case ScriptStatus.AWAITING_REVIEW:
        return ScriptStatus.IN_REVIEW;
      case ScriptStatus.AWAITING_APPROVAL:
        return ScriptStatus.IN_APPROVAL;
      default:
        return status;
    }
  }

  private async verifyUserAlreadyApproved(script_id: string, user_id: string) {
    const histories = await findScriptHistoriesActionByRelationUseCase.execute(script_id, user_id, ScriptStatus.VOTED);

    if (histories.length > 0) throw new ForbiddenException('User already approved this script');

    return;
  }
}
