import { FindScriptUseCase } from './find-script-use-case';
import { CreateScriptUseCase } from './create-script-use-case';
import { UserPrismaRepository } from './../db/prisma/implementations/user-prisma-repository';

import { FindUserUseCase } from './find-user-use-case';
import { ScriptPrismaRepository } from '../db/prisma/implementations/script-prisma-repository';

const createScriptUseCase = new CreateScriptUseCase(
  new ScriptPrismaRepository()
);

const findScriptUseCase = new FindScriptUseCase(new ScriptPrismaRepository());
const findUserUseCase = new FindUserUseCase(new UserPrismaRepository());

export { createScriptUseCase, findScriptUseCase, findUserUseCase };
