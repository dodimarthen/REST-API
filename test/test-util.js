import { prismaClient } from "../src/application/dbase";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createTestUser = async () => {
  const existingUser = await prismaClient.user.findUnique({
    where: {
      username: "test",
    },
  });
  if (!existingUser) {
    await prismaClient.user.create({
      data: {
        username: "test",
        password: await bcrypt.hash("rahasia", 10),
        name: "test",
        token: "test",
      },
    });
  }
};
