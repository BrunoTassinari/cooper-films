import { FindUserScriptByRelationUseCase } from './find-by-relation';
import { ListUserScriptsUseCase } from './list';
import { UserScriptPrismaRepository } from '../../db/prisma/implementations/user-script-prisma-repository';
import { CreateUserScriptUseCase } from './create';
import { DeleteUserScriptUseCase } from './delete';

const repository = new UserScriptPrismaRepository();

const createUserScriptUseCase = new CreateUserScriptUseCase(repository);
const listUserScriptsUseCase = new ListUserScriptsUseCase(repository);
const findUserScriptByRelationUseCase = new FindUserScriptByRelationUseCase(repository);
const deleteUserScriptUseCase = new DeleteUserScriptUseCase(repository);

export { createUserScriptUseCase, listUserScriptsUseCase, findUserScriptByRelationUseCase, deleteUserScriptUseCase };
