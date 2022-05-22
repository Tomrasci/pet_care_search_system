import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  registerUsername: UseFormRegisterReturn;
  usernameError: { message: string };
  username: string;
  registerEmail: UseFormRegisterReturn;
  emailError: { message: string };
  email: string;
  registerPassword: UseFormRegisterReturn;
  passwordError: { message: string };
  password: string;
  registerConfirmPassword: UseFormRegisterReturn;
  confirmPasswordError: { message: string };
  confirmPassword: string;
  registerPhone: UseFormRegisterReturn;
  phoneError: { message: string };
  phone: string;
  registerAddress: UseFormRegisterReturn;
  addressError: { message: string };
  address: string;
  registerName: UseFormRegisterReturn;
  nameError: { message: string };
  name: string;
  registerSurname: UseFormRegisterReturn;
  surnameError: { message: string };
  surname: string;
  registerCity: UseFormRegisterReturn;
  cityError: { message: string };
  city: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  role: string;
  handleRoleChange: (event: SelectChangeEvent) => void;
  showRoleError: boolean;
  setShowRoleError: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegistrationBody = ({
  registerUsername,
  usernameError,
  username,
  registerEmail,
  emailError,
  email,
  registerPassword,
  passwordError,
  password,
  registerConfirmPassword,
  confirmPasswordError,
  confirmPassword,
  registerPhone,
  phoneError,
  phone,
  registerAddress,
  addressError,
  address,
  registerName,
  nameError,
  name,
  registerSurname,
  surnameError,
  surname,
  handleChange,
  role,
  registerCity,
  cityError,
  city,
  handleRoleChange,
  showRoleError,
  setShowRoleError,
}: Props) => {
  return (
    <>
      <Box marginY={5}>
        <Grid container alignItems="center" justifyContent="center">
          <Paper elevation={5} sx={{ maxWidth: 900 }}>
            <Box marginY={2}>
              <Typography
                align="center"
                component="h1"
                variant="h5"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Registration
              </Typography>
            </Box>

            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={6}>
                <Box marginY={2}>
                  <Typography
                    align="center"
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                  >
                    User information
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box marginY={2}>
                  <Typography
                    align="center"
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                  >
                    Personal information
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box marginX={2} marginY={2}>
                  <TextField
                    {...registerUsername}
                    fullWidth
                    id="username-input"
                    name="username"
                    label="Username"
                    className={`form-control ${
                      usernameError ? "is-invalid" : ""
                    }`}
                    value={username}
                    onChange={handleChange}
                  ></TextField>
                  <Typography color="red">{usernameError?.message}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box marginX={2} marginY={2}>
                  <TextField
                    {...registerName}
                    fullWidth
                    id="name-input"
                    name="name"
                    label="Name"
                    className={`form-control ${nameError ? "is-invalid" : ""}`}
                    value={name}
                    onChange={handleChange}
                  ></TextField>
                  <Typography color="red">{nameError?.message}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box marginX={2} marginY={2}>
                  <TextField
                    {...registerEmail}
                    fullWidth
                    id="email-input"
                    name="email"
                    className={`form-control ${emailError ? "is-invalid" : ""}`}
                    value={email}
                    label="Email"
                    rows={4}
                    onChange={handleChange}
                  ></TextField>
                  <Typography color="red">{emailError?.message}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box marginX={2} marginY={2}>
                  <TextField
                    {...registerSurname}
                    fullWidth
                    id="surname-input"
                    name="surname"
                    label="Surname"
                    className={`form-control ${
                      surnameError ? "is-invalid" : ""
                    }`}
                    value={surname}
                    onChange={handleChange}
                  ></TextField>
                  <Typography color="red">{surnameError?.message}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box marginX={2} marginY={2}>
                  <TextField
                    {...registerPassword}
                    fullWidth
                    id="password"
                    name="password"
                    type="password"
                    className={`form-control ${
                      passwordError ? "is-invalid" : ""
                    }`}
                    value={password}
                    label="Password"
                    rows={4}
                    onChange={handleChange}
                  ></TextField>
                  <Typography color="red">{passwordError?.message}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box marginX={2} marginY={2}>
                  <TextField
                    {...registerPhone}
                    fullWidth
                    id="phone"
                    name="phone"
                    className={`form-control ${phoneError ? "is-invalid" : ""}`}
                    value={phone}
                    label="Phone"
                    rows={4}
                    onChange={handleChange}
                  ></TextField>
                  <Typography color="red">{phoneError?.message}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box marginX={2} marginY={2}>
                  <TextField
                    {...registerConfirmPassword}
                    fullWidth
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    className={`form-control ${
                      confirmPasswordError ? "is-invalid" : ""
                    }`}
                    value={confirmPassword}
                    label="Confirm Password"
                    rows={4}
                    onChange={handleChange}
                  ></TextField>
                  <Typography color="red">
                    {confirmPasswordError?.message}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box marginX={2} marginY={2}>
                  <TextField
                    {...registerCity}
                    fullWidth
                    id="city"
                    name="city"
                    className={`form-control ${cityError ? "is-invalid" : ""}`}
                    value={city}
                    label="City"
                    onChange={handleChange}
                  ></TextField>
                  <Typography color="red">{cityError?.message}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}></Grid>

              <Grid item xs={6}>
                <Box marginX={2} marginY={2}>
                  <TextField
                    {...registerAddress}
                    fullWidth
                    id="address"
                    name="address"
                    className={`form-control ${
                      addressError ? "is-invalid" : ""
                    }`}
                    value={address}
                    label="Address"
                    onChange={handleChange}
                  ></TextField>
                  <Typography color="red">{addressError?.message}</Typography>
                </Box>
              </Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Register as
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    label="Register as"
                    onChange={handleRoleChange}
                  >
                    <MenuItem value={2}>Caretaker</MenuItem>
                    <MenuItem value={3}>Owner</MenuItem>
                  </Select>
                </FormControl>
                {showRoleError && (
                  <Typography color="red">Role must be selected</Typography>
                )}
              </Grid>

              <Grid item xs={3}></Grid>

              <Grid item xs={6}>
                <Box marginY={3} textAlign="center">
                  <Button type="submit" variant="contained">
                    Register
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Box>
    </>
  );
};
export default RegistrationBody;
