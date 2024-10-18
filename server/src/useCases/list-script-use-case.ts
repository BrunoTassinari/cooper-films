import type { Script } from '../domain/entities/script';
import type { User } from '../domain/entities/user';
import { ScriptStatus } from '../domain/enums/script-status';
import { UserRoles } from '../domain/enums/user-roles';
import type { ScriptRepository } from '../domain/repositories/script-repository';
import type { UserData } from '../types/user';

export class ListScriptUseCase {
  constructor(private repository: ScriptRepository) {}

  async execute(userData: UserData): Promise<Script[] | null> {
    console.log(userData);

    const findStatues = [
      ScriptStatus.AWAITING_ANALYSIS,
      ScriptStatus.REJECTED,
      ScriptStatus.APPROVED,
      ScriptStatus.ERROR,
    ];

    switch (userData.role) {
      case UserRoles.ANALYST:
        findStatues.push(ScriptStatus.IN_ANALYSIS);
        break;
      case UserRoles.REVIEWER:
        findStatues.push(ScriptStatus.AWAITING_REVIEW);
        break;
      case UserRoles.APPROVER:
        findStatues.push(ScriptStatus.AWAITING_APPROVAL);
        break;
    }

    console.log(findStatues);

    const scriptList = await this.repository.list(findStatues);

    if (!scriptList) {
      throw new Error('Script not found');
    }

    return scriptList;
  }
}
