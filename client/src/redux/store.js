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

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    auth: authSlice.reducer,
    tag: tagSlice.reducer,
    article: articleSlice.reducer,
    theme: themeSlice.reducer,
    bookmark: bookmarkSlice.reducer,
    like: likeSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: { warnAfter: 128 },
    }),
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
