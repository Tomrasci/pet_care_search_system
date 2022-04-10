import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Grid,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DrawerComp from "./DrawerComp";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import userApi from "../Api/userApi";
import { IUser } from "../Interfaces/User/IUser";

type NavbarProps = {
  name: string;
  route: string;
};

type Props = {
  links: NavbarProps[];
};

const guestLinksArray = [
  {
    name: "Home",
    route: "/",
  },
  {
    name: "Create Advert",
    route: "/CaretakerAdvertCreate",
  },
  {
    name: "Adverts",
    route: "/CaretakerAdvertList",
  },
  {
    name: "MyAdverts",
    route: "/MyAdverts",
  },
];

const authLinksArray = [
  {
    name: "Registration",
    route: "/Registration",
  },
  {
    name: "Login",
    route: "/Login",
  },
];

const Navbar = ({ loadUsers, currentUser }: any) => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [value, setValue] = useState();

  const navigate = useNavigate();

  const logOut = () => {
    userApi.logout();
    navigate("/");
    loadUsers();
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundImage:
          "linear-gradient(90deg, rgba(121,50,9,1) 0%, rgba(121,50,9,1) 35%, rgba(121,50,9,1) 100%)",
      }}
    >
      <Toolbar>
        {isMatch ? (
          <>
            <Typography>
              <HomeIcon />
            </Typography>
            <DrawerComp links={guestLinksArray} />
          </>
        ) : (
          <Grid sx={{ placeItems: "center" }} container>
            <Grid item xs={2}>
              <Typography>
                <HomeIcon />
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Tabs
                indicatorColor="secondary"
                textColor="inherit"
                value={0}
                onChange={(e, val) => setValue(val)}
              >
                {guestLinksArray.map((link: any, index: any) => (
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={link.route}
                  >
                    <Tab key={index} label={link.name} />
                  </Link>
                ))}
              </Tabs>
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={3}>
              <Box display="flex" alignItems="center">
                {!!Object.keys(currentUser).length ? (
                  <>
                    <Typography
                      color="white"
                      sx={{
                        marginLeft: "auto",
                      }}
                    >
                      {currentUser.email}
                    </Typography>
                    <Link to="/" style={{ textDecoration: "none" }}>
                      <Button
                        sx={{ marginLeft: 1, background: "rgba(121,50,9,1)" }}
                        variant="contained"
                        onClick={logOut}
                      >
                        LogOut
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/Login" style={{ textDecoration: "none" }}>
                      <Button
                        sx={{
                          marginLeft: "auto",
                          background: "rgba(121,50,9,1)",
                        }}
                        variant="contained"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link to="/Register" style={{ textDecoration: "none" }}>
                      <Button
                        sx={{ marginLeft: 1, background: "rgba(121,50,9,1)" }}
                        variant="contained"
                      >
                        Register
                      </Button>
                    </Link>
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
