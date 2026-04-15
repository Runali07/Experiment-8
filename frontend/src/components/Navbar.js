import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const Navbar = ({ mode, toggleTheme }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg, #ec407a, #d81b60)",
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
           Auth App
        </Typography>

        <IconButton color="inherit" onClick={toggleTheme} sx={{ mr: 1 }}>
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>

        {!token ? (
          <Box>
            <Button color="inherit" component={Link} to="/">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </Box>
        ) : (
          <Box>
            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>

            {user?.role === "admin" && (
              <Button color="inherit" component={Link} to="/admin">
                Admin
              </Button>
            )}

            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;