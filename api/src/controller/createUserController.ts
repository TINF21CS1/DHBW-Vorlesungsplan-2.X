import {Get, Route} from "tsoa";
import { Response, Request } from "express";
import {omit} from "lodash";
import { UserService } from "../service/createUserService";

@Route("/user")
export class UserController {
    @Get("/")
    public async createUser(req: Request, res: Response): Promise<Response> {
        //TODO: auth?
        try {
            const userService = new UserService();
            const user = await userService.createUser(req.body);
            return res.status(200).json(user);
            //return res.send(omit(user));
        }catch(e) {
            return res.status(500);
        }

    }
}