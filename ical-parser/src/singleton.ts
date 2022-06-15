import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";

import prisma from "./db.js";

jest.mock("./db.js", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prisma);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
