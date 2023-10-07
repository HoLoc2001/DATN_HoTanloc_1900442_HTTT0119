import * as React from "react";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import TuneIcon from "@mui/icons-material/Tune";
import { blue } from "@mui/material/colors";
import { useAppDispatch, useAppSelector } from "../redux/store";

const emails = ["username@gmail.com", "user02@gmail.com"];

function SimpleDialog(props) {
  const dispatch = useAppDispatch();



  const { onClose, selectedValue, open } = props;
  const tags = useAppSelector((state) => state.tag.tags);
  const myTags = useAppSelector((state) => state.tag.myTags);
  const themeColor = useAppSelector((state) => state.theme.color);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const handleAddTag = async (tag, index) => {
    await dispatch(addMyTag({ tag, index }));
  };

  const handleRemoveTag = async (tag, index) => {
    await dispatch(removeMyTag({ tag, index }));
  };

  const handleMyTags = async (tag) => {
    await dispatch(addMyTag({ tag }));
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md">
      <Box
        sx={{
          ...(themeColor === "light"
            ? { backgroundColor: "#fff", color: "#171717" }
            : { backgroundColor: "#0E1217", color: "rgb(255 242 242)" }),
        }}
      >
        <DialogTitle>My Feed</DialogTitle>

        <Grid container spacing={1}>
          {myTags?.map((tag, index) => (
            <Grid
              item
              columns={12}
              key={tag.name}
              sx={{
                margin: "5px",
              }}
            >
              <Button
                sx={{
                  marginRight: "2%",
                  border: "0.2px solid white",
                  ...(themeColor === "light"
                    ? { backgroundColor: "#fff", color: "#171717" }
                    : {
                      backgroundColor: "#0E1217",
                      color: "rgb(255 242 242)",
                    }),
                  ...(tag.isFollowed
                    ? {
                      backgroundColor: "red",
                      color: "#171717",
                      ":hover": {
                        backgroundColor: `${themeColor === "light" ? "#e2e3f3" : "red"
                          }`,
                        color: `${themeColor === "light"
                            ? "#1A2027"
                            : "rgba(249,242,222,0.5)"
                          }`,
                      },
                    }
                    : {
                      backgroundColor: "#0E1217",
                      color: "#fff",
                      ":hover": {
                        backgroundColor: `${themeColor === "light"
                            ? "#e2e3f3"
                            : "rgba(45,50,59,255)"
                          }`,
                        color: `${themeColor === "light"
                            ? "#1A2027"
                            : "rgba(249,242,222,0.5)"
                          }`,
                      },
                    }),
                }}
                onClick={
                  tag.isFollowed
                    ? () => handleRemoveTag(tag.name, index)
                    : () => handleAddTag(tag.name, index)
                }
                background="url('https://res.cloudinary.com/dxlsponnf/image/upload/v1684289527/63747_dyzpck.png')"
              >
                {tag.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SetTags() {
  const themeColor = useAppSelector((state) => state.theme.color);

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          textTransform: "none",
          border: "none",
          color: `${themeColor === "light" ? "#1A2027" : "#fff"}`,
          ":hover": {
            border: "none",

            backgroundColor: `${themeColor === "light" ? "#e2e3f3" : "rgba(45,50,59,255)"
              }`,
            color: `${themeColor === "light" ? "#1A2027" : "rgba(249,242,222,255)"
              }`,
          },
          textAlign: "center",
        }}
      >
        <TuneIcon />
        <Typography>&ensp;My feed</Typography>
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
