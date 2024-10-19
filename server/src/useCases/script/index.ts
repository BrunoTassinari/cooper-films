import { FindScriptsByIdsUseCase } from './find-by-ids';
import { FindScriptByContactInfoUseCase } from './find-by-contact-info';
import { ListScriptUseCase } from './list';
import { ScriptPrismaRepository } from '../../db/prisma/implementations/script-prisma-repository';
import { CreateScriptUseCase } from './create';
import { FindScriptByIdUseCase } from './find-by-id';
import { UpdateScriptUseCase } from './update';

const repository = new ScriptPrismaRepository();

const createScriptUseCase = new CreateScriptUseCase(repository);
const updateScriptUseCase = new UpdateScriptUseCase(repository);
const findScriptByIdUseCase = new FindScriptByIdUseCase(repository);
const findScriptsByIdsUseCase = new FindScriptsByIdsUseCase(repository);
const findScriptByContactInfoUseCase = new FindScriptByContactInfoUseCase(repository);
const listScriptUseCase = new ListScriptUseCase(repository);

export {
  createScriptUseCase,
  updateScriptUseCase,
  findScriptByIdUseCase,
  findScriptsByIdsUseCase,
  findScriptByContactInfoUseCase,
  listScriptUseCase,
};
