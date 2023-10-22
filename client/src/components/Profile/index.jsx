import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Article from "../Article";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Link, useParams } from "react-router-dom";
import { getUserByUserId } from "../../redux/userSlice";
import { getArticleByUserId, getMyArticles } from "../../redux/articleSlice";
import { getFollowers, getFollowings } from "../../redux/followSlice";

const index = () => {
  const dispatch = useAppDispatch();
  const themeColor = useAppSelector((state) => state.theme.color);
  const user = useAppSelector((state) => state.user.user);
  const isSuccessAuth = useAppSelector((state) => state.auth.isAuthenticated);
  const myArticles = useAppSelector((state) => state.article.myArticles);
  const listFollowing = useAppSelector((state) => state.follow.followings);
  const listFollower = useAppSelector((state) => state.follow.followers);

  const [openModalFollowing, setOpenModelFollowing] = useState(false);
  const [openModalFollower, setOpenModelFollower] = useState(false);
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

  const handleOpenFollowing = async () => {
    await dispatch(getFollowings());
    setOpenModelFollowing(true);
  };

  const handleOpenFollowers = async () => {
    await dispatch(getFollowers());
    setOpenModelFollower(true);
  };
  return (
    <>
      <Box display={"flex"}>
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
          {/* <Link to={"../../editProfile"} style={{ textDecoration: "none" }}>
            <Button
              sx={{
                textTransform: "none",
                border: "1px solid #a3a3a3",
                color: `${themeColor === "light" ? "#171717" : "#fff2f2"}`,
              }}
            >
              Thay đổi
            </Button>
          </Link> */}
        </Box>
      </Box>
      {/* <Box
        display={"flex"}
        textAlign={"center"}
        sx={{
          width: "220px",
          margin: "50px 0 10px calc(50vw - 16vw - 100px)",
          // marginTop: "50px",
        }}
      >
        <Box marginRight={"50px"}>
          <Typography>
            Follower:{" "}
            <span
              style={{ cursor: "pointer", fontWeight: "bold" }}
              onClick={
                user?._count?.followers
                  ? () => handleOpenFollowers(user.id)
                  : () => { }
              }
            >
              {user?._count?.followers}
            </span>
          </Typography>
        </Box>
        <Box>
          <Typography>
            Following:{" "}
            <span
              style={{ cursor: "pointer", fontWeight: "bold" }}
              onClick={
                user?._count?.followings
                  ? () => handleOpenFollowing(user.id)
                  : () => { }
              }
            >
              {user?._count?.followings}
            </span>
          </Typography>
        </Box>
      </Box> */}
      <Divider
        sx={{
          width: "98%",
          borderColor: `${themeColor === "light" ? "#a6aeb8" : "#2d3748"}`,
        }}
      />
      {myArticles?.length ? (
        <Article _articles={myArticles} _setPage={setPage} hasPost={hasPost} />
      ) : (
        <Typography sx={{ margin: "25px 0 0 0" }}></Typography>
      )}

      <Modal
        open={openModalFollowing}
        onClose={() => setOpenModelFollowing(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            height: "500px",
            bgcolor: `${themeColor === "light" ? "#fff" : "#1A2027"}`,
            boxShadow: 24,
            p: 4,
            borderRadius: "5px",
            overflowY: "scroll",

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
          {listFollowing?.map((follow) => (
            <div
              key={follow.following.id}
              style={{
                display: "flex",
                paddingBottom: "10px",
                alignItems: "center",
              }}
            >
              <Link
                to={
                  user.id === follow.following.id
                    ? "/profile"
                    : `../user/${follow.following.id}`
                }
                style={{ textDecoration: "none" }}
              >
                <Button
                  size="small"
                  style={{
                    textTransform: "none",
                    color: `${themeColor === "light" ? "#1A2027" : "#fff"}`,
                    width: "250px",
                    ...{ justifyContent: "flex-start" },
                  }}
                >
                  <Avatar src={follow.following.avatar} alt="Avatar" />
                  <span style={{ fontSize: "18px", paddingLeft: "10px" }}>
                    {`${follow.following.firstName} ${follow.following.lastName}`}
                  </span>
                </Button>
              </Link>
            </div>
          ))}
        </Box>
      </Modal>
      <Modal
        open={openModalFollower}
        onClose={() => setOpenModelFollower(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            height: "500px",
            bgcolor: `${themeColor === "light" ? "#fff" : "#1A2027"}`,
            boxShadow: 24,
            p: 4,
            borderRadius: "5px",
            overflowY: "scroll",

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
          {listFollower?.map((follow) => (
            <div
              key={follow.following?.id}
              style={{
                display: "flex",
                paddingBottom: "10px",
                alignItems: "center",
              }}
            >
              <Link
                to={
                  user.id === follow.following?.id
                    ? "/profile"
                    : `../user/${follow.following?.id}`
                }
                style={{ textDecoration: "none" }}
              >
                <Button
                  size="small"
                  style={{
                    textTransform: "none",
                    color: `${themeColor === "light" ? "#1A2027" : "#fff"}`,
                    width: "250px",
                    ...{ justifyContent: "flex-start" },
                  }}
                >
                  <Avatar src={follow.following?.avatar} alt="Avatar" />
                  <span style={{ fontSize: "18px", paddingLeft: "10px" }}>
                    {`${follow.following?.firstName} ${follow.following?.lastName}`}
                  </span>
                </Button>
              </Link>
            </div>
          ))}
        </Box>
      </Modal>
    </>
  );
};

export default index;
