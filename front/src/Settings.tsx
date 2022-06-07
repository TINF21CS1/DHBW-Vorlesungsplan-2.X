import React from "react";
import {
  Container,
  Box,
  TextField,
  Typography,
  Autocomplete,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  InputLabel,
  Input,
  FormHelperText,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";

const Settings = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
  };
  const kurse = ["TINF21CS1", "TINF20CS2", "TWIB18B"];

  return (
    <Container maxWidth="xl">
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
            id="kurs-combobox"
            options={kurse}
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
              control={<Checkbox defaultChecked />}
              label="E-mail Benachrichtigungen"
            />
            <InputLabel htmlFor="email">E-Mail Adresse</InputLabel>
            <Input id="email" aria-describedby="email-helper" />
            <FormHelperText id="email-helper">
              Diese E-mail wird nur für Benachrichtigungen verwendet.
            </FormHelperText>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Browser Benachrichtigungen"
            />
          </FormGroup>
          <Typography component="h4" variant="h5">
            Meine Kurse
          </Typography>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {["Programmieren", "Web Engineering", "Analysis", "Tutorium"].map(
              (value) => {
                const labelId = `checkbox-list-label-${value}`;

                return (
                  <ListItem key={value} disablePadding>
                    <ListItemButton role={undefined} dense>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={`${value}`} />
                    </ListItemButton>
                  </ListItem>
                );
              }
            )}
          </List>
        </Box>
      </Box>
    </Container>
  );
};

export default Settings;
