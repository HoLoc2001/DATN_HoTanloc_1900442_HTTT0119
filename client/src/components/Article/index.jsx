import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getArticles } from "../../redux/articleSlice";
import { Link } from "react-router-dom";

const index = () => {
  const dispatch = useAppDispatch();
  const articles = useAppSelector((state) => state.article.articles);
  const [page, setPage] = useState(articles?.length);

  const [hasPost, setHasPost] = useState(() => {
    if (articles?.length % 5 === 0 && articles?.length !== 0) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    (async () => {
      await dispatch(getArticles());
      setHasPost(() => {
        if (articles?.length % 5 === 0 && articles?.length >= page) {
          return true;
        }
        return false;
      });
    })();
  }, [page]);

  console.log(articles);

  return (
    <Box>
      <Grid container spacing={10}>
        {articles?.map((article) => (
          <Grid
            item
            columns={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}
            key={article.id}
            sx={{
              marginTop: "20px",
            }}
          >
            <Link to={`/${article.id}`} style={{ textDecoration: "none" }}>
              <Paper
                sx={{
                  height: "410px",
                  width: "350px",
                  color: "white",
                  border: "1px solid rgba(45,50,59,255)",
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "#1A2027"
                      : "rgba(45,50,59,255)",
                  borderRadius: "10px",
                  ":hover": {
                    border: "1px solid #fff",
                    cursor: "pointer",
                  },
                }}
              >
                <Box display={"flex"} alignItems={"center"} p={"10px 0 0 10px"}>
                  <Tooltip
                    title={article.user.firstName + " " + article.user.lastName}
                  >
                    <Avatar
                      sx={{ marginRight: "5px" }}
                      src={article.user.avatar}
                    />
                  </Tooltip>
                  <Typography>
                    {article.user.firstName + " " + article.user.lastName}
                  </Typography>
                </Box>
                <Tooltip title={article.title}>
                  <Typography p={"10px 0 0 10px"} variant="h5" height={"100px"}>
                    {article.title.length <= 40
                      ? article.title
                      : article.title.substr(0, 40) + "..."}
                  </Typography>
                </Tooltip>
                <img
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                  }}
                  src={article.thumbnail}
                />

                <Grid item xs={12}>
                  <Grid
                    container
                    justifyContent="center"
                    spacing={12}
                    color={"#fff"}
                  >
                    <Grid key={1} item display={"flex"} alignItems={"center"}>
                      <Tooltip title="Like">
                        <IconButton
                          sx={{
                            color: "#fff",
                            ":hover": {
                              backgroundColor: "#5c5d5f",
                              color: "rgba(249,242,222,255)",
                            },
                          }}
                        >
                          <FavoriteBorderIcon />
                        </IconButton>
                      </Tooltip>
                      <Typography>{article._count.likes}</Typography>
                    </Grid>
                    <Grid key={2} item display={"flex"} alignItems={"center"}>
                      <Tooltip title="Comment">
                        <IconButton
                          sx={{
                            color: "#fff",
                            ":hover": {
                              backgroundColor: "#5c5d5f",
                              color: "rgba(249,242,222,255)",
                            },
                          }}
                        >
                          <CommentIcon />
                        </IconButton>
                      </Tooltip>
                      <Typography>{article._count.comments}</Typography>
                    </Grid>
                    <Grid key={3} item>
                      <Tooltip title="Bookmark">
                        <IconButton
                          sx={{
                            color: "#fff",
                            ":hover": {
                              backgroundColor: "#5c5d5f",
                              color: "rgba(249,242,222,255)",
                            },
                          }}
                        >
                          <BookmarkAddIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Link>
          </Grid>
        ))}
      </Grid>
      {/* <Typography sx={{ textAlign: "center", color: "rgba(163,174,201,255)" }}>
        End Load
      </Typography> */}
    </Box>
  );
};

export default index;
