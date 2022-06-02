import ical, { VEvent, VTimeZone } from "node-ical";
import { Course, prisma } from "@prisma/client";
import date_fns_tz from "date-fns-tz";
const { zonedTimeToUtc } = date_fns_tz;
import client from "./db.js";

export function canonicalize_module_names(module_names: Set<string>): { [module_name: string]: string } {
  const mapping: { [module_name: string]: string } = {};
  for (let module_name of module_names) {
    // FIXME: Find the "actual" module name (i. e. strip '(online)' or similar junk)
    mapping[module_name] = module_name;
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
  let module_names: Set<string> = new Set();
  for (let k in data) {
    if (data[k].type == 'VEVENT') {
      const ev = data[k] as VEvent;
      if (ev.summary == null) {
        console.error("No summary for event: " + JSON.stringify(ev));
        continue;
      }
      module_names.add(ev.summary);
    }
  }
  let mapping = canonicalize_module_names(module_names);

  await client.lecture.deleteMany({
    where: {
      module: {
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
      const module_name = mapping[ev.summary];
      let module = await client.module.findFirst({
        where: {
          name: module_name,
          course: {
            uid: course_uid
          }
        }
      });
      if (module == null) {
        module = await client.module.create({
          data: {
            name: module_name,
            course: {
              connect: {
                uid: course_uid
              }
            }
          }
        }); 
      }
      if (module == null) {
        console.error("Could not find or create module: " + module_name);
        continue;
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
          module: {
            connect: {
              id: module.id
            }
          }
        },
        create: {
          ical_uid: ev.uid,
          location: ev.location,
          start: start,
          end: end,
          summary: ev.summary,
          module: {
            connect: {
              id: module.id
            }
          }
        }
      });
    }
  }
  // });
}