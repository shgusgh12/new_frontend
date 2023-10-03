import React from "react";
import backgroundImage from "../assets/loginSignUpBackground.png";
import styled from "styled-components";
import Button from "../components/Button";
import { useState } from "react";
import Modal from "../components/Modal";
import logo from "../assets/icon-stocodi.png";
import googleIcon from "../assets/icon-googleSymbol.png";
import kakaoIcon from "../assets/icon-kakaoSymbol.png";
import naverIcon from "../assets/icon-naverSymbol.png";
import { useNavigate } from "react-router-dom";
import { postApi } from "../utils/http";
import { setCookie } from "../utils/cookie";
import axios from "axios";

// 소셜 로그인 provider
const socialLoginProviders = [
  {
    icon: googleIcon,
    text: "구글 계정으로 시작",
  },
  {
    icon: naverIcon,
    text: "네이버 계정으로 시작",
  },
  {
    icon: kakaoIcon,
    text: "카카오 계정으로 시작",
  },
];

function Login({ fromSignUp = false }) {
  const navigate = useNavigate();
  // 모달 창
  const [modal, setModal] = useState(false);
  // login error state
  const [errorNum, setErrorNum] = useState(0);
  // login error message
  const [errorMessage, setErrorMessage] = useState("");
  // login form
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  // 이메일 변경 시
  const handleEmail = (e) => {
    setLoginForm({
      ...loginForm,
      email: e.target.value,
    });
  };

  // 비밀번호 변경 시
  const handlePassword = (e) => {
    setLoginForm({
      ...loginForm,
      password: e.target.value,
    });
  };

  // 로그인 버튼 클릭 시
  const handleLoginClick = async () => {
    // 로그인 요청
    try {
      const { data } = await postApi({
        url: "/auth/login",
        requestBody: loginForm,
      });
      if (data) {
        // 쿠키에 닉네임 저장
        setCookie("nickname", data.response.member_nickname, {
          path: "/",
          domain: ".stocodi.com",
        });
        // axios의 모든 header에 token 추가
        navigate("/");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const onConfirm = () => {
    console.log("확인");
    setModal(false);
  };
  const onCancel = () => {
    console.log("취소");
    setModal(false);
  };

  //회원가입 클릭
  const handleClickSignUp = () => {
    navigate("/auth/signup");
  };

  return (
    <LoginContainer>
      {/* 오른쪽 배경 */}
      <LoginBackground>
        <LoginBackgroundImage
          src={backgroundImage}
          alt="loginBackgroundImage"
        />
      </LoginBackground>
      {/* 오른쪽 위 로고 */}
      <StocodiLogo>
        <StocodiLogoImage src={logo} alt="logo" />
      </StocodiLogo>
      {/* 왼쪽 흰색 배경 */}
      <LeftContainer>
        <LoginBox>
          <LoginTitle>
            {fromSignUp ? (
              <>
                <Stocodi>Stocodi</Stocodi>회원가입 완료!
              </>
            ) : (
              <>
                <Stocodi>Stocodi</Stocodi>에 오신 걸 환영해요!
              </>
            )}
          </LoginTitle>
          <LoginInputBox>
            <Label>이메일</Label>
            <LoginInput
              type="email"
              name="email"
              value={loginForm.email}
              onChange={handleEmail}
              required
            ></LoginInput>
            <Label>비밀번호</Label>
            <LoginInput
              type="password"
              name="password"
              value={loginForm.password}
              onChange={handlePassword}
              required
            ></LoginInput>
          </LoginInputBox>
          <Button width="80%" height="3rem" onClick={handleLoginClick}>
            로그인
          </Button>
          <LineContainer>
            <Line>
              <LineText>또는</LineText>
            </Line>
          </LineContainer>
          <SocialLoginContainer>
            {socialLoginProviders.map((provider, index) => (
              <SocialLoginBox key={index}>
                <SocialIcon src={provider.icon} alt={`${provider.text} Icon`} />
                <SocialText>{provider.text}</SocialText>
              </SocialLoginBox>
            ))}
          </SocialLoginContainer>
          <SignUpButton>
            계정이 없으신가요?{" "}
            <SignUpText onClick={handleClickSignUp}>회원가입</SignUpText>
          </SignUpButton>
        </LoginBox>
        {/* 로그인 실패 시 모달 */}
        <Modal
          width={"50%"}
          height={"12rem"}
          title={errorMessage}
          onConfirm={onConfirm}
          visible={modal}
        >
          다시 입력해주세요.
        </Modal>
      </LeftContainer>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const LoginBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 40%;
  height: 100%;
  z-index: -1;
  display: flex;
  justify-content: center;
  align-items: center;
  /* transform: translateX(400px); */
`;

const LoginBackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StocodiLogo = styled.div`
  position: absolute;
  top: 18px;
  right: 20px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StocodiLogoImage = styled.img`
  width: 100%;
`;

// 로그인 박스가 백그라운드 이미지 위에 있어야 한다.
const LeftContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 65%;
  min-width: 500px;
  height: 100%;

  background-color: white;
  box-shadow: var(--box-shadow);

  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;

  align-items: center;

  /* 크기가 작아지면 스크롤 가능 */
  overflow-y: auto;
  @media (max-width: 500px) {
    border-radius: 0;
  }
  /* 크기가 줄어들었을 때 flex는 화면 중간으로 줌이 되는데 위에도 보이게 설정  */
  @media (max-height: 500px) {
    justify-content: flex-start;
    padding: 1rem 0;
  }
`;

const LoginBox = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginTitle = styled.div`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  max-width: 80%;
  text-align: center;
`;

const Stocodi = styled.span`
  font-weight: 800;
  color: ${(props) => props.theme.palette.green};
`;

const LoginInputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-bottom: 2rem;
`;

const Label = styled.label`
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 0.2rem;
`;

const LoginInput = styled.input`
  width: 100%;
  height: 3rem;
  border: none;
  background-color: #f8f8f8;
  border-radius: 0.5rem;
  padding-left: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  &:focus {
    outline: none;
    border: 1px solid ${(props) => props.theme.palette.green};
  }
`;

const LineContainer = styled.div`
  margin: 2rem 0 1rem;
  width: 80%;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LineText = styled.div`
  height: 1rem;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 500;
  color: #828282;
  background-color: white;
  padding: 0 1rem;
`;

const SocialLoginContainer = styled.div`
  width: 80%;
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SocialLoginBox = styled.div`
  width: 30%;
  height: 3rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const SocialIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
`;

const SocialText = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  @media (max-width: 869px) {
    display: none;
  }
`;

const SignUpButton = styled.div`
  margin-top: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: #828282;
`;

const SignUpText = styled.span`
  cursor: pointer;
  color: ${(props) => props.theme.palette.green};
`;

export default Login;
