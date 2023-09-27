import React from "react";
import styled, { css } from "styled-components";
import { darken, lighten } from "polished";

/*
색상, 가로, 세로, outline 의 옵션을 지정 가능합니다.
기본 색상 : 메인 색
기본 가로 : 100%
기본 세로 : 40px
outline 설정 시 테두리만 설정
*/

/*
사용 예시
<Button width="80%">버튼</Button> => 메인 색상, 가로 100px
<Button color="red" width="100px" height="50px">버튼</Button> => 회색, 가로 100px, 세로 50px
<Button color="black">버튼</Button> => 검정색, 가로 100%, 세로 40px
<Button color="light_green" outline>버튼</Button> => 연두색, outline, 가로 100%, 세로 40px
*/

const colorStyles = css`
  ${({ theme, color }) => {
    const selected = theme.palette[color];
    return css`
      background: ${selected};
      &:hover {
        background: ${lighten(0.1, selected)};
      }
      &:active {
        background: ${darken(0.1, selected)};
      }
      ${(props) =>
        props.outline &&
        css`
          color: ${selected};
          background: none;
          border: 1px solid ${selected};
          &:hover {
            background: ${selected};
            color: white;
          }
        `}
    `;
  }}
`;

const StyledButton = styled.button`
  /* 공통 스타일 */
  outline: none;
  border: none;
  border-radius: 0.5rem;
  color: white;
  /* font-weight: bold; */
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;

  /* 최소 크기 */
  @media (max-width: 901px) {
    min-width: 74.875px;
  }

  /* 크기 */
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "3rem"};

  /* 색상 */
  &.active {
    ${colorStyles}
  }
  /* 비활성화 색상 */
  &.deactive {
    background: #f0f0f0;
    color: #909090;
    cursor: default;
  }

  /* 기타 */
  & + & {
    margin-left: 1rem;
  }
`;

function Button({
  children,
  color,
  width,
  height,
  outline,
  disabled = false,
  ...rest
}) {
  return (
    <StyledButton
      color={color}
      width={width}
      height={height}
      outline={outline}
      disabled={disabled}
      className={disabled ? "deactive" : "active"}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}

Button.defaultProps = {
  color: "green",
};

export default Button;
