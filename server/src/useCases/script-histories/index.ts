import { FindScriptHistoriesActionByRelationUseCase } from './find-action-by-relation';
import { ScriptHistoryPrismaRepository } from '../../db/prisma/implementations/script-history-prisma-repository';
import { CreateScriptHistoriesUseCase } from './create';
const repository = new ScriptHistoryPrismaRepository();

const createScriptHistoriesUseCase = new CreateScriptHistoriesUseCase(repository);
const findScriptHistoriesActionByRelationUseCase = new FindScriptHistoriesActionByRelationUseCase(repository);

export { createScriptHistoriesUseCase, findScriptHistoriesActionByRelationUseCase };
