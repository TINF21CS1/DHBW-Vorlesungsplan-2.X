import { fetch_courses } from "./scraper.js";
import { parse_ical } from "./parser.js";
let courses = await fetch_courses();
console.log(courses);
console.log(await parse_ical(courses["TINF21 CS1"]));
