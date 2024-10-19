import { PrismaClient } from '@prisma/client';
import type { ScriptRepository } from '../../../domain/repositories/script-repository';
import type { Script } from '../../../domain/entities/script';

export class ScriptPrismaRepository implements ScriptRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
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

    return response;
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

    return response;
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

    return response;
  }

  async find(
    name: string,
    email: string,
    phone: string
  ): Promise<Script[] | null> {
    const response = await this.prisma.script.findMany({
      where: {
        OR: [
          { contact_name: name },
          { contact_email: email },
          { contact_phone: phone },
        ],
      },
    });

    return response;
  }
}
