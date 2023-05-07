import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          color: "while",
          backgroundColor: "#0E1217",
          height: "56px",
          borderBottom: "1px solid #fff",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Box>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Typography
                    variant="h6"
                    noWrap
                    sx={{
                      mr: 2,
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".3rem",
                      textDecoration: "none",
                      fontSize: "30px",
                      color: "whitesmoke",
                    }}
                    onClick={() => (window.location.href = "/")}
                  >
                    Article
                  </Typography>
                </Link>
              </Box>
              <Box>
                <IconButton
                  color="white"
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <Avatar src="https://lh3.googleusercontent.com/a/AEdFTp62pApa_Hbzkfqy9NOGne2iMXf7Wwj93L-u9J31=s96-c" />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar color="#fff" />

      {/* <Snackbar
      open={errMissInput}
      autoHideDuration={4000}
      onClose={() => setErrMissInput(false)}
    >
      <Alert severity="warning">Vui lòng nhập đầy đủ!!!</Alert>
    </Snackbar> */}
    </>
  );
};

export default Navbar;
