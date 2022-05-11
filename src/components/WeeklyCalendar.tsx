import { useState } from 'react';
import { Grid, Stack, Box, Typography, IconButton } from "@mui/material";
import { ChevronRight, ChevronLeft } from "@mui/icons-material";
import { startOfWeek, isSameDay, add, format } from 'date-fns';
import CalendarItem from './CalendarItem';
import Event from '../models/Event';

const WeeklyCalendar = (props: { events: Event[] }) => {
    // create a state for the current week 
    const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
    // for every day between the start and end of the week, find all events
    const events_per_day = Array.from(Array(6).keys()).map(i => {
        const date = add(currentWeek, { days: i });
        return props.events.filter(e => isSameDay(e.start, date));
    });

    let touchstartX: number = 0;
    let touchendX: number = 0;
    function handleGesture() {
        if (Math.abs(touchendX - touchstartX) > 150) {
            if (touchendX < touchstartX) setCurrentWeek(startOfWeek(add(currentWeek, { days: 7 }), { weekStartsOn: 1 }))
            if (touchendX > touchstartX) setCurrentWeek(startOfWeek(add(currentWeek, { days: -7 }), { weekStartsOn: 1 }))
        }
    }
    type TouchEventHandler = (event: React.TouchEvent<HTMLDivElement>) => void;
    const touchstart: TouchEventHandler = (e) => {
        touchstartX = e.changedTouches[0].clientX;
    };
    const touchend: TouchEventHandler = (e) => {
        touchendX = e.changedTouches[0].clientX;
        handleGesture()
    };


    return <Box onTouchStart={touchstart} onTouchEnd={touchend}>
        <Stack justifyContent="center" direction="row">
            <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}>
                <IconButton onClick={() => setCurrentWeek(startOfWeek(add(currentWeek, { days: -7 }), { weekStartsOn: 1 }))} color="secondary" aria-label="letzte Woche">
                    <ChevronLeft />
                </IconButton>
                <Typography align="center" >KW {format(currentWeek, "ww")}</Typography>
                <IconButton onClick={() => setCurrentWeek(startOfWeek(add(currentWeek, { days: 7 }), { weekStartsOn: 1 }))} color="secondary" aria-label="nächste Woche">
                    <ChevronRight />
                </IconButton>
            </div>
        </Stack>
        <Grid container spacing={1} >
            {events_per_day.map((events, i) =>
                <Grid item xs={12} sm={6} md={2} key={i}>
                    <Stack spacing={0}>
                        <Box sx={{
                            backgroundColor: "primary.main",
                        }} padding={1}>
                            <Typography color="white">{format(add(currentWeek, { days: i }), "EEEE (dd.MM.yyyy)")} </Typography>
                        </Box>
                        {events.map(event => <CalendarItem key={event.start.toISOString()} event={event} />)}
                    </Stack>
                </Grid>
            )}
        </Grid>
    </Box>
};

export default WeeklyCalendar;