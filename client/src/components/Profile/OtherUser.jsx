import { Avatar, Box, Card, CardHeader, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useParams } from "react-router-dom";
import { getUserByUserId } from "../../redux/userSlice";

const index = () => {
  const dispatch = useAppDispatch();
  const { userId } = useParams();

  useEffect(() => {
    (async () => {
      await dispatch(getUserByUserId({ userId }));
    })();
  }, [userId]);

  const themeColor = useAppSelector((state) => state.theme.color);
  const user = useAppSelector((state) => state.user.otherUser);
  return (
    <Box>
      <Card
        sx={{
          marginBottom: "20px",
          ...(themeColor === "light"
            ? { backgroundColor: "rgb(255 242 242)", color: "#171717" }
            : { backgroundColor: "#0E1217", color: "#fff2f2" }),
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              src={user?.avatar}
              aria-label="recipe"
              sx={{ height: "50px", width: "50px", position: "relative" }}
            />
          }
          title={
            <Typography sx={{ marginTop: "15px" }} variant="h5" component="div">
              {user?.firstName + " " + user?.lastName}
            </Typography>
          }
          subheader={
            <div
              style={{
                display: "flex",
                ...(themeColor === "light"
                  ? { backgroundColor: "rgb(255 242 242)", color: "#171717" }
                  : { backgroundColor: "#0E1217", color: "#fff2f2" }),
              }}
            >
              <h5>
                Follower:{" "}
                <span
                  style={{ cursor: "pointer", fontWeight: "bold" }}
                  onClick={() => handleOpenFollowing(user.id)}
                >
                  {user?.totalFollowers}
                </span>{" "}
                &emsp;
              </h5>
              <h5>
                Following:{" "}
                <span
                  style={{ cursor: "pointer", fontWeight: "bold" }}
                  onClick={() => setOpenModalFollower(true)}
                >
                  {user?.totalFollowings}
                </span>
              </h5>
            </div>
          }
          // action={
          // <div className="mui-dropdown mui-dropdown--left">
          //   <IconButton aria-label="settings" data-mui-toggle="dropdown">
          //     <MoreVertIcon />
          //   </IconButton>
          //   <ul className="mui-dropdown__menu">
          //     <li>
          //       <Link to="/EditProfile">Thông tin tài khoản</Link>
          //     </li>
          //   </ul>
          // </div>
          // }
        />
      </Card>
    </Box>
  );
};

export default index;
