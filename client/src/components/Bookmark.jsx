import React from "react";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";

const Bookmark = () => {
  return (
    <>
      <Box sx={{ color: "#fff" }} justifyContent={"center"}>
        <Typography>Bookmark</Typography>
        <Typography sx={{ margin: "25px 0 0 0" }}>
          Your bookmark list is empty.
        </Typography>
      </Box>
    </>
  );
};

export default Bookmark;
