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
