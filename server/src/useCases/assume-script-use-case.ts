import type { ScriptRepository } from '../domain/repositories/script-repository';

export class AssumeScriptUseCase {
  constructor(private readonly repository: ScriptRepository) {}

  async execute(id: string): Promise<void> {
    await this.repository.assume(id);
  }
}
