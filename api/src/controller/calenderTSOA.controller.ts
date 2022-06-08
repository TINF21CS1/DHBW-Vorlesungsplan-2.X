import { Tags, Route, Get } from "tsoa";

@Tags("Calender2 Controller")
@Route("calender")
export default class CalenderController2 {
  @Get("")
  public async getCalender(): Promise<void> {}
}

export { CalenderController2 };
