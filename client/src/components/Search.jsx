import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch, useAppSelector } from "../redux/store";
import React, { useState, useEffect } from "react";
import { articleSearch } from "../redux/articleSlice";
import Article from "./Article";
import { Avatar, Button, Tabs } from "@mui/material";
import { Link } from "react-router-dom";
import { userSearch } from "../redux/userSlice";

const SearchArticle = () => {
  const dispatch = useAppDispatch();
  const isSuccessAuth = useAppSelector((state) => state.auth.isAuthenticated);
  const themeColor = useAppSelector((state) => state.theme.color);
  const articles = useAppSelector((state) => state.article.articleSearch);
  const users = useAppSelector((state) => state.user.userSearch);
  const user = useAppSelector((state) => state.user.user);
  const [hasArticle, setHasArticle] = useState({
    hasArticle: false,
    query: "",
  });
  const [hasUser, setHasUser] = useState({
    hasUser: false,
    query: "",
  });

  const [query, setQuery] = useState(sessionStorage.getItem("query") || "");
  const [page, setPage] = useState(0);
  const [value, setValue] = React.useState("1");

  const [hasPost, setHasPost] = useState(() => {
    if (articles?.length % 6 === 0 && articles?.length !== 0) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    setPage(0);
  }, [isSuccessAuth, query]);

  useEffect(() => {
    if (page > 0) {
      (async () => {
        await dispatch(articleSearch({ page, query }));
        // setHasPost(() => {
        //   if (articles?.length % 6 === 0 && articles?.length >= page) {
        //     return true;
        //   }
        //   return false;
        // });
      })();
    }
  }, [page, isSuccessAuth]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
    // sessionStorage.setItem("query", e.target.value);
  };

  const keyPress = async (e) => {
    if (e.key === "Enter" && query) {
      const articles = await dispatch(articleSearch({ page, query }));
      const _users = await dispatch(userSearch({ query }));

      setHasArticle({
        ...hasArticle,
        hasArticle: !!articles.payload.length,
        query: query,
      });

      setHasUser({
        ...hasUser,
        hasUser: !!_users.payload.length,
        query: query,
      });
    }
  };

  const handleClickSearch = async () => {
    if (query) {
      const articles = await dispatch(articleSearch({ page, query }));
      const _users = await dispatch(userSearch({ query }));
      setHasArticle({
        ...hasArticle,
        hasArticle: !!articles.payload.length,
        query: query,
      });

      setHasUser({
        ...hasUser,
        hasUser: !!_users.payload.length,
        query: query,
      });
    }
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    color: `${themeColor === "light" ? "#1A2027" : "#fff"}`,
    border: `${themeColor === "light" ? "1px solid #d4d4d4" : ""}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "45vw",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: `${themeColor === "light" ? "#1A2027" : "#fff"}`,
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),

      paddingLeft: `calc(1em )`,
      transition: theme.transitions.create("width"),
      width: "40vw",
    },
  }));
  return (
    <>
      <Box
        textAlign={"center"}
        width={"66vw"}
        sx={{ marginLeft: "calc(50vw - 14vw - 23vw)" }}
      >
        <Search sx={{ display: "flex" }}>
          <StyledInputBase
            value={query}
            onChange={handleSearch}
            onKeyDown={keyPress}

            // autoFocus
            placeholder="Tìm kiếm"
          // inputProps={{ "aria-label": "search" }}
          />
          <IconButton onClick={handleClickSearch}>
            <SearchIcon />
          </IconButton>
        </Search>
      </Box>
      <Box>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                color: `${themeColor === "light" ? "#1A2027" : "#fff"}`,
              }}
            >
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#D97D54",
                    color: `${themeColor === "light" ? "#1A2027" : "#fff"}`,
                  },
                }}
              >
                <Tab
                  label="Bài viết"
                  value="1"
                  sx={{
                    color: `${themeColor === "light" ? "#1A2027" : "#fff"}`,
                    ".Mui-selected": {
                      color: `${themeColor === "light" ? "#1A2027" : "#fff"}`,
                    },
                  }}
                />
                <Tab
                  label="Người dùng"
                  value="2"
                  sx={{
                    color: `${themeColor === "light" ? "#1A2027" : "#fff"}`,
                    ".Mui-selected": {
                      color: `${themeColor === "light" ? "#1A2027" : "#fff"}`,
                    },
                  }}
                />
              </TabList>
            </Box>
            <TabPanel
              color={`${themeColor === "light" ? "#1A2027" : "#fff"}`}
              value="1"
            >
              {articles?.length ? (
                <Article
                  _articles={articles}
                  _setPage={setPage}
                  hasPost={hasPost}
                />
              ) : (
                <Typography
                  textAlign={"center"}
                  sx={{
                    width: "500px",
                    marginLeft: "calc(50vw - 14vw - 250px)",
                  }}
                >
                  {!hasArticle.hasArticle && hasArticle.query
                    ? `Hệ thống không thể  tìm thấy bài viết hay người dùng là "${hasArticle.query}"`
                    : ""}
                </Typography>
              )}
            </TabPanel>
            <TabPanel value="2">
              {users?.length ? (
                users.map((_user) => (
                  <div
                    key={_user.id}
                    style={{
                      display: "flex",
                      paddingBottom: "10px",
                      alignItems: "center",
                    }}
                  >
                    <Link
                      to={
                        user.id === _user.id
                          ? "/profile"
                          : `../user/${_user.id}`
                      }
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        size="small"
                        style={{
                          textTransform: "none",
                          color: `${themeColor === "light" ? "#1A2027" : "#fff"
                            }`,
                          width: "250px",
                          ...{ justifyContent: "flex-start" },
                        }}
                      >
                        <Avatar src={_user.avatar} alt="Avatar" />
                        <span style={{ fontSize: "18px", paddingLeft: "10px" }}>
                          {`${_user.firstName} ${_user.lastName}`}
                        </span>
                      </Button>
                    </Link>
                  </div>
                ))
              ) : (
                <Typography
                  textAlign={"center"}
                  sx={{
                    width: "500px",
                    marginLeft: "calc(50vw - 14vw - 250px)",
                  }}
                >
                  {!hasUser.hasUser && hasUser.query
                    ? `Hệ thống không thể  tìm thấy bài viết hay người dùng là "${hasUser.query}"`
                    : ""}
                </Typography>
              )}
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </>
  );
};

export default SearchArticle;
