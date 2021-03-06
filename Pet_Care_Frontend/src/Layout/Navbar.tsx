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
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
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
import userIcon from "../Images/user_icon.png";

type NavbarProps = {
  name: string;
  route: string;
};

const guestLinksArray = [
  {
    name: "Home",
    route: "/",
    id: 0,
  },
  {
    name: "Caretaker Advertisements",
    route: "/CaretakerAdvertList",
    id: 1,
  },
  {
    name: "Owner Advertisements",
    route: "/OwnerAdvertList",
    id: 2,
  },
];

const caretakerLeftLinksArray = [
  {
    name: "Home",
    route: "/",
    id: 0,
  },
  {
    name: "Owner Advertsisements",
    route: "/OwnerAdvertList",
    id: 1,
  },
];

const ownerLeftLinksArray = [
  {
    name: "Home",
    route: "/",
    id: 0,
  },
  {
    name: "Caretaker Advertsisements",
    route: "/CaretakerAdvertList",
    id: 1,
  },
];

const careTakerLinks = [
  {
    name: "My Advertisement",
    route: "/MyCaretakerAdvert",
    id: 0,
  },
  {
    name: "Reservation list",
    route: "/ReservationsTable",
    id: 1,
  },
];

const ownerLinks = [
  {
    name: "My Advertisement",
    route: "/MyOwnerAdvert",
    id: 0,
  },
  {
    name: "My Reservations",
    route: "/MyReservations",
    id: 1,
  },
];

