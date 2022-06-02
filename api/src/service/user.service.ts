import {prisma} from "../app"
import { User } from '@prisma/client';
const bcrypt = require('bcrypt'); //idk warum mit import nicht will...
const jwt = require('jsonwebtoken');
import { ObjectId } from 'bson'

export default class UserService {

    public async createUser(user: User): Promise<String> {
        await prisma.$connect();
        const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        const exists = await prisma.user.findFirst({
            where: {
              email: user.email,
            },
          })
        if(exists||regexp.test(user.email))
          return "Something went wrong!";
        user.pass = await bcrypt.hash(user.pass, 10);
        const newID = new ObjectId();
        user.id = newID.toString();
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