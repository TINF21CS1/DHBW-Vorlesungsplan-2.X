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

const Register = () => {
  const [alert, setAlert] = useState<string>("");

  function handleRegisterSubmit(event: any) {
    event.preventDefault();
    if (event.target.password_confirmation.value !== event.target.password.value) {
      setAlert("Passwords don't match!");
      return;
    }
    let payload = JSON.stringify({
      email: event.target.email.value,
      pass: event.target.password.value,
    });
    fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    }).then(async (response) => {
      if (response.status === 200) {
        window.location.href = "/";
      } else {
        setAlert(await response.json());
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
          Registrierung
        </Typography>
        {alert && (
          <Typography variant="h4" color="error">
            {alert}
          </Typography>
        )}
        <Box component="form" onSubmit={handleRegisterSubmit} sx={{ mt: 1 }}>
          <FormGroup>
            <InputLabel htmlFor="email">E-Mail Adresse</InputLabel>
            <Input type="email" id="email" />
            <InputLabel htmlFor="password">Passwort</InputLabel>
            <Input type="password" id="password" />
            <InputLabel htmlFor="password_confirmation">Passwort bestätigen</InputLabel>
            <Input type="password" id="password_confirmation" />
          </FormGroup>
          <Button type="submit" variant="contained" color="primary">
            Registrieren
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
