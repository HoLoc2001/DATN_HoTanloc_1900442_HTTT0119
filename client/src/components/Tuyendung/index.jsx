import { Box, Grid, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Article from "../Article";
import { useAppDispatch, useAppSelector } from "../../redux/store";

import { getBookmark, getTuyendung } from "../../redux/articleSlice";

const index = () => {
    const dispatch = useAppDispatch();
    const isSuccessAuth = useAppSelector((state) => state.auth.isAuthenticated);
    const themeColor = useAppSelector((state) => state.theme.color);
    const tuyendung = useAppSelector((state) => state.article.tuyendung);
    const [page, setPage] = useState(tuyendung?.length || 0);
    const [chude, setChude] = useState();
    const { type } = useAppSelector((state) => state.article);
    const [hasPost, setHasPost] = useState(() => {
        if (tuyendung?.length % 6 === 0 && tuyendung?.length !== 0) {
            return true;
        }
        return false;
    });

    useEffect(() => {
        setPage(0);
        setChude(type)
    }, [type]);

    useEffect(() => {
        (async () => {
            await dispatch(getTuyendung({ page, type }));
            setHasPost(() => {
                if (tuyendung?.length % 6 === 0 && tuyendung?.length >= page) {
                    return true;
                }
                return false;
            });
        })();
    }, [page, isSuccessAuth]);

    if (tuyendung.length === 0) {
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
            <Box
                sx={{
                    color: `${themeColor === "light" ? "#1A2027" : "rgba(249,242,222,255)"
                        }`,
                }}
                justifyContent={"center"}
            >
                {tuyendung?.length ? (
                    <Article _articles={tuyendung} _setPage={setPage} hasPost={hasPost} />
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
