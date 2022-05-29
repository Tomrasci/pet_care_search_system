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
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import userApi from "../../Api/userApi";
import { useFormHook } from "../../Utils/useFormHook";
import UserValidation from "./PasswordValidation";

const ChangePassword = ({ currentUser }: any) => {
  const navigate = useNavigate();

  const [values, handleChange] = useFormHook({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const theme = createTheme({
    palette: {
      primary: {
        main: "#793209",
      },
    },
  });
  const { register, handleSubmit, formState } = useForm(
    UserValidation.userFormOptions
  );
  const { errors } = formState;

  const onSubmit = async () => {
    const passwordObject = {
      password: values.currentPassword,
      newPassword: values.newPassword,
    };
    const result = await userApi.changeUserPassword(passwordObject);
    console.log(`result is ${result}`);
    if (result.status !== 200) {
      toast.error("Password change failed");
    } else {
      toast.success("Password changed successfully");
      navigate("/MyProfile");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box marginY={5}></Box>
        <Grid container alignItems="center" justifyContent="center">
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
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
              display="flex"
            >
              <Box marginY={4}>
                <Typography
                  align="center"
                  component="h1"
                  variant="h5"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
                >
                  Password change
                </Typography>
              </Box>
              <Grid item xs={12}>
                <Box marginX={2} marginY={2}>
                  <TextField
                    {...register("currentPassword")}
                    fullWidth
                    label="Current Password"
                    type="password"
                    variant="outlined"
                    value={values.currentPassword}
                    onChange={handleChange}
                  />
                  <Typography color="red">
                    {errors.currentPassword?.message}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box marginX={2} marginY={2}>
                  <TextField
                    {...register("newPassword")}
                    fullWidth
                    label="New password"
                    type="password"
                    variant="outlined"
                    value={values.newPassword}
                    onChange={handleChange}
                  />
                  <Typography color="red">
                    {errors.newPassword?.message}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box marginX={2} marginY={2}>
                  <TextField
                    {...register("confirmNewPassword")}
                    fullWidth
                    label="Confirm new password"
                    type="password"
                    variant="outlined"
                    value={values.confirmNewPassword}
                    onChange={handleChange}
                  />

                  <Typography color="red">
                    {errors.confirmNewPassword?.message}
                  </Typography>
                </Box>
              </Grid>

              <Grid
                item
                container
                alignItems="center"
                justifyContent="center"
                display="flex"
                xs={12}
              >
                <Box marginX={2} marginY={4}>
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={3}></Grid>
              <Box marginY={2}></Box>
            </Grid>
          </Paper>
        </Grid>
      </form>
    </ThemeProvider>
  );
};

export default ChangePassword;
