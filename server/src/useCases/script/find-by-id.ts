import type { UserData } from '../../types/user';
import type { ScriptRepository } from '../../domain/repositories/script-repository';
import type { Script } from '../../domain/entities/script';

export class FindScriptByIdUseCase {
  constructor(private readonly repository: ScriptRepository) {}

  async execute(id: string): Promise<Script | null> {
    const response = await this.repository.findOne(id);

    if (!response) {
      return null;
    }

    return response;
  }
}
