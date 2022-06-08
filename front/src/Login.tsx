import {
  Container,
  Box,
  Typography,
  FormGroup,
  Button,
  InputLabel,
  Input,
} from "@mui/material";
import { useState } from "react";

const Login = () => {
  const [alert, setAlert] = useState<string>("");

  function handleLoginSubmit(event: any) {
    event.preventDefault();
    let payload = JSON.stringify({
      email: event.target.email.value,
      pass: event.target.password.value,
    });
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    }).then((response) => {
      if (response.status === 200) {
        window.location.href = "/";
      } else {
        setAlert("Invalid credentials");
      }
    });
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
        }}
      >
        <Typography component="h2" variant="h3">
          Login
        </Typography>
        {alert && (
          <Typography variant="h4" color="error">
            {alert}
          </Typography>
        )}
        <Box component="form" onSubmit={handleLoginSubmit} sx={{ mt: 1 }}>
          <FormGroup>
            <InputLabel htmlFor="email">E-Mail Adresse</InputLabel>
            <Input type="email" id="email" />
            <InputLabel htmlFor="password">Passwort</InputLabel>
            <Input type="password" id="password" />
          </FormGroup>
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
