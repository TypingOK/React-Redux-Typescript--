리액트에 리덕스를 적용해보기 위해 간단하게 만들어본 로그인 예제입니다.
실제 로그인엔 백엔드와 연결 해야하기 때문에 달라질 수 있습니다.

```
import { store } from "./store";
import { Provider } from "react-redux";
 
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

index.tsx입니다.
간단하게 store의 데이터들을 자식들이 전부 받을 수 있도록 최고 상위 컴포넌트에 등록합니다.

import React from "react";
import LoginForm from "./component/loginForm";
import { useSelector} from "react-redux";
import { loginState } from "./store/loginStore";
import Welcome from "./component/welcome";
function App() {
  const a = useSelector(loginState);
  console.log(a);
  return (
    <div>
      {!a.auth ? (
        <div>
          <div>로그인</div>
          <LoginForm />
        </div>
      ) : (
        <div>
          <Welcome />
        </div>
      )}
    </div>
  );
}
 
export default App;
```
메인 화면인 App.tsx 파일입니다.
store에 저장된 로그인 상태가 true가 아니면 로그인 폼이 나오고 true면 환영한다는 컴포넌트가 출력 되도록 짰습니다.
useSelector를 이용하여 store에서 데이터를 가져옵니다.
```
import { configureStore } from "@reduxjs/toolkit";
import UserLoginReducer from "./loginStore";
export const store = configureStore({
  reducer: {
    helloWorld: UserLoginReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```
store 폴더의 index.tsx 파일입니다. 이 간단한 예제의 모든 store를 하나로 합치는 공간입니다. 
그리고 합쳐진 store를 RootState라는 이름으로 외부에 export 합니다.
dispatch 함수도 마찬가지로 외부에 export 합니다.
```
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
```


사실상 이 예제의 핵심인 loginStore.tsx 파일입니다.
이곳에서 로그인과 관련된 store가 들어있습니다.
state의 타입을 지정하기 위해 UserLoginState라는 인터페이스를 선언 한 후 들어갈 내용물이 어떤 타입인지 알려줍니다.

그 다음 initialState를 통해 기본적으로 store에 어떤 상태가 저장되는지 선언합니다.

createSlice를 통해 리덕스의 일부분으로 만듭니다.
하나의 리덕스가 모든 상태를 관리하게 되면 유지보수가 어렵기 때문에 redux toolkit의 도움을 받아 여러개의 작은 store로 분리하고 하나로 합칠 수 있습니다.
처음 store의 상태를 알려주고 reducers를 통해 어떤 액션을 할 수 있고 상태를 어떻게 저장할 것인지 지정합니다.

그리고 각자 action과 상태를 외부로 export 합니다.
```
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/loginStore";
 
interface userLoginInfo {
  id: string;
  password: string;
}
 
const LoginForm = () => {
  const [loginInfo, setLoginInfo] = useState<userLoginInfo>({
    id: "",
    password: "",
  });
 
  const dispatch = useDispatch();
 
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
 
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(loginInfo);
    dispatch(login({ id: loginInfo.id, password: loginInfo.password }));
  };
  return (
    <div>
      <div>
        아이디<input type="text" name="id" onChange={onChange}></input>
      </div>
      <div>
        비밀번호<input type="text" name="password" onChange={onChange}></input>
      </div>
      <button onClick={onClick}>login</button>
    </div>
  );
};
 
export default LoginForm;
```
useDispatch를 통해 store에서 사용할 액션을 가져옵니다. 로그인 버튼이 눌렸을 때 store에서 export 한 액션의 이름으로 상태를 변화 시키도록 합니다.
