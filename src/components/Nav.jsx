import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Nav.module.scss";
import logoImage from "../assets/Logo.png";
import UserMenu from "./UserMenu";

function getTopActiveStyle({ isActive }) {
  return {
    color: isActive ? "#00a968" : "#7d8790",
    fontWeight: isActive ? "bold" : "normal",
  };
}

function getAsideActiveClassName({ isActive }) {
  return isActive ? styles.aside_item_active : styles.aside_item;
}

const navTopItems = [
  { to: "/", text: "투자실험" },
  { to: "/lectures", text: "강의" },
  { to: "/column", text: "칼럼" },
  { to: "/community", text: "커뮤니티" },
  { to: "/mypage/portfolio", text: "마이페이지" },
];

const navAsideItems = [
  {
    to: "/mypage/portfolio",
    icon: "/icon/piechart.svg",
    text: "내 포트폴리오",
  },
  { to: "/mypage/ledger", icon: "/icon/creditcard.svg", text: "가계부" },
  { to: "/mypage/scrap", icon: "/icon/bookmark.svg", text: "스크랩" },
  { to: "/mypage/comment", icon: "/icon/comment.svg", text: "댓글 관리" },
  { to: "/mypage/post", icon: "/icon/document.svg", text: "게시물 관리" },
  { divider: true },
  { to: "/mypage/settings", icon: "/icon/settings.svg", text: "내 정보 수정" },
  { to: "/mypage/faq", icon: "/icon/question.svg", text: "FAQ" },
  { to: "/mypage/consult", icon: "/icon/consult.svg", text: "고객센터" },
];

// 상단 네비게이션 바
export const NavTop = (props) => {
  return (
    <nav className={styles.top_wrapper}>
      <ul className={styles.top_container}>
        <li className={styles.top_item}>
          <Link to="/">
            <img src={logoImage} />
          </Link>
        </li>

        <li style={{ flexGrow: 1 }} />

        {navTopItems.map((item, index) => (
          <li key={index} className={styles.top_item}>
            <NavLink to={item.to} style={getTopActiveStyle}>
              {item.text}
            </NavLink>
          </li>
        ))}

        <li className={styles.top_item}>
          <UserMenu isLogin={props.isLogin}></UserMenu>
        </li>
      </ul>
    </nav>
  );
};

// 마이페이지 측면 네비게이션바
export const NavAside = () => {
  return (
    <aside className={styles.aside_wrapper}>
      <ul className={styles.aside_container}>
        {navAsideItems.map((item, index) =>
          item.divider ? (
            <li
              key={index}
              style={{
                width: "185px",
                margin: "0px auto",
                borderTop: "1px solid #191919",
              }}
            />
          ) : (
            <NavLink
              key={index}
              className={getAsideActiveClassName}
              to={item.to}
            >
              <span>
                <img
                  style={{ marginTop: "5px" }}
                  src={process.env.PUBLIC_URL + item.icon}
                  alt=""
                />
              </span>
              <span>{item.text}</span>
            </NavLink>
          )
        )}
      </ul>
    </aside>
  );
};
