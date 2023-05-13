import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getArticleByArticleId } from "../../redux/articleSlice";
import { Box, Skeleton, Stack, Typography } from "@mui/material";

const ReadArticle = () => {
  const dispatch = useAppDispatch();
  const { articleId } = useParams();
  const themeColor = useAppSelector((state) => state.theme.color);

  const article = useAppSelector((state) => state.article.article);
  useEffect(() => {
    (async () => {
      await dispatch(getArticleByArticleId(articleId));
    })();
  }, []);

  if (articleId != article?.id) {
    return (
      <>
        <Stack spacing={1}>
          {/* For variant="text", adjust the height via font-size */}
          <Skeleton
            variant="text"
            sx={{
              fontSize: "3.75rem",
              backgroundColor: "whitesmoke",
              width: "800px",
            }}
          />

          <Skeleton
            variant="rounded"
            sx={{
              height: "1000px",
              width: "800px",
              backgroundColor: "whitesmoke",
            }}
          />
        </Stack>
      </>
    );
  }
  return (
    <>
      <Box sx={{ width: "800px" }}>
        <Typography variant="h2">{article?.title}</Typography>
        <Box display={"flex"}>
          {article?.tags.map((tag) => {
            return (
              <Link
                to={`../tag/${tag.name}`}
                style={{
                  textDecoration: "none",
                  color: `${themeColor === "light" ? "#1A2027" : "#fff"}`,
                }}
                key={tag.name}
              >
                <Typography
                  variant="h7"
                  sx={{
                    ":hover": {
                      backgroundColor: `${
                        themeColor === "light"
                          ? "#e2e3f3"
                          : "rgba(45,50,59,255)"
                      }`,
                      color: `${
                        themeColor === "light"
                          ? "#1A2027"
                          : "rgba(249,242,222,255)"
                      }`,
                    },
                  }}
                >
                  #{tag.name}&ensp;
                </Typography>
              </Link>
            );
          })}
        </Box>
        <img
          style={{
            objectFit: "contain",
          }}
          src={article.thumbnail}
        />
        <div dangerouslySetInnerHTML={{ __html: article?.content }} />
        <Typography color={"#ff000000"}>a </Typography>
      </Box>
    </>
  );
};

export default ReadArticle;
