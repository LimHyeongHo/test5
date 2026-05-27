import React, { useState } from 'react';
import { Store, BarChart3, TrendingUp, Users, Eye, ArrowUpRight, DollarSign, Calendar } from 'lucide-react';
import Header from '../../../components/layout/Header';

// 가상 분석 데이터 (나중에 백엔드에서 받아올 데이터 구조)
const mockWeeklyData = [
  { day: '월', views: 120, revenue: 45000 },
  { day: '화', views: 250, revenue: 125000 },
  { day: '수', views: 180, revenue: 80000 },
  { day: '목', views: 320, revenue: 210000 },
  { day: '금', views: 410, revenue: 350000 },
  { day: '토', views: 290, revenue: 150000 },
  { day: '일', views: 150, revenue: 50000 },
];

const mockTopProducts = [
  { id: '1024', title: '컴퓨터 구조 및 설계 6판', views: 842, sales: 8, conversion: '0.95%' },
  { id: '1021', title: '전공 실습용 라즈베리파이 키트', views: 520, sales: 15, conversion: '2.88%' },
  { id: '1025', title: '카시오 공학용 계산기 fx-991EX', views: 310, sales: 12, conversion: '3.87%' },
];

const SellerAnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('7D'); // 7D, 1M, 3M

  // 차트 막대 높이 계산을 위한 최대값 찾기 (UI용)
  const maxRevenue = Math.max(...mockWeeklyData.map(d => d.revenue));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-gray-900">
      
      {/* 1. 글로벌 헤더 */}
      <Header />

      {/* 2. 상단 다크 배너 (Seller Hub 패밀리 룩) */}
      <section className="bg-slate-900 text-white py-12 px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col gap-2">
          <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full w-max border border-emerald-500/30 flex items-center gap-1.5">
            <BarChart3 size={14} /> Analytics Hub
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight mt-1">
            분석 데이터
          </h2>
          <p className="text-slate-400 font-medium text-base max-w-2xl mt-1">
            내 프로젝트의 방문자 유입 추이, 구매 전환율 및 주간 매출 데이터를 상세하게 분석합니다.
          </p>
        </div>
      </section>

      {/* 3. 메인 콘텐츠 영역 */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-6 md:p-8 flex flex-col gap-8">
        
        {/* 컨트롤 패널 (기간 설정) */}
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-gray-400" />
            <span className="text-sm font-bold text-gray-700">조회 기간 설정</span>
          </div>
          <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
            {[
              { id: '7D', label: '최근 7일' },
              { id: '1M', label: '최근 1개월' },
              { id: '3M', label: '최근 3개월' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTimeRange(tab.id)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition ${
                  timeRange === tab.id 
                    ? 'bg-white text-blue-600 shadow-sm ring-1 ring-gray-900/5' 
                    : 'text-gray-600 hover:bg-gray-200/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 상단 3종 요약 통계 카드 */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-[24px] p-6 border border-gray-200 shadow-sm flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">누적 조회수</span>
              <h3 className="text-3xl font-black text-gray-950 mt-1">1,720 회</h3>
              <span className="text-emerald-600 text-xs font-bold mt-1 flex items-center gap-0.5">
                <ArrowUpRight size={14} /> +12.5% vs 지난주
              </span>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <Eye size={24} />
            </div>
          </div>

          <div className="bg-white rounded-[24px] p-6 border border-gray-200 shadow-sm flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">총 결제 예정액 (수익)</span>
              <h3 className="text-3xl font-black text-gray-950 mt-1">₩1,010,000</h3>
              <span className="text-emerald-600 text-xs font-bold mt-1 flex items-center gap-0.5">
                <ArrowUpRight size={14} /> +34.2% vs 지난주
              </span>
            </div>
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <DollarSign size={24} />
            </div>
          </div>

          <div className="bg-white rounded-[24px] p-6 border border-gray-200 shadow-sm flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">평균 구매 전환율</span>
              <h3 className="text-3xl font-black text-gray-950 mt-1">2.04 %</h3>
              <span className="text-gray-400 text-xs font-bold mt-1 flex items-center gap-0.5">
                안정적인 전환율 유지 중
              </span>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <TrendingUp size={24} />
            </div>
          </div>
        </section>

        {/* 하단 스플릿 레이아웃 (차트 영역 2/3 + 랭킹 영역 1/3) */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 좌측: 매출/조회수 트렌드 차트 (Tailwind CSS로 직접 구현한 바 차트) */}
          <div className="lg:col-span-2 bg-white rounded-[28px] p-6 md:p-8 border border-gray-200 shadow-sm flex flex-col gap-6">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-gray-950 tracking-tight">주간 매출 트렌드</h3>
                <p className="text-xs text-gray-400 mt-1">최근 7일간의 수익 변화 추이를 확인하세요.</p>
              </div>
              <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> 매출액 (₩)
              </span>
            </div>

            <div className="h-64 flex items-end gap-4 pt-4 border-b border-gray-100 px-2 mt-4 relative">
              {/* Y축 보조선 (가이드라인) */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
                <div className="border-t border-gray-100 border-dashed w-full"></div>
                <div className="border-t border-gray-100 border-dashed w-full"></div>
                <div className="border-t border-gray-100 border-dashed w-full"></div>
              </div>

              {/* 막대 그래프 */}
              {mockWeeklyData.map((data, idx) => {
                const heightPercentage = (data.revenue / maxRevenue) * 100;
                const isToday = idx === 4; // '금'요일을 오늘로 가정

                return (
                  <div key={idx} className="flex-grow flex flex-col items-center gap-2 h-full justify-end relative z-10 group">
                    {/* 툴팁 (마우스 오버 시 표시) */}
                    <div className="absolute -top-10 bg-gray-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                      ₩{data.revenue.toLocaleString()}
                    </div>
                    {/* 차트 막대 */}
                    <div 
                      style={{ height: `${heightPercentage}%` }} 
                      className={`w-full max-w-[48px] rounded-t-xl transition-all duration-700 ease-out hover:opacity-80 ${
                        isToday ? 'bg-blue-600 shadow-lg shadow-blue-200' : 'bg-blue-100'
                      }`}
                    ></div>
                    {/* X축 라벨 */}
                    <span className={`text-[11px] font-bold mt-2 ${isToday ? 'text-blue-600' : 'text-gray-400'}`}>
                      {data.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 우측: 인기 게시글 TOP 3 랭킹 */}
          <div className="lg:col-span-1 bg-white rounded-[28px] p-6 md:p-8 border border-gray-200 shadow-sm flex flex-col">
            <div className="border-b border-gray-100 pb-4 mb-4">
              <h3 className="text-xl font-extrabold text-gray-950 tracking-tight">인기 프로젝트 TOP 3</h3>
              <p className="text-xs text-gray-400 mt-1">조회수 대비 구매율이 가장 높은 항목입니다.</p>
            </div>

            <div className="flex flex-col gap-5 mt-2">
              {mockTopProducts.map((product, index) => (
                <div key={product.id} className="flex flex-col gap-2 p-3 hover:bg-gray-50 rounded-xl transition">
                  <div className="flex items-start gap-3">
                    <span className={`text-sm font-black mt-0.5 ${index === 0 ? 'text-blue-600' : 'text-gray-400'}`}>
                      {index + 1}
                    </span>
                    <div className="flex flex-col gap-0.5 w-full">
                      <h4 className="text-sm font-bold text-gray-900 truncate leading-tight w-48">
                        {product.title}
                      </h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-[11px] text-gray-500 font-medium flex items-center gap-1">
                          <Eye size={12} /> {product.views} 조회
                        </span>
                        <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                          전환 {product.conversion}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-6 border-t border-gray-100">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col gap-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">💡 Analytics Tip</span>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  조회수는 높으나 구매 전환율이 낮은 상품은 가격을 소폭 하향 조정하거나, 상세 설명을 보완하는 것을 추천합니다.
                </p>
              </div>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
};

export default SellerAnalyticsPage;