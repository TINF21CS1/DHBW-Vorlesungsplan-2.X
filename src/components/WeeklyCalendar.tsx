import { useState } from "react";
import {
  Grid,
  Stack,
  Box,
  Typography,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { ChevronRight, ChevronLeft } from "@mui/icons-material";
import { startOfWeek, isSameDay, add, format } from "date-fns";
import { Event } from "ical.js";
import CalendarItem from "./CalendarItem";

const WeeklyCalendar = (props: { events: Event[] }) => {
  const [currentWeek, setCurrentWeek] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  const events_per_day = Array.from(Array(7).keys()).map((i) => {
    const date = add(currentWeek, { days: i });
    let events_this_day = props.events.filter((event) => {
      return isSameDay(event.startDate.toJSDate(), date);
    });
    events_this_day.sort(
      (a, b) => a.startDate.toUnixTime() - b.startDate.toUnixTime()
    );
    return events_this_day;
  });
  const wants_dark = useMediaQuery("(prefers-color-scheme: dark)");
  return (
    <Box>
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
                startOfWeek(add(currentWeek, { days: -7 }), {
                  weekStartsOn: 1,
                })
              );
            }}
            color="secondary"
            aria-label="previous week"
            sx={{
              marginLeft: "auto",
            }}
          >
            <ChevronLeft />
          </IconButton>
          <Typography align="center">
            week {format(currentWeek, "I")}
          </Typography>
          <IconButton
            size="large"
            onClick={() => {
              setCurrentWeek(
                startOfWeek(add(currentWeek, { days: 7 }), {
                  weekStartsOn: 1,
                })
              );
            }}
            color="secondary"
            aria-label="next week"
            sx={{
              flexGrow: 1,
            }}
          >
            <ChevronRight />
          </IconButton>
        </div>
      </Stack>
      <Grid container spacing={1} columns={14}>
        {events_per_day.map((events, i) => (
          <Grid item xs={14} sm={7} md={2} key={i}>
            <Stack spacing={0}>
              <Box
                sx={{
                  backgroundColor: wants_dark
                    ? "primary.dark"
                    : "primary.light",
                }}
                padding={1}
              >
                <Typography color="primary.text">
                  {format(add(currentWeek, { days: i }), "EEEE (dd.MM.yyyy)")}{" "}
                </Typography>
              </Box>
              {events.map((event) => (
                <CalendarItem
                  key={event.startDate.toJSDate().toISOString()}
                  event={event}
                />
              ))}
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WeeklyCalendar;
