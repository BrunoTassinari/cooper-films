import type { Script } from '../../domain/entities/script';
import { BadRequestException } from '../../domain/exceptions/bad-request';
import { NotFoundException } from '../../domain/exceptions/not-found';
import type { ScriptRepository } from '../../domain/repositories/script-repository';

export class FindScriptByContactInfoUseCase {
  constructor(private repository: ScriptRepository) {}

  async execute(name: string, email: string, phone: string): Promise<Script[] | null> {
    if (name === '' && email === '' && phone === '')
      throw new BadRequestException('At least one contact information must be provided');

    const foundScript = await this.repository.find(name, email, phone);

    if (!foundScript) throw new NotFoundException('Script not found');

    return foundScript;
  }
}
