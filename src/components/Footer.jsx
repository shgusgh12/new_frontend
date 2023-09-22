import facebookIcon from "../assets/facebook.svg";
import twitterIcon from "../assets/twitter.svg";
import instagramIcon from "../assets/instagram.svg";
import styles from "./Footer.module.scss";
import Container from "./Container";

function Footer() {
    return (
        <div className={styles.footer}>
            <Container>
                <ul className={styles.links}>
                    <li>스토코디 소개</li>
                    <li>개인정보 취급방침</li>
                    <li>사용자 이용약관</li>
                    <li>자주 묻는 질문</li>
                </ul>
                <ul className={styles.info}>
                    <li>(주)스토코디</li>
                    <li>대표 | 김재홍 </li>
                    <li>개인정보보호책임자 | 김재홍 </li>
                    <li>대표 번호 | 010-****-**** </li>
                    <li>사업자번호 | ***-**-****</li>
                    <li>주식경영업 | 제****-서울**-****호 </li>
                    <li>주소 | 대구광역시 북구 경대로 100 스타트업빌리지 10호실 </li>
                </ul>
                <div className={styles.sns}>
                    <img src={facebookIcon} alt="facebook icon" />
                    <img src={twitterIcon} alt="twitter icon" />
                    <img src={instagramIcon} alt="instagram icon" />
                </div>
            </Container>
        </div>
    );
}

export default Footer;
