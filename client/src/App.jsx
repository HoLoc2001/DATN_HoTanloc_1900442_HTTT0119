import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Editor from "./components/Editor";
import Home from "./pages/Home";
import Article from "./components/Article";
import Search from "./components/Search";
import Tag from "./components/Tag";
import Profile from "./components/Profile";
import OtherUser from "./components/Profile/OtherUser";
import Bookmark from "./components/Bookmark";
import ReadArticle from "./components/Article/ReadArticle";
import EditProfile from "./components/Profile/EditProfile";

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
          </Route>*/}
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Article />} />
            <Route path="/create" element={<Editor />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<Search />} />
            <Route path="/editProfile" element={<EditProfile />} />
            <Route path="/tag/:tag" element={<Tag />} />
            <Route path="/bookmarks" element={<Bookmark />} />
            <Route path="/user/:userId" element={<OtherUser />} />
            <Route path="/:articleId" element={<ReadArticle />} />
          </Route>
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
