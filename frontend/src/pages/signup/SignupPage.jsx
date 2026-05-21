import React from 'react';
import { Link } from 'react-router-dom';

// 로그인창과 동일한 배경 이미지를 사용하거나 프로젝트 assets 폴더의 이미지를 연결하세요.
const backgroundImgUrl = "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=2600"; 

const SignupPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* 1. 상단 헤더 (로그인 페이지와 100% 동일한 디자인 유지) */}
      <header className="flex justify-between items-center p-6 border-b border-gray-200 bg-white">
        <div className="font-bold text-2xl tracking-tight text-gray-900">
          YU-BOOK
        </div>
        <nav>
          <ul className="flex gap-8 text-sm font-medium text-gray-700">
            <li><a href="#" className="hover:text-blue-600">이용약관</a></li>
            <li><a href="#" className="hover:text-blue-600">개인정보처리방침</a></li>
            <li><a href="#" className="hover:text-blue-600">고객지원</a></li>
          </ul>
        </nav>
      </header>

      {/* 2. 메인 콘텐츠 영역 */}
      <main 
        className="flex-grow flex justify-center items-center bg-cover bg-center p-6 relative"
        style={{ backgroundImage: `url(${backgroundImgUrl})` }}
      >
        {/* 그라데이션 오버레이 효과 */}
        <div className="absolute inset-0 bg-radial-gradient from-gray-100/50 via-gray-300/80 to-gray-400/90 mix-blend-multiply"></div>

        {/* 3. 중앙 회원가입 카드 */}
        <div className="relative z-10 bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg border border-gray-100/50 backdrop-blur-sm my-8">
          
          {/* 카드 상단 타이틀 */}
          <div className="text-center mb-8">
            <p className="text-xs font-semibold text-red-500 uppercase tracking-widest mb-1">
              SECURE SIGNUP
            </p>
            <h1 className="text-4xl font-extrabold text-gray-950">
              회원가입
            </h1>
          </div>

          {/* 4. 회원가입 폼 */}
          <form className="flex flex-col gap-5">
            
            {/* 이름 입력 */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-medium text-gray-800">
                이름
              </label>
              <input 
                type="text" 
                id="name"
                placeholder="홍길동"
                className="w-full p-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-base"
              />
            </div>

            {/* 아이디(이메일) 입력 */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium text-gray-800">
                아이디(이메일)
              </label>
              <input 
                type="email" 
                id="email"
                placeholder="name@example.com"
                className="w-full p-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-base"
              />
            </div>

            {/* 학과/전공 입력 (대학생 공동구매 사이트 필수 맞춤형 필드) */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="department" className="text-sm font-medium text-gray-800">
                소속 학과 / 전공
              </label>
              <input 
                type="text" 
                id="department"
                placeholder="컴퓨터소프트웨어공학과"
                className="w-full p-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-base"
              />
            </div>

            {/* 비밀번호 입력 */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-medium text-gray-800">
                비밀번호
              </label>
              <input 
                type="password" 
                id="password"
                placeholder="••••••••"
                className="w-full p-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-base"
              />
            </div>

            {/* 비밀번호 확인 입력 */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="passwordConfirm" className="text-sm font-medium text-gray-800">
                비밀번호 확인
              </label>
              <input 
                type="password" 
                id="passwordConfirm"
                placeholder="••••••••"
                className="w-full p-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-base"
              />
            </div>

            {/* 5. 약관 동의 체크박스 */}
            <div className="flex items-start gap-3 mt-2 p-1">
              <input 
                type="checkbox" 
                id="agree" 
                className="w-5 h-5 mt-0.5 rounded text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
              />
              <label htmlFor="agree" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                <span className="text-blue-600 font-semibold">[필수]</span> YU-BOOK 이용약관 및 개인정보 수집·이용 동의에 동의합니다.
              </label>
            </div>

            {/* 회원가입 버튼 (시그니처 블루) */}
            <button 
              type="submit" 
              className="w-full mt-3 p-4 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 transition duration-150 active:scale-[0.98]"
            >
              회원가입 완료
            </button>
          </form>

          {/* 6. 카드 하단 (로그인 페이지 연결) */}
          <div className="mt-8 text-center text-gray-700 text-sm">
            이미 계정이 있으신가요? <Link to="/login" className="text-blue-600 font-semibold hover:underline ml-1">로그인하기</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;