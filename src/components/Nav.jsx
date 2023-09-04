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

function Nav() {
  return (
    <div>
      <Container>
        <Link to="/">
          <Logo>
            <LogoImage src={logoImage} alt="logo" />
          </Logo>
        </Link>
        <Categories>
          <Category>
            <NavLink to="/experiment/interest" style={getLinkStyle}>
              투자실험
            </NavLink>
          </Category>
          <Category>
            <NavLink to="/lecture" style={getLinkStyle}>
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
            <NavLink to="/mypage" style={getLinkStyle}>
              마이페이지
            </NavLink>
          </Category>
          <Category>
            <UserMenu></UserMenu>
          </Category>
        </Categories>
      </Container>
    </div>
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
  border-bottom: 1px solid #e9ecef;
  img {
    height: 2rem;
  }
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
