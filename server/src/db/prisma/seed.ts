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
