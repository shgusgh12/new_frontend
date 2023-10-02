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

// 상단 네비게이션 바
export const NavTop = () => {
    return (
        <nav className={styles.top_wrapper}>
            <ul className={styles.top_container}>
                <li className={styles.top_item}>
                    <Link to="/">
                        <img src={logoImage} />
                    </Link>
                </li>

                <li style={{ flexGrow: 1 }} />

                <li className={styles.top_item}>
                    <NavLink to="/experiment" style={getTopActiveStyle}>
                        투자실험
                    </NavLink>
                </li>

                <li className={styles.top_item}>
                    <NavLink to="/lectures" style={getTopActiveStyle}>
                        강의
                    </NavLink>
                </li>

                <li className={styles.top_item}>
                    <NavLink to="/column" style={getTopActiveStyle}>
                        칼럼
                    </NavLink>
                </li>

                <li className={styles.top_item}>
                    <NavLink to="/community" style={getTopActiveStyle}>
                        커뮤니티
                    </NavLink>
                </li>

                <li className={styles.top_item}>
                    <NavLink to="/mypage/portfolio" style={getTopActiveStyle}>
                        마이페이지
                    </NavLink>
                </li>

                <li className={styles.top_item}>{/* 로그인버튼 ?? */}</li>
            </ul>
        </nav>
    );
};

// 마이페이지 측면 네비게이션바
export const NavAside = () => {
    return (
        <aside className={styles.aside_wrapper}>
            <ul className={styles.aside_container}>
                <NavLink className={getAsideActiveClassName} to="/mypage/portfolio">
                    <span>
                        <img style={{ marginTop: "5px" }} src={process.env.PUBLIC_URL + "/icon/piechart.svg"} alt="" />
                    </span>
                    <span>내 포트폴리오</span>
                </NavLink>

                <NavLink className={getAsideActiveClassName} to="/mypage/ledger">
                    <span>
                        <img style={{ marginTop: "5px" }} src={process.env.PUBLIC_URL + "/icon/creditcard.svg"} alt="" />
                    </span>
                    <span>가계부</span>
                </NavLink>

                <NavLink className={getAsideActiveClassName} to="/mypage/scrap">
                    <span>
                        <img style={{ marginTop: "5px" }} src={process.env.PUBLIC_URL + "/icon/bookmark.svg"} alt="" />
                    </span>
                    <span>스크랩</span>
                </NavLink>

                <NavLink className={getAsideActiveClassName} to="/mypage/comment">
                    <span>
                        <img style={{ marginTop: "5px" }} src={process.env.PUBLIC_URL + "/icon/comment.svg"} alt="" />
                    </span>
                    <span>댓글 관리</span>
                </NavLink>

                <NavLink className={getAsideActiveClassName} to="/mypage/post">
                    <span>
                        <img style={{ marginTop: "5px" }} src={process.env.PUBLIC_URL + "/icon/document.svg"} alt="" />
                    </span>
                    <span>게시물 관리</span>
                </NavLink>

                <li style={{ width: "185px", margin: "0px auto", borderTop: "1px solid #191919" }} />

                <NavLink className={getAsideActiveClassName} to="/mypage/settings">
                    <span>
                        <img style={{ marginTop: "5px" }} src={process.env.PUBLIC_URL + "/icon/settings.svg"} alt="" />
                    </span>
                    <span>내 정보 수정</span>
                </NavLink>

                <NavLink className={getAsideActiveClassName} to="/mypage/faq">
                    <span>
                        <img style={{ marginTop: "5px" }} src={process.env.PUBLIC_URL + "/icon/question.svg"} alt="" />
                    </span>
                    <span>FAQ</span>
                </NavLink>

                <NavLink className={getAsideActiveClassName} to="/mypage/consult">
                    <span>
                        <img style={{ marginTop: "5px" }} src={process.env.PUBLIC_URL + "/icon/consult.svg"} alt="" />
                    </span>
                    <span>고객센터</span>
                </NavLink>
            </ul>
        </aside>
    );
};
