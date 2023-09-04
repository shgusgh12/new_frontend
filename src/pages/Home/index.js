//쿠키의 role에 따른 사용자, 관리자 페이지 분기
import User from "../User";
import Admin from "../Admin";

const cookie = {
  role: "STUDENT",
};

function Home() {
  return (
    <div>
      {cookie.role === "STUDENT" && <User />}
      {cookie.role === "ADMIN" && <Admin />}
    </div>
  );
}

export default Home;
