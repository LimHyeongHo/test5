import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, ShieldAlert } from 'lucide-react';

const Header = () => {
  const [userRole, setUserRole] = useState('BUYER'); // BUYER, SELLER, ADMIN 중 하나

  const handleRoleToggle = (e) => {
    e.preventDefault();
    if (userRole === 'BUYER') setUserRole('SELLER');
    else if (userRole === 'SELLER') setUserRole('ADMIN');
    else setUserRole('BUYER');
  };

  const myPagePath = userRole === 'SELLER' ? '/seller/mypage' : userRole === 'ADMIN' ? '/admin/dashboard' : '/buyer/mypage';

  return (
    // 전체 배경은 화면 끝까지 채우고, 양끝 정렬(justify-between)을 유지합니다.
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 w-full h-16 flex items-center justify-between">
      
      {/* 1. 좌측 로고 영역: 화면이 1280px(7xl)을 넘어가면 자동으로 본문 시작 선에 맞춰 안으로 밀려 들어옵니다. */}
      <div className="flex items-center shrink-0 pl-[max(1.5rem,calc(50vw-40rem+1.5rem))] md:pl-[max(2rem,calc(50vw-40rem+2rem))]">
        <Link to="/" className="text-xl font-black tracking-tight text-gray-900 hover:text-blue-600 transition">
          YU-BOOK
        </Link>
      </div>

      {/* 2 & 3. 우측 영역: 화면 너비와 상관없이 항상 우측 끝에 시원하게 고정됩니다. */}
      <div className="flex items-center gap-8 pr-6 md:pr-8">
        
        <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-gray-500">
          {userRole === 'ADMIN' && (
            <>
              <Link to="/admin/dashboard" className="hover:text-red-600 transition">관리자 홈</Link>
              <Link to="/admin/authorization" className="hover:text-red-600 transition">회원 관리</Link>
              <Link to="/admin/products" className="hover:text-red-600 transition">상품 관리</Link>
              <Link to="/admin/security" className="hover:text-red-600 transition">보안 로그</Link>
            </>
          )}

          {userRole === 'SELLER' && (
            <>
              <Link to="/seller/dashboard" className="hover:text-gray-950 transition">대시보드</Link>
              <Link to="/seller/products" className="hover:text-gray-950 transition">물품 등록</Link>
              <Link to="/seller/status" className="hover:text-gray-950 transition">판매 현황</Link>
              <Link to="/seller/analytics" className="hover:text-gray-950 transition">분석 데이터</Link>
              <Link to="/seller/chat" className="hover:text-gray-950 transition">채팅</Link>
            </>
          )}

          {userRole === 'BUYER' && (
            <>
              <Link to="/" className="hover:text-gray-950 transition">홈</Link>
              <Link to="/buyer/products" className="hover:text-gray-950 transition">공구 찾기</Link> 
              <Link to="/buyer/chat" className="hover:text-gray-950 transition">채팅</Link>
            </>
          )}
        </nav>

        <div className="hidden md:block w-px h-4 bg-gray-200"></div>

        <Link 
          to={myPagePath} 
          className="flex items-center gap-3 hover:bg-gray-50 px-3 py-1.5 rounded-2xl transition cursor-pointer group shrink-0"
        >
          <div className="flex flex-col text-right">
            <span className="text-sm font-extrabold text-gray-900 group-hover:text-blue-600 transition">
              {userRole === 'ADMIN' ? '최고 관리자' : '임형호 님'}
            </span>
            <span 
              onClick={handleRoleToggle}
              className={`text-[10px] font-black tracking-wider uppercase cursor-pointer hover:opacity-70 transition ${
                userRole === 'ADMIN' ? 'text-red-600' : userRole === 'SELLER' ? 'text-emerald-600' : 'text-blue-600'
              }`}
              title="클릭하여 모드 변경 (테스트용)"
            >
              {userRole} MODE
            </span>
          </div>
          
          <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-blue-300 transition shadow-inner overflow-hidden">
            {userRole === 'ADMIN' ? <ShieldAlert size={18} className="text-red-500" /> : <User size={18} className="group-hover:text-blue-500" />}
          </div>
        </Link>
        
      </div>
    </header>
  );
};

export default Header;