const adminLinks = [
  {
    name: "My Caretaker Advertisement",
    route: "/MyCaretakerAdvert",
    id: 0,
  },
  {
    name: "My Owner Advertisement",
    route: "/MyOwnerAdvert",
    id: 1,
  },
  {
    name: "Reservation list",
    route: "/ReservationsTable",
    id: 2,
  },
  {
    name: "My Reservations",
    route: "/MyReservations",
    id: 3,
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
    setIsAdmin(false);
    setIsCaretaker(false);
    setIsOwner(false);
    userApi.logout();
    handleCloseUserMenu();
    navigate("/");
    loadUsers();
  };
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
              <DrawerComp
                guestLinks={guestLinksArray}
                caretakerLeftLinks={caretakerLeftLinksArray}
                ownerLeftLinks={ownerLeftLinksArray}
                caretakerLinks={careTakerLinks}
                ownerLinks={ownerLinks}
                adminLinks={adminLinks}
                currentUser={currentUser}
                logOut={logOut}
                hasAdvert={hasAdvert}
              />
            </>
          ) : (
            <>
              <div className="left_div">
                <Tabs
                  indicatorColor="secondary"
                  textColor="inherit"
                  onChange={handleChange}
                >
                  {isCaretaker &&
                    caretakerLeftLinksArray.map((link: any, index: any) => (
                      <Link
                        style={{ textDecoration: "none", color: "white" }}
                        to={link.route}
                      >
                        <Tab
                          value={link.name}
                          key={link.id}
                          label={link.name}
                        />
                      </Link>
                    ))}
                  {isOwner &&
                    ownerLeftLinksArray.map((link: any, index: any) => (
                      <Link
                        style={{ textDecoration: "none", color: "white" }}
                        to={link.route}
                      >
                        <Tab
                          value={link.name}
                          key={link.id}
                          label={link.name}
                        />
                      </Link>
                    ))}
                  {!isCaretaker &&
                    !isOwner &&
                    guestLinksArray.map((link: any, index: any) => (
                      <Link
                        style={{ textDecoration: "none", color: "white" }}
                        to={link.route}
                      >
                        <Tab
                          value={link.name}
                          key={link.id}
                          label={link.name}
                        />
                      </Link>
                    ))}
                  <>
                    {!isEmpty(currentUser) && isCaretaker && (
                      <>
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

                    {!isEmpty(currentUser) && isOwner && (
                      <>
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

                    {!isEmpty(currentUser) && isAdmin && (
                      <>
                        {!hasAdvert && (
                          <Link
                            style={{ textDecoration: "none", color: "white" }}
                            to={"/OwnerAdvertCreate"}
                          >
                            <Tab label="Create Owner Advertisement" />
                          </Link>
                        )}
                        {!hasAdvert && (
                          <Link
                            style={{ textDecoration: "none", color: "white" }}
                            to={"/CaretakerAdvertCreate"}
                          >
                            <Tab label="Create Caretaker Advertisement" />
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
                    {isCaretaker && (
                      <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                          <IconButton
                            onClick={handleOpenUserMenu}
                            sx={{ p: 0 }}
                          >
                            <Avatar
                              sx={{ width: 50, height: 50 }}
                              alt="User"
                              src={
                                "http://localhost:3002/" +
                                  currentUser.photo_link || userIcon
                              }
                            />
                          </IconButton>
                        </Tooltip>
                        <Menu
                          sx={{ mt: "45px" }}
                          id="menu-appbar"
                          anchorEl={anchorElUser}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          open={Boolean(anchorElUser) || false}
                          onClose={handleCloseUserMenu}
                        >
                          {careTakerLinks.map((caretakerLink) => (
                            <MenuItem
                              key={caretakerLink.id}
                              onClick={handleCloseUserMenu}
                            >
                              <Link
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                                to={caretakerLink.route + `/${currentUser.id}`}
                              >
                                <Typography textAlign="center">
                                  {caretakerLink.name}
                                </Typography>
                              </Link>
                            </MenuItem>
                          ))}
                          <MenuItem onClick={handleCloseUserMenu}>
                            <Link
                              style={{
                                textDecoration: "none",
                                color: "black",
                              }}
                              to={`/MyProfile`}
                            >
                              <Typography textAlign="center">
                                My Profile
                              </Typography>
                            </Link>
                          </MenuItem>
                          <MenuItem onClick={logOut}>
                            <Typography textAlign="center">Logout</Typography>
                          </MenuItem>
                        </Menu>
                      </Box>
                    )}

                    {isOwner && (
                      <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                          <IconButton
                            onClick={handleOpenUserMenu}
                            sx={{ p: 0 }}
                          >
                            <Avatar
                              sx={{ width: 50, height: 50 }}
                              alt="User"
                              src={
                                "http://localhost:3002/" +
                                  currentUser.photo_link || userIcon
                              }
                            />
                          </IconButton>
                        </Tooltip>
                        <Menu
                          sx={{ mt: "45px" }}
                          id="menu-appbar"
                          anchorEl={anchorElUser}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          open={Boolean(anchorElUser)}
                          onClose={handleCloseUserMenu}
                        >
                          {ownerLinks.map((ownerLink) => (
                            <MenuItem
                              key={ownerLink.id}
                              onClick={handleCloseUserMenu}
                            >
                              <Link
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                                to={ownerLink.route + `/${currentUser.id}`}
                              >
                                <Typography textAlign="center">
                                  {ownerLink.name}
                                </Typography>
                              </Link>
                            </MenuItem>
                          ))}
                          <MenuItem onClick={handleCloseUserMenu}>
                            <Link
                              style={{
                                textDecoration: "none",
                                color: "black",
                              }}
                              to={`/MyProfile`}
                            >
                              <Typography textAlign="center">
                                My Profile
                              </Typography>
                            </Link>
                          </MenuItem>

                          <MenuItem onClick={logOut}>
                            <Typography textAlign="center">Logout</Typography>
                          </MenuItem>
                        </Menu>
                      </Box>
                    )}
                    {isAdmin && (
                      <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                          <IconButton
                            onClick={handleOpenUserMenu}
                            sx={{ p: 0 }}
                          >
                            <Avatar
                              sx={{ width: 50, height: 50 }}
                              alt="User"
                              src={
                                "http://localhost:3002/" +
                                  currentUser.photo_link || userIcon
                              }
                            />
                          </IconButton>
                        </Tooltip>
                        <Menu
                          sx={{ mt: "45px" }}
                          id="menu-appbar"
                          anchorEl={anchorElUser}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          open={Boolean(anchorElUser)}
                          onClose={handleCloseUserMenu}
                        >
                          <MenuItem onClick={handleCloseUserMenu}>
                            <Link
                              style={{
                                textDecoration: "none",
                                color: "black",
                              }}
                              to={`/UserList`}
                            >
                              <Typography textAlign="center">
                                User list
                              </Typography>
                            </Link>
                          </MenuItem>
                          {adminLinks.map((adminLink) => (
                            <MenuItem
                              key={adminLink.id}
                              onClick={handleCloseUserMenu}
                            >
                              <Link
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                                to={adminLink.route + `/${currentUser.id}`}
                              >
                                <Typography textAlign="center">
                                  {adminLink.name}
                                </Typography>
                              </Link>
                            </MenuItem>
                          ))}
                          <MenuItem onClick={handleCloseUserMenu}>
                            <Link
                              style={{
                                textDecoration: "none",
                                color: "black",
                              }}
                              to={`/MyProfile`}
                            >
                              <Typography textAlign="center">
                                My Profile
                              </Typography>
                            </Link>
                          </MenuItem>

                          <MenuItem onClick={logOut}>
                            <Typography textAlign="center">Logout</Typography>
                          </MenuItem>
                        </Menu>
                      </Box>
                    )}
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
