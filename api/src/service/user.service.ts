import { prisma } from "../app";
import { User } from "@prisma/client";
const bcrypt = require("bcrypt"); //idk warum mit import nicht will...
const jwt = require("jsonwebtoken");
import { ObjectId } from "bson";

export default class UserService {
  public async createUser(user: User): Promise<String> {
    const exists = await prisma.user.findFirst({
      where: {
        email: user.email,
      },
    });
    console.log(exists);
    console.log(user);
    if (exists)
      //||regexp.test(user.email))
      return "Something went wrong!";
    const newID = new ObjectId();
    user.id = newID.toString();
    user.pass = bcrypt.hashSync(user.pass, bcrypt.genSaltSync(10));
    await prisma.user.create({ data: user }); //should not be able to insert selCourses imo. -> no selected.
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
export { UserService };
