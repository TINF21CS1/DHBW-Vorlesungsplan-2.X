import { useState } from "react";
import { Container, Typography, Alert } from "@mui/material";
import WeeklyCalendar from "./components/WeeklyCalendar";
import WeeklyCalendarSkeleton from "./components/WeeklyCalendarSkeleton";
import iCal, { Component, Event } from "ical.js";

const Calendar = (props: { url: string; start: Date }) => {
  const [events, setEvents] = useState<Event[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  if (loading) {
    fetch(props.url)
      .then((r) => r.text())
      .then((text) => {
        const jCalData = iCal.parse(text);
        const vcalendar = new Component(jCalData);
        const vevents = vcalendar
          .getAllSubcomponents("vevent")
          .map((vevent) => {
            return new Event(vevent);
          });
        setLoading(false);
        setEvents(vevents);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }

  return (
    <Container maxWidth="xl">
      {!loading && events && events.length > 0 && (
        <WeeklyCalendar events={events} start={props.start} />
      )}
      {!loading && events && events.length === 0 && (
        <Typography variant="h5">No events in this calendar.</Typography>
      )}
      {!loading && !events && (
        <Alert severity="error">Couldn't load the calendar.</Alert>
      )}
      {loading && !events && <WeeklyCalendarSkeleton />}
    </Container>
  );
};

export default Calendar;
