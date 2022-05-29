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
import { IUserChange } from "../../Interfaces/User/IUserChange";
import ProfileValidation from "../Profile/ProfileValidaton";

type Props = {
  onSave(): void;
  userForEdit?: IUserChange;
  refetch: boolean;
  refetchUsers: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserEdit = ({ onSave, userForEdit, refetch, refetchUsers }: Props) => {
  const [username, setUsername] = useState(userForEdit?.username || "");
  const [email, setEmail] = useState(userForEdit?.email || "");
  const [phone, setPhone] = useState(userForEdit?.phone || "");
  const [address, setAddress] = useState(userForEdit?.address || "");
  const [name, setName] = useState(userForEdit?.name || "");
  const [surname, setSurname] = useState(userForEdit?.surname || "");
  const [city, setCity] = useState(userForEdit?.city || "");

  const { register, handleSubmit, reset, formState } = useForm(
    ProfileValidation.profileEditFormOptions
  );
  const { errors } = formState;
  const navigate = useNavigate();
  const theme = createTheme({
    palette: {
      primary: {
        main: "#793209",
      },
    },
  });

  const submitEditedUser = async () => {
    const user = {
      ...(userForEdit || ({} as IUserChange)),
      username: username,
      email: email,
      phone: phone,
      address: address,
      name: name,
      surname: surname,
      city: city,
    };
    const result = await userApi.updateUser(user);
    if (result.status !== 200) {
      toast.error("User edit failed");
    } else {
      refetchUsers(!refetch);
      toast.success("User updated successful");
    }
    onSave();
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box marginY={5}>
          <form onSubmit={handleSubmit(submitEditedUser)}>
            <Grid container alignItems="center" justifyContent="center">
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
                    <Typography color="red">{errors.email?.message}</Typography>
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
                    <Typography color="red">{errors.name?.message}</Typography>
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
                    <Typography color="red">{errors.phone?.message}</Typography>
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
                    <Typography color="red">{errors.city?.message}</Typography>
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
                  container
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  xs={12}
                >
                  <Box marginY={5}>
                    <Button type="submit" variant="contained">
                      Edit
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={0} sm={2}></Grid>
              </Grid>
            </Grid>
          </form>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default UserEdit;
