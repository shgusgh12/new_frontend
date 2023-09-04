//네브바와 푸터를 포함해 중간에 children을 넣어주는 컴포넌트
import Nav from "./Nav";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Main() {
  return (
    <>
      <Nav />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Main;
