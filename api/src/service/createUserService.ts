import {IUser} from "../models/IUser"
import {prisma} from "../app"

class UserService {
    public async createUser(body: any): Promise<IUser> {
        const user = await prisma.user.create({
            data:{
                name:"",
                email:"",
                salt:"",
            }
        })
        return user
    }
}
export {UserService}