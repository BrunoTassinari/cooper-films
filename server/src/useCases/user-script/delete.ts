import type { UserScriptRepository } from '../../domain/repositories/user-script-repository';

export class DeleteUserScriptUseCase {
  constructor(private repository: UserScriptRepository) {}

  async execute(user_script_id: string): Promise<void> {
    await this.repository.delete(user_script_id);
  }
}
