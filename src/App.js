import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Main from "./components/Main";
import Home from "./pages/Home";
import Experiment from "./pages/User/experiment";
import Column from "./pages/User/column";
import Lecture from "./pages/User/lecture";
import Community from "./pages/User/community";
import MyPage from "./pages/User/mypage";
import NotFoundPage from "./pages/NotFoundPage";
// 마이페이지 Nested Route Sections
import PortfolioSection from "./pages/User/mypage/Portfolio";
import LedgerSection from "./pages/User/mypage/Ledger";
import ScrapSection from "./pages/User/mypage/Scrap";
import CommentSection from "./pages/User/mypage/Comment";
import PostSection from "./pages/User/mypage/Post";

// 오늘 해야할 일
// 1. 마이페이지 왼쪽 바 디자인
// 2. 마이페이지 라우팅
// 3. 없는 페이지 라우팅 done
// 4. 버튼, 모달 컴포넌트
// 5. 로그인, 회원가입 페이지 디자인
// 6. 로그인, 회원가입 리코일 상태 관리

// 오늘 해야할 일
// 마이페이지 들어가면 바로 포트폴리오
// 관리자, 유저 네브바 분리
// 버튼, 모달 컴포넌트
// 가능하면 로그인 리코일 상태 관리

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* 로그인, 회원가입 */}
                <Route path="/auth">
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                </Route>
                {/* 나머지 페이지 */}
                {/* 메인 컴포넌트는 공통 디자인 Navm, Footer가 들어가있습니다.*/}
                <Route path="/" element={<Main />}>
                    <Route index element={<Home />} />
                    {/* 
          Home에서 관리자면 관리자, 유저면 유저 컴포넌트 불러오게 하면 끝인가? 
          관리자는 유저가 보는 페이지 못 보게 분리해야해
          유저는 관리자가 보는 페이지 못 보게 분리해야해 
          */}
                    {/* 투자 실험 */}
                    <Route path="experiment" element={<Experiment />} />
                    {/* 강의실 */}
                    <Route path="lectures" element={<Lecture />} />
                    {/* 칼럼 */}
                    <Route path="column" element={<Column />} />
                    {/* 커뮤니티 */}
                    <Route path="community" element={<Community />} />
                    {/* 마이페이지 */}
                    <Route path="mypage" element={<MyPage />}>
                        <Route path="portfolio" element={<PortfolioSection />} />
                        <Route path="ledger" element={<LedgerSection />} />
                        <Route path="scrap" element={<ScrapSection />} />
                        <Route path="comment" element={<CommentSection />} />
                        <Route path="post" element={<PostSection />} />
                    </Route>
                    {/* 없는 페이지 */}
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
