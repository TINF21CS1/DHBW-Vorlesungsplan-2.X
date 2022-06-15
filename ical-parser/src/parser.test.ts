import { parse_ical, canonicalize_module_names } from "./parser.js";
import client from "./db.js";
import node_ical from "node-ical";
import { sub } from "date-fns";

let mock_data = {
  "20220614T113000Z-321361001@group-e.dhbw-mannheim.de": {
    type: "VEVENT",
    params: [],
    uid: "20220614T113000Z-321361001@group-e.dhbw-mannheim.de",
    location: "Raum 136.1B",
    summary: "Kryptologie",
    start: new Date("2022-06-14T11:30:00.000Z"),
    datetype: "date-time",
    end: new Date("2022-06-14T13:30:00.000Z"),
    dtstamp: new Date("2022-04-12T11:30:00.000Z"),
    method: "PUBLISH",
  },
  "20220314T193541Z-321365001@group-e.dhbw-mannheim.de": {
    type: "VEVENT",
    params: [],
    uid: "20220314T193541Z-321365001@group-e.dhbw-mannheim.de",
    location: "Raum 136.1B",
    summary: "Kryptologie",
    start: new Date("2022-05-31T11:30:00.000Z"),
    datetype: "date-time",
    end: new Date("2022-05-31T15:30:00.000Z"),
    dtstamp: new Date("2022-05-31T11:30:00.000Z"),
    method: "PUBLISH",
  },
  "20220325T074858Z-323449001@group-e.dhbw-mannheim.de": {
    type: "VEVENT",
    params: [],
    uid: "20220325T074858Z-323449001@group-e.dhbw-mannheim.de",
    location: "Raum 036B",
    summary: " Algorithmen und Komplexität",
    start: new Date("2022-06-23T11:30:00.000Z"),
    datetype: "date-time",
    end: new Date("2022-06-23T13:00:00.000Z"),
    dtstamp: new Date("2022-06-23T11:30:00.000Z"),
    method: "PUBLISH",
  },
  "20220407T061048Z-324680001@group-e.dhbw-mannheim.de": {
    type: "VEVENT",
    params: [],
    uid: "20220407T061048Z-324680001@group-e.dhbw-mannheim.de",
    location: "K-Raum 001B",
    summary: "Klausur Mathematik I",
    start: new Date("2022-06-20T07:00:00.000Z"),
    datetype: "date-time",
    end: new Date("2022-06-20T08:30:00.000Z"),
    dtstamp: new Date("2022-06-20T07:00:00.000Z"),
    method: "PUBLISH",
  },
  "20220407T075842Z-324697001@group-e.dhbw-mannheim.de": {
    type: "VEVENT",
    params: [],
    uid: "20220407T075842Z-324697001@group-e.dhbw-mannheim.de",
    location: "K-Raum 001B",
    summary: "Klausur Einführung in die Kryptologie",
    start: new Date("2022-06-22T06:00:00.000Z"),
    datetype: "date-time",
    end: new Date("2022-06-22T07:30:00.000Z"),
    dtstamp: new Date("2022-06-22T06:00:00.000Z"),
    method: "PUBLISH",
  },
  "20220426T065632Z-326141001@group-e.dhbw-mannheim.de": {
    type: "VEVENT",
    params: [],
    uid: "20220426T065632Z-326141001@group-e.dhbw-mannheim.de",
    location: "",
    summary: "Analysis - Online",
    start: new Date("2022-04-28T08:45:00.000Z"),
    datetype: "date-time",
    end: new Date("2022-04-28T10:30:00.000Z"),
    dtstamp: new Date("2022-04-28T08:45:00.000Z"),
    method: "PUBLISH",
  },
  "20220408T151536Z-324964001@group-e.dhbw-mannheim.de": {
    type: "VEVENT",
    params: [],
    uid: "20220408T151536Z-324964001@group-e.dhbw-mannheim.de",
    location: "Raum 269C",
    summary: "Kryptologie",
    start: new Date("2022-04-28T11:30:00.000Z"),
    datetype: "date-time",
    end: new Date("2022-04-28T13:30:00.000Z"),
    dtstamp: new Date("2022-04-28T11:30:00.000Z"),
    method: "PUBLISH",
  },
  "20220429T075539Z-326314001@group-e.dhbw-mannheim.de": {
    type: "VEVENT",
    params: [],
    uid: "20220429T075539Z-326314001@group-e.dhbw-mannheim.de",
    location: "Raum 269C",
    summary: "Fällt aus !!! Web Engineering",
    start: new Date("2022-04-28T14:00:00.000Z"),
    datetype: "date-time",
    end: new Date("2022-04-28T17:00:00.000Z"),
    dtstamp: new Date("2022-04-28T14:00:00.000Z"),
    method: "PUBLISH",
  },
  "20220426T065503Z-326139001@group-e.dhbw-mannheim.de": {
    type: "VEVENT",
    params: [],
    uid: "20220426T065503Z-326139001@group-e.dhbw-mannheim.de",
    location: "",
    summary: "Kryptologie - Online",
    start: new Date("2022-04-27T06:30:00.000Z"),
    datetype: "date-time",
    end: new Date("2022-04-27T08:30:00.000Z"),
    dtstamp: new Date("2022-04-27T06:30:00.000Z"),
    method: "PUBLISH",
  },
  "20220426T065547Z-326140001@group-e.dhbw-mannheim.de": {
    type: "VEVENT",
    params: [],
    uid: "20220426T065547Z-326140001@group-e.dhbw-mannheim.de",
    location: "",
    summary: "Analysis",
    start: new Date("2022-04-27T08:45:00.000Z"),
    datetype: "date-time",
    end: new Date("2022-04-27T10:30:00.000Z"),
    dtstamp: new Date("2022-04-27T08:45:00.000Z"),
    method: "PUBLISH",
  },
  "20220426T074858Z-326155001@group-e.dhbw-mannheim.de": {
    type: "VEVENT",
    params: [],
    uid: "20220426T074858Z-326155001@group-e.dhbw-mannheim.de",
    location: "",
    summary: "Mathe Tutorium - Online",
    start: new Date("2022-04-27T11:15:00.000Z"),
    datetype: "date-time",
    end: new Date("2022-04-27T12:45:00.000Z"),
    dtstamp: new Date("2022-04-27T11:15:00.000Z"),
    method: "PUBLISH",
  },
  "20220524T110613Z-328557001@group-e.dhbw-mannheim.de": {
    type: "VEVENT",
    params: [],
    uid: "20220524T110613Z-328557001@group-e.dhbw-mannheim.de",
    location: "Raum SV-Auditorium (Audimax)",
    summary: "Klausur Grundlagen und Logik",
    start: new Date("2022-06-21T12:30:00.000Z"),
    datetype: "date-time",
    end: new Date("2022-06-21T14:00:00.000Z"),
    dtstamp: new Date("2022-06-21T12:30:00.000Z"),
    method: "PUBLISH",
  },
  vcalendar: {
    type: "VCALENDAR",
    version: "2.0",
    method: "PUBLISH",
    "WR-TIMEZONE": "Europe/Berlin",
    calscale: "GREGORIAN",
  },
};

