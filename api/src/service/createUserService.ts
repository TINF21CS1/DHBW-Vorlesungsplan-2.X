import {IUser} from "../models/IUser"
import {prisma} from "../app"

class UserService {
    public async createUser(body: Request): Promise<IUser> {
        const user = await prisma.user.create({
            data:{
                name:"",
                email:"",
                salt:"",
                password:""
            }
        })
        return user as IUser;
    }
}
export {UserService}