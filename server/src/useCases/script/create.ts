import { Script } from '../../domain/entities/script';
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
    const script = new Script(title, content, contact_name, contact_email, contact_phone);

    const response = await this.repository.create(script);

    return response;
  }
}
