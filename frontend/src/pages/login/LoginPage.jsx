import React from 'react';

/// [*] 회원가입 페이지와 연결
import { Link } from 'react-router-dom';

/// [*] 헤더 컴포넌트 연결
import Header from '../../components/layout/Header';

// 피그마 디자인의 배경 이미지가 필요합니다.
// 이미지를 src/assets 폴더에 넣고 import하거나, 
// 여기서는 임시로 플레이스홀더 URL을 사용합니다.
const backgroundImgUrl = "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=2600"; 

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* [*] 헤더 내용 수정 */}
    <Header />

      {/* 2. 메인 콘텐츠 영역 (배경 + 로그인 카드) */}
      <main 
        className="flex-grow flex justify-center items-center bg-cover bg-center p-4 relative"
        style={{ backgroundImage: `url(${backgroundImgUrl})` }}
      >
        {/* 디자인의 그라데이션 오버레이 효과 */}
        <div className="absolute inset-0 bg-radial-gradient from-gray-100/50 via-gray-300/80 to-gray-400/90 mix-blend-multiply"></div>

        {/* 3. 중앙 로그인 카드 (Login Modal) */}
        <div className="relative z-10 bg-white p-12 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100/50 backdrop-blur-sm">
          {/* 카드 상단 */}
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-red-500 uppercase tracking-widest mb-1">
              SECURE LOGIN
            </p>
            <h1 className="text-4xl font-extrabold text-gray-950">
              로그인
            </h1>
          </div>

          {/* 4. 로그인 폼 (Login Form) */}
          <form className="flex flex-col gap-6">
            {/* 이메일 입력 */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium text-gray-800">
                아이디(이메일)
              </label>
              <input 
                type="email" 
                id="email"
                placeholder="name@example.com"
                className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-base"
              />
            </div>

            {/* 비밀번호 입력 */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-baseline">
                <label htmlFor="password" className="text-sm font-medium text-gray-800">
                  비밀번호
                </label>
                <a href="#" className="text-xs text-blue-600 hover:underline">
                  비밀번호를 잊으셨나요?
                </a>
              </div>
              <input 
                type="password" 
                id="password"
                placeholder="••••••••"
                className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-base"
              />
            </div>

            {/* 본인인증 실행 버튼 
                추후 CA 기능 추가 시 여기에 데이터 추가*/}
            <button 
              type="submit" 
              className="w-full mt-2 p-4 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 transition duration-150 active:scale-[0.98]"
            >
              본인인증 실행
            </button>
          </form>

          {/* 5. 카드 하단 (Footer) 
          [*] 회원가입 페이지와 연결 */}
          <div className="mt-10 text-center text-gray-700">
            
            계정이 없으신가요? <Link to="/signup" className="text-blue-600 font-medium hover:underline">회원가입</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;