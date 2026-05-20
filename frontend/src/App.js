import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/login/LoginPage';

// import Home from './pages/Home'; // (나중에 Home 화면 만들면 주석 해제)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 메인 주소(localhost:3000/)로 접속했을 때 보여줄 화면 */}
        {/* <Route path="/" element={<Home />} /> */}

        {/* 로그인 주소(localhost:3000/login)로 접속했을 때 보여줄 화면 */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* 나중에 전공책 상세페이지 같은 걸 추가하면 이렇게 씁니다 */}
        {/* <Route path="/book/:id" element={<BookDetail />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;