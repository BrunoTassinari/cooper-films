import type { User } from '../domain/entities/user';
import type { UserRepository } from '../domain/repositories/user-repository';

export class FindUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(email: string, password: string): Promise<User | null> {
    const response = await this.repository.find(email, password);

    return response;
  }
}
