import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useState } from "react";
import { articleSearch } from "../redux/articleSlice";

const SearchArticle = () => {
  const dispatch = useAppDispatch();
  const themeColor = useAppSelector((state) => state.theme.color);
  const articles = useAppSelector((state) => state.article.articleSearch);

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(articleSearch?.length || 0);

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
    width: "700px",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: `${themeColor === "light" ? "#1A2027" : "#fff"}`,
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em )`,
      transition: theme.transitions.create("width"),
      width: "630px",
    },
  }));

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const keyPress = async (e) => {
    if (e.key === "Enter" && search) {
      await dispatch(articleSearch({ page, query }));
      setSearch("");
    }
  };

  const handleSendComment = async () => {
    await dispatch(articleSearch({ page, query }));
    setSearch("");
  };

  return (
    <>
      <Box width={"66%"}>
        <Search sx={{ display: "flex" }}>
          <StyledInputBase
            value={query}
            onChange={handleSearch}
            autoFocus
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton onClick={handleSendComment}>
            <SearchIcon />
          </IconButton>
        </Search>
      </Box>
    </>
  );
};

export default SearchArticle;
