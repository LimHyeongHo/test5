import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import LoginPage from './pages/login/LoginPage';
import SignupPage from './pages/signup/SignupPage';
import HomePage_v2 from './pages/home/HomePage_v2';
/// SecurityLogPage 연결
import SecurityLogPage from './pages/security/SecurityLogPage';

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
{/* 보안 로그 화면으로 접속했을 때 보여줄 화면 */}
<Route path="/security" element={<SecurityLogPage />} />
        {/* 나중에 전공책 상세페이지 같은 걸 추가하면 이렇게 씁니다 */}
        {/* <Route path="/book/:id" element={<BookDetail />} /> */} 
      </Routes>
    </BrowserRouter>
  );
}

export default App;