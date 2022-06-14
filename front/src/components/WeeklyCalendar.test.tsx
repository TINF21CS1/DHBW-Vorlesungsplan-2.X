import { render, screen } from "@testing-library/react";
import WeeklyCalendar from "./WeeklyCalendar";
import {
  HashRouter as Router,
} from "react-router-dom";
import { add } from "date-fns";

describe("WeeklyCalendar", () => {
  it("renders events", () => {
    global.fetch = jest.fn().mockImplementation((url) => {
      return Promise.resolve({
        json: () => {
          if (url.includes("api/settings")) {
            return Promise.resolve({
              name: "Test User",
              email: "test@example.com",
              notification: false,
              course: { "id": "1", "name": "Test Course", "uid": "1234" }
            })
          } else if (url.includes("api/calender/course/list")) {
            return Promise.resolve([
              { id: "1", name: "Test Course 1" },
            ]);
          } else if (url.includes("api/calender/1/")) {
            return Promise.resolve([
              {
                "id": "1", ical_uid: "123",
                "summary": "Test Event 1", "moduleId": "1",
                location: "1", rrule: null, rrule_text: null,
                "start": new Date().toISOString(), "end": add(new Date(), { hours: 2 }).toISOString()
              },
            ]);
          }
        }
      });
    });
    render(<Router><WeeklyCalendar /></Router>);
    setTimeout(() => {
      expect(screen.getAllByText("Test Event 1").length).toBeGreaterThan(0);
    }, 0);
  });
});