import { configureStore } from "@reduxjs/toolkit";
import spotifyReducer from "./reducer/spotifySlice";

export default configureStore({
  reducer: {
    spotify: spotifyReducer
  },
});
