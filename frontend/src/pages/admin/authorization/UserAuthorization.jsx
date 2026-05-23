import React from 'react';
import { Users, Search, Bell, ShieldAlert, History, Filter, Download, Info, Clock, CheckCircle } from 'lucide-react';
import Header from '../../../components/layout/Header'; // 분리해둔 공통 헤더 불러오기

// 회원가입 창과 동일한 감성 배경 이미지
const backgroundImgUrl = "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=2600"; 

// 1. 히어로 섹션 (다크모드 -> 반투명 유리 질감 카드로 변경)
const Hero = () => (
  <section className="bg-white/85 backdrop-blur-md rounded-[32px] p-10 border border-white/50 shadow-2xl mb-8">
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="bg-blue-100 text-blue-700 border border-blue-200 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full w-max">
          OPERATIONS HUB
        </span>
        <h1 className="text-4xl font-black tracking-tight text-gray-900 mt-2">공동구매 관리</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-6 md:items-end md:justify-between mt-2">
        <p className="text-gray-700 font-semibold text-sm leading-relaxed max-w-2xl mt-1">
          공동구매 현황 제어... 플랫폼 내의 모든 거래를 실시간으로 모니터링하고 시스템 무결성을 유지하기 위한 관리 개입을 수행합니다.
        </p>
        
        {/* 요약 통계 카드 (유리 질감 위에 올라간 미니 카드) */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/90 rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between h-36 min-w-[160px]">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">TOTAL ACTIVE</span>
            <div className="flex justify-between items-end">
              <h3 className="text-3xl font-black text-gray-900">1,284 건</h3>
              <div className="w-12 h-12 rounded-full border border-blue-100 flex items-center justify-center text-blue-500 bg-blue-50/50">
                <Users size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white/90 rounded-3xl p-6 border border-red-100 shadow-sm flex flex-col justify-between h-36 min-w-[160px]">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">FLAGGED</span>
            <div className="flex justify-between items-end">
              <h3 className="text-3xl font-black text-red-600">12 건</h3>
              <div className="w-12 h-12 rounded-full border border-red-100 flex items-center justify-center text-red-500 bg-red-50/50">
                <ShieldAlert size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// 2. 리스트 카드 컴포넌트 (반투명 블러 효과 적용)
const GroupBuyCard = ({ id, status, title, seller, price, ratio, suspicious }) => (
  <div className={`bg-white/90 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-xl flex items-center gap-8 transition-transform hover:scale-[1.01] ${suspicious ? 'border-red-300 ring-2 ring-red-200 ring-offset-2 bg-red-50/90' : status === '승인 대기' ? 'bg-gray-100/90' : ''}`}>
    <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800" alt="Book Cover" className="w-20 h-28 object-cover rounded-xl shadow-inner border border-gray-100" />
    <div className="flex-grow grid grid-cols-12 gap-x-6 gap-y-2 items-center">
      <div className="col-span-8 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">{id}</span>
          <span className={`inline-block text-[10px] font-extrabold px-3 py-1 rounded-md uppercase tracking-wider flex items-center gap-1 ${
            status === '승인 대기' ? 'bg-gray-200 text-gray-700' : 'bg-green-100 text-green-700'
          }`}>
            {status === '정상 거래' && <CheckCircle size={14} />} {status}
          </span>
          {suspicious && (
            <span className="inline-block text-[10px] font-extrabold px-3 py-1 rounded-md uppercase tracking-wider bg-red-100 text-red-600 flex items-center gap-1.5">
              <ShieldAlert size={14} /> 가짜 의심
            </span>
          )}
        </div>
        <h4 className={`text-lg font-bold text-gray-900 mt-1 ${status === '승인 대기' ? 'text-gray-600' : ''}`}>{title}</h4>
        <p className="text-xs text-gray-600 mt-0.5 font-mono font-semibold">SELLER: {seller} | PRICE: ₩{price.toLocaleString()}</p>
      </div>
      <div className="col-span-4 flex flex-col gap-3 items-end">
        <div className="flex items-center gap-3">
          <button className="text-gray-400 hover:text-gray-700 transition"><History size={18} /></button>
          <button className="text-gray-400 hover:text-red-500 transition"><ShieldAlert size={18} /></button>
          <button className="text-gray-400 hover:text-blue-600 transition"><Info size={18} /></button>
        </div>
        <div className="flex items-center gap-2 w-full max-w-[200px]">
          <div className="flex-grow h-1.5 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div className="h-full bg-blue-600 rounded-full transition-all duration-300" style={{ width: `${ratio}%` }}></div>
          </div>
          <span className="text-xs font-bold text-gray-800 min-w-[30px] text-right">{ratio}%</span>
        </div>
        <div className="flex gap-2">
          <button className="bg-red-600 text-white rounded-xl px-4 py-2 text-xs font-bold hover:bg-red-700 transition shadow-lg shadow-red-200">삭제</button>
          <button className="bg-blue-600 text-white rounded-xl px-4 py-2 text-xs font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">승인</button>
        </div>
      </div>
    </div>
  </div>
);

// 3. 실시간 로그 섹션 (반투명 블러 효과 적용)
const RealTimeLogs = () => (
  <section className="bg-white/90 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-xl mt-8">
    <div className="flex justify-between items-center mb-8">
      <div>
        <h3 className="text-xl font-bold text-gray-900">실시간 시스템 검증 로그</h3>
        <p className="text-xs text-gray-500 font-medium mt-1">모든 거래 데이터의 해시 무결성 검증 결과 목록입니다.</p>
      </div>
      <div className="flex gap-2">
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition shadow-sm">
          <Filter size={16} /> 필터링
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-xl text-sm font-bold text-white hover:bg-blue-700 transition shadow-lg shadow-blue-200">
          <Download size={16} /> 로그 내보내기
        </button>
      </div>
    </div>
    <table className="w-full text-left">
      <thead>
        <tr className="text-xs font-bold text-gray-400 border-b border-gray-200">
          <th className="pb-4 pl-2 font-medium">날짜/시간</th>
          <th className="pb-4 font-medium">거래 ID</th>
          <th className="pb-4 font-medium">세부 내용</th>
          <th className="pb-4 text-center font-medium">처리 결과</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {[
          { time: '[12:00:03]', id: 'TXS-21672', detail: 'yuhan 3192 (TSX-21672) \'판매자 승인\' 승인 및 해시 API 처리되었습니다. (TXN=210940)', result: 'SUCCESS' },
          { time: '[12:00:01]', id: 'SYSTEM', detail: '시스템 무결성 체크 완료 (Daily Check).', result: 'COMPLETED' },
        ].map((log, i) => (
          <tr key={i} className="hover:bg-white/50 transition">
            <td className="py-5 pl-2 font-mono text-sm text-gray-700 font-semibold flex items-center gap-2">
              <Clock size={16} className="text-gray-400" /> {log.time}
            </td>
            <td className="py-5 font-bold text-sm text-gray-900">{log.id}</td>
            <td className="py-5 text-sm text-gray-700 font-medium leading-relaxed max-w-xl">{log.detail}</td>
            <td className="py-5 text-center">
              <span className={`inline-block text-[10px] font-extrabold px-3 py-1 rounded-md uppercase tracking-wider ${
                log.result === 'SUCCESS' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'
              }`}>
                {log.result}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);

const GroupManagementPage = () => {
  return (
    <div className="min-h-screen flex flex-col text-gray-900">
      
      {/* 글로벌 헤더 (최상단 고정) */}
      <Header />

      {/* 메인 콘텐츠 영역 (배경 이미지 및 그라데이션 오버레이) */}
      <main 
        className="flex-grow flex flex-col relative py-12 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${backgroundImgUrl})` }}
      >
        {/* 그라데이션 오버레이 효과 */}
        <div className="absolute inset-0 bg-radial-gradient from-gray-100/50 via-gray-300/80 to-gray-400/90 mix-blend-multiply pointer-events-none"></div>

        {/* 컨텐츠 컨테이너 */}
        <div className="container mx-auto max-w-7xl px-6 relative z-10 flex flex-col">
          
          <Hero />

          {/* 탭 및 필터 영역 */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-4">
            <div className="flex gap-2 bg-white/80 backdrop-blur-sm rounded-2xl p-1 shadow-md border border-white/50">
              {['전체 거래', '승인 대기', '신고/이상 상태'].map((tab) => (
                <button
                  key={tab}
                  className={`px-5 py-2.5 text-sm font-bold rounded-xl transition ${
                    tab === '전체 거래' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-transparent text-gray-700 hover:bg-white/50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-700 font-bold font-mono bg-white/50 px-3 py-1.5 rounded-lg backdrop-blur-sm">UPDATE FREQUENCY: 3s (LIVE)</p>
          </div>

          {/* 카드 리스트 영역 */}
          <div className="flex flex-col gap-6 mt-2">
            {[
              { id: '21674', status: '승인 대기', title: '사피엔스: 유인원에서 사이보그까지 (특별 한정판)', seller: 'YUAN_ONLINE', price: 42000, ratio: 95 },
              { id: '21673', status: '가짜 의심', title: '레어 에디션: 세계 명화 도록 (가짜 의심)', seller: 'FH_ONLINE', price: 89000, ratio: 75, suspicious: true },
              { id: '21672', status: '정상 거래', title: '세계 문학 전집: 러시아 문학 컬렉션', seller: 'YUAN_ONLINE', price: 56000, ratio: 100 },
              { id: '21671', status: '승인 대기', title: '창의력 쑥쑥 어린이 도서 전집 20종', seller: 'JIN_ONLINE', price: 159000, ratio: 45 },
            ].map((item) => (
              <GroupBuyCard key={item.id} {...item} />
            ))}
          </div>

          <RealTimeLogs />
        </div>
      </main>
    </div>
  );
};

export default GroupManagementPage;