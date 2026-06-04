import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { User, ShoppingBag, Bookmark, Settings, Store, CreditCard, ChevronRight } from 'lucide-react';
import Header from '../../../components/layout/Header';

const SharedMyPageLayout = ({ userRole = 'BUYER' }) => {
  // 현재 접속한 주소의 앞부분을 파악하여 링크를 동적으로 생성합니다.
  const basePath = userRole === 'SELLER' ? '/seller/mypage' : '/buyer/mypage';

  const buyerMenuItems = [
    { path: 'overview', label: '회원 정보 개요', icon: <User size={18} /> },
    { path: 'orders', label: '참여 중인 공동구매', icon: <ShoppingBag size={18} /> },
    { path: 'scrap', label: '관심 도서 (스크랩)', icon: <Bookmark size={18} /> },
    { path: 'settings', label: '프로필/비밀번호 수정', icon: <Settings size={18} /> },
  ];

  const sellerMenuItems = [
    { path: 'overview', label: '회원 정보 개요', icon: <User size={18} /> },
    { path: 'projects', label: '개설한 공동구매 관리', icon: <Store size={18} /> },
    { path: 'settlement', label: '정산 및 계좌 관리', icon: <CreditCard size={18} /> },
    { path: 'settings', label: '프로필/비밀번호 수정', icon: <Settings size={18} /> },
  ];

  const menuItems = userRole === 'SELLER' ? sellerMenuItems : buyerMenuItems;
  const location = useLocation();

  // 현재 활성화된 탭의 이름을 찾아서 메인 타이틀로 띄워줍니다.
  const activeMenu = menuItems.find(item => location.pathname.includes(item.path));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-gray-900">
      <Header />

      <div className="bg-white border-b border-gray-200 py-8 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">마이페이지</h2>
          <span className="text-sm font-bold text-gray-400 mt-2">
            {userRole === 'SELLER' ? '판매자 계정 관리' : '구매자 계정 관리'}
          </span>
        </div>
      </div>

      <main className="flex-grow max-w-7xl w-full mx-auto p-6 md:p-8 flex flex-col md:flex-row gap-8">
        {/* 좌측 사이드바 (NavLinks) */}
        <aside className="w-full md:w-64 flex-shrink-0 flex flex-col gap-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={`${basePath}/${item.path}`} // 예: /buyer/mypage/overview
              className={({ isActive }) => `flex items-center justify-between w-full p-4 rounded-2xl font-bold transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-100/50' 
                  : 'text-gray-500 hover:bg-gray-100/70 hover:text-gray-900'
              }`}
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                  </div>
                  {isActive && <ChevronRight size={16} />}
                </>
              )}
            </NavLink>
          ))}
        </aside>

        {/* 우측 메인 콘텐츠 (Outlet이 뚫려있는 영역) */}
        <section className="flex-grow flex flex-col gap-6">
          <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-2">
            {activeMenu?.label}
          </h3>
          
          {/* 자식 컴포넌트들이 이곳에 주입됩니다! */}
          <Outlet /> 
          
        </section>
      </main>

      {/* 푸터 영역 (기존과 동일하므로 생략) */}
      <footer className="bg-white border-t border-gray-200 py-10 mt-auto">
        {/* 푸터 내용 */}
      </footer>
    </div>
  );
};

export default SharedMyPageLayout;