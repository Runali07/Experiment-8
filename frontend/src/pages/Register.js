import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Paper,
  MenuItem,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        data
      );

      setSuccessMessage(response.data.message);
      reset();

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper
  elevation={4}
  sx={{
    p: 4,
    borderRadius: 4,
    mt: 4,
    background: "linear-gradient(180deg, #ffffff, #fff5f8)",
    border: "1px solid #f8bbd0",
  }}
>
        <Typography variant="h4" align="center" gutterBottom>
          Create Account
        </Typography>

        <Typography variant="body1" align="center" color="text.secondary" mb={3}>
          Register to start using the website
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Full Name"
            fullWidth
            margin="normal"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            label="Email Address"
            fullWidth
            margin="normal"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            select
            label="Role"
            fullWidth
            margin="normal"
            defaultValue="user"
            {...register("role", {
              required: "Role is required",
            })}
            error={!!errors.role}
            helperText={errors.role?.message}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>

          {successMessage && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {successMessage}
            </Alert>
          )}

          {errorMessage && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errorMessage}
            </Alert>
          )}

          <Button
  type="submit"
  fullWidth
  variant="contained"
  sx={{
    mt: 3,
    py: 1.3,
    borderRadius: 3,
    background: "linear-gradient(90deg, #ec407a, #d81b60)",
    "&:hover": {
      background: "linear-gradient(90deg, #d81b60, #c2185b)",
    },
  }}
  disabled={loading}
>
            {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
          </Button>

          <Typography align="center" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link component={RouterLink} to="/" underline="hover">
              Login here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;