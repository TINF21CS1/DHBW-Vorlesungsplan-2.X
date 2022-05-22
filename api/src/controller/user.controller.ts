import {Tags, Get, Route} from "tsoa";
//import {omit} from "lodash";
import {prisma} from "../app"

interface StatusResponse {
    message: string;
}

@Tags("User Handler")
@Route("user")
export default class UserController{
    @Get("/")
    public async createUser(): Promise<StatusResponse> {

       const user= await prisma.user.create({
            data:{
                name:"test",
                email:"test",
                salt:"test",
                pass:"test"
            }
        })
        return {
            message: "Running...",
        };
    }
}

export {UserController}