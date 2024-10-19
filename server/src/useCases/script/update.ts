import type { Script } from '../../domain/entities/script';
import type { ScriptRepository } from '../../domain/repositories/script-repository';

export class UpdateScriptUseCase {
  constructor(private scriptRepository: ScriptRepository) {}

  async execute(script: Script) {
    await this.scriptRepository.update(script);
  }
}
