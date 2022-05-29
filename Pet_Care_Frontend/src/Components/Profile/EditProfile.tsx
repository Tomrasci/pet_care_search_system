import { LocationCityOutlined } from "@mui/icons-material";
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
import { userInfo } from "os";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import userApi from "../../Api/userApi";
import { IUser } from "../../Interfaces/User/IUser";
import isEmpty from "../../Utils/Empty";
import { useFormHook } from "../../Utils/useFormHook";
import ProfileValidation from "./ProfileValidaton";

const MyProfile = ({ currentUser }: any) => {
  const [userDetails, setUserDetails] = useState({} as IUser);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    async function getUserDetails() {
      const user = await userApi.getUserDetails().then((userInfo) => {
        setUserDetails(userInfo);
        setUsername(userInfo.username);
        setEmail(userInfo.email);
        setPhone(userInfo.phone);
        setAddress(userInfo.address);
        setName(userInfo.name);
        setSurname(userInfo.surname);
        setCity(userInfo.city);
        reset(userInfo);
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

  const { register, handleSubmit, reset, formState } = useForm(
    ProfileValidation.profileEditFormOptions
  );
  const { errors } = formState;
  const navigate = useNavigate();

  const submitEditedUser = async () => {
    const user = {
      ...userDetails,
      username: username,
      email: email,
      phone: phone,
      address: address,
      name: name,
      surname: surname,
      city: city,
    };
    const result = await userApi.changeProfile(user);
    if (result.status !== 200) {
      toast.error("Profile edit failed");
    } else {
      toast.success("Profile updated successful");
      navigate("/MyProfile");
    }
  };

  return userDetails && !isEmpty(userDetails) ? (
    <>
      <ThemeProvider theme={theme}>
        <Box marginY={5}>
          <form onSubmit={handleSubmit(submitEditedUser)}>
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
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                  >
                    Profile edit
                  </Typography>
                </Box>

                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item xs={12} md={6}>
                    <Box marginX={2} marginY={2}>
                      <TextField
                        {...register("username")}
                        fullWidth
                        id="username-input"
                        name="username"
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        variant="outlined"
                      ></TextField>
                      <Typography color="red">
                        {errors.username?.message}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box marginX={2} marginY={2}>
                      <TextField
                        {...register("email")}
                        fullWidth
                        id="email-input"
                        name="email"
                        label="Email"
                        rows={4}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="outlined"
                      ></TextField>
                      <Typography color="red">
                        {errors.email?.message}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box marginX={2} marginY={2}>
                      <TextField
                        {...register("name")}
                        fullWidth
                        id="name-input"
                        name="name"
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant="outlined"
                      ></TextField>
                      <Typography color="red">
                        {errors.name?.message}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box marginX={2} marginY={2}>
                      <TextField
                        {...register("surname")}
                        fullWidth
                        id="surname-input"
                        name="surname"
                        label="Surname"
                        value={surname}
                        variant="outlined"
                        onChange={(e) => setSurname(e.target.value)}
                      ></TextField>
                      <Typography color="red">
                        {errors.surname?.message}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box marginX={2} marginY={2}>
                      <TextField
                        {...register("phone")}
                        fullWidth
                        id="phone"
                        name="phone"
                        label="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        variant="outlined"
                      ></TextField>
                      <Typography color="red">
                        {errors.phone?.message}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box marginX={2} marginY={2}>
                      <TextField
                        {...register("city")}
                        fullWidth
                        id="city"
                        name="city"
                        label="City"
                        value={city}
                        variant="outlined"
                        onChange={(e) => setCity(e.target.value)}
                      ></TextField>
                      <Typography color="red">
                        {errors.city?.message}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box marginX={2} marginY={2}>
                      <TextField
                        {...register("address")}
                        fullWidth
                        id="address"
                        name="address"
                        label="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        variant="outlined"
                      ></TextField>
                      <Typography color="red">
                        {errors.address?.message}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}></Grid>
                  <Grid
                    item
                    xs={12}
                    container
                    alignItems="center"
                    justifyContent="center"
                    display="flex"
                  >
                    <Box marginY={5}>
                      <Button type="submit" variant="contained">
                        Edit
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={0} sm={2}></Grid>
                </Grid>
              </Paper>
            </Grid>
          </form>
        </Box>
      </ThemeProvider>
    </>
  ) : (
    <div>No user found</div>
  );
};

export default MyProfile;
