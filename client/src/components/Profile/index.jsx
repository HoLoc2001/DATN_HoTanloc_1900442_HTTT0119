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
import { getUserByUserId } from "../../redux/userSlice";
import { getArticleByUserId, getMyArticles } from "../../redux/articleSlice";

const index = () => {
  const dispatch = useAppDispatch();
  const themeColor = useAppSelector((state) => state.theme.color);
  const user = useAppSelector((state) => state.user.user);
  const isSuccessAuth = useAppSelector((state) => state.auth.isAuthenticated);
  const myArticles = useAppSelector((state) => state.article.myArticles);

  const [page, setPage] = useState(myArticles?.length || 0);

  const [hasPost, setHasPost] = useState(() => {
    if (myArticles?.length % 6 === 0 && myArticles?.length !== 0) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    setPage(0);
  }, [isSuccessAuth]);

  useEffect(() => {
    (async () => {
      await dispatch(getMyArticles({ page }));
      setHasPost(() => {
        if (myArticles?.length % 6 === 0 && myArticles?.length >= page) {
          return true;
        }
        return false;
      });
    })();
  }, [page, isSuccessAuth]);
  return (
    <>
      <Box display={"flex"}>
        <Box
          textAlign={"center"}
          sx={{
            width: "1",
            ...(themeColor === "light"
              ? { backgroundColor: "rgb(255 242 242)", color: "#171717" }
              : { backgroundColor: "#0E1217", color: "#fff2f2" }),
          }}
        >
          <Avatar
            src={user?.avatar}
            aria-label="recipe"
            sx={{
              marginLeft: "calc(50vw - 16vw - 40px)",
              height: "80px",
              width: "80px",
            }}
          />

          <Typography
            sx={{
              marginTop: "15px",
              width: "500px",
              marginLeft: "calc(50vw - 16vw - 250px)",
            }}
            zIndex={"2000"}
            variant="h5"
            component="div"
          >
            {user?.firstName + " " + user?.lastName}
          </Typography>
        </Box>
        <Box marginTop={"2%"} marginLeft={"-15%"}>
          <Link to={"../../editProfile"} style={{ textDecoration: "none" }}>
            <Button
              sx={{
                textTransform: "none",
                border: "1px solid #a3a3a3",
                color: `${themeColor === "light" ? "#171717" : "#fff2f2"}`,
              }}
            >
              Edit Profile
            </Button>
          </Link>
        </Box>
      </Box>
      <Divider
        sx={{
          width: "98%",
          borderColor: `${themeColor === "light" ? "#a6aeb8" : "#2d3748"}`,
        }}
      />
      {myArticles.length ? (
        <Article _articles={myArticles} _setPage={setPage} hasPost={hasPost} />
      ) : (
        <Typography sx={{ margin: "25px 0 0 0" }}>
          Your bookmark list is empty.
        </Typography>
      )}
    </>
  );
};

export default index;
