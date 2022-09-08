import { Typography } from "@mui/material";
import packageJson from "../../package.json";

export default function Footer() {
  return (
    <Typography align="center" component="footer" color="text.secondary">
      Made by frereit on{" "}
      <a href="https://github.com/frereit/react-calendar/">GitHub</a> (v
      {packageJson.version})
    </Typography>
  );
}
