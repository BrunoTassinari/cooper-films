import { ListUserScriptsUseCase } from './list';
import { UserScriptPrismaRepository } from '../../db/prisma/implementations/user-script-prisma-repository';
import { CreateUserScriptUseCase } from './create';

const repository = new UserScriptPrismaRepository();

const createUserScriptUseCase = new CreateUserScriptUseCase(repository);
const listUserScriptsUseCase = new ListUserScriptsUseCase(repository);

export { createUserScriptUseCase, listUserScriptsUseCase };
