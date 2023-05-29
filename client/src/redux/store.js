import { configureStore } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";

// import { postsSlice } from "./postsSlice";
import { userSlice } from "./userSlice";
import { tagSlice } from "./tagSlice";
import { articleSlice } from "./articleSlice";
import { authSlice } from "./authSlice";
import { themeSlice } from "./themeSlice";
import { bookmarkSlice } from "./bookmarkSlice";
import { likeSlice } from "./likeSlice";
import { commentSlice } from "./commentSlice";
import { followSlice } from "./followSlice";
import { cloudSlice } from "./cloudSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    auth: authSlice.reducer,
    tag: tagSlice.reducer,
    article: articleSlice.reducer,
    theme: themeSlice.reducer,
    bookmark: bookmarkSlice.reducer,
    like: likeSlice.reducer,
    comment: commentSlice.reducer,
    follow: followSlice.reducer,
    cloud: cloudSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // immutableCheck: { warnAfter: 680 },
      // serializableCheck: { warnAfter: 680 },
    }),
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
