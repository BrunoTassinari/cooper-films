import { NotFoundException } from '../../domain/exceptions/not-found';
import type { UserRepository } from '../../domain/repositories/user-repository';
import type { UserData } from '../../types/index.ts';

export class FindUserByIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<UserData | null> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new NotFoundException('User not found');

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }
}
