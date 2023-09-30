import React from "react";
import backgroundImage from "../assets/loginSignUpBackground.png";
import styled from "styled-components";
import Button from "../components/Button";
import { useState, useCallback, useRef } from "react";
import Modal from "../components/Modal";
import logo from "../assets/icon-stocodi.png";
import googleIcon from "../assets/icon-googleSymbol.png";
import kakaoIcon from "../assets/icon-kakaoSymbol.png";
import naverIcon from "../assets/icon-naverSymbol.png";
import { useNavigate } from "react-router-dom";
import { getApi, postApi } from "../utils/http";
import Login from "./Login";

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

// 각 input 컴포넌트입니다.
const InputDiv = ({
  labelName,
  isValid,
  isDoubleCheck,
  message,
  bottom,
  children,
}) => {
  return (
    <StyledInputDiv bottom={bottom}>
      <Label>{labelName}</Label>
      {children}
      {/* 중복체크 필요 없는 인풋 */}
      {isDoubleCheck === undefined ? (
        isValid ? (
          <ValidMessage color="#2D791E">{message}</ValidMessage>
        ) : (
          <ValidMessage>{message}</ValidMessage>
        )
      ) : // 중복체크 필요한 인풋
      isValid ? (
        isDoubleCheck ? (
          <ValidMessage color="#2D791E">{message}</ValidMessage>
        ) : (
          <ValidMessage>{message}</ValidMessage>
        )
      ) : (
        <ValidMessage>{message}</ValidMessage>
      )}
    </StyledInputDiv>
  );
};

// 중복확인 버튼 등 안에 버튼이 있는 인풋 컴포넌트입니다.
function InputWithButton({
  type,
  name,
  value,
  handleInput,
  handleButton,
  buttonDisabled,
  buttonName = "확인",
}) {
  return (
    <EmailDiv>
      <SignUpInput
        type={type}
        name={name}
        value={value}
        onChange={handleInput}
        required
      ></SignUpInput>
      <DuplicateButton>
        <Button
          width="100%"
          height="100%"
          name={name}
          onClick={handleButton}
          disabled={!buttonDisabled}
        >
          {buttonName}
        </Button>
      </DuplicateButton>
    </EmailDiv>
  );
}

// 생년월일 올바른지 유효성 검사
function isBirthday(dateStr) {
  var year = Number(dateStr.substr(0, 4)); // 입력한 값의 0~4자리까지 (연)
  var month = Number(dateStr.substr(4, 2)); // 입력한 값의 4번째 자리부터 2자리 숫자 (월)
  var day = Number(dateStr.substr(6, 2)); // 입력한 값 6번째 자리부터 2자리 숫자 (일)

  // 숫자가 아닌 경우 false를 반환
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return false;
  }

  var today = new Date(); // 날짜 변수 선언
  var yearNow = today.getFullYear(); // 올해 연도 가져옴

  if (dateStr.length <= 8) {
    // 연도의 경우 1900 보다 작거나 yearNow 보다 크다면 false를 반환합니다.
    if (1900 > year || year > yearNow) {
      return false;
    } else if (month < 1 || month > 12) {
      return false;
    } else if (day < 1 || day > 31) {
      return false;
    } else if (
      (month === 4 || month === 6 || month === 9 || month === 11) &&
      day === 31
    ) {
      return false;
    } else if (month === 2) {
      var isleap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
      if (day > 29 || (day === 29 && !isleap)) {
        return false;
      } else {
        return true;
      } //end of if (day>29 || (day==29 && !isleap))
    } else {
      return true;
    } //end of if
  } else {
    //1.입력된 생년월일이 8자 초과할때 :  auth:false
    return false;
  }
}

