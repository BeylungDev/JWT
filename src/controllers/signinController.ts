import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "../../prisma/db";

export const SECRET_KEY = "4yAEb'.V2e$Dkz500<k41V~)CF!{,^";

export async function signinController(request: Request, response: Response) {
  const { email, password } = request.body;

  const userExist = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!userExist) {
    return response.json({ erro: "Credenciais inválidas" });
  }

  const isValidPassword = await bcrypt.compare(password, userExist.password);
  if (!isValidPassword) {
    return response.json({ erro: "Credenciais inválidas" });
  }

  const token = await jwt.sign(
    {
      id: userExist.id,
      name: userExist.name,
      email: userExist.email,
    },
    SECRET_KEY
  );
  return response.json(token);
}
