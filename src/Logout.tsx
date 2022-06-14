import { Container, Typography } from "@mui/material";
const Logout = () => {
  fetch("/api/logout").then((response) => {
    if (response.status === 200) {
      window.location.href = "/";
    } else {
      console.log("Error logging out");
    }
  });
  return (
    <Container maxWidth="sm">
      <Typography>Logging out...</Typography>
    </Container>
  );
};

export default Logout;
