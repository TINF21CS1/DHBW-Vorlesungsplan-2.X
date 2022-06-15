import { parse_ical, canonicalize_module_names } from "./parser.js";
import client from "./db.js";
import node_ical from "node-ical";
import { unify_lectures } from "./rrule_gen.js";

let mock_courses = [
  {
    id: "1",
    uid: 12,
    name: "Test Course",
    modules: [
      {
        id: "1",
        name: "Module 1",
        lectures: [
          {
            id: "1",
            ical_uid: "123",
            summary: "Test Lecture",
            moduleId: "1",
            location: null,
            rrule: null,
            rrule_text: null,
            start: new Date("2022-06-14T13:30:00.000Z"),
            end: new Date("2022-06-14T15:30:00.000Z"),
          },
          {
            id: "2",
            ical_uid: "1234",
            summary: "Test Lecture",
            moduleId: "1",
            location: null,
            rrule: null,
            rrule_text: null,
            start: new Date("2022-06-21T13:30:00.000Z"),
            end: new Date("2022-06-21T15:30:00.000Z"),
          },
          {
            id: "3",
            ical_uid: "1234",
            summary: "Test Lecture",
            moduleId: "1",
            location: null,
            rrule: null,
            rrule_text: null,
            start: new Date("2022-06-28T13:30:00.000Z"),
            end: new Date("2022-06-28T15:30:00.000Z"),
          },
        ],
      },
    ],
  },
];

test("unify_lectures", async () => {
  client.course.findMany = jest.fn().mockResolvedValue(mock_courses);

  client.lecture.updateMany = jest.fn().mockResolvedValue({ count: 3 });

  await unify_lectures(1234567);
  expect(client.course.findMany).toHaveBeenCalledTimes(1);
  expect(client.lecture.updateMany).toHaveBeenCalledTimes(1);
  expect(client.lecture.updateMany).toHaveBeenCalledWith({
    where: {
      id: {
        in: ["1", "2", "3"],
      },
    },
    data: {
      rrule:
        "DTSTART:20220614T133000Z\nRRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=TU;UNTIL=20220628T153000Z",
      rrule_text: "every week on Tuesday until June 28, 2022",
    },
  });
});
