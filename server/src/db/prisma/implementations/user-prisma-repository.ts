import { PrismaClient, type User } from '@prisma/client';
import type { UserRepository } from '../../../domain/repositories/user-repository';

export class UserPrismaRepository implements UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async find(email: string, password: string): Promise<User | null> {
    const response = await this.prisma.user.findUnique({
      where: {
        email: email,
        password: password,
      },
    });

    return response;
  }
}
