import { fetch_courses, upsert_courses_in_db } from "./scraper.js";
import { parse_ical } from "./parser.js";
import { unify_lectures } from "./rrule_gen.js";

let courses = await fetch_courses();
await upsert_courses_in_db(courses);
for (let course_name in courses) {
  console.info("Fetching course: " + course_name);
  await parse_ical(courses[course_name]);
  await unify_lectures(courses[course_name]);
}
