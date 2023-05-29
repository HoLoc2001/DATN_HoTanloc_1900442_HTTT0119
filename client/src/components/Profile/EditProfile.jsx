import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { getBase64 } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect } from "react";
// import { getInfo, updateInfoUser } from "../../redux/userSlice";
import { Link, Navigate } from "react-router-dom";
import { updateInfoValidate } from "../../utils/validation";
import AlertInfo from "../AlertInfo";
import Navbar from "../../layouts/Navbar";
import { addImage } from "../../redux/cloudSlice";
import { updateInfoUser } from "../../redux/userSlice";

// import { addImgCloudinary } from "../../redux/postsSlice";

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const [infoUser, setInfoUser] = useState(user);
  const [errMissInput, setErrMissInput] = useState(false);
  const [allowUpdate, setAllowUpdate] = useState(false);
  const [Updated, setUpdated] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState({
    content: "Save",
    loading: false,
  });
  useEffect(() => {
    (async () => {
      await dispatch(getInfo());
    })();
  }, []);

  useEffect(() => {
    setInfoUser(user);
  }, [user]);

  const handleAvatar = async (e) => {
    setAllowUpdate(true);

    try {
      const uploadAvatar = new FormData();
      uploadAvatar.append("file", e.target.files[0], "file");

      const {
        payload: {
          data: { url },
        },
      } = await dispatch(addImage(uploadAvatar));

      setInfoUser({
        ...infoUser,
        avatar: url,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeInfoUser = (e) => {
    setAllowUpdate(true);

    return setInfoUser({
      ...infoUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    const { error } = updateInfoValidate({
      firstName: infoUser.firstName,
      lastName: infoUser.lastName,
      // birthday: infoUser.birthday,
      // gender: infoUser.gender,
    });
    if (error) {
      setErrMissInput(true);
    } else {
      setLoadingUpdate({
        content: "Đang lưu ...",
        loading: true,
      });

      await dispatch(
        updateInfoUser({
          avatar: infoUser.avatar,
          firstName: infoUser.firstName,
          lastName: infoUser.lastName,
          // birthday: infoUser.birthday,
          // gender: infoUser.gender,
        })
      );

      setUpdated(true);
    }
  };

  const handleCancel = () => {};

  return (
    <>
      <Navbar />
      <div
        style={{
          margin: "5% 0 0 0",
        }}
      >
        <Stack
          component="form"
          sx={{
            width: "400px",
            margin: "40px auto",
          }}
          spacing={3}
          noValidate
          autoComplete="on"
        >
          <Box
            sx={{
              width: "200px",
              height: "200px",
              border: "1px solid black",
              borderRadius: "50%",
              background: `no-repeat center/cover url(${infoUser.avatar})`,
              marginBottom: "30px",
              marginLeft: "calc(200px - 100px)",
            }}
          >
            <Button
              variant="text"
              component="label"
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
              }}
            >
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatar}
              />
            </Button>
          </Box>
          <TextField
            label="First name"
            variant="outlined"
            name="firstName"
            InputLabelProps={{ shrink: true }}
            value={infoUser.firstName}
            onChange={onChangeInfoUser}
          />
          <TextField
            label="Last name"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            name="lastName"
            value={infoUser.lastName}
            onChange={onChangeInfoUser}
          />
          {/* <FormControl>
            <FormLabel sx={{ textAlign: "left" }}>Gender</FormLabel>
            <RadioGroup row defaultValue={infoUser.gender}>
              <FormControlLabel value="M" control={<Radio />} label="Male" />
              <FormControlLabel value="F" control={<Radio />} label="Female" />
            </RadioGroup>
          </FormControl>
          <TextField
            label="birthday"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            name="birthday"
            defaultValue={user.birthday}
            onChange={onChangeInfoUser}
          /> */}

          <div style={{ display: "flex" }}>
            <Button
              variant="contained"
              sx={{ marginRight: "50px", textTransform: "none" }}
              onClick={() => handleSave()}
              disabled={!allowUpdate || loadingUpdate.loading}
            >
              {loadingUpdate.content}
              {Updated && <Navigate to="../profile" replace />}
            </Button>

            <Link
              to="../profile"
              // onClick={(e) => e.preventDefault()}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                onClick={() => handleCancel}
                disabled={loadingUpdate.loading}
                sx={{ textTransform: "none" }}
              >
                Cancel
              </Button>
            </Link>
          </div>
        </Stack>
        <AlertInfo
          err={errMissInput}
          setErr={setErrMissInput}
          severity="error"
          content=""
        />
      </div>
    </>
  );
};

export default EditProfile;
