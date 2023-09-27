import { Avatar, Box, Divider, Grid, Skeleton, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";



const index = () => {
    const dispatch = useAppDispatch();
    const [user, setUser] = useState(0)

    const data = ["Loremghdiwqg", "qjdhiuqwhdiuqwdhiuqwd", "dqhwuiqwhduiqwdhiquwdhiuqwdhiquwdh"]


    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={2} sx={{ backgroundColor: "#f6f6f6", height: "94vh" }}>
                    <TextField InputProps={{
                        style: {
                            borderRadius: "15px",
                            marginBottom: "10px"
                        }
                    }} fullWidth label="Tìm kiếm" id="fullWidth" />
                    <Box onClick={() => { setUser(0) }} sx={{ ":hover": { background: "#e9e9f3" }, cursor: "pointer", width: "100%", height: "60px", position: "relative" }}>
                        <Box sx={{ margin: "auto", position: 'absolute', top: "10px", left: "10px", display: "flex", userSelect: "none" }}  >

                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            <div style={{ margin: "auto", marginLeft: "5px" }}>Ho Tan Loc</div>
                        </Box>
                    </Box>
                    <Box onClick={() => { setUser(1) }} sx={{ ":hover": { background: "#e9e9f3" }, cursor: "pointer", width: "100%", height: "60px", position: "relative" }}>
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
                    </Box>
                </Grid>
                <Grid item xs={10}>
                    <Box sx={{ display: "flex", userSelect: "none", mb: "10px" }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        <div style={{ margin: "auto", marginLeft: "5px" }}>Ho Tan Loc</div>
                    </Box>
                    <Divider variant="middle" />
                    <Box sx={{ height: "79vh" }}>haha</Box>
                    <TextField InputProps={{
                        style: {
                            borderRadius: "15px",
                            marginBottom: "10px"
                        }
                    }} fullWidth placeholder="Tin nhắn" id="fullWidth" />
                </Grid>
            </Grid>
        </>
    );
};

export default index;
