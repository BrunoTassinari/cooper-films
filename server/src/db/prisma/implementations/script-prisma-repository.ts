import { PrismaClient } from '@prisma/client';
import type { ScriptRepository } from '../../../domain/repositories/script-repository';
import type { Script } from '../../../domain/entities/script';

export class ScriptPrismaRepository implements ScriptRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(script: Script): Promise<Script> {
    const response = await this.prisma.script.create({
      data: {
        content: script.content,
        status: script.status,
        contact_name: script.contact_name,
        contact_email: script.contact_email,
        contact_phone: script.contact_phone,
      },
    });

    return response;
  }

  find(name: string, email: string, phone: string): Promise<Script | null> {
    const response = this.prisma.script.findMany({
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
