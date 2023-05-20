import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Article from "../Article";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Link, useParams } from "react-router-dom";
import { getArticleByTag } from "../../redux/tagSlice";

const index = () => {
  const dispatch = useAppDispatch();
  const { tag } = useParams();
  const articles = useAppSelector((state) => state.tag[tag] || []);
  const [page, setPage] = useState(articles?.length || 0);
  const [hasPost, setHasPost] = useState(() => {
    if (articles?.length % 6 === 0 && articles?.length !== 0) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    setPage(0);
  }, [tag]);

  useEffect(() => {
    (async () => {
      await dispatch(getArticleByTag({ tag, page }));
      setHasPost(() => {
        if (articles?.length % 6 === 0 && articles?.length >= page) {
          return true;
        }
        return false;
      });
    })();
  }, [page, tag]);

  return (
    <Box>
      <Typography variant="h5">{`Tag #${tag}`}</Typography>
      <Article _articles={articles} _setPage={setPage} hasPost={hasPost} />
    </Box>
  );
};

export default index;
