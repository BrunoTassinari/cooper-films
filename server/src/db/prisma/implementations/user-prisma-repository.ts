import { PrismaClient } from '@prisma/client';
import type { UserRepository } from '../../../domain/repositories/user-repository';
import type { UserRoles } from '../../../domain/enums/user-roles';
import type { User } from '../../../domain/entities/user';

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

    if (!response) {
      return null;
    }

    return {
      ...response,
      role: response.role as UserRoles,
    };
  }

  async findById(id: string): Promise<User | null> {
    const response = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!response) {
      return null;
    }

    return {
      ...response,
      role: response.role as UserRoles,
    };
  }
}
