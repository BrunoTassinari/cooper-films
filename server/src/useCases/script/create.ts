import { Script } from '../../domain/entities/script';
import { ConflictException } from '../../domain/exceptions/conflict';
import type { ScriptRepository } from '../../domain/repositories/script-repository';

type CreateScriptBody = {
  title: string;
  content: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
};

export class CreateScriptUseCase {
  constructor(private readonly repository: ScriptRepository) {}

  async execute({ title, content, contact_name, contact_email, contact_phone }: CreateScriptBody): Promise<Script> {
    const foundScriptTitle = await this.repository.findByTitle(title);

    if (foundScriptTitle) throw new ConflictException('Script with this title already exists');

    const script = new Script(title, content, contact_name, contact_email, contact_phone);

    const response = await this.repository.create(script);

    return response;
  }
}
