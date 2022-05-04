import { useState } from 'react';
import { Grid, Stack, Box, Typography } from "@mui/material";
import { startOfWeek, startOfDay, differenceInMinutes, add, format } from 'date-fns';
import CalendarItem from './CalendarItem';
import Event from '../models/Event';

const WeeklyCalendar = (props: { events: Event[] }) => {
    // create a state for the current week 
    const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
    // for every day between the start and end of the week, find all events
    const events_per_day = Array.from(Array(6).keys()).map(i => {
        const date = add(currentWeek, { days: i });
        return props.events.filter(e => e.start.getDate() === date.getDate());
    });

    const events_with_padding: JSX.Element[][] = Array.from(Array(6).keys()).map(i => [] );

    for (let day = 0; day < events_per_day.length; day++) {
        const events = events_per_day[day];
        for (let event_ind = 0; event_ind < events.length; event_ind++) {
            const event = events[event_ind];
            /* Disable padding for now cause it's kinda ugly for now
            let diff = 0;
            if (event_ind === 0) {
                diff = differenceInMinutes(event.start, startOfDay(event.start));
            } else if (event_ind < events.length - 1) {
                diff = differenceInMinutes(events[event_ind+1].start, event.start);
            }
            if (diff !== 0) {
                const percentage = diff / (24 * 60) * 400;
                console.log({event: event, percentage: percentage});
                events_with_padding[day].push(<Box height={percentage + 'px'}></Box>);
            }*/
            events_with_padding[day].push(<CalendarItem event={event} />);
        }
    }


    return <Grid container spacing={1} >
        {events_with_padding.map((events, i) =>
            <Grid item xs={12} sm={6} md={2} key={i}>
                <Stack spacing={0}>
                    <Box sx={{
                        backgroundColor: "primary.main",
                    }} padding={1}>
                        <Typography color="white">{format(add(currentWeek, { days: i }), "EEEE (dd.MM.yyyy)")} </Typography>
                    </Box>
                    {events}
                </Stack>
            </Grid>
        )}
    </Grid>
};

export default WeeklyCalendar;