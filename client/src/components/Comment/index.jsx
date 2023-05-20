import SendIcon from "@mui/icons-material/Send";
import { Avatar, Box, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Link } from "react-router-dom";
import { addComment, getComments } from "../../redux/articleSlice";

const index = ({ articleId }) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector((state) => state.article.comments);
  const { id: userId } = useAppSelector((state) => state.user.user);
  const themeColor = useAppSelector((state) => state.theme.color);
  useEffect(() => {
    (async () => {
      await dispatch(getComments({ articleId }));
    })();
  }, [articleId]);
  const [comment, setComment] = useState("");

  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  const keyPress = async (e) => {
    if (e.key === "Enter" && comment) {
      await dispatch(addComment({ articleId, content: comment }));
      // await dispatch(getCommentPost(postId));
      setComment("");
    }
  };

  const handleSendComment = async () => {
    await dispatch(addComment({ articleId, content: comment }));
    // await dispatch(getCommentPost(postId));
    setComment("");
  };

  return (
    <>
      <Box
        height={"75%"}
        borderTop={`1px solid ${
          themeColor === "light" ? "#a6aeb8" : "#2d3748"
        }`}
        sx={{
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
        {comments.map((comment) => {
          return (
            <div
              key={comment.id}
              style={{
                display: "flex",
                margin: "10px",
              }}
            >
              <Link
                to={
                  userId === comment.userId
                    ? "/profile"
                    : `../user/${comment.userId}`
                }
                onClick={() => handleClickUser()}
              >
                <Avatar
                  src={comment?.user.avatar}
                  aria-label="recipe"
                  sx={{ width: "35px", height: "35px" }}
                />
              </Link>
              <div
                style={{
                  backgroundColor: "#E4E6EB",
                  width: "auto",
                  padding: "0px 10px",
                  marginLeft: "5px",
                  borderRadius: "10px",
                }}
              >
                <Link
                  to={
                    userId === comment.userId
                      ? "/profile"
                      : `../user/${comment.userId}`
                  }
                  style={{
                    color: "black",
                    textDecoration: "none",
                    ":hover": {
                      color: "red",
                      textDecoration: "underline",
                    },
                  }}
                  onClick={() => handleClickUser()}
                >
                  <Typography
                    variant="i"
                    sx={{
                      ":hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {comment.user?.firstName + " " + comment.user?.lastName}
                  </Typography>
                </Link>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "15px", color: "black" }}
                >
                  {comment.content}
                </Typography>
              </div>
            </div>
          );
        })}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          marginLeft: "5px",
        }}
      >
        <TextField
          sx={{
            width: "100%",
            "& input": {
              color: `${themeColor === "light" ? "#1A2027" : "#fff"}`,
            },

            // color: "white",
          }}
          //   color={`${themeColor === "light" ? "#1A2027" : "#fff"}`}
          // id="input-with-sx"
          variant="standard"
          value={comment}
          onChange={onChangeComment}
          onKeyDown={keyPress}
          placeholder="Viết bình luận"
        />
        <IconButton onClick={async () => await handleSendComment()}>
          <SendIcon sx={{ color: "#1976d2" }} />
        </IconButton>
      </Box>
    </>
  );
};

export default index;
