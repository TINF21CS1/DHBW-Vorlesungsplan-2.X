import { CssBaseline, Box } from "@mui/material";
import "./App.css";
import Calendar from "./Calendar";
import Nav from "./components/Nav";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CopyLinkButton from "./components/CopyLinkButton";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0097e6",
    },
  },
});

// FIXME: The iCAL URL is currently hardcoded.
const ical_url = "ical.ics";

function App() {
  let url = new URL(ical_url, window.location.toString()).toString();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <Box mb={1}>
          <Nav elementRight={<CopyLinkButton text="iCal" url={url}/>}/>
        </Box>
        <Routes>
          <Route path="/" element={<Calendar url={url} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
