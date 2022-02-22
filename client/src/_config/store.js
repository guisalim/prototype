import { configureStore } from "@reduxjs/toolkit";
import { game_reducer } from "_actions";

export const store = configureStore({
  reducer: { game_reducer },
});
