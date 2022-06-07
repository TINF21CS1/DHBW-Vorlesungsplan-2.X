import {Tags, Route, Get, Body} from "tsoa";
import CalenderService from "../service/calender.service";
import { Lecture } from "@prisma/client";
import { setFlagsFromString } from "v8";

@Tags("Calender Handler")
@Route("calender")
export default class CalenderController{
    public async getCalender(id: string, start: Date, end: Date): Promise<Lecture[]|String> {
        const service = new CalenderService();
        return service.getCalender(id, start, end);
    }
}

export {CalenderController}