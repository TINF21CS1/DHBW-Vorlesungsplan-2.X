import { Tags, Route, Get, Body } from "tsoa";
import CalenderService from "../service/ical.service";
import { Lecture } from "@prisma/client";
import { setFlagsFromString } from "v8";
import { ICalCalendar } from "ical-generator";

@Tags("Ical Handler")
@Route("ical")
export default class IcalController {
  public async getIcal(
    id: string,
    start?: Date,
    end?: Date
  ): Promise<ICalCalendar | String> {
    const service = new CalenderService();
    return service.getIcal(id, start, end);
  }
}

export { IcalController };
