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
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const passwordConfirm = (document.getElementById("password_confirmation") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    if (
      passwordConfirm !== password
    ) {
      setAlert("Passwörter stimmen nicht überein!");
      return;
    }
    let payload = JSON.stringify({
      email: email,
      pass: password,
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
            <Input type="password" id="password" data-testid="password_div" />
            <InputLabel htmlFor="password_confirmation">
              Passwort bestätigen
            </InputLabel>
            <Input type="password" id="password_confirmation" data-testid="password_confirmation_div" />
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
