import type { UserScriptRepository } from '../../domain/repositories/user-script-repository';

export class DeleteUserScriptUseCase {
  constructor(private repository: UserScriptRepository) {}

  async execute(userScriptId: string): Promise<void> {
    await this.repository.delete(userScriptId);
  }
}
