import { Container, CssBaseline, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import './App.css';
import WeeklyCalendar from './components/WeeklyCalendar';

function App() {

  const events = [
    { start: new Date("2022-05-02T12:00+00:00"), end: new Date("2022-04-25T14:00+00:00"), title: "Web Engineering", speaker: "Dr. Mustermann", location: "262C" },
    { start: new Date("2022-05-02T16:00+00:00"), end: new Date("2022-04-25T18:00+00:00"), title: "Programmieren", speaker: "Dr. Stallmann", location: "262C" },
    { start: new Date("2022-05-03T08:00+00:00"), end: new Date("2022-04-26T15:00+00:00"), title: "Analysis", speaker: "Dr. Ritchie", location: "263C" },
    { start: new Date("2022-05-04T09:00+00:00"), end: new Date("2022-04-27T16:00+00:00"), title: "Algorithmen", speaker: "Dr. Neumann", location: "264C" },
    { start: new Date("2022-05-05T16:00+00:00"), end: new Date("2022-04-28T17:00+00:00"), title: "Kryptologie", speaker: "Dr. Turing", location: "265C" }
  ];

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            DHBW Vorlesungsplan
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl">
        <WeeklyCalendar events={events} />
      </Container>
    </React.Fragment>
  );
}

export default App;
