import { useCallback, useEffect, useState } from "react";
import styles from "./UserMenu.module.css";
import { useNavigate } from "react-router-dom";
import useLoginStatus from "../hooks/useLoginStatus";

function UserMenu({ isLogin }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useLoginStatus();

  // 로그아웃
  // 쿠키에 있는 accessToken, refreshToken을 삭제하고 로그인 페이지로 이동
  async function onClickLogout() {
    await logout();
    console.log("onClickLogout : ", isLogin);
  }

  const handleButtonClick = useCallback((e) => {
    e.stopPropagation();
    setIsOpen((nextIsOpen) => !nextIsOpen);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = () => setIsOpen(false);
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.userMenu}>
      {/* 로그인이 되어있으면 유저이름을 보여주고, 로그인이 안되어있으면 로그인 버튼을 보여줌 */}
      {isLogin ? (
        <div onClick={handleButtonClick}>{isLogin}</div>
      ) : (
        <div onClick={() => navigate("/auth/login")}>로그인</div>
      )}
      {isOpen && (
        <ul className={styles.popup}>
          <li onClick={onClickLogout}>로그아웃</li>

          <li className={styles.disabled}>내 정보</li>
          <li className={styles.disabled}>QnA</li>
        </ul>
      )}
    </div>
  );
}

export default UserMenu;
