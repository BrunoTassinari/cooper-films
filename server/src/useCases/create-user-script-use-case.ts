import { assumeScriptUseCase, findScriptByIdUseCase } from '.';
import { UserScript } from '../domain/entities/user-script';
import type { UserScriptRepository } from '../domain/repositories/user-script-repository';

type CreateUserScriptBody = {
  script_id: string;
  user_id: string;
  role: string;
};

export class CreateUserScriptUseCase {
  constructor(private readonly repository: UserScriptRepository) {}

  async execute({
    script_id,
    user_id,
    role,
  }: CreateUserScriptBody): Promise<UserScript> {
    const foundScript = await findScriptByIdUseCase.execute(script_id);

    if (!foundScript) throw new Error('Script not found');

    if (foundScript.is_assumed) throw new Error('Script is already assumed');

    const userScript = new UserScript(script_id, user_id);

    await this.repository.create(userScript);
    await assumeScriptUseCase.execute(script_id);

    return userScript;
  }
}
