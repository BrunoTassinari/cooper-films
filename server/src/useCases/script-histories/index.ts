import { ScriptHistoryPrismaRepository } from '../../db/prisma/implementations/script-history-prisma-repository';
import { CreateScriptHistoriesUseCase } from './create';
const repository = new ScriptHistoryPrismaRepository();

const createScriptHistoriesUseCase = new CreateScriptHistoriesUseCase(repository);

export { createScriptHistoriesUseCase };
