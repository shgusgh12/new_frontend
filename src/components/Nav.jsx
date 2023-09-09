// 네브바
import React from "react";
import { Link, NavLink } from "react-router-dom";
import UserMenu from "./UserMenu";
import styled from "styled-components";
import logoImage from "../assets/Logo.png";

function getLinkStyle({ isActive }) {
  return {
    textDecoration: isActive ? "underline" : "none",
  };
}

// 리코일로 관리자, 사용자 네브바 구분

function Nav() {
  return (
    <Container>
      <Link to="/">
        <Logo>
          <LogoImage src={logoImage} alt="logo" />
        </Logo>
      </Link>
      <Categories>
        <Category>
          <NavLink to="/experiment" style={getLinkStyle}>
            투자실험
          </NavLink>
        </Category>
        <Category>
          <NavLink to="/lectures" style={getLinkStyle}>
            강의실
          </NavLink>
        </Category>
        <Category>
          <NavLink to="/column" style={getLinkStyle}>
            칼럼
          </NavLink>
        </Category>
        <Category>
          <NavLink to="/community" style={getLinkStyle}>
            커뮤니티
          </NavLink>
        </Category>
        <Category>
          <NavLink to="/mypage/portfolio" style={getLinkStyle}>
            마이페이지
          </NavLink>
        </Category>
        <Category>
          <UserMenu></UserMenu>
        </Category>
      </Categories>
    </Container>
  );
}

const Logo = styled.div`
  display: flex;
  align-items: center;
  height: 2rem;
`;

const LogoImage = styled.img`
  height: 2rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  height: 4rem;
  position: relative;
  box-shadow: var(--box-shadow);
  background-color: white;
`;

const Categories = styled.ul`
  display: flex;
`;

const Category = styled.li`
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  height: 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  &:hover {
    background: #e9ecef;
  }
  & + & {
    margin-left: 0.25rem;
  }
`;

export default Nav;
