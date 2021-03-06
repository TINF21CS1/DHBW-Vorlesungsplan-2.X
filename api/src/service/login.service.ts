import { prisma } from "../app";
import { User } from "@prisma/client";
import bcrypt from "bcrypt"; //idk warum mit import nicht will...
import jwt from "jsonwebtoken";

export default class LoginService {
  public async login(user: User): Promise<String> {
    await prisma.$connect();
    const exists = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });
    if (!exists || !(await bcrypt.compare(user.pass, exists.pass)))
      // kein fastcall, wegen Security!
      return "Email or Password wrong..."; //hier ratelimit??
    const token = jwt.sign(
      { user_id: exists.id, email: exists.email },
      process.env.TOKEN_KEY || "123456789",
      {
        expiresIn: "2h",
      }
    );
    return token;
  }
}

export { LoginService };
