import type { UserScript } from '../../domain/entities/user-script';
import { NotFoundException } from '../../domain/exceptions/not-found';
import type { UserScriptRepository } from '../../domain/repositories/user-script-repository';

export class FindUserScriptByRelationUseCase {
  constructor(private readonly repository: UserScriptRepository) {}

  async execute(user_id: string, script_id: string): Promise<UserScript | null> {
    const response = await this.repository.findByRelation(user_id, script_id);

    if (!response) throw new NotFoundException('UserScript not found');

    return response;
  }
}
