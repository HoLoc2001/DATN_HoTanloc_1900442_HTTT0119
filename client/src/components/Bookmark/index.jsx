import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Article from "../Article";
import { useAppDispatch, useAppSelector } from "../../redux/store";

import { Link, useParams } from "react-router-dom";
import { getArticleByTag } from "../../redux/tagSlice";
import { getBookmark } from "../../redux/bookmarkSlice";

const index = () => {
  const dispatch = useAppDispatch();
  const { tag } = useParams();
  const bookmarks = useAppSelector((state) => state.bookmark.bookmarks);
  const [page, setPage] = useState(bookmarks?.length || 0);

  const [hasPost, setHasPost] = useState(() => {
    if (bookmarks?.length % 5 === 0 && bookmarks?.length !== 0) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    (async () => {
      await dispatch(getBookmark({ page }));
      setHasPost(() => {
        if (bookmarks?.length % 5 === 0 && bookmarks?.length >= page) {
          return true;
        }
        return false;
      });
    })();
  }, [page]);
  return (
    <>
      <Box sx={{ color: "#fff" }} justifyContent={"center"}>
        <Typography>Bookmark</Typography>
        {bookmarks ? (
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
