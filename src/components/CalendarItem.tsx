import { Box, Card, Typography } from "@mui/material";
import { LocationOn, Person, AccessTime } from "@mui/icons-material";
import { format } from "date-fns";
import Event from "../models/Event";
import LabeledIcon from './LabeledIcon';

const CalendarItem = (props: { event: Event }) => {
    return <Card>
        <Box padding={1}>
            <Typography variant="h5" component="h3">{props.event.title}</Typography>
            <LabeledIcon icon={<AccessTime />} text={format(props.event.start, "HH:mm") + " - " + format(props.event.end, "HH:mm")} />
            <LabeledIcon icon={<LocationOn />} text={props.event.location} />
            <LabeledIcon icon={<Person />} text={props.event.speaker} />
        </Box>
    </Card>
}

export default CalendarItem;