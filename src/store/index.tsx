import { configureStore } from "@reduxjs/toolkit";
import UserLoginReducer from "./loginStore";

export const store = configureStore({
  reducer: {
    helloWorld: UserLoginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
