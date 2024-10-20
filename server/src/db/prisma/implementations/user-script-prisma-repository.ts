import { PrismaClient } from '@prisma/client';
import type { UserScriptRepository } from '../../../domain/repositories/user-script-repository';
import type { UserScript } from '../../../domain/entities/user-script';

export class UserScriptPrismaRepository implements UserScriptRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  async delete(userScriptId: string): Promise<void> {
    await this.prisma.userScript.delete({
      where: {
        id: userScriptId,
      },
    });
  }

  async findByRelation(userId: string, scriptId: string): Promise<UserScript | null> {
    const response = await this.prisma.userScript.findFirst({
      where: {
        user_id: userId,
        script_id: scriptId,
      },
    });

    return response;
  }

  async list(userId: string): Promise<UserScript[]> {
    const response = await this.prisma.userScript.findMany({
      where: {
        user_id: userId,
      },
    });

    return response;
  }

  async create(userScript: UserScript): Promise<UserScript> {
    const response = await this.prisma.userScript.create({
      data: {
        user_id: userScript.user_id,
        script_id: userScript.script_id,
      },
    });

    return response;
  }
}
