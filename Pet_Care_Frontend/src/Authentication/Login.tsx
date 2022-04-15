import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import userApi from "../Api/userApi";
import { useFormHook } from "../Utils/useFormHook";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const styles = {
  "&.MuiButton-contained": {
    color: "brown",
  },
};

const Login = ({ loadUsers }: any) => {
  const [values, handleChange, resetValues] = useFormHook({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const login = await userApi.login(values.email, values.password);
    if (login === "Success") {
      toast.success("Login successful");
      navigate("/");
      loadUsers();
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <Box marginY={5}>
          <Grid container alignItems="center" justifyContent="center">
            <Paper elevation={5} sx={{ minWidth: 400, minHeight: 400 }}>
              <Box marginY={2}>
                <Typography
                  align="center"
                  component="h1"
                  variant="h5"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
                >
                  Login
                </Typography>
              </Box>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={12}>
                  <Box marginX={2} marginY={2}>
                    <TextField
                      required
                      fullWidth
                      id="email-input"
                      name="email"
                      label="Email"
                      value={values.email}
                      onChange={handleChange}
                    ></TextField>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box marginX={2} marginY={2}>
                    <TextField
                      required
                      fullWidth
                      type="password"
                      id="password-input"
                      name="password"
                      label="Password"
                      value={values.password}
                      onChange={handleChange}
                    ></TextField>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box marginY={3} textAlign="center">
                    <Button sx={{ styles }} type="submit" variant="contained">
                      Login
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Box>
      </form>
    </div>
  );
};
export default Login;
