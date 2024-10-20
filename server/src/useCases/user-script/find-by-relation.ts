import type { UserScript } from '../../domain/entities/user-script';
import type { UserScriptRepository } from '../../domain/repositories/user-script-repository';

export class FindUserScriptByRelationUseCase {
  constructor(private readonly repository: UserScriptRepository) {}

  async execute(userId: string, scriptId: string): Promise<UserScript | null> {
    const response = await this.repository.findByRelation(userId, scriptId);

    if (!response) {
      throw new Error('UserScript not found');
    }

    return response;
  }
}
