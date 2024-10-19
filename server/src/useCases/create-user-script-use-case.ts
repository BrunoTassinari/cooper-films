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
  }: CreateUserScriptBody): Promise<UserScript> {
    //validar se usuario existe
    // validar se script existe
    // validar se script já foi assumido
    // validar se o cargo do usuario é permitido para assumir o script com base no cargo e status do script

    const foundScript = await findScriptByIdUseCase.execute(script_id);

    if (!foundScript) throw new Error('Script not found');

    if (foundScript.is_assumed) throw new Error('Script is already assumed');

    const userScript = new UserScript(user_id, script_id);

    await this.repository.create(userScript);
    await assumeScriptUseCase.execute(script_id);

    return userScript;
  }
}
