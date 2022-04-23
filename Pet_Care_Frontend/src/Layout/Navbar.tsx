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
import isEmpty from "../Utils/Empty";
import "./Navbar.css";
import CssBaseline from "@mui/material/CssBaseline";
import { Roles } from "../Interfaces/Roles";
import { ICurrentUser } from "../Interfaces/User/ICurrentUser";

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
    id: 0,
  },

  {
    name: "Advertsisements",
    route: "/CaretakerAdvertList",
    id: 1,
  },
];
// {
//   name: "MyAdverts",
//   route: "/MyAdverts",
// },
// {
//   name: "Create Advert",
//   route: "/CaretakerAdvertCreate",
// },

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

const Navbar = ({
  loadUsers,
  currentUser,
}: {
  loadUsers: any;
  currentUser: ICurrentUser;
}) => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [tabValue, setTabValue] = useState(0);
  const [isCaretaker, setIsCaretaker] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasAdvert, setHasAdvert] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser.role === Roles.Caretaker) {
      setIsCaretaker(true);
    } else if (currentUser.role === Roles.Owner) {
      setIsOwner(true);
    } else if (currentUser.role === Roles.Admin) {
      setIsAdmin(true);
    }
    if (currentUser.advert_count === 1) {
      setHasAdvert(true);
    } else if (currentUser.advert_count === 0) {
      setHasAdvert(false);
    }
  }, [currentUser]);

  const logOut = () => {
    userApi.logout();
    navigate("/");
    loadUsers();
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        position="sticky"
        sx={{
          backgroundImage:
            "linear-gradient(90deg, rgba(121,50,9,1) 0%, rgba(121,50,9,1) 35%, rgba(121,50,9,1) 100%)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {isMatch ? (
            <>
              <Typography>
                <Link style={{ textDecoration: "none", color: "white" }} to="/">
                  <HomeIcon />
                </Link>
              </Typography>
              <DrawerComp links={guestLinksArray} />
            </>
          ) : (
            <>
              <div className="left_div">
                <Tabs
                  indicatorColor="secondary"
                  textColor="inherit"
                  onChange={handleChange}
                >
                  {guestLinksArray.map((link: any, index: any) => (
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to={link.route}
                    >
                      <Tab value={link.name} key={link.id} label={link.name} />
                    </Link>
                  ))}
                  <>
                    {!isEmpty(currentUser) && isCaretaker && (
                      <>
                        <Link
                          style={{ textDecoration: "none", color: "white" }}
                          to={"/caretakerCalendar"}
                        >
                          <Tab label="Caretaker Calendar" />
                        </Link>
                        <Link
                          style={{ textDecoration: "none", color: "white" }}
                          to={"/ReservationsTable"}
                        >
                          <Tab label="Reservations" />
                        </Link>
                        {!hasAdvert && (
                          <Link
                            style={{ textDecoration: "none", color: "white" }}
                            to={"/CaretakerAdvertCreate"}
                          >
                            <Tab label="Create Advertisement" />
                          </Link>
                        )}
                      </>
                    )}

                    {!isEmpty(currentUser) && (isOwner || isAdmin) && (
                      <>
                        <Link
                          style={{ textDecoration: "none", color: "white" }}
                          to={"/ReserveFromCalendar"}
                        >
                          <Tab label="Reserve" />
                        </Link>
                        {!hasAdvert && (
                          <Link
                            style={{ textDecoration: "none", color: "white" }}
                            to={"/OwnerAdvertCreate"}
                          >
                            <Tab label="Create Advertisement" />
                          </Link>
                        )}
                      </>
                    )}
                  </>
                </Tabs>
              </div>
              <div className="right_div">
                {!isEmpty(currentUser) ? (
                  <>
                    <a>{currentUser.email}</a>
                    <Link to="/MyAdverts" style={{ textDecoration: "none" }}>
                      <Button
                        sx={{ background: "rgba(121,50,9,1)" }}
                        variant="contained"
                      >
                        My Adverts
                      </Button>
                    </Link>
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
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
