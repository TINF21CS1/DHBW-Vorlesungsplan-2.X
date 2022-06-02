import ical, { VEvent, VTimeZone } from "node-ical";
import { Course, prisma } from "@prisma/client";
import date_fns_tz from "date-fns-tz";
const { zonedTimeToUtc } = date_fns_tz;
import client from "./db.js";

export function canonicalize_class_names(class_names: Set<string>): { [class_name: string]: string } {
  const mapping: { [class_name: string]: string } = {};
  for (let class_name of class_names) {
    // FIXME: Find the "actual" class name (i. e. strip '(online)' or similar junk)
    mapping[class_name] = class_name;
  }
  return mapping;
}

export async function parse_ical(course_uid: number) {
  // FIXME: This internally uses axios, but we have native support for fetch now.
  let data = await ical.async.fromURL(
    "https://vorlesungsplan.dhbw-mannheim.de/ical.php?uid=" + course_uid
  );
  // find VTimeZone event
  let timezone: string = "";
  for (let k in data) {
    if (data[k].type === "VTIMEZONE") {
      timezone = (data[k] as VTimeZone).tzid;
    }
  }

  // FIXME: This loop explicitly drops any VTimezone information. Need to adjust the times in the data to be UTC.
  let class_names: Set<string> = new Set();
  for (let k in data) {
    if (data[k].type == 'VEVENT') {
      const ev = data[k] as VEvent;
      if (ev.summary == null) {
        console.error("No summary for event: " + JSON.stringify(ev));
        continue;
      }
      class_names.add(ev.summary);
    }
  }
  let mapping = canonicalize_class_names(class_names);

  await client.lecture.deleteMany({
    where: {
      class: {
        course: {
          uid: course_uid,
        },
      }
    }
  });

  // transcation is disabled because 
  // it sometimes expires before parsing is done
  // await client.$transaction(async (client) => {
  for (let k in data) {
    if (data[k].type == "VEVENT") {
      const ev = data[k] as VEvent;
      const start = zonedTimeToUtc(ev.start, timezone);
      const end = zonedTimeToUtc(ev.end, timezone);
      const class_name = mapping[ev.summary];
      let class_ = await client.class.findFirst({
        where: {
          name: class_name,
          course: {
            uid: course_uid
          }
        }
      });
      if (class_ == null) {
        class_ = await client.class.create({
          data: {
            name: class_name,
            course: {
              connect: {
                uid: course_uid
              }
            }
          }
        });
      }
      await client.lecture.upsert({
        where: {
          ical_uid: ev.uid,
        },
        update: {
          location: ev.location,
          start: start,
          end: end,
          summary: ev.summary,
          class: {
            connect: {
              id: class_.id
            }
          }
        },
        create: {
          ical_uid: ev.uid,
          location: ev.location,
          start: start,
          end: end,
          summary: ev.summary,
          class: {
            connect: {
              id: class_.id
            }
          }
        }
      });
    }
  }
  // });
}