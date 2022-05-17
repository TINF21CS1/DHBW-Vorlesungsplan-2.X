import {Tags, Get, Route} from "tsoa";
//import {omit} from "lodash";
//import { UserService } from "../service/createUserService";

interface PingResponse {
    message: string;
}

@Tags("User Handler")
@Route("status")
export default class UserController{
    @Get("/")
    public async createUser(): Promise<PingResponse> {
        return {
            message: "Ok :)",
        };

    }
}

export {UserController}