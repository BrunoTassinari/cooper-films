import type { UserRepository } from '../domain/repositories/user-repository';
import type { UserData } from '../types/user';

export class FindUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(email: string, password: string): Promise<UserData | null> {
    const response = await this.repository.find(email, password);

    if (!response) {
      return null;
    }

    return {
      id: response.id,
      email: response.email,
      name: response.name,
      role: response.role,
    };
  }
}
