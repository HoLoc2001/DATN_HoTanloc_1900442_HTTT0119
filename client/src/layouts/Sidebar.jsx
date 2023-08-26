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
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import BookmarkIcon from "@mui/icons-material/Bookmark";import NewspaperIcon from '@mui/icons-material/Newspaper';import WorkIcon from '@mui/icons-material/Work';
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getMyTags, popularTags } from "../redux/tagSlice";

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const listTags = useAppSelector((state) => state.tag.popularTags);
  const myTags = useAppSelector((state) => state.tag.myTags);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const themeColor = useAppSelector((state) => state.theme.color);
  const [active, setActive] = useState("");
  var { pathname } = window.location;

  useEffect(() => {
    if (pathname === "/") {
      setActive("home");
    } else if (pathname === "/bookmarks") {
      setActive("bookmarks");} else if (pathname === "/tintuc") {
        setActive("tintuc");} else if (pathname === "/tuyen-dung") {
          setActive("tuyen-dung");
    } else if (pathname === "/search") {
      setActive("search");
    } else {
      setActive("");
    }
  }, [pathname]);

  const handleClickHome = () => {
    setActive("home");
  };

  const handleClickBookmarks = () => {
    setActive("bookmarks");
  };

  const handleClickTinTuc = () => {
    setActive("tintuc");
  };

  const handleClickTuyenDung = () => {
    setActive("tuyen-dung");
  };

  const handleClickSearch = () => {
    setActive("search");
  };

  return (
    <Box
      position="fixed"
      width="13%"
      height="100%"
      color="#1A2027"
      sx={{
        borderRight: `1px solid "#a6aeb8"`,
      }}
    >
      <Divider />
      <List>
        <ListItem key="1" disablePadding>
          <Link
            to="/"
            style={{
              display: "flex",
              color: "#1A2027",
              textDecoration: "none",
              width: "100%",
            }}
            onClick={handleClickHome}
          >
            <ListItemButton
              sx={{
                ":hover": {
                  backgroundColor: "#e2e3f3",
                  color: "#1A2027",
                },
                ...(active === "home"
                  ? {
                      backgroundColor: "#e2e3f3",
                      color: "#1A2027",
                    }
                  : ""),
              }}
            >
              <ListItemIcon
                sx={{
                  color: "#1A2027",
                  minWidth: "35px",
                }}
              >
                <HomeIcon />
              </ListItemIcon>
              <ListItemText
                sx={{ display: { xs: "none", md: "none", lg: "block" } }}
              >
                Home
              </ListItemText>
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key="2" disablePadding>
          <Link
            to="/bookmarks"
            style={{
              display: "flex",
              color: "#1A2027",
              textDecoration: "none",
              width: "100%",
            }}
            onClick={handleClickBookmarks}
          >
            <ListItemButton
              sx={{
                ":hover": {
                  backgroundColor: "#e2e3f3",
                  color: "#1A2027",
                },
                ...(active === "bookmarks"
                  ? {
                      backgroundColor: "#e2e3f3",
                      color: "#1A2027",
                    }
                  : ""),
              }}
            >
              <ListItemIcon
                sx={{
                  color: "#1A2027",
                  minWidth: "35px",
                }}
              >
                <BookmarkIcon />
              </ListItemIcon>
              <ListItemText
                sx={{ display: { xs: "none", md: "none", lg: "block" } }}
              >
                Bookmarks
              </ListItemText>
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key="5" disablePadding>
          <Link
            to="/tintuc"
            style={{
              display: "flex",
              color: "#1A2027",
              textDecoration: "none",
              width: "100%",
            }}
            onClick={handleClickTinTuc}
          >
            <ListItemButton
              sx={{
                ":hover": {
                  backgroundColor: "#e2e3f3",
                  color: "#1A2027",
                },
                ...(active === "tintuc"
                  ? {
                      backgroundColor: "#e2e3f3",
                      color: "#1A2027",
                    }
                  : ""),
              }}
            >
              <ListItemIcon
                sx={{
                  color: "#1A2027",
                  minWidth: "35px",
                }}
              >
                <NewspaperIcon />
              </ListItemIcon>
              <ListItemText
                sx={{ display: { xs: "none", md: "none", lg: "block" } }}
              >
                Tin Tức
              </ListItemText>
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key="4" disablePadding>
          <Link
            to="/tuyen-dung"
            style={{
              display: "flex",
              color: "#1A2027",
              textDecoration: "none",
              width: "100%",
            }}
            onClick={handleClickTuyenDung}
          >
            <ListItemButton
              sx={{
                ":hover": {
                  backgroundColor: "#e2e3f3",
                  color: "#1A2027",
                },
                ...(active === "tuyen-dung"
                  ? {
                      backgroundColor: "#e2e3f3",
                      color: "#1A2027",
                    }
                  : ""),
              }}
            >
              <ListItemIcon
                sx={{
                  color: "#1A2027",
                  minWidth: "35px",
                }}
              >
                <WorkIcon />
              </ListItemIcon>
              <ListItemText
                sx={{ display: { xs: "none", md: "none", lg: "block" } }}
              >
                Tuyển dụng
              </ListItemText>
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key="3" disablePadding>
          <Link
            to="/search"
            style={{
              display: "flex",
              color: "#1A2027",
              textDecoration: "none",
              width: "100%",
            }}
            onClick={handleClickSearch}
          >
            <ListItemButton
              sx={{
                ":hover": {
                  backgroundColor: "#e2e3f3",
                  color: "#1A2027",
                },

                ...(active === "search"
                  ? {
                      backgroundColor: "#e2e3f3",
                      color: "#1A2027",
                    }
                  : ""),
              }}
            >
              <ListItemIcon
                sx={{
                  color: "#1A2027",
                  alignItems: "center",
                  minWidth: "35px",
                }}
              >
                <SearchIcon />
              </ListItemIcon>
              <ListItemText
                sx={{ display: { xs: "none", md: "none", lg: "block" } }}
              >
                Search
              </ListItemText>
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
      {/* <Divider
        sx={{
          borderColor: `${themeColor === "light" ? "#a6aeb8" : "#2d3748"}`,
        }}
      />
      <Typography variant="h6" style={{ padding: "0 0 10px 10px" }}>
        {isAuthenticated ? "My Tags" : "Popular Tags"}
      </Typography>

      <Box
        sx={{
          overflowY: "scroll",
          height: "400px",
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#fff",
            borderRadius: "5px",
            outline: "1px solid slategrey",
          },
        }}
      >
        {isAuthenticated
          ? myTags?.map((tag) => {
              if (tag.isFollowed) {
                return (
                  <Link
                    to={`./tag/${tag.name}`}
                    style={{
                      textDecoration: "none",
                      color: `${themeColor === "light" ? "#1A2027" : "#fff"}`,
                    }}
                    key={tag.name}
                  >
                    <Typography
                      sx={{
                        paddingLeft: "20px",
                        ":hover": {
                          backgroundColor: `${
                            themeColor === "light"
                              ? "#e2e3f3"
                              : "rgba(45,50,59,255)"
                          }`,
                          color: `${
                            themeColor === "light"
                              ? "#1A2027"
                              : "rgba(249,242,222,255)"
                          }`,
                        },
                      }}
                    >
                      #{tag.name}
                    </Typography>
                  </Link>
                );
              }
            })
          : listTags?.map((tag) => (
              <Link
                to={`./tag/${tag.name}`}
                style={{
                  textDecoration: "none",
                  color: `${themeColor === "light" ? "#1A2027" : "#fff"}`,
                }}
                key={tag.name}
              >
                <Typography
                  sx={{
                    paddingLeft: "20px",
                    ":hover": {
                      backgroundColor: `${
                        themeColor === "light"
                          ? "#e2e3f3"
                          : "rgba(45,50,59,255)"
                      }`,
                      color: `${
                        themeColor === "light"
                          ? "#1A2027"
                          : "rgba(249,242,222,255)"
                      }`,
                    },
                  }}
                >
                  #{tag.name}
                </Typography>
              </Link>
            ))}
      </Box> */}

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
