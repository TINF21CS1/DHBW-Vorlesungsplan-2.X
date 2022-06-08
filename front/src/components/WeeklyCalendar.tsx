import { useState } from "react";
import {
  Grid,
  Stack,
  Box,
  Typography,
  IconButton,
  TextField,
  Autocomplete,
} from "@mui/material";
import { ChevronRight, ChevronLeft } from "@mui/icons-material";
import { startOfWeek, isSameDay, add, format, parseISO } from "date-fns";
import CalendarItem from "./CalendarItem";
import Event from "../models/Event";
import JSONEvent from "../models/JSONEvent";

const WeeklyCalendar = () => {
  // create a state for the current week
  const [currentWeek, setCurrentWeek] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [selectedCourse, setSelectedCourse] = useState<string>("");

  const [kurse, setKurse] = useState<Array<{ id: string; name: string }>>([]);
  const [events_daily, setEventsDaily] = useState<Array<Array<Event>> | null>(
    null
  );

  const weekEnd = add(currentWeek, { days: 7 });

  if (selectedCourse === "") {
    fetch("/api/settings").then(async (res) => {
      let ok = false;
      if (res.status === 200) {
        const settings = await res.json();
        if (settings.course) {
          setSelectedCourse(settings.course.id);
          ok = true;
        }
      }

      if (!ok && kurse.length === 0) {
        fetch("/api/calender/course/list")
          .then((res) => res.json())
          .then((data) => {
            setKurse(data);
          });
      }
    });
  }

  // fetch the events for the current week
  if (events_daily === null && selectedCourse) {
    fetch(
      "/api/calender/" +
      selectedCourse +
      "/" +
      currentWeek.toISOString() +
      "/" +
      weekEnd.toISOString() +
      "/"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let events = data;
        const events_per_day = Array.from(Array(6).keys()).map((i) => {
          const date = add(currentWeek, { days: i });
          let events_this_day = new Array<Event>();
          events.forEach((event: JSONEvent) => {
            if (isSameDay(parseISO(event.start), date)) {
              let event_parsed: Event = {
                id: event.id,
                ical_uid: event.ical_uid,
                summary: event.summary,
                location: event.location,
                rrule: event.rrule,
                rrule_text: event.rrule_text,
                start: parseISO(event.start),
                end: parseISO(event.end),
              };
              events_this_day.push(event_parsed);
            }
          });
          events_this_day.sort((a, b) => a.start.getTime() - b.start.getTime());
          return events_this_day;
        });

        setEventsDaily(events_per_day);
      });
  }

  // for every day between the start and end of the week, find all events

  let touchstartX: number = 0;
  let touchendX: number = 0;
  function handleGesture() {
    if (Math.abs(touchendX - touchstartX) > 150) {
      if (touchendX < touchstartX)
        setCurrentWeek(
          startOfWeek(add(currentWeek, { days: 7 }), { weekStartsOn: 1 })
        );
      if (touchendX > touchstartX)
        setCurrentWeek(
          startOfWeek(add(currentWeek, { days: -7 }), { weekStartsOn: 1 })
        );
      setEventsDaily(null);
    }
  }
  type TouchEventHandler = (event: React.TouchEvent<HTMLDivElement>) => void;
  const touchstart: TouchEventHandler = (e) => {
    touchstartX = e.changedTouches[0].clientX;
  };
  const touchend: TouchEventHandler = (e) => {
    touchendX = e.changedTouches[0].clientX;
    handleGesture();
  };

  return (
    <Box onTouchStart={touchstart} onTouchEnd={touchend}>
      <Stack justifyContent="center" direction="row">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <IconButton
            size="large"
            onClick={() => {
              setCurrentWeek(
                startOfWeek(add(currentWeek, { days: -7 }), { weekStartsOn: 1 })
              );
              setEventsDaily(null);
            }}
            color="secondary"
            aria-label="letzte Woche"
          >
            <ChevronLeft />
          </IconButton>
          <Typography align="center">KW {format(currentWeek, "ww")}</Typography>
          <IconButton
            size="large"
            onClick={() => {
              setCurrentWeek(
                startOfWeek(add(currentWeek, { days: 7 }), { weekStartsOn: 1 })
              );
              setEventsDaily(null);
            }}
            color="secondary"
            aria-label="nächste Woche"
          >
            <ChevronRight />
          </IconButton>
        </div>
      </Stack>
      {selectedCourse && (
        <Grid container spacing={1}>
          {events_daily && (events_daily).map((events, i) => (
            <Grid item xs={12} sm={6} md={2} key={i}>
              <Stack spacing={0}>
                <Box
                  sx={{
                    backgroundColor: "primary.main",
                  }}
                  padding={1}
                >
                  <Typography color="white">
                    {format(add(currentWeek, { days: i }), "EEEE (dd.MM.yyyy)")}{" "}
                  </Typography>
                </Box>
                {events.map((event) => (
                  <CalendarItem key={event.start.toISOString()} event={event} />
                ))}
              </Stack>
            </Grid>
          ))}
          {!events_daily && (
            Array.from(Array(6).keys()).map((i) => (
              <Grid item xs={12} sm={6} md={2} key={i}>
                <Stack spacing={0}>
                  <Box
                    sx={{
                      backgroundColor: "primary.main",
                    }}
                    padding={1}
                  >
                  </Box>                  
                  <Typography color="white">
                    &nbrsp;
                  </Typography>
                </Stack>
              </Grid>
            ))
          )}
        </Grid>
      )}
      {!selectedCourse && (
        <Stack justifyContent="center" direction="row">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Autocomplete
              disablePortal
              id="kurs-combobox"
              options={kurse.map((k) => k.name)}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Kurs auswählen" />
              )}
              onChange={(event, value) => {
                if (value) {
                  let course = kurse.find((k) => k.name === value);
                  if (course) {
                    fetch("/api/settings", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        course: course.id,
                      }),
                    });
                    setSelectedCourse(course.id);
                  }
                }
              }}
            />
          </div>
        </Stack>
      )}
    </Box>
  );
};

export default WeeklyCalendar;
