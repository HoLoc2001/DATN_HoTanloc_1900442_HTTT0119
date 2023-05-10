import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getArticleByArticleId } from "../../redux/articleSlice";
import { Box, Typography } from "@mui/material";

const ReadArticle = () => {
  const dispatch = useAppDispatch();
  const { articleId } = useParams();
  const article = useAppSelector((state) => state.article.article);
  useEffect(() => {
    (async () => {
      await dispatch(getArticleByArticleId(articleId));
    })();
  }, []);
  console.log(article);
  return (
    <>
      <Box sx={{ width: "800px" }}>
        <Typography variant="h2">{article?.title}</Typography>
        <Box display={"flex"}>
          {article?.tags.map((tag) => {
            return (
              <Typography key={tag.name} variant="h7">
                #{tag.name}&ensp;
              </Typography>
            );
          })}
        </Box>
        <div dangerouslySetInnerHTML={{ __html: article?.content }} />
        <div>w</div>
      </Box>
    </>
  );
};

export default ReadArticle;
