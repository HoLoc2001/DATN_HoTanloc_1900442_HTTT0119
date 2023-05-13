import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Paper,
  Skeleton,
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
import InfiniteScroll from "./InfiniteScroll";
import AlertInfo from "../AlertInfo";
import { addBookmark } from "../../redux/bookmarkSlice";

const index = ({ _articles, _setPage, _hasPost }) => {
  const dispatch = useAppDispatch();
  const articles =
    _articles || useAppSelector((state) => state.article.articles);
  const themeColor = useAppSelector((state) => state.theme.color);
  const isSuccessAuth = useAppSelector((state) => state.auth.isAuthenticated);

  const [errMissInput, setErrMissInput] = useState(false);

  const [page, setPage] = useState(articles?.length || 0);

  const [hasPost, setHasPost] = useState(() => {
    if (articles.length % 5 === 0 && articles.length !== 0) {
      return true;
    }
    return false;
  });

  if (!_articles) {
    useEffect(() => {
      (async () => {
        await dispatch(getArticles(page));
        setHasPost(() => {
          if (articles.length % 5 === 0 && articles.length >= page) {
            return true;
          }
          return false;
        });
      })();
    }, [page]);
  }

  const handleClickLike = (e) => {
    e.preventDefault();

    if (!isSuccessAuth) setErrMissInput(true);
  };

  const handleClickComment = (e) => {
    e.preventDefault();

    if (!isSuccessAuth) setErrMissInput(true);
  };

  const handleClickBookmark = async (event, { articleId }) => {
    event.preventDefault();

    if (!isSuccessAuth) {
      return setErrMissInput(true);
    }
    await dispatch(addBookmark(articleId));
  };

  return (
    <Box>
      <InfiniteScroll
        getMore={() => {
          _setPage ? _setPage((prev) => prev + 5) : setPage((prev) => prev + 5);
        }}
        hasMore={articles.length && (hasPost || _hasPost)}
      >
        <Grid container spacing={10}>
          {articles.map((article) => (
            <Grid
              item
              columns={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}
              key={article.id}
              sx={{
                marginTop: "10px",
              }}
            >
              <Link to={`/${article.id}`} style={{ textDecoration: "none" }}>
                <Paper
                  sx={{
                    height: "410px",
                    width: "350px",
                    color: `${
                      themeColor === "light"
                        ? "rgb(8 9 10)"
                        : "rgb(245 245 245)"
                    }`,
                    border: `1px solid ${
                      themeColor === "light"
                        ? "rgb(245 245 245)"
                        : "rgba(45,50,59,255)"
                    } `,
                    backgroundColor: `${
                      themeColor === "light"
                        ? "rgb(245 245 245)"
                        : "rgba(45,50,59,255)"
                    }`,

                    borderRadius: "10px",
                    ":hover": {
                      border: `1px solid ${
                        themeColor === "light"
                          ? "rgba(45,50,59,255)"
                          : "rgb(245 245 245)"
                      }`,
                      cursor: "pointer",
                    },
                  }}
                >
                  <Box onClick={() => window.scroll({ top: 0, left: 0 })}>
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      p={"10px 0 0 10px"}
                    >
                      <Tooltip
                        title={
                          article.user?.firstName + " " + article.user?.lastName
                        }
                      >
                        <Avatar
                          sx={{ marginRight: "5px" }}
                          src={article.user?.avatar}
                        />
                      </Tooltip>
                      <Typography>
                        {article.user?.firstName + " " + article.user?.lastName}
                      </Typography>
                    </Box>
                    <Tooltip title={article.title}>
                      <Typography
                        p={"10px 0 0 10px"}
                        variant="h5"
                        height={"100px"}
                      >
                        {article.title?.length <= 40
                          ? article.title
                          : article.title?.substr(0, 40) + "..."}
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
                  </Box>

                  <Grid item xs={12}>
                    <Grid
                      container
                      justifyContent="center"
                      spacing={12}
                      // color={"rgb(245 245 245)"}
                    >
                      <Grid key={1} item display={"flex"} alignItems={"center"}>
                        <Tooltip title="Like">
                          <IconButton
                            sx={{
                              color: `${
                                themeColor === "light" ? "" : "rgb(245 245 245)"
                              }`,
                              ":hover": {
                                backgroundColor: `${
                                  themeColor === "light" ? "#e2e3f3" : "#5c5d5f"
                                }`,
                                color: `${
                                  themeColor === "light"
                                    ? ""
                                    : "rgba(249,242,222,255)"
                                }`,
                              },
                            }}
                            onClick={handleClickLike}
                          >
                            <FavoriteBorderIcon />
                          </IconButton>
                        </Tooltip>
                        <Typography>{article._count?.likes}</Typography>
                      </Grid>
                      <Grid key={2} item display={"flex"} alignItems={"center"}>
                        <Tooltip title="Comment">
                          <IconButton
                            sx={{
                              color: `${
                                themeColor === "light" ? "" : "rgb(245 245 245)"
                              }`,
                              ":hover": {
                                backgroundColor: `${
                                  themeColor === "light" ? "#e2e3f3" : "#5c5d5f"
                                }`,
                                color: `${
                                  themeColor === "light"
                                    ? ""
                                    : "rgba(249,242,222,255)"
                                }`,
                              },
                            }}
                            onClick={handleClickComment}
                          >
                            <CommentIcon />
                          </IconButton>
                        </Tooltip>
                        <Typography>{article._count?.comments}</Typography>
                      </Grid>
                      <Grid key={3} item>
                        <Tooltip title="Bookmark">
                          <IconButton
                            sx={{
                              color: `${
                                themeColor === "light" ? "" : "rgb(245 245 245)"
                              }`,
                              ":hover": {
                                backgroundColor: `${
                                  themeColor === "light" ? "#e2e3f3" : "#5c5d5f"
                                }`,
                                color: `${
                                  themeColor === "light"
                                    ? ""
                                    : "rgba(249,242,222,255)"
                                }`,
                              },
                            }}
                            onClick={(event) =>
                              handleClickBookmark(event, {
                                articleId: article.id,
                              })
                            }
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
      </InfiniteScroll>
      {/* <Typography sx={{ textAlign: "center", color: "rgba(163,174,201,255)" }}>
        End Load
      </Typography> */}
      <AlertInfo
        err={errMissInput}
        setErr={setErrMissInput}
        severity="info"
        content="Please login"
      />
    </Box>
  );
};

export default index;
