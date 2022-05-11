import React from 'react';
import { Container, Box, TextField, Typography, Autocomplete, FormControl, InputLabel, Input, FormHelperText } from '@mui/material';

const Settings = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data);
    };
    const kurse = ["TINF21CS1", "TINF20CS2", "TWIB18B"];

    return <Container maxWidth="xl">
        <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
        }}>
            <Typography component="h1" variant="h2">Settings</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={kurse}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Kurs" />}
                />
                <FormControl>
                    <InputLabel htmlFor="email">Email address</InputLabel>
                    <Input id="email" aria-describedby="email-helper" />
                    <FormHelperText id="email-helper">We'll never share your email.</FormHelperText>
                </FormControl>
            </Box>
        </Box>
    </Container>;
};

export default Settings;