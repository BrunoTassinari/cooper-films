import type { Script } from '../domain/entities/script';
import type { ScriptRepository } from '../domain/repositories/script-repository';

export class FindScriptUseCase {
  constructor(private repository: ScriptRepository) {}

  async execute(
    name: string,
    email: string,
    phone: string
  ): Promise<Script[] | null> {
    if (name === '' && email === '' && phone === '')
      throw new Error('Invalid contact information');

    const foundScript = await this.repository.find(name, email, phone);

    if (!foundScript) {
      throw new Error('Script not found');
    }

    return foundScript;
  }
}
