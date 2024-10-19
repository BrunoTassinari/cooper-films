import { ScriptStatus } from './../../domain/enums/script-status';
import { PrismaClient } from '@prisma/client';
import { UserRoles } from '../../domain/enums/user-roles';

const prisma = new PrismaClient();
async function seed() {
  await prisma.user.deleteMany({});
  await prisma.script.deleteMany({});

  await prisma.user.createMany({
    data: [
      {
        name: 'Alberto silva',
        email: 'alberto.silva@email.com',
        password: 'albertoSilva123@P4ss',
        role: UserRoles.ANALYST,
      },
      {
        name: 'Maria Gonçalves',
        email: 'maria.goncalves@email.com',
        password: 'mariaGoncalves123@P4ss',
        role: UserRoles.REVIEWER,
      },
      {
        name: 'Davi Souza',
        email: 'davi.souza@email.com',
        password: 'davisouza123@P4ss',
        role: UserRoles.APPROVER,
      },
      {
        name: 'Amanda Costa',
        email: 'amanda.costa@email.com',
        password: 'amandacosta123@P4ss',
        role: UserRoles.APPROVER,
      },
      {
        name: 'Luiza Santos',
        email: 'luiza.santos@email.com',
        password: 'luizasantos123@P4ss',
        role: UserRoles.APPROVER,
      },
    ],
  });

  await prisma.script.createMany({
    data: [
      {
        title: 'Script 1',
        content: 'Content 1',
        contact_name: 'Contact 1',
        contact_email: 'Email 1',
        contact_phone: 'Phone 1',
        status: ScriptStatus.AWAITING_ANALYSIS,
      },
      {
        title: 'Script 2',
        content: 'Content 2',
        contact_name: 'Contact 2',
        contact_email: 'Email 2',
        contact_phone: 'Phone 2',
        status: ScriptStatus.AWAITING_REVIEW,
      },
      {
        title: 'Script 3',
        content: 'Content 3',
        contact_name: 'Contact 3',
        contact_email: 'Email 3',
        contact_phone: 'Phone 3',
        status: ScriptStatus.AWAITING_APPROVAL,
      },
      {
        title: 'Script 4',
        content: 'Content 4',
        contact_name: 'Contact 4',
        contact_email: 'Email 4',
        contact_phone: 'Phone 4',
        status: ScriptStatus.APPROVED,
      },
      {
        title: 'Script 5',
        content: 'Content 5',
        contact_name: 'Contact 5',
        contact_email: 'Email 5',
        contact_phone: 'Phone 5',
        status: ScriptStatus.REJECTED,
      },
    ],
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
