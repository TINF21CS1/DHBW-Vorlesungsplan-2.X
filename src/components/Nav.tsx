import { Container, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Nav = () => {
    return <AppBar position="static">
        <Container maxWidth="xl">
            <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" component="div">
                    DHBW Vorlesungsplan
                </Typography>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/settings">Settings</Link>
            </Toolbar>
        </Container>
    </AppBar>
};

export default Nav;