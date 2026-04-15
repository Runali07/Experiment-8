import React, { useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleBasedRoute from "./components/RoleBasedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminPage from "./pages/AdminPage";

function App() {
  const [mode, setMode] = useState("light");

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#e91e63",
          },
          secondary: {
            main: "#f8bbd0",
          },
          background:
            mode === "light"
              ? {
                  default: "#fff0f6",
                  paper: "#ffffff",
                }
              : {
                  default: "#1f1120",
                  paper: "#2b1730",
                },
          text:
            mode === "light"
              ? {
                  primary: "#2d1b2e",
                  secondary: "#6d4c5b",
                }
              : {
                  primary: "#ffffff",
                  secondary: "#f8bbd0",
                },
        },
        typography: {
          fontFamily: "Arial, sans-serif",
          h4: {
            fontWeight: 700,
          },
          h6: {
            fontWeight: 700,
          },
        },
        shape: {
          borderRadius: 14,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 12,
              },
            },
          },

          MuiPaper: {
            styleOverrides: {
              root: {
                boxShadow: "0 8px 24px rgba(233, 30, 99, 0.12)",
                color: mode === "light" ? "#2d1b2e" : "#ffffff",
                backgroundImage: "none",
              },
            },
          },

          MuiTypography: {
            styleOverrides: {
              root: {
                color: mode === "light" ? "#2d1b2e" : "#ffffff",
              },
            },
          },

          MuiLink: {
            styleOverrides: {
              root: {
                color: mode === "light" ? "#d81b60" : "#f8bbd0",
              },
            },
          },

          MuiTextField: {
            defaultProps: {
              variant: "outlined",
            },
            styleOverrides: {
              root: {
                marginTop: "12px",
                marginBottom: "12px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 12,
                  backgroundColor: mode === "light" ? "#fffafb" : "#3a223d",
                  color: mode === "light" ? "#2d1b2e" : "#ffffff",
                  "& fieldset": {
                    borderColor: "#f8bbd0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#ec407a",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#e91e63",
                    borderWidth: "2px",
                  },
                },
                "& .MuiInputBase-input": {
                  color: mode === "light" ? "#2d1b2e" : "#ffffff",
                },
                "& .MuiInputLabel-root": {
                  color: mode === "light" ? "#ad1457" : "#f8bbd0",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#e91e63",
                },
                "& .MuiFormHelperText-root": {
                  color: mode === "light" ? "#ad1457" : "#f8bbd0",
                },
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar mode={mode} toggleTheme={toggleTheme} />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <RoleBasedRoute allowedRoles={["admin"]}>
                <AdminPage />
              </RoleBasedRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;