import LeftBar from "../../../components/LeftBar";
import MyPageBody from "./body";
import styled from "styled-components";

function MyPage() {
  return (
    <MyPageContainer>
      <LeftBar />
      <MyPageBody />
    </MyPageContainer>
  );
}

const MyPageContainer = styled.div`
  display: flex;
`;

export default MyPage;
