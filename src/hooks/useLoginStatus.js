import { useEffect, useState } from "react";
import { getCookie, removeCookie } from "../utils/cookie";
import { useNavigate } from "react-router-dom";
import { getApi } from "../utils/http";

function useLoginStatus() {
  const navigate = useNavigate();
  // 로그인 상태 관리
  const [isLogin, setIsLogin] = useState(false);
  const nickname = getCookie("member_access_token");

  useEffect(() => {
    setIsLogin(
      getCookie("member_access_token") ? getCookie("nickname") : false
    );
  }, [nickname]);

  // 로그아웃
  async function logout() {
    try {
      const response = await getApi({ url: "/auth/logout" });
      if (response.status === 200) {
        await removeCookie("nickname");
        // refreshToken은 지워지지 않음 => httponly로 설정되어 있기 때문
        // removeCookie("member_refresh_token");
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return { isLogin, logout };
}

export default useLoginStatus;
