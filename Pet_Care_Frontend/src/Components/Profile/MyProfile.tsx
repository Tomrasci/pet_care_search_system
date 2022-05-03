import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userApi from "../../Api/userApi";
import { IUser } from "../../Interfaces/User/IUser";
import isEmpty from "../../Utils/Empty";

const MyProfile = ({ currentUser }: any) => {
  const [userDetails, setUserDetails] = useState({} as IUser);

  useEffect(() => {
    async function getUserDetails() {
      const user = await userApi.getUserDetails().then((userInfo) => {
        setUserDetails(userInfo);
      });
    }
    getUserDetails();
  }, []);

  return userDetails && !isEmpty(userDetails) ? (
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
                My profile
              </Typography>
            </Box>

            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={6}>
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

              <Grid item xs={6}>
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

              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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

              <Grid item xs={6}>
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
              <Grid item xs={6}></Grid>
              <Grid item xs={0} sm={4}></Grid>
              <Grid item xs={6} sm={2}>
                <Box marginY={5}>
                  <Link to="/EditProfile" style={{ textDecoration: "none" }}>
                    <Button type="submit" variant="contained">
                      Edit Profile
                    </Button>
                  </Link>
                </Box>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Box marginY={5}>
                  <Link to="/ChangePassword" style={{ textDecoration: "none" }}>
                    <Button type="submit" variant="contained">
                      Change Password
                    </Button>
                  </Link>
                </Box>
              </Grid>
              <Grid item xs={0} sm={2}></Grid>
            </Grid>
          </Paper>
        </Grid>
      </Box>
    </>
  ) : (
    <div>No user found</div>
  );
};

export default MyProfile;
