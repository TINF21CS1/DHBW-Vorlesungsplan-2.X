import {prisma} from "../app"
import { User } from '@prisma/client';
const bcrypt = require('bcrypt'); //idk warum mit import nicht will...
const jwt = require('jsonwebtoken');

export default class LoginService {

    public async login(user: User): Promise<User|any> {
      await prisma.$connect();
      const exists = await prisma.user.findFirst({
          where: {
            email: user.email
          },
        });
        console.log(exists?.pass + "|" + user.pass)
        console.log(await bcrypt.compare(exists?.pass, user.pass))
      if(!exists||!(await bcrypt.compare(exists?.pass, user.pass)))
        return "Email or Password wrong..."; //hier ratelimit??

      const token = jwt.sign(
          { user_id: user.id, email: user.email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        exists.salt = token; //Rename to token...
      return exists;
  }
}

export {LoginService}