import { Link } from "react-router-dom";
import Warn from "../components/Warn";
import styled from "styled-components";
import styles from "./NotFoundPage.module.css";
import Container from "../components/Container";

// Container 컴포넌트에 maring: 80 auto가 들어가있는데 왜 안 먹을까?

function NotFoundPage() {
  return (
    <Container className={styles.container}>
      <Warn
        variant="big"
        title="존재하지 않는 페이지에요."
        description="올바른 주소가 맞는지 다시 한 번 확인해 주세요."
      />
      <div className={styles.link}>
        <Link to="/">
          <Button>홈으로 가기</Button>
        </Link>
      </div>
    </Container>
  );
}

const Button = styled.button`
  width: 100%;
  height: 3rem;
  margin-top: 1rem;
  border: none;
  border-radius: 0.25rem;
  background-color: #3366ff;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
`;

export default NotFoundPage;
