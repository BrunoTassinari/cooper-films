import { BadRequestException } from '../../domain/exceptions/bad-request';
import { NotFoundException } from '../../domain/exceptions/not-found';
import type { ScriptRepository } from '../../domain/repositories/script-repository';
import { formatScriptData } from '../../lib/format-script-data';
import type { ScriptData } from '../../types/user';

export class FindScriptByContactInfoUseCase {
  constructor(private repository: ScriptRepository) {}

  async execute(name: string, email: string, phone: string): Promise<ScriptData[] | null> {
    if (name === '' && email === '' && phone === '')
      throw new BadRequestException('At least one contact information must be provided');

    const foundScriptList = await this.repository.find(name, email, phone);

    if (!foundScriptList) throw new NotFoundException('Script not found');

    const formatedScriptList = foundScriptList.map((script) => formatScriptData(script));

    return formatedScriptList;
  }
}
