import { PrismaClient } from '@prisma/client';
import type { ScriptHistoriy } from '../../../domain/entities/script-history';
import type { ScriptHistoryRepository } from '../../../domain/repositories/script-history-repository';

export class ScriptHistoryPrismaRepository implements ScriptHistoryRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  async findActionsByRelation(script_id: string, user_id: string, action_status: string): Promise<ScriptHistoriy[]> {
    return await this.prisma.scriptHistory.findMany({
      where: {
        script_id,
        user_id,
        action: { contains: action_status },
      },
    });
  }

  async create(scriptHistories: ScriptHistoriy): Promise<void> {
    await this.prisma.scriptHistory.create({
      data: {
        script_id: scriptHistories.script_id,
        user_id: scriptHistories.user_id,
        action: scriptHistories.action,
        observation: scriptHistories.observation,
      },
    });
  }
}
