import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch, useAppSelector } from "../redux/store";
import React, { useState, useEffect } from "react";
import { articleSearch } from "../redux/articleSlice";
import Article from "./Article";

const SearchArticle = () => {
  const dispatch = useAppDispatch();
  const isSuccessAuth = useAppSelector((state) => state.auth.isAuthenticated);
  const themeColor = useAppSelector((state) => state.theme.color);
  const articles = useAppSelector((state) => state.article.articleSearch);
  const [hasArticle, setHasArticle] = useState({
    hasArticle: false,
    query: "",
  });

  const [query, setQuery] = useState(sessionStorage.getItem("query") || "");
  const [page, setPage] = useState(0);

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
        setHasPost(() => {
          if (articles?.length % 6 === 0 && articles?.length >= page) {
            return true;
          }
          return false;
        });
      })();
    }
  }, [page, isSuccessAuth]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    sessionStorage.setItem("query", e.target.value);
  };

  const keyPress = async (e) => {
    if (e.key === "Enter" && query) {
      const { payload } = await dispatch(articleSearch({ page, query }));

      setHasArticle({
        ...hasArticle,
        hasArticle: !!payload.length,
        query: query,
      });
    }
  };

  const handleSendComment = async () => {
    if (query) {
      await dispatch(articleSearch({ page, query }));
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
      // vertical padding + font size from searchIcon
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
            autoFocus
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton onClick={handleSendComment}>
            <SearchIcon />
          </IconButton>
        </Search>
      </Box>
      <Box marginTop={"50px"}>
        {articles?.length ? (
          <Article _articles={articles} _setPage={setPage} hasPost={hasPost} />
        ) : (
          <Typography
            textAlign={"center"}
            sx={{ width: "500px", marginLeft: "calc(50vw - 14vw - 250px)" }}
          >
            {!hasArticle.hasArticle && hasArticle.query
              ? `We couldn't find anything for "${hasArticle.query}"`
              : ""}
          </Typography>
        )}
      </Box>
    </>
  );
};

export default SearchArticle;
