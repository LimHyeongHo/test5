import React, { useState } from 'react';
import { Store, TrendingUp, Package, MessageSquare, PlusCircle, ArrowRight, BookOpen, Clock, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../../../components/layout/Header'; // 공통 헤더

// 가상 판매 게시글 데이터 (판매자 본인이 올린 글들)
const mockMyListings = [
  { id: '1024', title: '컴퓨터 구조 및 설계 6판', price: 35000, current: 8, target: 10, status: '진행중' },
  { id: '1023', title: '운영체제(Operating System Concepts) 10판', price: 42000, current: 5, target: 5, status: '목표달성' },
  { id: '1022', title: '데이터베이스 시스템', price: 28000, current: 2, target: 15, status: '진행중' },
];

const SellerDashboardPage = () => {
  const [listings] = useState(mockMyListings);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-gray-900">
      
      {/* 1. 글로벌 헤더 */}
      <Header />

      {/* 2. 판매자 전용 다크 배너 */}
      <section className="bg-slate-900 text-white py-12 px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col gap-2">
          <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full w-max border border-emerald-500/30 flex items-center gap-1.5">
            <Store size={14} /> Seller Hub
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight mt-1">
            판매자 대시보드
          </h2>
          <p className="text-slate-400 font-medium text-base max-w-2xl mt-1">
            내가 개설한 전공책 공동구매 현황과 누적 판매 수익, 그리고 구매자들의 최근 문의를 한눈에 관리하세요.
          </p>
        </div>
      </section>

      {/* 3. 메인 콘텐츠 영역 */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-6 md:p-8 flex flex-col gap-8">
        
        {/* 상단 3종 요약 통계 카드 */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 카드 1: 진행 중인 공동구매 */}
          <div className="bg-white rounded-[24px] p-6 border border-gray-200 shadow-sm flex justify-between items-center transition hover:shadow-md">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">진행 중인 공동구매</span>
              <h3 className="text-3xl font-black text-gray-950 mt-1">3 건</h3>
              <span className="text-blue-600 text-xs font-bold mt-1 flex items-center gap-1">
                <Package size={14} /> ACTIVE LISTINGS
              </span>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <BookOpen size={24} />
            </div>
          </div>

          {/* 카드 2: 누적 판매 예상 수익 */}
          <div className="bg-white rounded-[24px] p-6 border border-gray-200 shadow-sm flex justify-between items-center transition hover:shadow-md">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">누적 판매 (예상 수익)</span>
              <h3 className="text-3xl font-black text-gray-950 mt-1">₩490,000</h3>
              <span className="text-emerald-600 text-xs font-bold mt-1 flex items-center gap-1">
                <TrendingUp size={14} /> +₩77,000 이번 주
              </span>
            </div>
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Store size={24} />
            </div>
          </div>

          {/* 카드 3: 신규 문의 내역 */}
          <div className="bg-white rounded-[24px] p-6 border border-gray-200 shadow-sm flex justify-between items-center transition hover:shadow-md">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">신규 채팅/문의</span>
              <h3 className="text-3xl font-black text-gray-950 mt-1">12 건</h3>
              <span className="text-orange-500 text-xs font-bold mt-1 flex items-center gap-1">
                미확인 메시지가 있습니다
              </span>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
              <MessageSquare size={24} />
            </div>
          </div>
        </section>

        {/* 하단 스플릿 레이아웃 (2/3 게시글 관리 + 1/3 빠른 알림) */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 좌측 패널: 내 판매 게시글 현황 (2/3) */}
          <div className="lg:col-span-2 bg-white rounded-[28px] p-6 md:p-8 border border-gray-200 shadow-sm flex flex-col gap-6">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-gray-950 tracking-tight">내 판매 현황</h3>
                <p className="text-xs text-gray-400 mt-1">진행 중인 공동구매의 목표 달성률을 확인하세요.</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition shadow-md shadow-slate-200">
                <PlusCircle size={16} /> 새 물품 등록
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {listings.map((item) => {
                const ratio = Math.min(Math.round((item.current / item.target) * 100), 100);
                const isCompleted = item.status === '목표달성';

                return (
                  <div key={item.id} className="p-5 border border-gray-100 rounded-2xl hover:bg-gray-50 transition group">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                            isCompleted ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
                          }`}>
                            {item.status}
                          </span>
                          <span className="text-[10px] font-mono text-gray-400">#{item.id}</span>
                        </div>
                        <h4 className="text-base font-bold text-gray-900">{item.title}</h4>
                      </div>
                      <span className="font-bold text-gray-900">₩{item.price.toLocaleString()}</span>
                    </div>

                    {/* 진행률 바 */}
                    <div className="flex flex-col gap-1.5 mt-2">
                      <div className="flex justify-between text-xs font-bold text-gray-500">
                        <span>진행률 {ratio}%</span>
                        <span>{item.current} / {item.target} 명</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${isCompleted ? 'bg-blue-600' : 'bg-emerald-500'}`}
                          style={{ width: `${ratio}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <button className="text-sm font-bold text-gray-500 flex items-center justify-center gap-1 mt-2 hover:text-blue-600 transition">
              전체 게시글 보기 <ArrowRight size={16} />
            </button>
          </div>

          {/* 우측 패널: 알림 및 퀵 액션 (1/3) */}
          <div className="lg:col-span-1 bg-white rounded-[28px] p-6 md:p-8 border border-gray-200 shadow-sm flex flex-col justify-between">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
                <Bell size={20} className="text-gray-900" />
                <h3 className="text-lg font-extrabold text-gray-950 tracking-tight">최근 알림</h3>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></div>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-bold text-gray-800 leading-tight">
                      '운영체제 10판' 목표 인원이 달성되었습니다!
                    </p>
                    <span className="text-xs text-gray-400 font-medium"><Clock size={10} className="inline mr-1" />방금 전</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0"></div>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-bold text-gray-800 leading-tight">
                      구매자 '컴공요정'님이 채팅을 보냈습니다.
                    </p>
                    <span className="text-xs text-gray-400 font-medium"><Clock size={10} className="inline mr-1" />2시간 전</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gray-300 mt-1.5 flex-shrink-0"></div>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-medium text-gray-600 leading-tight">
                      플랫폼 정기 시스템 점검 안내 (내일 새벽 2시)
                    </p>
                    <span className="text-xs text-gray-400 font-medium"><Clock size={10} className="inline mr-1" />어제</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col gap-2">
                <span className="text-xs font-bold text-slate-500">SELLER TIP</span>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  물품의 상세한 사진과 책의 상태(필기 흔적 등)를 정확하게 기재하면 거래 체결률이 평균 45% 상승합니다.
                </p>
              </div>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
};

export default SellerDashboardPage;