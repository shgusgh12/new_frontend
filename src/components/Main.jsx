//네브바와 푸터를 포함해 중간에 children을 넣어주는 컴포넌트
import { NavTop } from "./Nav";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import styles from "./Main.module.scss";
import useLoginStatus from "../hooks/useLoginStatus";

function Main() {
  //로그인 상태 저장
  const { isLogin } = useLoginStatus();

  return (
    <>
      {/* 네비게이션 바 */}
      <NavTop isLogin={isLogin} />

      {/* 바디 */}
      <div className={`${styles.body}`}>
        <Outlet />
      </div>
      {/* 푸터 */}
      <Footer />
    </>
  );
}

export default Main;
