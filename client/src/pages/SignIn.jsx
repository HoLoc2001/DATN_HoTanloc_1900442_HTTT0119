import React, { useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { Link, Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { signInLocal } from "../redux/authSlice";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const data = window.location.href
  console.log("---------------------------", data);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  // const isForgetPass = useAppSelector((state) => state.user.isForgetPass);

  const [loadingBtnForgetPass, setLoadingBtnForgetPass] = useState({
    content: "Xác nhận",
    loading: false,
  });

  const [errMissInput, setErrMissInput] = useState(false);
  const [openForgetPass, setOpenForgetPass] = useState(false);
  const [forgetPass, setForgetPass] = useState(false);
  const [validateEmail, setValidateEmail] = useState("");
  const [errSignIn, setErrSignIn] = useState(false);
  const [signinForm, setSigninForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = signinForm;

  const onChangeSigninForm = (e) => {
    return setSigninForm({
      ...signinForm,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeForgetPass = (e) => {
    return setValidateEmail(e.target.value);
  };

  const handleClickSignin = async () => {
    if (!email || !password) {
      return setErrMissInput(true);
    }
    await dispatch(signInLocal(signinForm));
    if (!isAuthenticated) {
      setErrSignIn(true);
    }
  };

  const keyPress = async (e) => {
    if (e.key === "Enter") {
      if (!email || !password) {
        return setErrMissInput(true);
      }
      await dispatch(signin(signinForm));
      if (!isAuthenticated) {
        setErrSignIn(true);
      }
    }
  };

  function validateEmailRegex(str) {
    const isEmail = /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i.test(str);
    return isEmail;
  }

  const handleForgetPass = async () => {
    if (validateEmailRegex(validateEmail)) {
      setLoadingBtnForgetPass({
        content: "Đang gửi...",
        loading: true,
      });
      await dispatch(sendMailPass(validateEmail));

      setForgetPass(isForgetPass);
      setOpenForgetPass(false);
      setValidateEmail("");
      setLoadingBtnForgetPass({
        content: "Xác nhận",
        loading: false,
      });
    }
  };

  const keyPressForgetPass = async (e) => {
    if (e.key === "Enter") {
      if (validateEmailRegex(validateEmail)) {
        setLoadingBtnForgetPass({
          content: "Đang gửi...",
          loading: true,
        });
        await dispatch(sendMailPass(validateEmail));

        setForgetPass(isForgetPass);
        setOpenForgetPass(false);
        setValidateEmail("");
        setLoadingBtnForgetPass({
          content: "Xác nhận",
          loading: false,
        });
      }
    }
  };

  return isAuthenticated ? (
    <Navigate to="/" replace />
  ) : (
    <>
      <Box
        sx={{
          width: "70%",
          height: "100%",
          backgroundColor: "#E7E9EB",
          margin: "60px auto",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <Typography component="h1" fontSize={"50px"}>
          Trường Đại học kỹ thuật công nghệ Cần Thơ
        </Typography>
        <br />
        <Typography component="h4" fontSize={"30px"}>
          Đăng nhập
        </Typography>
        <Stack
          component="form"
          sx={{
            width: "50%",
            margin: "40px auto",
          }}
          spacing={3}
          noValidate
          autoComplete="on"
        >
          {/* <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={onChangeSigninForm}
            onKeyDown={keyPress}
            autoFocus
          />
          <TextField
            id="outlined-password-input"
            name="password"
            label="Mật khẩu"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={onChangeSigninForm}
            onKeyDown={keyPress}
          />
          <Button variant="contained" onClick={handleClickSignin}>
            Đăng nhập
          </Button> */}

          <Button
            variant="contained"
            href="http://localhost:5000/api/auth/google-redirect"
            sx={{
              mt: "10vw",
              mb: "10vw",
            }}
          // onClick={handleClickGoogle}
          >
            <GoogleIcon />
            &ensp; Đăng nhập bằng tài khoản CTUT
          </Button>

          {/* <Button variant="contained" onClick={() => setOpenForgetPass(true)}>
            Quên mật khẩu
          </Button> */}
        </Stack>

        {/* <Typography>
          Bạn chưa có tài khoản?
          <Link to="/signup">
            <Button>Đăng ký</Button>
          </Link>
        </Typography> */}
      </Box>
      <Stack sx={{ width: "60%" }} spacing={2}>
        <Snackbar
          open={errMissInput}
          autoHideDuration={4000}
          onClose={() => setErrMissInput(false)}
        >
          <Alert severity="warning">Vui lòng nhập email và mật khẩu</Alert>
        </Snackbar>
        <Snackbar
          open={errSignIn}
          autoHideDuration={4000}
          onClose={() => setErrSignIn(false)}
        >
          <Alert severity="warning">Email hoặc mật khẩu không chính xác</Alert>
        </Snackbar>
        <Snackbar
          open={forgetPass}
          // autoHideDuration={20000}
          onClose={() => setForgetPass(false)}
        >
          <Alert severity="success">
            Mật khẩu mới đã được gửi vào email của bạn
          </Alert>
        </Snackbar>
      </Stack>
      <Dialog
        open={openForgetPass}
        onClose={() => !openForgetPass}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Social</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Quên mật khẩu
          </DialogContentText>
        </DialogContent>
        <TextField
          name="oldPass"
          label="Email"
          variant="outlined"
          type="email"
          value={validateEmail}
          onChange={onChangeForgetPass}
          onKeyDown={keyPressForgetPass}
          sx={{ margin: "30px", width: "400px" }}
          error={!validateEmailRegex(validateEmail) && !!validateEmail}
          helperText={
            validateEmailRegex(validateEmail) || !validateEmail
              ? ""
              : "Email không đúng định dạng"
          }
        />
        <DialogActions>
          <Button
            disabled={loadingBtnForgetPass.loading}
            onClick={() => setOpenForgetPass(false)}
          >
            Hủy bỏ
          </Button>
          <Button
            onClick={handleForgetPass}
            disabled={loadingBtnForgetPass.loading}
          >
            {loadingBtnForgetPass.content}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignIn;
