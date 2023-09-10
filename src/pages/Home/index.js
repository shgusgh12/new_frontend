//쿠키의 role에 따른 사용자, 관리자 페이지 분기
import User from "../User";
import Admin from "../Admin";

const cookie = {
  role: "USER",
};

function Home() {
  return (
    <div>
      {cookie.role === "USER" && <User />}
      {cookie.role === "ADMIN" && <Admin />}
      {!cookie.role && <div>권한이 없습니다.</div>}
    </div>
  );
}

export default Home;
