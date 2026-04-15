import React from "react";
import { Container, Paper, Typography, Box } from "@mui/material";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Paper
        sx={{
          p: 4,
          borderRadius: 4,
          background: "linear-gradient(180deg, #ffffff, #fff5f8)",
          border: "1px solid #f8bbd0",
        }}
      >
        <Typography variant="h4" gutterBottom color="primary">
          User Dashboard
        </Typography>

        <Typography sx={{ mb: 2 }}>
          Welcome, <strong>{user?.name}</strong>
        </Typography>

        <Box>
          <Typography>Email: {user?.email}</Typography>
          <Typography>Role: {user?.role}</Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Dashboard;