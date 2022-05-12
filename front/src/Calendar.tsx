import { Container } from '@mui/material';
import WeeklyCalendar from './components/WeeklyCalendar';
import { startOfWeek, add } from 'date-fns';

const Calendar = () => {
    const monday = startOfWeek(new Date(), { weekStartsOn: 1 });

    const events = [
        { start: add(monday, { days: 0, hours: 12 }), end: add(monday, { days: 0, hours: 14 }), title: "Web Engineering", speaker: "Dr. Mustermann", location: "262C" },
        { start: add(monday, { days: 1, hours: 7 }), end: add(monday, { days: 1, hours: 12 }), title: "Programmieren", speaker: "Dr. Stallmann", location: "262C" },
        { start: add(monday, { days: 1, hours: 13 }), end: add(monday, { days: 1, hours: 17 }), title: "Kryptologie", speaker: "Dr. Turing", location: "262C" },
        { start: add(monday, { days: 2, hours: 8 }), end: add(monday, { days: 2, hours: 15 }), title: "Analysis", speaker: "Dr. Ritchie", location: "263C" },
        { start: add(monday, { days: 3, hours: 9 }), end: add(monday, { days: 3, hours: 13 }), title: "Algorithmen", speaker: "Dr. Neumann", location: "264C" },
        { ignored: true, start: add(monday, { days: 3, hours: 14 }), end: add(monday, { days: 3, hours: 15, minutes: 30 }), title: "Tutorium", speaker: "Dr. Ritchie", location: "210B" },
        { start: add(monday, { days: 3, hours: 16 }), end: add(monday, { days: 3, hours: 17, minutes: 30 }), title: "Analysis", speaker: "Dr. Ritchie", location: "211B" },
        { start: add(monday, { days: 4, hours: 16 }), end: add(monday, { days: 4, hours: 17 }), title: "Kryptologie", speaker: "Dr. Turing", location: "265C" }
    ];


    return <Container maxWidth="xl">
        <WeeklyCalendar events={events} />
    </Container>;
};

export default Calendar;