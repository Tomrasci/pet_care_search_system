import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ICurrentUser } from "../Interfaces/User/ICurrentUser";
import { Roles } from "../Interfaces/Roles";
import isEmpty from "../Utils/Empty";
import { Link } from "react-router-dom";

type NavbarProps = {
  name: string;
  route: string;
  id: number;
};

type Props = {
  guestLinks: NavbarProps[];
  caretakerLeftLinks: NavbarProps[];
  ownerLeftLinks: NavbarProps[];
  caretakerLinks: NavbarProps[];
  ownerLinks: NavbarProps[];
  adminLinks: NavbarProps[];
  currentUser: ICurrentUser;
  logOut: () => void;
  hasAdvert: boolean;
};

const DrawerComp = ({
  guestLinks,
  caretakerLeftLinks,
  ownerLeftLinks,
  caretakerLinks,
  ownerLinks,
  adminLinks,
  currentUser,
  logOut,
  hasAdvert,
}: Props) => {
  const [open, setOpen] = useState(false);
  const logoutFunction = () => {
    logOut();
    setOpen(false);
  };
  return (
    <>
      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: "rgba(121,50,9,1)",
          },
        }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <List>
          {(isEmpty(currentUser) || currentUser.role === Roles.Admin) && (
            <>
              {guestLinks.map((link, index) => (
                <Link
                  to={link.route}
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <ListItemButton
                    onClick={() => setOpen(false)}
                    key={link.id}
                    divider
                  >
                    <ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{ style: { color: "white" } }}
                      >
                        {link.name}
                      </ListItemText>
                    </ListItemIcon>
                  </ListItemButton>
                </Link>
              ))}
              {isEmpty(currentUser) && (
                <>
                  <Link to="/Login" style={{ textDecoration: "none" }}>
                    <ListItemButton onClick={() => setOpen(false)} divider>
                      <ListItemIcon>
                        <ListItemText
                          primaryTypographyProps={{ style: { color: "white" } }}
                        >
                          Login
                        </ListItemText>
                      </ListItemIcon>
                    </ListItemButton>
                  </Link>
                  <Link to="/Register" style={{ textDecoration: "none" }}>
                    <ListItemButton onClick={() => setOpen(false)} divider>
                      <ListItemIcon>
                        <ListItemText
                          primaryTypographyProps={{ style: { color: "white" } }}
                        >
                          Register
                        </ListItemText>
                      </ListItemIcon>
                    </ListItemButton>
                  </Link>
                </>
              )}
            </>
          )}
          {currentUser.role === Roles.Caretaker && (
            <>
              {caretakerLeftLinks.map((link, index) => (
                <Link
                  to={link.route}
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <ListItemButton
                    onClick={() => setOpen(false)}
                    key={link.id}
                    divider
                  >
                    <ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{ style: { color: "white" } }}
                      >
                        {link.name}
                      </ListItemText>
                    </ListItemIcon>
                  </ListItemButton>
                </Link>
              ))}
              {caretakerLinks.map((link, index) => (
                <Link
                  to={link.route + `/${currentUser.id}`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <ListItemButton
                    onClick={() => setOpen(false)}
                    key={link.id}
                    divider
                  >
                    <ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{ style: { color: "white" } }}
                      >
                        {link.name}
                      </ListItemText>
                    </ListItemIcon>
                  </ListItemButton>
                </Link>
              ))}
              {!hasAdvert && (
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={"/CaretakerAdvertCreate"}
                >
                  <ListItemButton onClick={() => setOpen(false)} divider>
                    <ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{ style: { color: "white" } }}
                      >
                        Create advertisement
                      </ListItemText>
                    </ListItemIcon>
                  </ListItemButton>
                </Link>
              )}

              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
                to={`/MyProfile`}
              >
                <ListItemButton onClick={() => setOpen(false)} divider>
                  <ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{ style: { color: "white" } }}
                    >
                      My Profile
                    </ListItemText>
                  </ListItemIcon>
                </ListItemButton>
              </Link>
              <ListItemButton onClick={logoutFunction}>
                <ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ style: { color: "white" } }}
                  >
                    Logout
                  </ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </>
          )}
          {currentUser.role === Roles.Owner && (
            <>
              {ownerLeftLinks.map((link, index) => (
                <Link
                  to={link.route}
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <ListItemButton
                    onClick={() => setOpen(false)}
                    key={link.id}
                    divider
                  >
                    <ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{ style: { color: "white" } }}
                      >
                        {link.name}
                      </ListItemText>
                    </ListItemIcon>
                  </ListItemButton>
                </Link>
              ))}
              {!hasAdvert && (
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={"/OwnerAdvertCreate"}
                >
                  <ListItemButton onClick={() => setOpen(false)} divider>
                    <ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{ style: { color: "white" } }}
                      >
                        Create advertisement
                      </ListItemText>
                    </ListItemIcon>
                  </ListItemButton>
                </Link>
              )}
              {ownerLinks.map((link, index) => (
                <Link
                  to={link.route + `/${currentUser.id}`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <ListItemButton
                    onClick={() => setOpen(false)}
                    key={link.id}
                    divider
                  >
                    <ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{ style: { color: "white" } }}
                      >
                        {link.name}
                      </ListItemText>
                    </ListItemIcon>
                  </ListItemButton>
                </Link>
              ))}
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
                to={`/MyProfile`}
              >
                <ListItemButton onClick={() => setOpen(false)} divider>
                  <ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{ style: { color: "white" } }}
                    >
                      My Profile
                    </ListItemText>
                  </ListItemIcon>
                </ListItemButton>
              </Link>
              <ListItemButton onClick={logoutFunction}>
                <ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ style: { color: "white" } }}
                  >
                    Logout
                  </ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </>
          )}
          {currentUser.role === Roles.Admin && (
            <>
              {adminLinks.map((link, index) => (
                <Link
                  to={link.route}
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <ListItemButton
                    onClick={() => setOpen(false)}
                    key={link.id}
                    divider
                  >
                    <ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{ style: { color: "white" } }}
                      >
                        {link.name}
                      </ListItemText>
                    </ListItemIcon>
                  </ListItemButton>
                </Link>
              ))}
              {!hasAdvert && (
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={"/OwnerAdvertCreate"}
                >
                  <ListItemButton onClick={() => setOpen(false)} divider>
                    <ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{ style: { color: "white" } }}
                      >
                        Create Owner Advertisement
                      </ListItemText>
                    </ListItemIcon>
                  </ListItemButton>
                </Link>
              )}
              {!hasAdvert && (
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={"/CaretakerAdvertCreate"}
                >
                  <ListItemButton onClick={() => setOpen(false)} divider>
                    <ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{ style: { color: "white" } }}
                      >
                        Create Caretaker Advertisement
                      </ListItemText>
                    </ListItemIcon>
                  </ListItemButton>
                </Link>
              )}

              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
                to={`/MyProfile`}
              >
                <ListItemButton onClick={() => setOpen(false)} divider>
                  <ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{ style: { color: "white" } }}
                    >
                      My Profile
                    </ListItemText>
                  </ListItemIcon>
                </ListItemButton>
              </Link>
              <ListItemButton onClick={logoutFunction}>
                <ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ style: { color: "white" } }}
                  >
                    Logout
                  </ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </>
          )}
        </List>
      </Drawer>

      <IconButton
        sx={{ marginLeft: "auto", color: "white" }}
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default DrawerComp;
