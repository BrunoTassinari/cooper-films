import { UserScript } from '../../domain/entities/user-script';
import { ScriptStatus } from '../../domain/enums/script-status';
import { UserRoles } from '../../domain/enums/user-roles';
import type { UserScriptRepository } from '../../domain/repositories/user-script-repository';
import { findUserByidUseCase } from '../user';
import type { UserData } from '../../types/user';
import type { Script } from '../../domain/entities/script';
import { findScriptByIdUseCase, updateScriptUseCase } from '../script';
import { createScriptHistoriesUseCase } from '../script-histories';

type CreateUserScriptBody = {
  script_id: string;
  user_id: string;
};

export class CreateUserScriptUseCase {
  constructor(private readonly repository: UserScriptRepository) {}

  async execute({ script_id, user_id }: CreateUserScriptBody): Promise<UserScript> {
    const foundUser = await this.findAndValidateUser(user_id);
    const foundScript = await this.findAndValidateScript(script_id);

    if (!this.validateRole(foundUser.role, foundScript.status))
      throw new Error('User role is not allowed to assume this script status');

    const userScript = new UserScript(user_id, script_id);

    await this.repository.create(userScript);
    await this.updateScript(foundScript);
    await this.createHistoric(foundUser, foundScript);

    return userScript;
  }

  private async createHistoric(user: UserData, script: Script): Promise<void> {
    const action = `Script has changed to ${this.changeToAssumedStatus(script.status)}`;

    await createScriptHistoriesUseCase.execute({
      script_id: script.id,
      user_id: user.id,
      action,
    });
  }

  private async updateScript(script: Script): Promise<void> {
    script.is_assumed = true;
    script.status = this.changeToAssumedStatus(script.status);

    await updateScriptUseCase.execute(script);
  }

  private async findAndValidateUser(user_id: string): Promise<UserData> {
    const foundUser = await findUserByidUseCase.execute(user_id);

    if (!foundUser) throw new Error('User not found');

    return foundUser;
  }

  private async findAndValidateScript(script_id: string): Promise<Script> {
    const foundScript = await findScriptByIdUseCase.execute(script_id);

    if (!foundScript) throw new Error('Script not found');

    if (foundScript.is_assumed) throw new Error('Script is already assumed');

    return foundScript;
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
}
