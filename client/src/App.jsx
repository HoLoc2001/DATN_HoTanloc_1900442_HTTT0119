import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          {/* <Route path="/image" element={<Image />} />
          <Route path="/src" element={<ShowImg />} />
          <Route path="/" element={<Protected />}>
            <Route path="/" element={<Home />}>
              <Route path="/" element={<Posts />} />
              <Route path="/profile" element={<User />} />
              <Route path="/editProfile" element={<EditProfile />} />
              <Route path="/search" element={<Search />} />
              <Route path="/:id" element={<OtherUser />} />
            </Route>
          </Route>
          <Route path="/" element={<HomeNotSignIn />} /> */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/socket" element={<Socket />} /> */}
          {/* <Route path="*" element={<ErrorPage />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
