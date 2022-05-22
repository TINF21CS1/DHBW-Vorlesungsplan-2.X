/*import {prisma} from "../app"
import { User } from '@prisma/client';

class UserService {
    public async createUser(body: any): Promise<User> {
        const user = await prisma.user.create({
            data:{
                name:"",
                email:"",
                salt:"",
                password:""
            }
        })
        return user;
        //return user as IUser;
    }
}
export {UserService}*/