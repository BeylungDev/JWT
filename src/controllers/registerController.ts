import { Request, Response } from "express";
import prisma from "../../prisma/db";
import bcrypt from "bcryptjs";
import { resolveTypeReferenceDirective } from "typescript";

export async function registerController(request: Request, response: Response) {
  const { name, email, password } = request.body;

  const userExist = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (userExist) {
    return response.json({ erro: "Usuário já existe" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  });
  return response.json(user);
}
