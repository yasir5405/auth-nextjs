import { PrismaClient } from "../app/generated/prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const client =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;
