import { PrismaClient } from '@prisma/client';
import type { ScriptRepository } from '../../../domain/repositories/script-repository';
import type { Script } from '../../../domain/entities/script';
import type { ScriptStatus } from '../../../domain/enums/script-status';

export class ScriptPrismaRepository implements ScriptRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findByTitle(title: string): Promise<Script | null> {
    const response = await this.prisma.script.findFirst({
      where: {
        title,
      },
    });

    if (!response) return null;

    return {
      ...response,
      status: response.status as ScriptStatus,
    };
  }

  async update(script: Script): Promise<Script> {
    const response = await this.prisma.script.update({
      where: {
        id: script.id,
      },
      data: {
        status: script.status,
        is_assumed: script.is_assumed,
        approver_count: script.approver_count,
      },
    });

    return {
      ...response,
      status: response.status as ScriptStatus,
    };
  }

  async findMany(ids: string[]): Promise<Script[]> {
    const response = this.prisma.script.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return response.then((scripts) =>
      scripts.map((script) => ({
        ...script,
        status: script.status as ScriptStatus,
      }))
    );
  }

  async assume(id: string): Promise<void> {
    await this.prisma.script.update({
      where: {
        id,
      },
      data: {
        is_assumed: true,
      },
    });
  }

  async findOne(id: string): Promise<Script | null> {
    const response = await this.prisma.script.findUnique({
      where: {
        id,
      },
    });

    if (!response) return null;

    return {
      ...response,
      status: response.status as ScriptStatus,
    };
  }

  async list(): Promise<Script[]> {
    const response = await this.prisma.script.findMany({
      where: {
        is_assumed: false,
      },
      orderBy: {
        created_at: 'asc',
      },
    });

    return response.map((script) => ({
      ...script,
      status: script.status as ScriptStatus,
    }));
  }

  async create(script: Script): Promise<Script> {
    const response = await this.prisma.script.create({
      data: {
        title: script.title,
        content: script.content,
        status: script.status,
        contact_name: script.contact_name,
        contact_email: script.contact_email,
        contact_phone: script.contact_phone,
      },
    });

    return {
      ...response,
      status: response.status as ScriptStatus,
    };
  }

  async find(name: string, email: string, phone: string): Promise<Script[] | null> {
    const response = await this.prisma.script.findMany({
      where: {
        OR: [{ contact_name: name }, { contact_email: email }, { contact_phone: phone }],
      },
    });

    if (!response) return null;

    return response.map((script) => ({
      ...script,
      status: script.status as ScriptStatus,
    }));
  }
}
