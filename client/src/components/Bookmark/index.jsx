import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Article from "../Article";
import { useAppDispatch, useAppSelector } from "../../redux/store";

import { getBookmark } from "../../redux/articleSlice";

const index = () => {
  const dispatch = useAppDispatch();
  const isSuccessAuth = useAppSelector((state) => state.auth.isAuthenticated);
  const bookmarks = useAppSelector((state) => state.article.bookmarks);
  const [page, setPage] = useState(bookmarks?.length || 0);

  const [hasPost, setHasPost] = useState(() => {
    if (bookmarks?.length % 6 === 0 && bookmarks?.length !== 0) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    setPage(0);
  }, [isSuccessAuth]);

  useEffect(() => {
    (async () => {
      await dispatch(getBookmark({ page }));
      setHasPost(() => {
        if (bookmarks?.length % 6 === 0 && bookmarks?.length >= page) {
          return true;
        }
        return false;
      });
    })();
  }, [page, isSuccessAuth]);
  return (
    <>
      <Box sx={{ color: "#fff" }} justifyContent={"center"}>
        <Typography height={"36.5px"}>Bookmark</Typography>
        {bookmarks?.length ? (
          <Article _articles={bookmarks} _setPage={setPage} hasPost={hasPost} />
        ) : (
          <Typography sx={{ margin: "25px 0 0 0" }}>
            Your bookmark list is empty.
          </Typography>
        )}
      </Box>
    </>
  );
};

export default index;
