import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, ShieldAlert } from 'lucide-react';

const Header = () => {
  // 🛠️ [테스트용 수동 스위치] 초기값을 'BUYER', 'SELLER', 'ADMIN' 중 하나로 적어주세요!
  const [userRole, setUserRole] = useState('BUYER');

  // 화면에서 배지를 클릭하면 즉시 다른 모드로 바뀌는 마법의(?) 테스트 함수입니다.
  const handleRoleToggle = (e) => {
    e.preventDefault(); // 클릭 시 페이지 이동 방지
    if (userRole === 'BUYER') setUserRole('SELLER');
    else if (userRole === 'SELLER') setUserRole('ADMIN');
    else setUserRole('BUYER');
  };

  // 권한에 따른 마이페이지 이동 경로 (ADMIN은 마이페이지 대신 관리자 대시보드로 이동)
  const myPagePath = userRole === 'SELLER' ? '/seller/mypage' : userRole === 'ADMIN' ? '/admin/dashboard' : '/buyer/mypage';

  return (
    <header className="bg-white border-b border-gray-200 h-16 px-6 flex items-center justify-between sticky top-0 z-50">
      
      {/* 1. 좌측 영역: 로고 */}
      <Link to="/" className="text-xl font-black tracking-tight text-gray-900 hover:text-blue-600 transition shrink-0">
        YU-BOOK
      </Link>

      {/* 2 & 3. 우측 영역: 네비게이션 메뉴 + 유저 프로필 */}
      <div className="flex items-center gap-8">
        
        {/* 네비게이션 메뉴 (권한별 분기) */}
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
              {/* 공구 찾기는 나중에 만드실 경로를 상상해서 임시로 넣었습니다 */}
              <Link to="/buyer/products" className="hover:text-gray-950 transition">공구 찾기</Link> 
              <Link to="/buyer/chat" className="hover:text-gray-950 transition">채팅</Link>
            </>
          )}
        </nav>

        {/* 얇은 구분선 */}
        <div className="hidden md:block w-px h-4 bg-gray-200"></div>

        {/* 유저 프로필 영역 */}
        <Link 
          to={myPagePath} 
          className="flex items-center gap-3 hover:bg-gray-50 px-3 py-1.5 rounded-2xl transition cursor-pointer group shrink-0"
        >
          <div className="flex flex-col text-right">
            <span className="text-sm font-extrabold text-gray-900 group-hover:text-blue-600 transition">
              {userRole === 'ADMIN' ? '최고 관리자' : '임형호 님'}
            </span>
            
            {/* 👇 여기를 클릭하면 화면 상에서 모드가 즉시 바뀝니다! (테스트용) */}
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