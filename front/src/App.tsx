import { CssBaseline, Box } from "@mui/material";
import "./App.css";
import Calendar from "./Calendar";
import Login from "./Login";
import Settings from "./Settings";
import Nav from "./components/Nav";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#e2001a",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <CssBaseline />
        <Box mb={1}>
          <Nav />
        </Box>
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