function SignUP() {
  // 회원가입 페이지 상태 저장
  const [page, setPage] = useState(1);
  const passwordRef = useRef();
  const navigate = useNavigate();

  // 회원가입 완료
  const [signUpComplete, setSignUpComplete] = useState(false);

  const handleNextPage = () => {
    setForm({
      ...form,
      name: form.name,
      email: form.email,
      password: form.password,
      passwordDoubleCheck: form.passwordDoubleCheck,
      nickname: form.nickname,
      birth_date: form.birth_date,
      gender: form.gender,
      interest_categories: "test",
    });
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setForm({
      ...form,
      name: form.name,
      email: form.email,
      password: form.password,
      passwordDoubleCheck: form.passwordDoubleCheck,
      nickname: form.nickname,
      birth_date: form.birth_date,
      gender: form.gender,
      interest_categories: "test",
    });
    setPage(page - 1);
  };

  // form
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordDoubleCheck: "",
    nickname: "",
    birth_date: "",
    gender: "MALE",
    interest_categories: "test",
  });

  // 오류메세지 상태 저장
  const [nameMessage, setNameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordDoubleMessage, setPasswordDoubleCheckMessage] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [birthMessage, setBirthMessage] = useState("");

  // 유효성 검사
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [nicknameValid, setNicknameValid] = useState(false);
  const [birthValid, setBirthValid] = useState(false);

  // 중복 확인
  const [emailDupliValid, setEmailDupliValid] = useState(false);
  const [nicknameDupliValid, setNicknameDupliValid] = useState(false);

  // 중복확인 모달
  const [emailModal, setEmailModal] = useState(false);
  const [nicknameModal, setNicknameModal] = useState(false);

  // 비밀번호 재확인
  const [passwordDoubleCheckValid, setPasswordDoubleCheckValid] =
    useState(false);

  // 이름 변경 시 유효성 검사
  const handleNameChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      // form등록
      setForm({
        ...form,
        [name]: value,
      });

      // 공백일 때는 오류 메세지 없애고 유효성 검사도 하지 않는다.
      if (e.target.value === "") {
        setNameMessage("");
        setNameValid(false);
        return;
      }

      // 초기화
      setNameValid(false);

      if (e.target.value.length < 2 || e.target.value.length > 5) {
        setNameMessage("2글자 이상 5글자 미만으로 입력해주세요.");
        setNameValid(false);
      } else {
        setNameMessage("올바른 이름 형식입니다 :)");
        setNameValid(true);
      }
    },
    [form]
  );

  //이메일 변경 시 유효성 검사
  const handleEmailChange = useCallback(
    (e) => {
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

      const { name, value } = e.target;

      setEmailValid(false);
      setForm({
        ...form,
        [name]: value,
      });

      // 공백일 때는 오류 메세지 없애고 유효성 검사도 하지 않는다.
      if (value === "") {
        setEmailMessage("");
        setEmailValid(false);
        return;
      }

      // 이메일 형식이 맞는지 확인
      if (!emailRegex.test(value)) {
        setEmailValid(false);
        setEmailMessage("올바른 이메일 형식이 아닙니다.");
      } else {
        setEmailValid(true);
        setEmailMessage("올바른 이메일 형식입니다 :) 중복 확인을 해주세요.");
      }
    },
    [form]
  );

  //password 값 변경 시
  const handlePasswordChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      let regPass = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

      setPasswordValid(false);
      setForm({
        ...form,
        [name]: value,
      });

      // 공백일 때는 오류 메세지 없애고 유효성 검사도 하지 않는다.
      if (e.target.value === "") {
        setPasswordMessage("");
        setPasswordValid(false);
        return;
      }

      // 비밀번호 형식이 맞는지 확인
      if (!regPass.test(e.target.value)) {
        setPasswordMessage(
          "비밀번호는 영문, 숫자, 특수문자를 포함한 8~25자리여야 합니다."
        );
        setPasswordValid(false);
      } else {
        setPasswordMessage("올바른 비밀번호 형식입니다 :)");
        setPasswordValid(true);
      }

      // 비밀번호 재확인
      if (passwordRef.current.value) {
        if (passwordRef.current.value === value) {
          setPasswordDoubleCheckValid(true);
          setPasswordDoubleCheckMessage("비밀번호가 일치합니다 :)");
        } else {
          setPasswordDoubleCheckValid(false);
          setPasswordDoubleCheckMessage("비밀번호가 일치하지 않습니다.");
        }
      }
    },
    [form]
  );

  // 비밀번호 재확인
  const handlePasswordCheck = useCallback(
    (e) => {
      const { name, value } = e.target;

      setForm({
        ...form,
        [name]: value,
      });

      // 공백일 때는 오류 메세지 없애고 유효성 검사도 하지 않는다.
      if (value === "") {
        setPasswordDoubleCheckValid(false);
        setPasswordDoubleCheckMessage("");
        return;
      }

      if (form.password === value) {
        setPasswordDoubleCheckValid(true);
        setPasswordDoubleCheckMessage("비밀번호가 일치합니다 :)");
      } else {
        setPasswordDoubleCheckValid(false);
        setPasswordDoubleCheckMessage("비밀번호가 일치하지 않습니다.");
      }
    },
    [form]
  );

  // 닉네임 변경 시 유효성 검사
  const handleNicknameChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      setNicknameValid(false);
      setForm({
        ...form,
        [name]: value,
      });

      // 공백일 때는 오류 메세지 없애고 유효성 검사도 하지 않는다.
      if (e.target.value === "") {
        setNicknameMessage("");
        setNicknameValid(false);
        return;
      }

      if (e.target.value.length < 2 || e.target.value.length > 5) {
        setNicknameMessage("2글자 이상 5글자 미만으로 입력해주세요.");
        setNicknameValid(false);
      } else {
        setNicknameMessage("올바른 닉네임 형식입니다 :) 중복확인을 해주세요.");
        setNicknameValid(true);
      }
    },
    [form]
  );

  // 생년월일 변경 시 유효성 검사
  const handleBirthChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      setBirthValid(false);
      setForm({
        ...form,
        [name]: value,
      });

      // 공백일 때는 오류 메세지 없애고 유효성 검사도 하지 않는다.
      if (e.target.value === "") {
        setBirthMessage("");
        setBirthValid(false);
        return;
      }

      if (isBirthday(value)) {
        setBirthMessage("올바른 생년월일 형식입니다 :)");
        setBirthValid(true);
      } else {
        setBirthMessage("올바른 생년월일 형식이 아닙니다.");
        setBirthValid(false);
      }
    },
    [form]
  );

  // 중복 확인 버튼 클릭 시
  const handleDupliClick = async (e) => {
    // 이메일 중복확인
    if (e.target.name === "email") {
      try {
        const { data } = await getApi(`/auth/email?email=${form.email}`);
        console.log(data);
        if (data) {
          // 사용 가능한 이메일
          setEmailDupliValid(true);
          setEmailModal(true);
        }
      } catch (error) {
        // 사용 불가능한 이메일
        setEmailDupliValid(false);
        setEmailModal(true);
      }
    } else if (e.target.name === "nickname") {
      // 닉네임 중복확인
      try {
        const { data } = await getApi(
          `/auth/nicknames/nickname?=${form.nickname}`
        );
        console.log(data);
        if (data) {
          // 사용 가능한 닉네임
          setNicknameDupliValid(true);
          setNicknameModal(true);
        }
      } catch (error) {
        // 사용 불가능한 닉네임
        setNicknameDupliValid(true);
        setNicknameModal(true);
      }
    }
  };

  // 이메일 중복체크 모달 => Confirm
  const onEmailDupliConfirm = () => {
    setEmailDupliValid(true);
    setEmailModal(false);
    setEmailMessage("중복확인이 완료됐습니다 :)");
  };

  // 이메일 중복체크 모달 => Cancel
  const onEmailDupliCancel = () => {
    setEmailDupliValid(false);
    setEmailModal(false);
    setEmailMessage("중복확인을 다시 해주세요.");
  };

  // 이메일 중복체크 모달 => 이메일 중복 : 다시 입력해주세요.
  const onEmailDupliNotConfirm = () => {
    setEmailDupliValid(false);
    setEmailModal(false);
    setEmailMessage("다른 이메일을 입력해주세요.");
  };

  // 닉네임 중복체크 모달 => Confirm
  const onNicknameDupliConfirm = () => {
    setNicknameDupliValid(true);
    setNicknameModal(false);
    setNicknameMessage("중복확인이 완료됐습니다 :)");
  };

  // 닉네임 중복체크 모달 => Cancel
  const onNicknameDupliCancel = () => {
    setNicknameDupliValid(false);
    setNicknameModal(false);
    setNicknameMessage("중복확인을 다시 해주세요.");
  };

  // 닉네임 중복체크 모달 => 이메일 중복 : 다시 입력해주세요.
  const onNicknameDupliNotConfirm = () => {
    setNicknameDupliValid(false);
    setNicknameModal(false);
    setNicknameMessage("다른 닉네임을 입력해주세요.");
  };

  // 로그인 화면으로 이동
  const handleClickLogin = () => {
    navigate("/auth/login");
  };

  //회원가입
  async function handleSubmmit() {
    // passwordDoubleCheck 값 재외
    const { passwordDoubleCheck, ...formDataToSend } = form;
    // birth_date 형식  : YYYY-MM-DD
    formDataToSend.birth_date = formDataToSend.birth_date.replace(
      /^(\d{4})(\d{2})(\d{2})$/,
      "$1-$2-$3"
    );
    //회원가입 요청
    try {
      const { data } = await postApi("/auth/members", formDataToSend);
      if (data) {
        setSignUpComplete(true);
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      {signUpComplete ? (
        <Login fromSignUp={true} />
      ) : (
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
            <SignUpBox>
              {/* page 1 => 이름, 이메일, 비밀번호, 비밀번호 재확인 */}
              {page === 1 ? (
                <>
                  {/* Title */}
                  <SignUpTitle>
                    <Stocodi>Stocodi</Stocodi>에 오신 걸 환영합니다!
                  </SignUpTitle>
                  <SocialLoginContainer>
                    {socialLoginProviders.map((provider, index) => (
                      <SocialLoginBox key={index}>
                        <SocialIcon
                          src={provider.icon}
                          alt={`${provider.text} Icon`}
                        />
                        <SocialText>{provider.text}</SocialText>
                      </SocialLoginBox>
                    ))}
                  </SocialLoginContainer>
                  {/* OR */}
                  <LineContainer>
                    <Line>
                      <LineText>OR</LineText>
                    </Line>
                  </LineContainer>
                  <SignUpInputBox>
                    {/* 이름 */}
                    <InputDiv
                      labelName="이름"
                      isValid={nameValid}
                      message={nameMessage}
                    >
                      <SignUpInput
                        type="name"
                        name="name"
                        required
                        onChange={handleNameChange}
                        value={form.name}
                      ></SignUpInput>
                    </InputDiv>
                    {/* 이메일 */}
                    <InputDiv
                      labelName="이메일"
                      isValid={emailValid}
                      isDoubleCheck={emailDupliValid}
                      message={emailMessage}
                    >
                      <InputWithButton
                        type="email"
                        name="email"
                        value={form.email}
                        handleInput={handleEmailChange}
                        handleButton={handleDupliClick}
                        buttonDisabled={emailValid}
                        buttonName="중복확인"
                      />
                    </InputDiv>
                    {/* 비밀번호 */}
                    <InputDiv
                      labelName="비밀번호"
                      isValid={passwordValid}
                      message={passwordMessage}
                    >
                      <SignUpInput
                        type="password"
                        name="password"
                        value={form.password}
                        required
                        onChange={handlePasswordChange}
                      ></SignUpInput>
                    </InputDiv>
                    {/* bottom props 확인 필요 */}
                    {/* 비밀번호 재확인 */}
                    <InputDiv
                      bottom="2rem"
                      labelName="비밀번호 재확인"
                      isValid={passwordDoubleCheckValid}
                      message={passwordDoubleMessage}
                    >
                      <SignUpInput
                        ref={passwordRef}
                        type="password"
                        name="passwordDoubleCheck"
                        value={form.passwordDoubleCheck}
                        required
                        onChange={handlePasswordCheck}
                      ></SignUpInput>
                    </InputDiv>
                    <Button width="100%" height="3rem" onClick={handleNextPage}>
                      다음으로
                    </Button>
                  </SignUpInputBox>
                </>
              ) : page === 2 ? (
                <>
                  <SignUpTitle>
                    <Stocodi>Stocodi</Stocodi>에 오신 걸 환영합니다!
                  </SignUpTitle>
                  <SignUpInputBox>
                    {/* page 2 => 닉네임, 휴대폰 번호, 생년월일, 성별 */}
                    {/* 닉네임 */}
                    <InputDiv
                      labelName="닉네임"
                      isValid={nicknameValid}
                      isDoubleCheck={nicknameDupliValid}
                      message={nicknameMessage}
                    >
                      <InputWithButton
                        type="text"
                        name="nickname"
                        value={form.nickname}
                        handleInput={handleNicknameChange}
                        handleButton={handleDupliClick}
                        buttonDisabled={nicknameValid}
                        buttonName="중복확인"
                      />
                    </InputDiv>
                    {/* 생년월일 */}
                    <InputDiv
                      labelName="생년월일"
                      bottom="2rem"
                      isValid={birthValid}
                      message={birthMessage}
                    >
                      <SignUpInput
                        type="text"
                        name="birth_date"
                        value={form.birth_date}
                        placeholder="YYYYMMDD"
                        required
                        onChange={handleBirthChange}
                      ></SignUpInput>
                    </InputDiv>
                    <ButtonGroup>
                      <Button
                        width="50%"
                        height="3rem"
                        outline="true"
                        onClick={handlePrevPage}
                      >
                        이전으로
                      </Button>
                      <Button
                        width="50%"
                        height="3rem"
                        onClick={handleNextPage}
                      >
                        다음으로
                      </Button>
                    </ButtonGroup>
                  </SignUpInputBox>
                </>
              ) : (
                <>
                  {/* page 3 => 관심 종목 페이지 */}
                  <SignUpTitle>
                    관심 종목이 있나요?
                    <SubTitle>
                      관심 종목을 선택한 후 맞춤 서비스를 누려보세요!
                    </SubTitle>
                  </SignUpTitle>
                  <SignUpInputBox>
                    <ButtonGroup>
                      <Button
                        width="50%"
                        height="3rem"
                        outline="true"
                        onClick={handlePrevPage}
                      >
                        이전으로
                      </Button>
                      <Button
                        width="50%"
                        height="3rem"
                        onClick={handleSubmmit}
                        disabled={
                          !(
                            nameValid &&
                            emailValid &&
                            emailDupliValid &&
                            passwordValid &&
                            passwordDoubleCheckValid &&
                            nicknameValid &&
                            nicknameDupliValid &&
                            birthValid
                          )
                        }
                      >
                        회원가입 완료
                      </Button>
                    </ButtonGroup>
                  </SignUpInputBox>
                </>
              )}
              <SignUpButton>
                이미 계정이 있으신가요?{" "}
                <SignUpText onClick={handleClickLogin}>로그인</SignUpText>
              </SignUpButton>
            </SignUpBox>
            {/* 이메일 중복확인 모달 */}
            {emailDupliValid && (
              <Modal
                width={"50%"}
                height={"12rem"}
                title="사용가능한 이메일입니다."
                onConfirm={onEmailDupliConfirm}
                onCancel={onEmailDupliCancel}
                visible={emailModal}
              >
                이 이메일을 사용하시겠습니까?
              </Modal>
            )}
            {/* 중복확인이 실패라면 */}
            {!emailDupliValid && (
              <Modal
                width={"50%"}
                height={"12rem"}
                title="사용 불가능한 이메일입니다."
                onConfirm={onEmailDupliNotConfirm}
                visible={emailModal}
              >
                다른 이메일을 입력해주세요.
              </Modal>
            )}
            {/* 닉네임 중복확인 모달 */}
            {nicknameDupliValid && (
              <Modal
                width={"50%"}
                height={"12rem"}
                title="사용가능한 닉네임입니다."
                onConfirm={onNicknameDupliConfirm}
                onCancel={onNicknameDupliCancel}
                visible={nicknameModal}
              >
                이 닉네임을 사용하시겠습니까?
              </Modal>
            )}
            {/* 중복확인이 실패라면 */}
            {!nicknameDupliValid && (
              <Modal
                width={"50%"}
                height={"12rem"}
                title="사용 불가능한 닉네임입니다."
                onConfirm={onNicknameDupliNotConfirm}
                visible={nicknameModal}
              >
                다른 닉네임을 입력해주세요.
              </Modal>
            )}
          </LeftContainer>
        </LoginContainer>
      )}
    </>
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

  padding: 1rem 0;

  /* 크기가 작아지면 스크롤 가능 */
  overflow-y: auto;
  @media (max-width: 500px) {
    border-radius: 0;
  }

  /* 크기가 줄어들었을 때 flex는 화면 중간으로 줌이 되는데 위에도 보이게 설정  */
  /* 추후 리팩토링 필요 => 각 페이지 별로 높이가 다르므로 페이지 별 젤 상단 태그의 높이 설정해서 화면이 그 높이보다 작을 시 flex-start로 구분
  그러면 자식들을 조정하는 flex-start가 아니라, 자식들에서 position : absolute로 top을 조정해야 */
  @media (max-height: 689px) {
    justify-content: flex-start;
    padding: 1rem 0;
  }
`;

const SignUpBox = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignUpTitle = styled.div`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  max-width: 80%;
  text-align: center;
  @media (max-width: 869px) {
    height: auto;
  }
`;

const Stocodi = styled.span`
  font-weight: 800;
  color: ${(props) => props.theme.palette.green};
`;

const SignUpInputBox = styled.div`
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

// 중복확인 버튼은 input안에 들어간다.
const EmailDiv = styled.div`
  width: 100%;
  height: 3rem;
  position: relative;
  display: flex;
  align-items: center;
`;

const DuplicateButton = styled.div`
  width: 20%;
  position: absolute;
  right: 0.25rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @media (max-width: 901px) {
    min-width: 74.875px;
  }
`;

const SignUpInput = styled.input`
  width: 100%;
  height: 3rem;
  border: none;
  background-color: #f8f8f8;
  border-radius: 0.5rem;
  padding-left: 0.5rem;
  font-size: 1rem;
  &:focus {
    outline: none;
    border: 1px solid ${(props) => props.theme.palette.green};
  }
  //placeholder
  &::placeholder {
    font-size: 0.8rem;
    font-weight: 500;
    color: #bdbdbd;
  }
`;

const LineContainer = styled.div`
  margin: 1rem 0;
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
  font-size: 1rem;
  font-weight: 500;
  color: #828282;
  background-color: white;
  padding: 0 1rem;
`;

const SocialLoginContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SocialLoginBox = styled.div`
  width: 30%;
  height: 3rem;
  border-radius: 0.5rem;
  border: 1px solid #e0e0e0;
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
  font-size: 0.8rem;
  font-weight: 500;
  color: #828282;
`;

const SignUpText = styled.span`
  cursor: pointer;
  color: ${(props) => props.theme.palette.green};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const SubTitle = styled.div`
  font-size: 1rem;
  font-weight: 500;
  margin-top: 0.5rem;
  color: #828282;
`;

// inputDiv 컴포넌트
const StyledInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: ${(props) => props.bottom || "1rem"};
`;

const ValidMessage = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  color: #828282;
  margin-top: 0.2rem;
  color: ${(props) => props.color || props.theme.palette.red};
`;

export default SignUP;
