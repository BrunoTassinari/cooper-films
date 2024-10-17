import { Script } from '../../domain/entities/script';
import type { ScriptRepository } from '../../domain/repositories/script-repository';

export class CreateScriptUseCase {
  constructor(private readonly repository: ScriptRepository) {}

  async execute({
    content,
    contact_name,
    contact_email,
    contact_phone,
  }: {
    content: string;
    contact_name: string;
    contact_email: string;
    contact_phone: string;
  }): Promise<Script> {
    const script = new Script(
      content,
      contact_name,
      contact_email,
      contact_phone
    );

    const response = await this.repository.create(script);

    return response;
  }
}
