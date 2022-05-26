import {Tags, Route, Post, Body} from "tsoa";
import UserService from "../service/user.service";
import { User } from '@prisma/client';

@Tags("User Handler")
@Route("user")
export default class UserController{

    @Post("/")
    public async createUser(@Body() body: User): Promise<String> {
        const service = new UserService();
        return service.createUser(body);
    }
}

export {UserController}