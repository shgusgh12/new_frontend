import React from "react";
import styled, { keyframes, css } from "styled-components";
import Button from "./Button";
import { useState, useEffect } from "react";

const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1
  }
  to {
    opacity: 0
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(200px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const slideDown = keyframes`
  from {
    opacitiy: 1;
    transform: translateY(0px);
  }
  to {
    opacity: 0;
    transform: translateY(200px);
  }
`;
const DarkBackground = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);

  /* animation */
  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;

  /* disappear */
  ${(props) =>
    props.disappear &&
    css`
      animation-name: ${fadeOut};
    `}
`;

const ModalBlock = styled.div`
  width: ${(props) => `${props.width}` || "20rem"};
  height: ${(props) => `${props.height}` || "auto"};
  padding: 1.5rem;
  background: white;
  border-radius: 2px;
  position: relative;
  h3 {
    margin: 0;
    font-size: 1.5rem;
  }
  p {
    font-size: 1.125rem;
  }

  /* animation */
  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;

  /* disappear */
  ${(props) =>
    props.disappear &&
    css`
      animation-name: ${slideDown};
    `}
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
`;

const ButtonGroup = styled.div`
  width: 40%;
  height: 40px;
  background-color: blue;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 1.2rem;
  right: 1.2rem;
`;

// const ShortMarginButton = styled(Button)`
//   & + & {
//     margin-left: 0.5rem;
//   }
// `;

function Modal({
  title,
  children,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  visible,
  width,
  height,
}) {
  // 현재 트랜지션 효과를 보여주고 있는 상태를 의미
  const [animate, setAnimate] = useState(false);
  // 실제로 모달을 보여주고 있는 상태
  const [localVisible, setLocalVisible] = useState(visible);

  useEffect(() => {
    // visible 값이 true -> false 가 되는 것을 감지
    if (localVisible && !visible) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 250);
    }
    setLocalVisible(visible);
  }, [localVisible, visible]);

  if (!animate & !localVisible) return null;
  return (
    <DarkBackground disappear={!visible}>
      <ModalBlock disappear={!visible} width={width} height={height}>
        <Title>{title}</Title>
        <p>{children}</p>
        <ButtonGroup>
          {onCancel && (
            <Button width="50%" height="100%" color="red" onClick={onCancel}>
              {cancelText}
            </Button>
          )}
          {onConfirm && (
            <Button width="50%" height="100%" color="green" onClick={onConfirm}>
              {confirmText}
            </Button>
          )}
        </ButtonGroup>
      </ModalBlock>
    </DarkBackground>
  );
}

Modal.defaultProps = {
  confirmText: "확인",
  cancelText: "취소",
};

export default Modal;
