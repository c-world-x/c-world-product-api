import { Role, User } from "@prisma/client";

export const USER_SEEDS = [
  {
    id: 1,
    password:
      // eslint-disable-next-line max-len
      "92441d8ed2fed88d:c146d67765da45fc9a94747a38063f42cb34d4c43cc7ee6311b773df04ba6dffa616ad56927e88796e35a949f687e45e75a135b2ade983e432de05e83ef9c4f8", // "123456Aa"
    email: "user@example.com",
    emailVerifiedAt: new Date(),
    role: Role.User,
    name: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    token: "DGN2DQCPIYneW62zcwTXeV8aflajbJK68KIuG",
  },
];

export async function seedUsers(prisma) {
  for (const user of USER_SEEDS) {
    await prisma.user.upsert({
      where: {
        id: user.id || undefined,
      },
      update: user as User,
      create: user as User,
    });
  }
}
