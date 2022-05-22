import {Tags, Get, Route} from "tsoa";
//import {omit} from "lodash";
//import { UserService } from "../service/createUserService";

interface StatusResponse {
    message: string;
}

@Tags("Health-Check")
@Route("status")
export default class StatusController{
    @Get("/")
    public async getStatus(): Promise<StatusResponse> {
        return {
            message: "Running...",
        };

    }
}

export {StatusController}