import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import LoginPage from './pages/login/LoginPage';
import SignupPage from './pages/signup/SignupPage';
import HomePage_v2 from './pages/home/HomePage_v2';
/// [*] 관리자용 페이지 import
import SecurityLogPage from './pages/admin/security/SecurityLogPage';
import UserAuthorization from './pages/admin/authorization/UserAuthorization';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 메인 주소(localhost:3000/)로 접속했을 때 보여줄 화면 */}
        {/* <Route path="/" element={<Home />} /> */}

        {/* 로그인 주소(localhost:3000/login)로 접속했을 때 보여줄 화면 */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* ✨ 회원가입 주소 등록 (http://localhost:3000/signup) */}
        <Route path="/signup" element={<SignupPage />} />

        {/* 홈 화면으로 접속했을 때 보여줄 화면 */}
        <Route path="/home" element={<HomePage_v2 />} />
        { /* 보안 로그 화면으로 접속했을 때 보여줄 화면 */ }
        <Route path="/security" element={<SecurityLogPage />} />

        { /* 회원 관리 페이지 접속 화면 */}
        <Route path="/authorization" element={<UserAuthorization />} />

        {/* 나중에 전공책 상세페이지 같은 걸 추가하면 이렇게 씁니다 */}
        {/* <Route path="/book/:id" element={<BookDetail />} /> */} 
      </Routes>
    </BrowserRouter>
  );
}

export default App;