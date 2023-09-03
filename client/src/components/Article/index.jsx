import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import moment from "moment";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  deleteArticle,
  getArticles,
  updateLike,
} from "../../redux/articleSlice";
import { Link } from "react-router-dom";
import InfiniteScroll from "./InfiniteScroll";
import AlertInfo from "../AlertInfo";
import { addBookmark, removeBookmark } from "../../redux/articleSlice";
import SetTags from "../SetTags";

const index = ({ _articles, _setPage, _hasPost }) => {
  moment().format();
  const dispatch = useAppDispatch();
  const articles =
    _articles || useAppSelector((state) => state.article.articles);
  const themeColor = useAppSelector((state) => state.theme.color);
  const isSuccessAuth = useAppSelector((state) => state.auth.isAuthenticated);
  const { id: userId } = useAppSelector((state) => state.user.user);

  const [errMissInput, setErrMissInput] = useState(false);

  const [page, setPage] = useState(articles?.length || 0);
  const [articleId, setArticleId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [hasPost, setHasPost] = useState(() => {
    if (articles?.length % 6 === 0 && articles?.length !== 0) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    setPage(0);
  }, [isSuccessAuth]);

  if (!_articles) {
    useEffect(() => {
      (async () => {
        await dispatch(getArticles(page));
        setHasPost(() => {
          if (articles?.length % 6 === 0 && articles?.length >= page) {
            return true;
          }
          return false;
        });
      })();
    }, [page, isSuccessAuth]);
  }

  const handleLike = async (e, { articleId }) => {
    e.preventDefault();

    if (!isSuccessAuth) return setErrMissInput(true);
    await dispatch(updateLike(articleId));
  };

  const handleClickComment = (e) => {
    e.preventDefault();

    if (!isSuccessAuth) setErrMissInput(true);
  };

  const handleAddBookmark = async (event, { articleId, index }) => {
    event.preventDefault();

    if (!isSuccessAuth) {
      return setErrMissInput(true);
    }
    await dispatch(addBookmark({ articleId }));
  };

  const handleRemoveBookmark = async (event, { articleId }) => {
    event.preventDefault();

    if (!isSuccessAuth) {
      return setErrMissInput(true);
    }
    await dispatch(removeBookmark({ articleId }));
  };

  const handleClick = (e) => {
    e.preventDefault();
  };

  const handleClickMore = (event, { articleId }) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setArticleId(articleId);
  };

  const handleDeleteArticle = async () => {
    setAnchorEl(null);
    await dispatch(deleteArticle({ articleId }));
  };

  if (articles?.length === 0) {
    return (
      <>
        <Grid container spacing={0} marginTop={"34px"}>
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <Grid
              item
              columns={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}
              key={index}
              padding={"0"}
              sx={{
                margin: "10px 5% 2% 0",
                height: "410px",
              }}
            >
              <Skeleton
                variant="rounded"
                sx={{
                  height: "410px",
                  width: "350px",
                  color: `${themeColor === "light" ? "rgb(8 9 10)" : "rgb(245 245 245)"
                    }`,
                  border: `1px solid ${themeColor === "light"
                    ? "rgb(245 245 245)"
                    : "rgba(45,50,59,255)"
                    } `,
                  backgroundColor: `${themeColor === "light"
                    ? "rgb(245 245 245)"
                    : "rgba(45,50,59,255)"
                    }`,

                  borderRadius: "10px",
                  ":hover": {
                    border: `1px solid ${themeColor === "light"
                      ? "rgba(45,50,59,255)"
                      : "rgb(245 245 245)"
                      }`,
                    cursor: "pointer",
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </>
    );
  }

  return (
    <>
      {/* {!_articles && isSuccessAuth ? <SetTags /> : ""} */}
      <InfiniteScroll
        getMore={() => {
          _setPage ? _setPage((prev) => prev + 6) : setPage((prev) => prev + 6);
        }}
        hasMore={articles?.length && (hasPost || _hasPost)}
      >
        <Grid container spacing={0}>
          {articles?.map((article, index) => (
            <Grid
              item
              columns={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}
              key={article.id}
              padding={"0"}
              sx={{
                margin: "10px 5% 2% 0",
                height: "410px",
              }}
            >
              <Link to={`/${article.id}`} style={{ textDecoration: "none" }}>
                <Paper
                  sx={{
                    height: "410px",
                    width: "350px",
                    color: `${themeColor === "light"
                      ? "rgb(8, 9, 10)"
                      : "rgb(245, 245, 245)"
                      }`,
                    border: `1px solid ${themeColor === "light"
                      ? "rgb(245, 245, 245)"
                      : "rgba(45,50,59,255)"
                      } `,
                    backgroundColor: `${themeColor === "light"
                      ? "white"
                      : "rgba(45,50,59,255)"
                      }`,

                    borderRadius: "10px",
                    ":hover": {
                      border: `1px solid ${themeColor === "light"
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
                      <Typography minWidth={"200px"}>
                        {article.user?.firstName + " " + article.user?.lastName}
                      </Typography>
                      <Box
                        marginLeft={"3vw"}
                        display={`${article.userId === userId ? "block" : "none"
                          }`}
                        sx={{}}
                      >
                        <IconButton
                          onClick={(event) =>
                            handleClickMore(event, { articleId: article.id })
                          }
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Box>
                    </Box>
                    <Tooltip title={article.title}>
                      <Typography
                        p={"10px 0 0 10px"}
                        variant="h5"
                        height={"80px"}
                      >
                        {article.title?.length <= 40
                          ? article.title
                          : article.title?.substr(0, 40) + "..."}
                      </Typography>
                    </Tooltip>
                    <Typography paddingLeft={"10px"}>
                      {moment(article.createdAt, "YYYYMMDD").fromNow()}
                    </Typography>
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
                              color: `${themeColor === "light" ? "" : "rgb(245 245 245)"
                                }`,
                              ":hover": {
                                backgroundColor: `${themeColor === "light" ? "#e2e3f3" : "#5c5d5f"
                                  }`,
                                color: `${themeColor === "light"
                                  ? ""
                                  : "rgba(249,242,222,255)"
                                  }`,
                              },
                            }}
                            onClick={(event) =>
                              handleLike(event, {
                                articleId: article.id,
                              })
                            }
                          >
                            {article.isLiked ? (
                              <FavoriteIcon sx={{ color: "red" }} />
                            ) : (
                              <FavoriteBorderIcon />
                            )}
                          </IconButton>
                        </Tooltip>
                        <Typography>{article._count?.likes}</Typography>
                      </Grid>
                      <Grid key={2} item display={"flex"} alignItems={"center"}>
                        <Tooltip title="Comment">
                          <IconButton
                            sx={{
                              color: `${themeColor === "light" ? "" : "rgb(245 245 245)"
                                }`,
                              ":hover": {
                                backgroundColor: `${themeColor === "light" ? "#e2e3f3" : "#5c5d5f"
                                  }`,
                                color: `${themeColor === "light"
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
                        {article.isBookmarked ? (
                          <Tooltip title="Remove bookmark">
                            <IconButton
                              sx={{
                                color: `${themeColor === "light"
                                  ? ""
                                  : "rgb(245 245 245)"
                                  }`,
                                ":hover": {
                                  backgroundColor: `${themeColor === "light"
                                    ? "#e2e3f3"
                                    : "#5c5d5f"
                                    }`,
                                  color: `${themeColor === "light"
                                    ? ""
                                    : "rgba(249,242,222,255)"
                                    }`,
                                },
                              }}
                              onClick={(event) =>
                                handleRemoveBookmark(event, {
                                  articleId: article.id,
                                })
                              }
                            >
                              <BookmarkRemoveIcon />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip title="Add bookmark">
                            <IconButton
                              sx={{
                                color: `${themeColor === "light"
                                  ? ""
                                  : "rgb(245 245 245)"
                                  }`,
                                ":hover": {
                                  backgroundColor: `${themeColor === "light"
                                    ? "#e2e3f3"
                                    : "#5c5d5f"
                                    }`,
                                  color: `${themeColor === "light"
                                    ? ""
                                    : "rgba(249,242,222,255)"
                                    }`,
                                },
                              }}
                              onClick={(event) =>
                                handleAddBookmark(event, {
                                  articleId: article.id,
                                })
                              }
                            >
                              <BookmarkAddIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          <Link
            to={`../update/${articleId}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            Update
          </Link>
        </MenuItem>
        <MenuItem onClick={handleDeleteArticle}>Delete</MenuItem>
      </Menu>
      <AlertInfo
        err={errMissInput}
        setErr={setErrMissInput}
        severity="info"
        content="Please login"
      />
    </>
  );
};

export default index;
