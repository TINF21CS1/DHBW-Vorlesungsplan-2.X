import ical from "node-ical";
import { Course } from "@prisma/client";


export async function parse_ical(course_uid: number) {
               // FIXME: This internally uses axios, but we have native support for fetch now.
    let data = await ical.async.fromURL("https://vorlesungsplan.dhbw-mannheim.de/ical.php?uid=" + course_uid);
    // TODO: 
    // 1. filter entries for VEVENT type
    // 2. Find all unique classes (e.g. "Web Engineering")
    // 3. Match classes to events
    // 4. Match events to RRULEs
    // 6. Remove events thshould not be in the timetable (e.g. "Entfällt")
    return data;
}