import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={() => navigate("/")}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <AccountBalanceIcon />
          </IconButton>
          <AppLink to="/users">News</AppLink>
          <AppLink to="/users/create">Create</AppLink>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const AppLink = ({ children, to }) => {
  return (
    <Link to={to} component="div" style={{ textDecoration: "none" }}>
      <Typography
        sx={(theme) => ({
          color: "white",
          textDecoration: "none",
          padding: theme.spacing(2),
        })}
        variant="h6"
        component="div"
      >
        {children}
      </Typography>
    </Link>
  );
};
