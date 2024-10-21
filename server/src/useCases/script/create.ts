import { Script } from '../../domain/entities/script';
import { ConflictException } from '../../domain/exceptions/conflict';
import type { ScriptRepository } from '../../domain/repositories/script-repository';
import type { CreateScriptBody } from '../../types/index.ts';

export class CreateScriptUseCase {
  constructor(private readonly repository: ScriptRepository) {}

  async execute({ title, content, contact_name, contact_email, contact_phone }: CreateScriptBody): Promise<Script> {
    const foundScript = await this.repository.findByTitle(title);

    if (foundScript) throw new ConflictException('Script with this title already exists');

    const script = new Script(title, content, contact_name, contact_email, contact_phone);

    const response = await this.repository.create(script);

    return response;
  }
}
