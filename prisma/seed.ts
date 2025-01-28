import { PrismaClient } from "@prisma/client";

import { seedProducts, seedUsers } from "./seeds";

const prisma = new PrismaClient();

async function main() {
  seedUsers(prisma);
  seedProducts(prisma);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
