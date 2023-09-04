import React from "react";
import styled from "styled-components";

function Footer() {
  return <FooterConainter>Footer</FooterConainter>;
}

// 페이지 하단에 고정되는 푸터
const FooterConainter = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 4rem;
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Footer;
