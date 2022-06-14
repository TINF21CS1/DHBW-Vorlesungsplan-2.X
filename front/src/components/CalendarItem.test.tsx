import { render, screen } from "@testing-library/react";
import CalendarItem from "./CalendarItem";

describe("CalendarItem", () => {
  it("renders event metadata", () => {
    const testEvent = {
      id: "1",
      ical_uid: "1",
      summary: "Test Event",
      location: "Test Location",
      rrule: "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR",
      rrule_text: "Every Monday, Tuesday, Wednesday, Thursday, Friday",
      start: new Date("2022-01-01T00:00:00.000Z"),
      end: new Date("2022-01-05T00:00:00.000Z"),
    };
    render(<CalendarItem event={testEvent} />);
    expect(screen.getByText("Test Event")).toBeInTheDocument();
    expect(screen.getByText("Test Location")).toBeInTheDocument();
    expect(screen.getByTestId("LocationOnIcon")).toBeInTheDocument();
  });

  it("does not render LocationIcon if location is empty", () => {
    const testEvent = {
      id: "1",
      ical_uid: "1",
      summary: "Test Event",
      location: "",
      rrule: "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR",
      rrule_text: "Every Monday, Tuesday, Wednesday, Thursday, Friday",
      start: new Date("2022-01-01T00:00:00.000Z"),
      end: new Date("2022-01-05T00:00:00.000Z"),
    };
    render(<CalendarItem event={testEvent} />);
    expect(screen.queryByTestId("LocationOnIcon")).not.toBeInTheDocument();
  });
});