import type { UserData } from '../../types/index.ts';
import type { ScriptRepository } from '../../domain/repositories/script-repository';
import type { Script } from '../../domain/entities/script';
import { NotFoundException } from '../../domain/exceptions/not-found';

export class FindScriptByIdUseCase {
  constructor(private readonly repository: ScriptRepository) {}

  async execute(script_id: string): Promise<Script | null> {
    const response = await this.repository.findById(script_id);

    if (!response) throw new NotFoundException('Script not found');

    return response;
  }
}
