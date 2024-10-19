import type { UserRepository } from '../../domain/repositories/user-repository';
import type { UserData } from '../../types/user';

export class FindUserByIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<UserData | null> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }
}
