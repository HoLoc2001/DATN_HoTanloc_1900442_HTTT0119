import { configureStore } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";

// import { postsSlice } from "./postsSlice";
import { userSlice } from "./userSlice";
import { tagSlice } from "./tagSlice";
import { articleSlice } from "./articleSlice";
import { authSlice } from "./authSlice";
import { themeSlice } from "./themeSlice";

export const store = configureStore({
  reducer: {
    // posts: postsSlice.reducer,
    user: userSlice.reducer,
    auth: authSlice.reducer,
    tag: tagSlice.reducer,
    article: articleSlice.reducer,
    theme: themeSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: { warnAfter: 128 },
    }),
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
