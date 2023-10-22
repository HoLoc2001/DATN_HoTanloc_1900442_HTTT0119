import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import Article from "../Article";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Link, useParams } from "react-router-dom";
import { follow, getUserByUserId } from "../../redux/userSlice";
import { getArticleByUserId } from "../../redux/articleSlice";

const OtherUser = () => {
  const dispatch = useAppDispatch();
  const { userId } = useParams();

  const isSuccessAuth = useAppSelector((state) => state.auth.isAuthenticated);
  const themeColor = useAppSelector((state) => state.theme.color);
  const { isFollowed } = useAppSelector((state) => state.user.authorPost);
  const user = useAppSelector((state) => state.user.otherUser);
  const userArticles = useAppSelector((state) => state.article.userArticles);

  const [page, setPage] = useState(userArticles?.length || 0);

  const [hasPost, setHasPost] = useState(() => {
    if (userArticles?.length % 6 === 0 && userArticles?.length !== 0) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    (async () => {
      await dispatch(getUserByUserId({ userId }));
    })();
  }, [userId]);

  useEffect(() => {
    setPage(0);
  }, [isSuccessAuth]);

  useEffect(() => {
    (async () => {
      await dispatch(getArticleByUserId({ userId, page }));
      setHasPost(() => {
        if (userArticles?.length % 6 === 0 && userArticles?.length >= page) {
          return true;
        }
        return false;
      });
    })();
  }, [page, isSuccessAuth]);

  const handleFollow = async (userId) => {
    if (!isSuccessAuth) return setErrMissInput(true);

    await dispatch(follow({ userId }));
  };

  return (
    <>
      <Box>
        <Box
          textAlign={"center"}
          sx={{
            width: "1",
            ...(themeColor === "light"
              ? { backgroundColor: "#fff", color: "#171717" }
              : { backgroundColor: "#0E1217", color: "#fff2f2" }),
          }}
        >
          <Avatar
            src={user?.avatar}
            aria-label="recipe"
            sx={{
              marginLeft: "calc(50vw - 14vw - 40px)",
              height: "80px",
              width: "80px",
            }}
          />

          <Typography
            sx={{
              marginTop: "15px",
              width: "500px",
              marginLeft: "calc(50vw - 14vw - 250px)",
            }}
            zIndex={"2000"}
            variant="h5"
            component="div"
          >
            {user?.firstName + " " + user?.lastName}
          </Typography>
        </Box>
      </Box>
      {/* <Button
        onClick={() => handleFollow(userId)}
        sx={{
          marginTop: "30px",
          marginBottom: "30px",
          marginLeft: "calc(50vw - 14vw - 100px)",
          width: "200px",
          textTransform: "none",

          backgroundColor: `${isFollowed ? "#ffffff" : "#3b49df"}`,
          border: `${isFollowed ? "1px solid #a3a3a3" : "1px solid #3b49df"}`,
          ...(isFollowed
            ? {
              color: `${themeColor === "light" ? "#3d3d3d" : "#3d3d3d"}`,
            }
            : {
              color: `${themeColor === "light" ? "#f9f9f9" : "#090909"}`,
            }),
          ":hover": {
            backgroundColor: `${isFollowed ? "#a3a3a3" : "#2f3ab2"}`,
          },
        }}
      >
        {isFollowed ? "Following" : "Follow"}
      </Button> */}
      <Divider
        sx={{
          width: "98%",
          borderColor: `${themeColor === "light" ? "#a6aeb8" : "#2d3748"}`,
        }}
      />
      {userArticles?.length ? (
        <Article
          _articles={userArticles}
          _setPage={setPage}
          hasPost={hasPost}
        />
      ) : (
        <Typography sx={{ margin: "25px 0 0 0" }}>
          Người dùng này chưa đăng bài.
        </Typography>
      )}
    </>
  );
};

export default OtherUser;
