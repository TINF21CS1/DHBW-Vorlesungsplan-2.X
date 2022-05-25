import {prisma} from "../app"
import { User } from '@prisma/client';
const bcrypt = require('bcrypt'); //idk warum mit import nicht will...
const jwt = require('jsonwebtoken');

export default class LoginService {

    public async login(user: User): Promise<String> {
      await prisma.$connect();
      const exists = await prisma.user.findFirst({
          where: {
            email: user.email
          },
        });
      if(!exists||!(await bcrypt.compare(exists?.pass, user.pass)))
        return "Email or Password wrong..."; //hier ratelimit??

      const token = jwt.sign(
          { user_id: user.id, email: user.email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
      return token;
  }
}

export {LoginService}