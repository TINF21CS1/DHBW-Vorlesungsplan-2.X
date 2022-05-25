import {Tags, Get, Route, Post, Body} from "tsoa";
//import {omit} from "lodash";
import UserService from "../service/user.service";
import { User } from '@prisma/client';

@Tags("User Handler")
@Route("user")
export default class UserController{
    @Get("/")
    public async fetchUsers(): Promise<Array<User>> {
        const service = new UserService();
        return service.fetchUsers();
    }

    @Post("/")
    public async createUser(@Body() body: User): Promise<User|any> {
        const service = new UserService();
        return service.createUser(body);
    }

    public async getUserByEmail(email: string): Promise<User> {
        const service = new UserService();
        return service.findUserbyEmail(email);
    }
}

export {UserController}