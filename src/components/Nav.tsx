import { Container, AppBar, Toolbar, Typography } from "@mui/material";

const Nav = () => {
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
            Calendar
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Nav;
