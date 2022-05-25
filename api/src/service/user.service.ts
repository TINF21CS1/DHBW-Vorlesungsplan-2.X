import {prisma} from "../app"
import { User } from '@prisma/client';
const bcrypt = require('bcrypt'); //idk warum mit import nicht will...
const jwt = require('jsonwebtoken');

export default class UserService {
    public async fetchUsers(): Promise<Array<User>> {
        const allUsers = await prisma.user.findMany()
        return allUsers;
    }

    public async createUser(user: User): Promise<User|any> {
        await prisma.$connect();
        const exists = await prisma.user.findFirst({
            where: {
              email: user.email,
            },
          })
        if(exists)
          return "Already Exists";
        user.pass = await bcrypt.hash(user.pass, 10);
        const users= await prisma.user.create({data:user})
        const token = jwt.sign(
            { user_id: user.id, email: user.email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          // save user token
          users.salt = token;
        return users;
    }

    public async login(user: User): Promise<User|any> {
      await prisma.$connect();
      user.pass = await bcrypt.hash(user.pass, 11);
      const exists = await prisma.user.findFirst({
          where: {
            email: user.email,
            pass: user.pass,
          },
        })
      if(!exists)
        return "Email or Password wrong..."; //hier ratelimit??

      const token = jwt.sign(
          { user_id: user.id, email: user.email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        exists.salt = token;
      return exists;
  }

    public async findUserbyEmail(emails: string): Promise<User|any> {
        const user = await prisma.user.findUnique({
            where: {
              email: emails,
            },
          })
        return user;
    }
}
export {UserService}