//쿠키의 role에 따른 사용자, 관리자 페이지 분기
import User from "../User";
import Admin from "../Admin";

const temp = {
  role: "USER",
};

function Home() {
  return (
    <div>
      {temp.role === "USER" && <User />}
      {temp.role === "ADMIN" && <Admin />}
      {!temp.role && <div>권한이 없습니다.</div>}
    </div>
  );
}

export default Home;
