import { BASE_URL } from "./config.js";
import { JSDOM } from "jsdom";
import { Course } from "@prisma/client";
import prisma from "./db.js";

type CourseDict = { [course: string]: number };

// Returns a dictionary of course names to course IDs.
export async function fetch_courses(): Promise<CourseDict> {
  let response = await fetch(BASE_URL + "ical.php");
  let text = await response.text();
  let dom = new JSDOM(text);
  let doc = dom.window.document;
  let options = doc.querySelectorAll("optgroup > option");
  if (!options) {
    return {};
  }
  let courses: CourseDict = {};
  for (let option of options) {
    let course_name = option.getAttribute("label");
    let course_id_str = option.getAttribute("value");
    if (!course_name || !course_id_str) {
      continue;
    }
    let course_id = parseInt(course_id_str);
    if (isNaN(course_id)) {
      continue;
    }
    courses[course_name] = course_id;
  }
  return courses;
}

export async function upsert_courses_in_db() {
  let courses = await fetch_courses();
  for (let course_name in courses) {
    prisma.course.upsert({
      where: {
        uid: courses[course_name],
      },
      create: {
        uid: courses[course_name],
        name: course_name,
      },
      update: {
        name: course_name,
      },
    });
  }
}
