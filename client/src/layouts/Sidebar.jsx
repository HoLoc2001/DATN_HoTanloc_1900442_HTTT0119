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
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { popularTags, tags } from "../redux/tagSlice";

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const listTags = useAppSelector((state) => state.tag.tags);
  const signed = useAppSelector((state) => state.auth.signed);
  const themeColor = useAppSelector((state) => state.theme.color);

  useEffect(() => {
    (async () => {
      if (signed) {
        await dispatch(tags());
      } else {
        await dispatch(popularTags());
      }
    })();
  }, [signed]);

  return (
    <Box
      position="fixed"
      width="15%"
      height="100%"
      color={`${themeColor === "light" ? "#1A2027" : "#fff"}`}
      sx={{
        borderRight: `1px solid ${themeColor === "light" ? "#1A2027" : "#fff"}`,
      }}
    >
      <Divider />
      <List>
        <ListItem key="1" disablePadding>
          <Link
            to="/"
            style={{
              display: "flex",
              color: `${themeColor === "light" ? "#1A2027" : "#fff"}`,
              textDecoration: "none",
              width: "100%",
            }}
          >
            <ListItemButton
              sx={{
                ":hover": {
                  backgroundColor: `${
                    themeColor === "light" ? "#e2e3f3" : "rgba(45,50,59,255)"
                  }`,
                  color: `${
                    themeColor === "light" ? "#1A2027" : "rgba(249,242,222,255)"
                  }`,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: `${themeColor === "light" ? "#1A2027" : "#fff"}`,
                  minWidth: "35px",
                }}
              >
                <HomeIcon />
              </ListItemIcon>
              <ListItemText>Home</ListItemText>
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key="2" disablePadding>
          <Link
            to="/bookmarks"
            style={{
              display: "flex",
              color: `${themeColor === "light" ? "#1A2027" : "#fff"}`,
              textDecoration: "none",
              width: "100%",
            }}
          >
            <ListItemButton
              sx={{
                ":hover": {
                  backgroundColor: `${
                    themeColor === "light" ? "#e2e3f3" : "rgba(45,50,59,255)"
                  }`,
                  color: `${
                    themeColor === "light" ? "#1A2027" : "rgba(249,242,222,255)"
                  }`,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: `${themeColor === "light" ? "#1A2027" : "#fff"}`,
                  minWidth: "35px",
                }}
              >
                <BookmarkIcon />
              </ListItemIcon>
              <ListItemText>Bookmarks</ListItemText>
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key="3" disablePadding>
          <Link
            to="/search"
            style={{
              display: "flex",
              color: `${themeColor === "light" ? "#1A2027" : "#fff"}`,
              textDecoration: "none",
              width: "100%",
            }}
          >
            <ListItemButton
              sx={{
                ":hover": {
                  backgroundColor: `${
                    themeColor === "light" ? "#e2e3f3" : "rgba(45,50,59,255)"
                  }`,
                  color: `${
                    themeColor === "light" ? "#1A2027" : "rgba(249,242,222,255)"
                  }`,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: `${themeColor === "light" ? "#1A2027" : "#fff"}`,
                  alignItems: "center",
                  minWidth: "35px",
                }}
              >
                <SearchIcon />
              </ListItemIcon>
              <ListItemText>Search</ListItemText>
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
      <Divider />
      <Typography variant="h6" style={{ padding: "0 0 10px 10px" }}>
        {signed ? "My Tags" : "Popular Tags"}
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
        {listTags?.map((tag) => (
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
                    themeColor === "light" ? "#e2e3f3" : "rgba(45,50,59,255)"
                  }`,
                  color: `${
                    themeColor === "light" ? "#1A2027" : "rgba(249,242,222,255)"
                  }`,
                },
              }}
            >
              #{tag.name}
            </Typography>
          </Link>
        ))}
      </Box>

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
