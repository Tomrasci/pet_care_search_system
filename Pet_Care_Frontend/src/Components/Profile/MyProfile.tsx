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
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userApi from "../../Api/userApi";
import { Roles } from "../../Interfaces/Roles";
import { ICurrentUser } from "../../Interfaces/User/ICurrentUser";
import { IUser } from "../../Interfaces/User/IUser";
import isEmpty from "../../Utils/Empty";

const MyProfile = ({
  currentUser,
  loadUsers,
}: {
  currentUser: ICurrentUser;
  loadUsers: any;
}) => {
  const [userDetails, setUserDetails] = useState({} as IUser);
  const navigate = useNavigate();

  // if (isEmpty(currentUser)) {
  //   navigate("/Login");
  // }

  useEffect(() => {
    loadUsers();
    if (isEmpty(currentUser)) {
      navigate("/Login");
    }
  });

  useEffect(() => {
    async function getUserDetails() {
      const user = await userApi.getUserDetails().then((userInfo) => {
        setUserDetails(userInfo);
      });
    }
    getUserDetails();
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#793209",
      },
    },
  });

  return userDetails && !isEmpty(userDetails) ? (
    <>
      <ThemeProvider theme={theme}>
        <Box marginY={5}>
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
              <Box marginY={2}>
                <Typography
                  align="center"
                  component="h1"
                  variant="h5"
                  fontWeight={500}
                  color="#793209"
                  noWrap
                  sx={{ flexGrow: 1 }}
                >
                  My profile
                </Typography>
              </Box>

              <Grid
                container
                spacing={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={12} md={6}>
                  <Box marginX={2} marginY={2}>
                    <TextField
                      fullWidth
                      id="username-input"
                      name="username"
                      label="Username"
                      value={userDetails.username}
                      variant="standard"
                      inputProps={{ readOnly: true }}
                    ></TextField>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box marginX={2} marginY={2}>
                    <TextField
                      fullWidth
                      id="email-input"
                      name="email"
                      label="Email"
                      rows={4}
                      value={userDetails.email}
                      variant="standard"
                      inputProps={{ readOnly: true }}
                    ></TextField>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box marginX={2} marginY={2}>
                    <TextField
                      fullWidth
                      id="name-input"
                      name="name"
                      label="Name"
                      value={userDetails.name}
                      variant="standard"
                      inputProps={{ readOnly: true }}
                    ></TextField>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box marginX={2} marginY={2}>
                    <TextField
                      fullWidth
                      id="surname-input"
                      name="surname"
                      label="Surname"
                      value={userDetails.surname}
                      variant="standard"
                      inputProps={{ readOnly: true }}
                    ></TextField>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box marginX={2} marginY={2}>
                    <TextField
                      fullWidth
                      id="phone"
                      name="phone"
                      label="Phone"
                      rows={4}
                      value={userDetails.phone}
                      variant="standard"
                      inputProps={{ readOnly: true }}
                    ></TextField>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box marginX={2} marginY={2}>
                    <TextField
                      fullWidth
                      id="city"
                      name="city"
                      label="City"
                      value={userDetails.city}
                      variant="standard"
                      inputProps={{ readOnly: true }}
                    ></TextField>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box marginX={2} marginY={2}>
                    <TextField
                      fullWidth
                      id="address"
                      name="address"
                      label="Address"
                      value={userDetails.address}
                      variant="standard"
                      inputProps={{ readOnly: true }}
                    ></TextField>
                  </Box>
                </Grid>
                <Grid item xs={0} md={6}></Grid>
                <Grid item xs={0} sm={2}></Grid>
                <Grid
                  container
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  item
                  xs={12}
                  sm={4}
                >
                  <Box marginY={2}>
                    <Link to="/EditProfile" style={{ textDecoration: "none" }}>
                      <Button type="submit" variant="contained">
                        Edit Profile
                      </Button>
                    </Link>
                  </Box>
                </Grid>
                <Grid
                  item
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  xs={12}
                  sm={4}
                >
                  <Box marginY={2}>
                    <Link
                      to="/ChangePassword"
                      style={{ textDecoration: "none" }}
                    >
                      <Button type="submit" variant="contained">
                        Change Password
                      </Button>
                    </Link>
                  </Box>
                </Grid>
                <Grid item xs={0} sm={2}></Grid>
              </Grid>
              <Box marginY={3}></Box>
            </Paper>
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  ) : (
    <div>No user found</div>
  );
};

export default MyProfile;
