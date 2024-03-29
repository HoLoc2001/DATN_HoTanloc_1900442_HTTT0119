import {
    Avatar,
    Box,
    Chip,
    Divider,
    Grid,
    IconButton,
    Skeleton,
    TextField, MenuList, MenuItem, Paper, Popper,
    Typography,
    Menu,
    Autocomplete,
    Button,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import SendIcon from "@mui/icons-material/Send"; import AttachFileIcon from '@mui/icons-material/AttachFile'; import FilePresentIcon from '@mui/icons-material/FilePresent';
import { createchat, getchats, updatechat } from "../../redux/chat";
import { getAllUser } from "../../redux/userSlice";
import { addFlieComment } from "../../redux/articleSlice";
import axios from "axios";

const url = 'wss://lv-directus.hotanloc.xyz/websocket';

const index = () => {
    const dispatch = useAppDispatch();
    const [content, setContent] = useState("");
    const [active, setActive] = useState(0);
    const { id: userId } = useAppSelector((state) => state.user.user);
    const { allUser } = useAppSelector((state) => state.user);
    const { chats } = useAppSelector((state) => state.chat);
    const [anchorEl, setAnchorEl] = useState(null)
    const bottomRef = useRef(null);
    const [createAt, setCreateAt] = useState()
    // const [connection, setConnection] = useState(new WebSocket(url))
    console.log(allUser);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        dispatch(getAllUser());
    }, [])

    // useEffect(() => {
    //     connection.addEventListener('open', function () {
    //         connection.send(
    //             JSON.stringify({
    //                 type: 'auth',
    //                 email,
    //                 password,
    //             })
    //         );
    //     });

    //     connection.addEventListener('message', function (message) {
    //         receiveMessage(message);
    //     });
    // })

    console.log(chats, userId, "--------------------------");

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chats[active]?.content]);

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
        await dispatch(createchat({ chatId: chats[active].id, content, userId }))
        setContent("");

    }

    const keyPress = async (e) => {
        if (e.key === "Enter" && content) {
            await dispatch(createchat({ chatId: chats[active].id, content, userId, isChat: true }))

            setContent("");
        }
    };

    const handleClick = (e, file = null) => {

        e.preventDefault()
        handleClose()
        if (e.type === 'click') {
            window.location.href = `https://lv-directus.hotanloc.xyz/assets/${file}?download`
        } else if (e.type === 'contextmenu') {
            console.log('Right click');
            setAnchorEl(e.currentTarget);
        }
    };

    const handleDelete = async () => {
        await dispatch(updatechat({ chatId: chats[active].id, createAt }))
        handleClose()

    }

    let id = open ? "faked-reference-popper" : undefined;

    const handleFileUpload = async (e) => {
        try {
            console.log(123123);
            let file = new FormData();
            file.append("files", e.target.files[0]);
            const res = await axios({
                method: "POST",
                url: `https://lv-directus.hotanloc.xyz/files`,
                data: file,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data"
                },

            });
            console.log(res.data);

            await dispatch(createchat({ chatId: chats[active].id, content, userId, isChat: false, file: res.data.data.id }))
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={2} sx={{ backgroundColor: "#f6f6f6", height: "94vh" }}>
                    {/* <TextField
                        InputProps={{
                            style: {
                                borderRadius: "15px",
                                marginBottom: "10px",
                            },
                        }}
                        fullWidth
                        label="Tìm kiếm"
                        id="fullWidth"
                    /> */}

                    {/* <Autocomplete
                        id="free-solo-demo"
                        freeSolo
                        options={allUser.map((option) => option.fullname)}
                        renderInput={(params) => <TextField {...params} label="Tìm kiếm" />}
                    /> */}
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
                                    <Avatar alt="Remy Sharp" src={`${chat.user[0].users_id.id == userId ? chat.user[1].users_id.avatar : chat.user[0].users_id.avatar}`} />
                                    <div
                                        style={{ margin: "auto", marginLeft: "5px" }}
                                    >{`${chat.user[0].users_id.id == userId ? chat.user[1].users_id.fullname : chat.user[0].users_id.fullname}`}</div>
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
                    {chats?.length >= 1 ? (
                        <>
                            {" "}
                            <Box>
                                <Box sx={{ display: "flex", userSelect: "none", mb: "10px" }}>
                                    <Avatar alt="Remy Sharp" src={`${chats[active].user[0].users_id.id == userId ? chats[active].user[1].users_id.avatar : chats[active].user[0].users_id.avatar}`} />
                                    <div
                                        style={{ margin: "auto", marginLeft: "5px" }}
                                    >{`${chats[active].user[0].users_id.id == userId ? chats[active].user[1].users_id.fullname : chats[active].user[0].users_id.fullname}`}</div>
                                </Box>
                                <Divider variant="middle" />
                                <Box
                                    sx={{
                                        height: "79vh",
                                        width: "70vw",
                                        // backgroundColor: "GrayText",

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
                                    {chats[active].content?.map((content, index) => {
                                        return (
                                            <>
                                                <Box
                                                    key={content.create_at}
                                                    display="block"
                                                    margin="10px"
                                                    sx={{
                                                        textAlign: `${content.user == userId ? "right" : "left"
                                                            }`,
                                                    }}
                                                >
                                                    {content.user == userId ? (
                                                        <Box display="flex" justifyContent="flex-end">
                                                            {
                                                                content?.file ? <div><Button href={`https://lv-directus.hotanloc.xyz/assets/${content?.file}?download`} sx={{
                                                                    width: 'fullwith', textTransform: 'none', height: "auto",
                                                                    "& .MuiChip-label": {
                                                                        display: "block",
                                                                        whiteSpace: "normal",
                                                                    },
                                                                    fontSize: "20px",
                                                                }}
                                                                    onClick={(e) => {
                                                                        setCreateAt(content.create_at)
                                                                        handleClick(e, content?.file)
                                                                    }}
                                                                    onContextMenu={(e) => {
                                                                        setCreateAt(content.create_at)
                                                                        handleClick(e, content?.file)
                                                                    }}
                                                                ><FilePresentIcon /> file</Button> </div> :
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
                                                                        onClick={(e) => {
                                                                            setCreateAt(content.create_at)
                                                                            handleClick(e)
                                                                        }}
                                                                        onContextMenu={(e) => {
                                                                            setCreateAt(content.create_at)
                                                                            handleClick(e)
                                                                        }}
                                                                    />
                                                            }
                                                            <Avatar
                                                                sx={{ ml: "5px" }}
                                                                alt="Remy Sharp"
                                                                sizes="10px"
                                                                src={`${chats[active].user[0].users_id.id != userId ? chats[active].user[1].users_id.avatar : chats[active].user[0].users_id.avatar}`}
                                                            />
                                                        </Box>
                                                    ) : (
                                                        <Box display="flex" justifyContent="flex-start">
                                                            <Avatar
                                                                sx={{ mr: "5px" }}
                                                                alt="Remy Sharp"
                                                                sizes="10px"
                                                                src={`${chats[active].user[0].users_id.id == userId ? chats[active].user[1].users_id.avatar : chats[active].user[0].users_id.avatar}`}
                                                            />
                                                            {
                                                                content?.file ? <div><Button href={`https://lv-directus.hotanloc.xyz/assets/${content?.file}?download`} sx={{ width: 'fullwith', textTransform: 'none' }}><FilePresentIcon /> file</Button> </div> :
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
                                                                        aria-describedby={id}
                                                                    />
                                                            }
                                                        </Box>
                                                    )}
                                                </Box>
                                                <div ref={bottomRef} />
                                            </>
                                        );
                                    })}
                                </Box>
                                <Box sx={{ display: "flex" }}>
                                    <IconButton
                                        component="label"
                                        sx={{
                                            textTransform: "none",
                                            width: "50px"
                                        }}
                                    >
                                        <input
                                            type="file"
                                            hidden
                                            onChange={handleFileUpload}
                                        />

                                        <AttachFileIcon />
                                    </IconButton>
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
                                        value={content}
                                        onChange={handelOnChange}
                                        onKeyDown={keyPress}
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
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleDelete}>Xóa tin nhắn</MenuItem>
            </Menu>

        </>
    );
};

export default index;
