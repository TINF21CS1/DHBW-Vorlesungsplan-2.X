import {Tags, Route, Get, Post} from "tsoa";

@Tags("Setting Handler")
@Route("settings")
export default class SettingController{
    @Get("")
    public async getSettings(): Promise<void> {}
    @Post("")
    public async setSettings(): Promise<void> {}
}

export {SettingController}