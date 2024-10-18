import { ListScriptUseCase } from './list-script-use-case';
import { FindScriptUseCase } from './find-script-use-case';
import { CreateScriptUseCase } from './create-script-use-case';
import { UserPrismaRepository } from './../db/prisma/implementations/user-prisma-repository';

import { FindUserUseCase } from './find-user-use-case';
import { ScriptPrismaRepository } from '../db/prisma/implementations/script-prisma-repository';
import { FindScriptByIdUseCase } from './find-script-by-id-use-case';

const createScriptUseCase = new CreateScriptUseCase(
  new ScriptPrismaRepository()
);

const findScriptUseCase = new FindScriptUseCase(new ScriptPrismaRepository());
const listScriptUseCase = new ListScriptUseCase(new ScriptPrismaRepository());
const findUserUseCase = new FindUserUseCase(new UserPrismaRepository());
const findScriptByIdUseCase = new FindScriptByIdUseCase(
  new ScriptPrismaRepository()
);

export {
  findScriptByIdUseCase,
  createScriptUseCase,
  listScriptUseCase,
  findScriptUseCase,
  findUserUseCase,
};
