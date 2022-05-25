import {prisma} from "../app"
import { User } from '@prisma/client';
const bcrypt = require('bcrypt'); //idk warum mit import nicht will...
const jwt = require('jsonwebtoken');

export default class UserService {

    public async createUser(user: User): Promise<String> {
        await prisma.$connect();
        const exists = await prisma.user.findFirst({
            where: {
              email: user.email,
            },
          })
        if(exists)
          return "Already Exists";
        user.pass = await bcrypt.hash(user.pass, 10);
        await prisma.user.create({data:user})
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
export {UserService}