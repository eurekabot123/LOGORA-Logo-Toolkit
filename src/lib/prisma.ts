// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = prismaClientSingleton();

export const getPrisma = prismaClientSingleton;

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}
