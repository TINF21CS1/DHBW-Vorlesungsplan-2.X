import {prisma} from "../app"
import { User } from '@prisma/client';

export default class UserService {
    public async fetchUsers(): Promise<Array<User>> {
        const allUsers = await prisma.user.findMany()
        return allUsers;
    }

    public async createUser(user: User): Promise<User> {
        await prisma.$connect()
        const users= await prisma.user.create({data:user})
        return users;
    }
}
export {UserService}