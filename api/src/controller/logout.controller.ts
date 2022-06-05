import {Tags, Get, Route} from "tsoa";

@Tags("Logout Handler")
@Route("logout")
export default class LogoutController{
    @Get("/")
    public async logOut(): Promise<String> {
        return "Ok";
    }
}

export {LogoutController}