import { UserPrismaRepository } from '../../db/prisma/implementations/user-prisma-repository';
import { FindUserByCredentialsUseCase } from './find-by-credentials';
import { FindUserByIdUseCase } from './find-by-id';

const repository = new UserPrismaRepository();

const findUserByidUseCase = new FindUserByIdUseCase(repository);
const findUserByCredentialsUseCase = new FindUserByCredentialsUseCase(repository);

export { findUserByidUseCase, findUserByCredentialsUseCase };
