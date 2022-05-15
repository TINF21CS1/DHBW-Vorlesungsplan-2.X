import {IUser} from "../models/IUser"
import {prisma} from "../app"

class UserService {
    public async createUser(): Promise<IUser> {
        const user = await prisma.user.create({
            data:{
                name:"",
                email:"",
                salt:"",
                role:"",
                hasedpassword:"",
                pepper:""
            }
        })
        return user
    }
}
export {UserService}