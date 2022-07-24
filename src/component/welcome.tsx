import { useDispatch } from "react-redux";
import { logout } from "../store/loginStore";

const Welcome = () => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(logout());
  };
  return (
    <div>
      <div>환영합니다.</div>
      <div>
        <button onClick={onClick}>로그아웃하기</button>
      </div>
    </div>
  );
};

export default Welcome;
