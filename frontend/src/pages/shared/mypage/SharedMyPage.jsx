import React, { useState } from 'react';
import { User, ShoppingBag, Bookmark, Settings, Edit3, ChevronRight, ShieldCheck, Store, CreditCard } from 'lucide-react';
import Header from '../../../components/layout/Header';

// userRole props를 받아옵니다 ('BUYER' 또는 'SELLER')
const SharedMyPage = ({ userRole = 'BUYER' }) => {
  const [activeTab, setActiveTab] = useState('OVERVIEW');

  // 1. 역할에 따른 동적 사이드바 메뉴 구성
  const buyerMenuItems = [
    { id: 'OVERVIEW', label: '회원 정보 개요', icon: <User size={18} /> },
    { id: 'ORDERS', label: '참여 중인 공동구매', icon: <ShoppingBag size={18} /> },
    { id: 'SCRAP', label: '관심 도서 (스크랩)', icon: <Bookmark size={18} /> },
    { id: 'SETTINGS', label: '프로필/비밀번호 수정', icon: <Settings size={18} /> },
  ];

  const sellerMenuItems = [
    { id: 'OVERVIEW', label: '회원 정보 개요', icon: <User size={18} /> },
    { id: 'MY_PROJECTS', label: '개설한 공동구매 관리', icon: <Store size={18} /> },
    { id: 'SETTLEMENT', label: '정산 및 계좌 관리', icon: <CreditCard size={18} /> },
    { id: 'SETTINGS', label: '프로필/비밀번호 수정', icon: <Settings size={18} /> },
  ];

  // 현재 역할에 맞는 메뉴 리스트를 선택합니다.
  const menuItems = userRole === 'SELLER' ? sellerMenuItems : buyerMenuItems;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-gray-900 ">
      <Header />

      {/* 상단 미니 배너 */}
      <div className="bg-white border-b border-gray-200 py-8 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">마이페이지</h2>
          {/* 역할에 따른 서브 타이틀 표시 */}
          <span className="text-sm font-bold text-gray-400 mt-2">
            {userRole === 'SELLER' ? '판매자 계정 관리' : '구매자 계정 관리'}
          </span>
        </div>
      </div>

      <main className="flex-grow max-w-7xl w-full mx-auto p-6 md:p-8 flex flex-col md:flex-row gap-8">
        
        {/* 좌측 사이드바 (LNB) */}
        <aside className="w-full md:w-64 flex-shrink-0 flex flex-col gap-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center justify-between w-full p-4 rounded-2xl font-bold transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-100/50' 
                  : 'text-gray-500 hover:bg-gray-100/70 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </div>
              {activeTab === item.id && <ChevronRight size={16} />}
            </button>
          ))}
        </aside>

        {/* 우측 메인 콘텐츠 영역 */}
        <section className="flex-grow flex flex-col gap-6">
          <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-2">
            {menuItems.find(item => item.id === activeTab)?.label}
          </h3>

          {/* '회원 정보 개요' 탭 */}
          {activeTab === 'OVERVIEW' && (
            <div className="bg-white rounded-[32px] p-8 border border-gray-200 shadow-sm flex flex-col gap-8">
              
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pb-8 border-b border-gray-100">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-gray-50 flex items-center justify-center shadow-inner overflow-hidden flex-shrink-0 text-gray-400">
                    <User size={40} />
                  </div>
                  
                  <div className="flex flex-col gap-2 text-center sm:text-left">
                    <h4 className="text-2xl font-extrabold text-gray-900">임형호</h4>
                    
                    {/* 2. 역할에 따라 변하는 동적 뱃지 */}
                    {userRole === 'SELLER' ? (
                      <span className="bg-emerald-100 text-emerald-700 text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md w-max mx-auto sm:mx-0 flex items-center gap-1">
                        <Store size={14} /> SELLER (판매자)
                      </span>
                    ) : (
                      <span className="bg-blue-100 text-blue-700 text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md w-max mx-auto sm:mx-0 flex items-center gap-1">
                        <ShieldCheck size={14} /> BUYER (구매자)
                      </span>
                    )}
                  </div>
                </div>

                <button 
                  onClick={() => setActiveTab('SETTINGS')}
                  className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-50 hover:text-gray-900 transition flex items-center gap-2 shadow-sm"
                >
                  <Edit3 size={16} /> 프로필 수정
                </button>
              </div>

              {/* 프로필 정보 그리드 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8 px-2">
                <div className="flex flex-col gap-1.5"><span className="text-xs font-bold text-gray-400 uppercase tracking-wider">회원 고유 번호 (User ID)</span><p className="text-base font-semibold text-gray-900">#202407030LHH</p></div>
                <div className="flex flex-col gap-1.5"><span className="text-xs font-bold text-gray-400 uppercase tracking-wider">로그인 이메일 계정</span><p className="text-base font-semibold text-gray-900">student@yuhan.ac.kr</p></div>
                <div className="flex flex-col gap-1.5"><span className="text-xs font-bold text-gray-400 uppercase tracking-wider">가입 일시</span><p className="text-base font-semibold text-gray-900">2025년 09월 01일 14:30</p></div>
                <div className="flex flex-col gap-1.5"><span className="text-xs font-bold text-gray-400 uppercase tracking-wider">비밀번호</span>
                  <div className="flex items-center gap-3">
                    <p className="text-lg tracking-[0.2em] font-black text-gray-700 mt-1">********</p>
                    <button onClick={() => setActiveTab('SETTINGS')} className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 transition">변경</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 빈 화면 처리 */}
          {activeTab !== 'OVERVIEW' && (
            <div className="bg-white rounded-[32px] p-16 border border-gray-200 shadow-sm flex flex-col items-center justify-center text-gray-400 gap-4 h-96">
              {/* 공용 아이콘 처리 */}
              {activeTab === 'ORDERS' && <ShoppingBag size={48} className="opacity-20" />}
              {activeTab === 'MY_PROJECTS' && <Store size={48} className="opacity-20" />}
              {activeTab === 'SETTLEMENT' && <CreditCard size={48} className="opacity-20" />}
              {activeTab === 'SCRAP' && <Bookmark size={48} className="opacity-20" />}
              {activeTab === 'SETTINGS' && <Settings size={48} className="opacity-20" />}
              <p className="text-sm font-bold">해당 페이지는 준비 중입니다.</p>
            </div>
          )}
        </section>

      </main>

      {/* 심플 푸터 */}
      <footer className="bg-white border-t border-gray-200 py-10 mt-auto">
        {/* ... (푸터 코드는 이전과 동일하게 유지) ... */}
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 text-sm font-bold text-gray-700">
              <a href="#" className="hover:text-blue-600 transition">이용약관</a>
              <a href="#" className="hover:text-blue-600 transition">개인정보처리방침</a>
              <a href="#" className="hover:text-blue-600 transition">회사소개</a>
            </div>
            <div className="text-xs text-gray-500 font-medium leading-relaxed">
              (주)유북 | 대표: 홍길동 | 주소: 유한대학교 전공책 거래소<br />
              사업자등록번호: 123-45-67890 | 통신판매업신고: 제2024-부천-0000호<br />
              Copyright © YU-BOOK All rights reserved.
            </div>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <span className="text-xs font-bold text-gray-400">고객센터 (YU-BOOK 전용)</span>
            <h4 className="text-2xl font-black text-gray-900 tracking-tight">02-0000-0000</h4>
            <span className="text-xs text-gray-500 font-medium mt-1">평일 09:00 ~ 18:00 (점심 12:00 ~ 13:00)</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SharedMyPage;