import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserCircle } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  // 🚨 [임시 설정] 테스트를 위해 'ADMIN', 'SELLER', 'BUYER' 중 하나로 바꿔보며 확인하세요!
  // 나중에 백엔드 로그인 정보(AuthContext 등)가 들어오면 이 부분이 자동으로 연동됩니다.
  const userRole = 'ADMIN';

  // 1. 역할별 메뉴 구성 데이터를 객체 형태로 깔끔하게 정리 (메모리에 저장!)
  const menuConfigs = {
    ADMIN: [
      { label: '통합 대시보드', path: '/dashboard' },
      { label: '회원/권한 관리', path: '/authorization' },
      { label: '공동구매 관리', path: '/groups' },
      { label: '보안/감사 로그', path: '/security' },
    ],
    SELLER: [
      { label: '대시보드', path: '/seller/dashboard' },
      { label: '물품 등록', path: '/seller/register' },
      { label: '판매 현황', path: '/seller/status' },
      { label: '분석 데이터', path: '/seller/analytics' },
      { label: '채팅', path: '/chat' },
      { label: '마이페이지', path: '/mypage' },
    ],
    BUYER: [
      { label: '게시글 보기', path: '/' },
      { label: '채팅', path: '/chat' },
      { label: '찜/스크랩', path: '/bookmarks' },
      { label: '마이페이지', path: '/mypage' },
    ]
  };

  // 2. 현재 로그인 페이지나 회원가입 페이지인지 확인
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  // 3. 현재 역할에 맞는 메뉴 리스트 가져오기 (없으면 빈 배열)
  const currentMenus = menuConfigs[userRole] || [];

  return (
    <header className="flex justify-between items-center px-8 py-5 bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      
      {/* 좌측 로고 */}
      <div className="font-black text-2xl tracking-tighter text-gray-900 shrink-0">
        <Link to="/">YU-BOOK</Link>
      </div>
      
      {/* 중앙 메뉴 영역 (로그인/회원가입이 아닐 때만 노출) */}
      {!isAuthPage && (
        <nav className="flex items-center gap-10">
          <ul className="flex gap-8 text-sm font-semibold text-gray-600">
            {currentMenus.map((menu, index) => (
              <li key={index}>
                <Link 
                  to={menu.path} 
                  className={`transition-colors duration-200 py-1 ${
                    location.pathname === menu.path 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'hover:text-blue-600'
                  }`}
                >
                  {menu.label}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* 우측 사용자 프로필 (중복 요소) */}
          <div className="flex items-center gap-2 text-gray-700 pl-6 border-l border-gray-200 ml-2">
            <div className="flex flex-col items-end mr-1">
              <span className="font-bold text-sm">임형호 님</span>
              <span className="text-[10px] text-blue-600 font-extrabold uppercase tracking-tight">
                {userRole} MODE
              </span>
            </div>
            <UserCircle size={32} className="text-gray-300" />
          </div>
        </nav>
      )}

      {/* 로그인/회원가입 페이지일 때는 오른쪽을 비워두어 로고를 강조합니다 */}
      {isAuthPage && <div className="w-[100px]"></div>}
    </header>
  );
};

export default Header;