import {Tags, Route, Post, Body} from "tsoa";
import SettingsService from "../service/settings.service";
import { Courses, User } from '@prisma/client';
const jwt = require('jsonwebtoken');

@Tags("Settings Handler")
@Route("settings2")
export default class SettingsController{
    public async getSettings(token: any): Promise<Object|String> {
        if (!token)
            return "Invalide Token";
        try {
            const data = jwt.verify(token,  process.env.TOKEN_KEY);
            const service = new SettingsService();
            return service.getSettings(data);
        } catch {
            return "Invalide Token";
        }
    }

    public async setSettings(token: any, @Body() body: Courses): Promise<String> {
        if (!token)
            return "Invalide Token";
        try {
            const data = jwt.verify(token,  process.env.TOKEN_KEY);
            const service = new SettingsService();
            return service.setSettings(body, data);
        } catch {
            return "Invalide Token";
        }
    }
}

export {SettingsController}