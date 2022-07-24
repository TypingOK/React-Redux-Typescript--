import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";

export const userDB = [{ id: "test", password: "test" }];

export interface UserLoginState {
  id: string;
  password: string;
  auth: boolean;
}

const initialState: UserLoginState = {
  id: "",
  password: "",
  auth: false,
};

// login: (state, action: PayloadAction<{ id: string; password: string }>) => {
//   console.log(action);
//   userDB.forEach((e) => {
//     if (
//       e.id === action.payload.id &&
//       e.password === action.payload.password
//     ) {
//       state.id = action.payload.id;
//       state.password = action.payload.password;
//       state.login = true;
//       console.log("hi");
//     }
//   });
// },


export const UserLoginSlice = createSlice({
  name: "hello-world",
  initialState,
  reducers: {
    login: {
      reducer: (
        state,
        action: PayloadAction<{ id: string; password: string; auth: boolean }>
      ) => {
        console.log(action);
        state.id = action.payload.id;
        state.password = action.payload.password;
        state.auth = action.payload.auth;
      },
      prepare: ({ id, password }: { id: string; password: string }) => {
        let userId = "";
        let userPassword = "";
        let userAuth = false;
        userDB.forEach((e) => {
          if (e.id === id && e.password === password) {
            console.log(id, password);
            userId = id;
            userPassword = password;
            userAuth = true;
            return false;
          }
        });

        console.log(userId, userPassword);
        return {
          payload: { id: userId, password: userPassword, auth: userAuth },
        };
      },
    },
    logout: (state) => {
      state.id = "";
      state.password = "";
      state.auth = false;
    },
  },
});

export const { login, logout } = UserLoginSlice.actions;

export const loginState = (state: RootState) => state.helloWorld;

export default UserLoginSlice.reducer;
