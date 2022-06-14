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

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0097e6",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <Box mb={1}>
          <Nav />
        </Box>
        <Routes>
          {/* FIXME: The iCAL URL is currently hardcoded. */}
          <Route path="/" element={<Calendar url="ical.ics" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
