import {
    Avatar,
    Box,
    Chip,
    Divider,
    Grid,
    IconButton,
    Skeleton,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import SendIcon from "@mui/icons-material/Send";
import { createchat, getchats } from "../../redux/chat";

const index = () => {
    const dispatch = useAppDispatch();
    const [content, setContent] = useState("");
    const [active, setActive] = useState(0);
    const { id: userId } = useAppSelector((state) => state.user.user);
    const { chats } = useAppSelector((state) => state.chat);

    const data = [
        "Loremghdiwqg",
        "qjdhiuqwhdiuqwdhiuqwd",
        "dqhwuiqwhduiqwdhiquwdhiuqwdhiquwdh",
    ];

    console.log(chats, userId, "--------------------------");

    useEffect(() => {
        (async () => {
            if (userId) {
                await dispatch(getchats(userId));
            }
            // setHasPost(() => {
            //     if (bookmarks?.length % 6 === 0 && bookmarks?.length >= page) {
            //         return true;
            //     }
            //     return false;
            // });
        })();
    }, [userId]);

    const handelOnChange = (e) => {

        setContent(e.target.value)
    }

    const handelClickSend = async () => {
        await dispatch(createchat({ chatId: chats[active].id, content }))

    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={2} sx={{ backgroundColor: "#f6f6f6", height: "94vh" }}>
                    <TextField
                        InputProps={{
                            style: {
                                borderRadius: "15px",
                                marginBottom: "10px",
                            },
                        }}
                        fullWidth
                        label="Tìm kiếm"
                        id="fullWidth"
                    />
                    {chats?.map((chat, index) => {
                        return (
                            <Box
                                key={chat.id}
                                onClick={() => {
                                    setActive(index);
                                }}
                                sx={{
                                    ":hover": { background: "#e9e9f3" },
                                    cursor: "pointer",
                                    width: "100%",
                                    height: "60px",
                                    position: "relative",
                                }}
                            >
                                <Box
                                    sx={{
                                        margin: "auto",
                                        position: "absolute",
                                        top: "10px",
                                        left: "10px",
                                        display: "flex",
                                        userSelect: "none",
                                    }}
                                >
                                    <Avatar alt="Remy Sharp" src={chat.to_user.avatar} />
                                    <div
                                        style={{ margin: "auto", marginLeft: "5px" }}
                                    >{`${chat.to_user.firstName} ${chat.to_user.lastName}`}</div>
                                </Box>
                            </Box>
                        );
                    })}
                    {/* <Box onClick={() => { setUser(1) }} sx={{ ":hover": { background: "#e9e9f3" }, cursor: "pointer", width: "100%", height: "60px", position: "relative" }}>
                        <Box sx={{ margin: "auto", position: 'absolute', top: "10px", left: "10px", display: "flex", userSelect: "none" }} >

                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            <div style={{ margin: "auto", marginLeft: "5px" }}>Ho Tan Loc</div>
                        </Box>
                    </Box>
                    <Box onClick={() => { setUser(2) }} sx={{ ":hover": { background: "#e9e9f3" }, cursor: "pointer", width: "100%", height: "60px", position: "relative" }}>
                        <Box sx={{ margin: "auto", position: 'absolute', top: "10px", left: "10px", display: "flex", userSelect: "none" }} >

                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            <div style={{ margin: "auto", marginLeft: "5px" }}>Ho Tan Loc</div>
                        </Box>
                    </Box> */}
                </Grid>
                <Grid item xs={10}>
                    {chats.length >= 1 ? (
                        <>
                            {" "}
                            <Box>
                                <Box sx={{ display: "flex", userSelect: "none", mb: "10px" }}>
                                    <Avatar alt="Remy Sharp" src={chats[active].to_user.avatar} />
                                    <div
                                        style={{ margin: "auto", marginLeft: "5px" }}
                                    >{`${chats[active].to_user.firstName} ${chats[active].to_user.lastName}`}</div>
                                </Box>
                                <Divider variant="middle" />
                                <Box
                                    sx={{
                                        height: "79vh",
                                        width: "70vw",
                                        backgroundColor: "GrayText",
                                    }}
                                >
                                    {chats[active].content?.map((content, index) => {
                                        return (
                                            <>
                                                <Box
                                                    key={content.create_at}
                                                    display="block"
                                                    margin="10px"
                                                    sx={{
                                                        textAlign: `${content.from == "me" ? "right" : "left"
                                                            }`,
                                                    }}
                                                >
                                                    {content.from == "me" ? (
                                                        <Box display="flex" justifyContent="flex-end">
                                                            <Chip
                                                                sx={{
                                                                    height: "auto",
                                                                    "& .MuiChip-label": {
                                                                        display: "block",
                                                                        whiteSpace: "normal",
                                                                    },
                                                                    fontSize: "20px",
                                                                }}
                                                                label={content.content}
                                                            />
                                                            <Avatar
                                                                sx={{ ml: "5px" }}
                                                                alt="Remy Sharp"
                                                                sizes="10px"
                                                                src={chats[active].user.avatar}
                                                            />
                                                        </Box>
                                                    ) : (
                                                        <Box display="flex" justifyContent="flex-start">
                                                            <Avatar
                                                                sx={{ mr: "5px" }}
                                                                alt="Remy Sharp"
                                                                sizes="10px"
                                                                src={chats[active].to_user.avatar}
                                                            />
                                                            <Chip
                                                                sx={{
                                                                    height: "auto",
                                                                    "& .MuiChip-label": {
                                                                        display: "block",
                                                                        whiteSpace: "normal",
                                                                    },
                                                                    fontSize: "20px",
                                                                }}
                                                                label={content.content}
                                                            />
                                                        </Box>
                                                    )}
                                                </Box>
                                            </>
                                        );
                                    })}
                                </Box>
                                <Box sx={{ display: "flex" }}>
                                    <TextField
                                        InputProps={{
                                            style: {
                                                borderRadius: "15px",
                                                marginBottom: "10px",
                                            },
                                        }}
                                        fullWidth
                                        placeholder="Tin nhắn"
                                        id="fullWidth"
                                        onChange={handelOnChange}
                                    />{" "}
                                    <IconButton onClick={handelClickSend} sx={{ mt: "-5px", ml: "10px", mr: "10px" }}>
                                        <SendIcon></SendIcon>
                                    </IconButton>
                                </Box>{" "}
                            </Box>
                        </>
                    ) : (
                        ""
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export default index;
