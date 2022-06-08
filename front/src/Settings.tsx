import React from "react";
import {
  Container,
  Box,
  TextField,
  Typography,
  Autocomplete,
  Button,
  InputLabel,
  Input,
  FormHelperText,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";

const Settings = () => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(event.target);
    fetch("/api/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: event.target.email.value,
        notification: event.target.notification.checked,
        course: kurse.find((c) => c.name === event.target.course.value)?.id,
      }),
    })
      .then((response) => {
        setSettings(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [settings, setSettings] = React.useState<any>(null);
  const [kurse, setKurse] = useState<Array<{ id: string; name: string }>>([]);
  if (kurse.length === 0) {
    fetch("/api/calender/course/list")
      .then((res) => res.json())
      .then((data) => {
        setKurse(data);
      });
  }

  if (!settings) {
    fetch("/api/settings").then(async (res) => {
      if (res.status === 200 && !settings) {
        setSettings(await res.json());
      }
    });
    return <Container></Container>;
  }
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
        }}
      >
        <Typography component="h2" variant="h3">
          Einstellungen
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Autocomplete
            disablePortal
            id="course"
            options={kurse.map((c) => c.name)}
            defaultValue={settings.course ? settings.course.name : null}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Mein Kurs" />
            )}
          />
          <Typography component="h3" variant="h4">
            Benachrichtigungen
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  id="notification"
                  defaultChecked={settings.notification}
                />
              }
              label="E-mail Benachrichtigungen"
            />
            <InputLabel htmlFor="email">E-Mail Adresse</InputLabel>
            <Input
              defaultValue={settings.email}
              id="email"
              aria-describedby="email-helper"
            />
            <FormHelperText id="email-helper">
              Diese E-mail wird nur für Benachrichtigungen verwendet.
            </FormHelperText>
          </FormGroup>
          <Button type="submit" variant="contained" color="primary">
            Speichern
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Settings;
