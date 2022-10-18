import {
  Grid,
  Stack,
  Box,
  Typography,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import {
  ChevronRight,
  ChevronLeft,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { startOfWeek, isSameDay, add, format } from "date-fns";
import { Event } from "ical.js";
import CalendarItem from "./CalendarItem";
import { useNavigate } from "react-router-dom";

const WeeklyCalendar = (props: { events: Event[]; start: Date }) => {
  const today = startOfWeek(new Date(), { weekStartsOn: 1 });
  const currentWeek = startOfWeek(props.start, { weekStartsOn: 1 });
  let navigate = useNavigate();
  const navigate_to_date = (date: Date) => {
    navigate(`/${format(date, "yyyy-MM-dd")}`);
  };
  const go_today = () => {
    navigate_to_date(today);
  };
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
            size="medium"
            color="primary"
            onClick={go_today}
            style={currentWeek > today ? {} : { visibility: "hidden" }}
          >
            <KeyboardDoubleArrowLeft fontSize="inherit" />
          </IconButton>
          <IconButton
            size="medium"
            onClick={() => {
              navigate_to_date(
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
            <ChevronLeft fontSize="inherit" />
          </IconButton>
          <Typography align="center">
            week {format(currentWeek, "I")}
          </Typography>
          <IconButton
            size="medium"
            onClick={() => {
              navigate_to_date(
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
            <ChevronRight fontSize="inherit" />
          </IconButton>
          <IconButton
            size="medium"
            color="primary"
            onClick={go_today}
            style={currentWeek < today ? {} : { visibility: "hidden" }}
          >
            <KeyboardDoubleArrowRight fontSize="inherit" />
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
                <Typography
                  color="primary.text"
                  fontWeight={
                    isSameDay(add(currentWeek, { days: i }), new Date())
                      ? "bold"
                      : {}
                  }
                >
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
