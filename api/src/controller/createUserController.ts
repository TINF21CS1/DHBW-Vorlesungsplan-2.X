import {Get, Route} from "tsoa";
import { Response } from "express";
import {omit} from "lodash";
import { UserService } from "../service/createUserService";

@Route("/user")
export class UserController {
    @Get("/")
    public async createUser(res: Response): Promise<Response> {
        //TODO: auth?
        const userService = new UserService();
        const user = await userService.createUser();
        //convert to json.
        return res.send(omit);
    }
}