import { NavAside } from "../../../components/Nav";
import MyPageBody from "./body";
import styled from "styled-components";

function MyPage() {
    return (
        <MyPageContainer>
            <NavAside />
            <MyPageBody />
        </MyPageContainer>
    );
}

const MyPageContainer = styled.div`
    display: flex;
    margin-top: 40px;
`;

export default MyPage;
