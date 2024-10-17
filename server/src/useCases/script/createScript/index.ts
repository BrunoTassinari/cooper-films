import { ScriptPrismaRepository } from '../../../db/prisma/implementations/script-prisma-repository';
import { CreateScriptUseCase } from './create-script-use-case';

const repository = new ScriptPrismaRepository();
const useCase = new CreateScriptUseCase(repository);

export { useCase };
