import React from "react";
import backgroundImage from "../assets/loginSignUpBackground.png";
import styled from "styled-components";
import Button from "../components/Button";
import { useState } from "react";
import Modal from "../components/Modal";

function Login() {
  const [dialog, setDialog] = useState(false);
  const onClick = () => {
    setDialog(true);
  };
  const onConfirm = () => {
    console.log("확인");
    setDialog(false);
  };
  const onCancel = () => {
    console.log("취소");
    setDialog(false);
  };

  return (
    <LoginContainer>
      <LoginBackground>
        <LoginBackgroundImage
          src={backgroundImage}
          alt="loginBackgroundImage"
        />
      </LoginBackground>
      <LoginBox>
        <LoginTitle>로그인</LoginTitle>
        <LoginInputBox>
          <LoginInput placeholder="아이디"></LoginInput>
          <LoginInput placeholder="비밀번호"></LoginInput>
        </LoginInputBox>
        <Button width="80%" onClick={onClick}>
          로그인
        </Button>
      </LoginBox>
      <Modal
        title="정말로 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
        onConfirm={onConfirm}
        onCancel={onCancel}
        visible={dialog}
      >
        데이터를 정말로 삭제하시겠습니까?
      </Modal>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1500px;
  min-width: 1200px;
`;

const LoginBackground = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #3366ff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBackgroundImage = styled.img`
  width: 100%;
  height: 100%;
`;

// 로그인 박스가 백그라운드 이미지 위에 있어야 한다.
const LoginBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30rem;
  height: 30rem;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 1rem;
  box-shadow: var(--box-shadow);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginTitle = styled.div`
  font-size: 2rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 2rem;
  background-color: blue;
`;

const LoginInputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-bottom: 2rem;
  background-color: yellow;
`;

const LoginInput = styled.input`
  width: 100%;
  height: 3rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  padding-left: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  &:focus {
    outline: none;
    border: 1px solid #3366ff;
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

const LoginButton = styled.button`
  width: 80%;
  height: 3rem;
  border: none;
  border-radius: 0.25rem;
  background-color: #3366ff;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
`;

export default Login;
