import { AssumeScriptUseCase } from './assume-script-use-case';
import { ListScriptUseCase } from './list-script-use-case';
import { FindScriptUseCase } from './find-script-use-case';
import { CreateScriptUseCase } from './create-script-use-case';
import { UserPrismaRepository } from './../db/prisma/implementations/user-prisma-repository';

import { FindUserUseCase } from './find-user-use-case';
import { ScriptPrismaRepository } from '../db/prisma/implementations/script-prisma-repository';
import { FindScriptByIdUseCase } from './find-script-by-id-use-case';
import { CreateUserScriptUseCase } from './create-user-script-use-case';
import { UserScriptPrismaRepository } from '../db/prisma/implementations/user-script-prisma-repository';

const createScriptUseCase = new CreateScriptUseCase(
  new ScriptPrismaRepository()
);

const createUserScriptUseCase = new CreateUserScriptUseCase(
  new UserScriptPrismaRepository()
);

const assumeScriptUseCase = new AssumeScriptUseCase(
  new ScriptPrismaRepository()
);

const findScriptUseCase = new FindScriptUseCase(new ScriptPrismaRepository());
const listScriptUseCase = new ListScriptUseCase(new ScriptPrismaRepository());
const findUserUseCase = new FindUserUseCase(new UserPrismaRepository());
const findScriptByIdUseCase = new FindScriptByIdUseCase(
  new ScriptPrismaRepository()
);

export {
  assumeScriptUseCase,
  findScriptByIdUseCase,
  createScriptUseCase,
  createUserScriptUseCase,
  listScriptUseCase,
  findScriptUseCase,
  findUserUseCase,
};
