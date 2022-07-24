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
