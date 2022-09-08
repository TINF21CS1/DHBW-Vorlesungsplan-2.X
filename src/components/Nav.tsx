import { Container, AppBar, Toolbar, Typography } from "@mui/material";

const Nav = (props: { elementRight: JSX.Element }) => {
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
          {props.elementRight}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Nav;