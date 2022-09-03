import { useMemo } from "react";
import { CssBaseline, Box, useMediaQuery } from "@mui/material";
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
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CopyLinkButton from "./components/CopyLinkButton";
import Footer from "./components/Footer";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  const url = (window as any).Config.url;
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <Box mb={1}>
          <Nav elementRight={<CopyLinkButton text="iCal" url={url} />} />
        </Box>
        <Routes>
          <Route path="/" element={<Calendar url={url} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer/>
      </Router>
    </ThemeProvider>
  );
}

export default App;
