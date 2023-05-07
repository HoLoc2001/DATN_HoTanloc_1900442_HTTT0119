import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box
      position="fixed"
      width="15%"
      height="100%"
      color="#fff"
      sx={{ borderRight: "1px solid #fff" }}
    >
      <Divider />
      <List>
        <ListItem key="1" disablePadding>
          <ListItemButton>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Inbox">Inbox </ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />

      {/* <Link
        to={`/profile`}
        style={{ textDecoration: "none", display: "block" }}
      >
        <Button
        // style={{
        //   textTransform: "none",
        //   ...(!atHome && !id ? { borderLeft: "5px solid #20B2AA" } : {}),
        // }}
        ></Button>
      </Link> */}
    </Box>
  );
};

export default Sidebar;
