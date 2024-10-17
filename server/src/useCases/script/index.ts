import { ScriptPrismaRepository } from '../../db/prisma/implementations/script-prisma-repository';
import { CreateScriptUseCase } from './create-script-use-case';
import { FindScriptUseCase } from './find-script-use-case';

const createUseCase = new CreateScriptUseCase(new ScriptPrismaRepository());
const findByIdUseCase = new FindScriptUseCase(new ScriptPrismaRepository());

export { createUseCase, findByIdUseCase };
