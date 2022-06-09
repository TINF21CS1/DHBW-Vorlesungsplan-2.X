import { Lecture } from "@prisma/client";
import { prisma } from "../app";
import { ICalCalendar } from "ical-generator";
import { getVtimezoneComponent } from "@touch4it/ical-timezones";

export default class IcalService {
  public async getIcal(
    idCourse: string,
    startD?: Date,
    endD?: Date
  ): Promise<ICalCalendar | String> {
    try {
      const cal = new ICalCalendar();
      cal.timezone({
        name: "FOO",
        generator: getVtimezoneComponent,
      });
      const res = await prisma.module.findMany({
        where: {
          courseId: idCourse,
        },
        select: {
          id: true,
          name: true,
          lectures: true,
        },
      });
      res
        .map((module) => {
          const lectures = module.lectures.filter((lecture) => {
            const start = new Date(lecture.start);
            const end = new Date(lecture.end);
            if (startD !== undefined && endD !== undefined) {
              return startD < end && endD > start;
            } else if (startD !== undefined) {
              return startD < end;
            } else if (endD !== undefined) {
              return endD > start;
            } else {
              return true;
            }
          });
          return lectures as Lecture[];
        })
        .flat()
        .forEach(function (lecture) {
          if (lecture !== undefined)
            cal.createEvent({
              id: lecture.id,
              summary: lecture.summary,
              location: lecture.location,
              start: lecture.start,
              end: lecture.end,
            });
        });
      return cal;
    } catch (err) {
      return "Wrong-Object-ID";
    }
    return new ICalCalendar();
  }
}
export { IcalService };
