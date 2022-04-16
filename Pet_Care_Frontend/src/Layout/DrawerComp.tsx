import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

type NavbarProps = {
  name: string;
  route: string;
  id: number;
};

type Props = {
  links: NavbarProps[];
};

const DrawerComp = ({ links }: Props) => {
  const [open, setOpen] = useState(false);
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
          {links.map((link, index) => (
            <Link href={link.route}>
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
