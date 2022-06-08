import {
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import React from "react";

const Nav = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [loggedIn, setLoggedIn] = React.useState(false);
  fetch("/api/settings").then((res) => {
    if (res.status === 200 && !loggedIn) {
      setLoggedIn(true);
    } else if (res.status === 401 && loggedIn) {
      setLoggedIn(false);
    }
  });
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            DHBW Vorlesungsplan
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            {!loggedIn && (
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            )}
            {loggedIn && (
              <Button color="inherit" component={Link} to="/logout">
                Logout
              </Button>
            )}
            {loggedIn && (
              <Button color="inherit" component={Link} to="/settings">
                Settings
              </Button>
            )}
          </Box>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleOpenNavMenu}
            sx={{ display: { xs: "flex", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            <MenuItem component={Link} to="/">
              <Typography textAlign="center">Home</Typography>
            </MenuItem>
            <MenuItem component={Link} to="/login">
              <Typography textAlign="center">Login</Typography>
            </MenuItem>
            <MenuItem component={Link} to="/settings">
              <Typography textAlign="center">Settings</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Nav;
