import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { setThemeColorStore } from "../redux/themeSlice";
import { signOut } from "../redux/authSlice";
import AlertInfo from "../components/AlertInfo";
import { getUser } from "../redux/userSlice";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "rgb(255 248 248)",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "rgb(255 248 248)"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "rgb(255 248 248)"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const Navbar = ({ notShowCreate }) => {
  const dispatch = useAppDispatch();

  const isSuccessAuth = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.user.user);
  const themeColor = useAppSelector((state) => state.theme.color);

  const [openSignOut, setOpenSignOut] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      if (isSuccessAuth) {
        await dispatch(getUser());
      }
    })();
  }, [isSuccessAuth]);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    await dispatch(signOut());
    setOpenSignOut(false);
  };

  const handleSwitch = (e) => {
    if (e.currentTarget.checked) {
      dispatch(setThemeColorStore("dark"));
    } else {
      dispatch(setThemeColorStore("light"));
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: `${themeColor === "light" ? "rgb(255 248 248)" : "#000000"
            }`,
          height: "56px",
          borderBottom: "1px solid rgb(255 248 248)",
        }}
      >
        <Toolbar disableGutters>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              paddingBottom: "10px",
            }}
          >
            <Box>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    ml: 2,
                    fontFamily: "monospace",
                    color: `${themeColor === "light" ? "black" : "rgb(255 248 248)"
                      }`,
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    textDecoration: "none",
                    fontSize: "30px",
                  }}
                  onClick={() =>
                    window.scroll({ top: 0, left: 0, behavior: "smooth" })
                  }
                >
                  HTL
                </Typography>
              </Link>
            </Box>

            <Box sx={{ mr: 5 }}>
              {isSuccessAuth ? (
                <>
                  {notShowCreate ? (
                    ""
                  ) : (
                    <Link to={"./create"}>
                      <Button
                        sx={{
                          textTransform: "none",
                          border: "1px solid #a3a3a3",
                          color: `${themeColor === "light" ? "#171717" : "#fff2f2"
                            }`,
                        }}
                      >
                        Create article
                      </Button>
                    </Link>
                  )}

                  <Tooltip title={`${user.firstName} ${user.lastName}`}>
                    <IconButton
                      color="white"
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      <Avatar src={user?.avatar} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <Link
                      to={"/profile"}
                      style={{
                        textDecoration: "none",
                        color: "rgb(74 74 74)",
                      }}
                    >
                      <MenuItem onClick={handleClose}>Thông tin tài khoản</MenuItem>
                    </Link>

                    <MenuItem
                      onClick={() => {
                        setOpenSignOut(true);
                        setAnchorEl(null);
                      }}
                    >
                      Đăng Xuất
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Link to={"./signin"} style={{ textDecoration: "none" }}>
                  <Button
                    sx={{
                      color: `${themeColor === "light" ? "black" : "rgb(255 248 248)"
                        }`,
                      border: `1px solid ${themeColor === "light" ? "black" : "rgb(255 248 248)"
                        }`,
                      ":hover": {
                        backgroundColor: `${themeColor === "light"
                          ? "rgb(226 227 243)"
                          : "rgba(45,50,59,255)"
                          }`,
                        color: `${themeColor === "light"
                          ? "black"
                          : "rgba(249,242,222,255)"
                          }`,
                      },
                    }}
                  >
                    Sign In
                  </Button>
                </Link>
              )}
              {/* <FormControlLabel
                  control={
                    <MaterialUISwitch
                      sx={{ m: 1 }}
                      onChange={handleSwitch}
                      checked={themeColor === "light" ? false : true}
                    />
                  }
                /> */}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar color="rgb(255 248 248)" />

      <AlertInfo
        err={error}
        setErr={setError}
        severity="info"
        content="Please login"
      />

      <Dialog
        open={openSignOut}
        onClose={() => !openSignOut}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Article</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to sign out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenSignOut(false)}
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button onClick={handleSignOut} sx={{ textTransform: "none" }}>
            Yes, sign out
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar;
