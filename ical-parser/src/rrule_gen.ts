import { Lecture } from "@prisma/client";
import {
  differenceInDays,
  getDay,
  getHours,
  getMinutes,
  getSeconds,
  getUnixTime,
} from "date-fns";
import client from "./db.js";
import RRule from "rrule";

export async function unify_lectures(course_uid: number) {
  const courses = await client.course.findMany({
    where: {
      uid: course_uid,
    },
    select: {
      id: true,
      uid: true,
      modules: {
        select: {
          id: true,
          name: true,
          lectures: true,
        },
      },
    },
  });
  for (let course of courses) {
    for (let module of course.modules) {
      let lectures_per_day: { [day: number]: Lecture[] } = {};
      for (let lecture of module.lectures) {
        let startDayOfWeek = getDay(lecture.start);
        let endDayOfWeek = getDay(lecture.end);
        if (startDayOfWeek != endDayOfWeek) {
          continue;
        }
        lectures_per_day[startDayOfWeek] =
          lectures_per_day[startDayOfWeek] || [];
        lectures_per_day[startDayOfWeek].push(lecture as Lecture);
      }
      for (let day in lectures_per_day) {
        lectures_per_day[day].sort(
          (a, b) => getUnixTime(a.start) - getUnixTime(b.start)
        );
        if (lectures_per_day[day].length == 1) {
          continue;
        }
        let current = lectures_per_day[day][0];
        let failed = false;
        for (let i = 1; i < lectures_per_day[day].length; i++) {
          const next = lectures_per_day[day][i];
          // check if next and current start and end on the same time
          if (
            getHours(current.start) != getHours(next.start) ||
            getHours(current.end) != getHours(next.end) ||
            getMinutes(current.start) != getMinutes(next.start) ||
            getMinutes(current.end) != getMinutes(next.end) ||
            getSeconds(current.start) != getSeconds(next.start) ||
            getSeconds(current.end) != getSeconds(next.end)
          ) {
            current = next;
            continue;
          }
          let interval = differenceInDays(next.start, current.start);
          if (interval !== 7) {
            failed = true;
            current = next;
            continue;
          }
          current = next;
        }
        if (failed) {
          continue;
        }
        let rrule_day: any = [
          RRule.SU,
          RRule.MO,
          RRule.TU,
          RRule.WE,
          RRule.TH,
          RRule.FR,
          RRule.SA,
        ][getDay(current.start)];
        let rrule;
        try {
          rrule = new RRule({
            freq: RRule.WEEKLY,
            interval: 1,
            byweekday: rrule_day,
            dtstart: lectures_per_day[day][0].start,
            until: lectures_per_day[day][lectures_per_day[day].length - 1].end,
          });
        } catch (err: any) {
          if (err.name == "TypeError") {
            let RealRRule = (RRule as any).RRule;
            // this package is broken, so we need to construct it this way with ES2022 modules
            // https://stackoverflow.com/a/64000785/12125728
            rrule = new RealRRule({
              freq: RealRRule.WEEKLY,
              interval: 1,
              byweekday: rrule_day,
              dtstart: lectures_per_day[day][0].start,
              until:
                lectures_per_day[day][lectures_per_day[day].length - 1].end,
            });
          }
        }
        await client.lecture.updateMany({
          where: {
            id: {
              in: lectures_per_day[day].map((l) => l.id),
            },
          },
          data: {
            rrule: rrule.toString(),
            rrule_text: rrule.toText(),
          },
        });
      }
    }
  }
}
