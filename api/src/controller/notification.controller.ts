import {Tags, Route, Post} from "tsoa";
import NotificationService from "../service/notification.service";
const jwt = require('jsonwebtoken');

@Tags("Notification Handler")
@Route("notification")
export default class NotificationController{
    
    public async setNotification(notify: boolean, token: any): Promise<String> {
        if (!token)
            return "Invalide Token";
        try {
            const data = jwt.verify(token,  process.env.TOKEN_KEY);
            const service = new NotificationService();
            return service.setNotification(notify, data);
        } catch {
            return "Invalide Token";
        }
    }

    public async getNotification(token: any): Promise<String|Object> {
        if (!token)
            return "Invalide Token";
        try {
            const data = jwt.verify(token,  process.env.TOKEN_KEY);
            const service = new NotificationService();
            return service.getNotification(data);
        } catch {
            return "Invalide Token";
        }
    }
}

export {NotificationController}