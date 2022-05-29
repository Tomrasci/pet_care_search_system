import {
  Box,
  Button,
  createTheme,
  Grid,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
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
const theme = createTheme({
  palette: {
    primary: {
      main: "#793209",
    },
  },
});

const Login = ({ loadUsers }: any) => {
  const [values, handleChange, resetValues] = useFormHook({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [showError, setShowError] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const login = await userApi.login(values.email, values.password);
    if (login === "Success") {
      navigate("/");
      loadUsers();
    } else {
      setShowError(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <form onSubmit={handleLogin}>
          <Box marginY={20}>
            <Grid
              container
              direction="column"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Paper
                elevation={5}
                sx={{
                  width: {
                    sx: 1.0,
                    md: 700,
                    sm: 550,
                    xs: 350,
                  },
                }}
              >
                <Box marginY={5}>
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
                <Box>
                  {showError && (
                    <Typography color="red" align="center">
                      Invalid username or password!
                    </Typography>
                  )}
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
                <Box marginY={5}> </Box>
              </Paper>
            </Grid>
          </Box>
        </form>
      </div>
    </ThemeProvider>
  );
};
export default Login;