test("canonicalize_module_names", async () => {
  const canonicalized_module_names = canonicalize_module_names(
    new Set(["Module 1", "Module 2", "Module 3"])
  );
  expect(canonicalized_module_names).toEqual({
    "Module 1": "Module 1",
    "Module 2": "Module 2",
    "Module 3": "Module 3",
  });
});
test("parse_ical", async () => {
  node_ical.async.fromURL = jest.fn().mockResolvedValue(mock_data);

  client.course.findFirst = jest.fn().mockResolvedValue({
    id: "1",
    uid: 12,
    name: "Test Course",
  });

  client.lecture.deleteMany = jest.fn().mockResolvedValue({ count: 1 });

  client.module.findFirst = jest.fn().mockResolvedValue({
    id: "1",
    name: "Module 1",
    courseId: "1",
  });

  client.lecture.create = jest.fn().mockResolvedValue({
    id: "1",
    ical_uid: "123",
    summary: "Test Lecture",
    moduleId: "1",
    location: null,
    rrule: null,
    rrule_text: null,
    start: new Date(),
    end: new Date(),
  });

  await parse_ical(1234567);
  expect(node_ical.async.fromURL).toHaveBeenCalledWith(
    "https://vorlesungsplan.dhbw-mannheim.de/ical.php?uid=1234567"
  );
  expect(client.lecture.deleteMany).toHaveBeenCalledTimes(1);
  expect(client.lecture.create).toHaveBeenCalledTimes(12);
  expect(client.lecture.create).toHaveBeenLastCalledWith({
    data: {
      summary: "Klausur Grundlagen und Logik",
      location: "Raum SV-Auditorium (Audimax)",
      ical_uid: "20220524T110613Z-328557001@group-e.dhbw-mannheim.de",
      end: sub(new Date("2022-06-21T14:00:00.000Z"), {minutes: new Date().getTimezoneOffset()}),
      start: sub(new Date("2022-06-21T12:30:00.000Z"), {minutes: new Date().getTimezoneOffset()}),
      module: {
        connect: {
          id: "1",
        },
      },
    },
  });
});
