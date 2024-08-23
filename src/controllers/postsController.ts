import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../../prisma/db";

type RequestWithUser = Request & {
  user?: string | JwtPayload | any;
};

export class PostController {
  public async index(request: RequestWithUser, response: Response) {
    const { id } = request.user;
    const posts = await prisma.post.findMany({
      where: {
        authorId: id,
      },
    });
  }
  public async store(request: RequestWithUser, response: Response) {
    const { title } = request.body;
    const { id } = request.user;
    const post = await prisma.post.create({
      data: {
        title: title,
        authorId: id,
      },
    });
    return response.json(post);
  }
}
