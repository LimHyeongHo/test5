import React, { useState } from 'react';
// 🛠️ LayoutGrid, List 아이콘이 추가되었습니다.
import { Search, SlidersHorizontal, BookOpen, Users, ChevronDown, Filter, Clock, Image as ImageIcon, LayoutGrid, List } from 'lucide-react';
import Header from '../../../components/layout/Header';

const BuyerProductsPage = () => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTarget, setSearchTarget] = useState('ALL');
  const [majorFilter, setMajorFilter] = useState('ALL');
  
  // 🛠️ 뷰 모드 상태 관리 (GRID: 바둑판형, LIST: 목록형)
  const [viewMode, setViewMode] = useState('GRID');

  const productList = [
    { id: 1, title: '운영체제 10판 (A+ 필기 포함)', major: '컴퓨터소프트웨어', author: 'Silberschatz', current: 3, target: 5, price: '28,000원', status: '모집 중', deadline: '2026.06.15', thumbnail: 'https://images.unsplash.com/photo-1555662800-82a8747209e7?q=80&w=600&auto=format&fit=crop' },
    { id: 2, title: '스프링 부트 3 백엔드 개발자 되기', major: '컴퓨터소프트웨어', author: '신선영', current: 4, target: 4, price: '21,000원', status: '마감 임박', deadline: '2026.06.07', thumbnail: null },
    { id: 3, title: '리눅스 시스템 관리자 가이드', major: 'IT융합', author: 'Evi Nemeth', current: 1, target: 10, price: '32,000원', status: '모집 중', deadline: '2026.06.20', thumbnail: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=600&auto=format&fit=crop' },
    { id: 4, title: '경영학원론 8판', major: '경영학', author: 'Gulati', current: 8, target: 15, price: '25,000원', status: '모집 중', deadline: '2026.06.30', thumbnail: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-gray-900 font-sans">
      <Header />

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <span className="bg-white/20 text-white text-[10px] font-black tracking-widest px-3 py-1.5 rounded-full w-max uppercase">
            Yuhan University Joint Purchase
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mt-1">
            전공책, 이제 친구들과 모여서 <span className="text-yellow-400">N빵</span> 하세요!
          </h2>
          <p className="text-blue-100 text-sm md:text-base font-medium max-w-2xl leading-relaxed mt-1">
            학과 인원이 모일수록 가격은 파괴됩니다. 안전한 블록체인 기반 거래로 투명하고 저렴하게 전공 서적을 구입해 보세요.
          </p>
        </div>
      </div>

      <main className="flex-grow max-w-7xl w-full mx-auto p-6 md:p-8 flex flex-col gap-6">
        
        {/* 검색 박스 영역 */}
        <section className="bg-white rounded-[32px] p-6 md:p-8 border border-gray-200 shadow-sm flex flex-col gap-4 transition-all">
          <div className="flex items-center gap-3">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="text-gray-400" size={20} />
              </div>
              <input 
                type="text" 
                placeholder="찾으시는 도서명, 저자, 출판사를 입력하세요..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-2xl text-sm font-semibold outline-none transition"
              />
            </div>
            <button className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-2xl transition shadow-sm whitespace-nowrap">
              검색
            </button>
            <button 
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className={`px-4 py-3.5 border text-sm font-bold rounded-2xl transition flex items-center gap-2 whitespace-nowrap ${
                isAdvancedOpen ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <SlidersHorizontal size={18} />
              <span className="hidden sm:inline">세부 검색</span>
            </button>
          </div>

          {/* 세부 검색 토글 영역 */}
          {isAdvancedOpen && (
            <div className="pt-6 mt-2 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-top-2 fade-in duration-200">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-500 flex items-center gap-1.5"><Filter size={14} /> 검색 대상</label>
                <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-200">
                  {['ALL', 'TITLE', 'CONTENT'].map((type) => (
                    <button key={type} onClick={() => setSearchTarget(type)} className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${searchTarget === type ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>
                      {type === 'ALL' ? '제목 + 내용' : type === 'TITLE' ? '제목만' : '내용만'}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-500 flex items-center gap-1.5"><BookOpen size={14} /> 전공 분류</label>
                <div className="relative">
                  <select value={majorFilter} onChange={(e) => setMajorFilter(e.target.value)} className="w-full appearance-none px-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-blue-500 rounded-xl text-sm font-semibold text-gray-700 outline-none cursor-pointer">
                    <option value="ALL">전체 전공</option>
                    <option value="컴퓨터소프트웨어">컴퓨터소프트웨어</option>
                    <option value="IT융합">IT융합</option>
                    <option value="경영학">경영학</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
              <div className="flex flex-col justify-end pb-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer" />
                  <span className="text-sm font-semibold text-gray-600 group-hover:text-gray-900 transition">모집 중인 공구만 보기</span>
                </label>
              </div>
            </div>
          )}
        </section>

        {/* 검색 결과 리스트 */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-sm font-bold text-gray-500">총 <span className="text-blue-600">124</span>건의 공구가 있습니다.</span>
            
            <div className="flex items-center gap-4">
              {/* 🌟 뷰 모드 전환 토글 버튼 */}
              <div className="hidden sm:flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
                <button 
                  onClick={() => setViewMode('GRID')}
                  className={`p-1.5 rounded-md transition ${viewMode === 'GRID' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-700'}`}
                  title="그리드 뷰"
                >
                  <LayoutGrid size={16} />
                </button>
                <button 
                  onClick={() => setViewMode('LIST')}
                  className={`p-1.5 rounded-md transition ${viewMode === 'LIST' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-700'}`}
                  title="리스트 뷰"
                >
                  <List size={16} />
                </button>
              </div>

              <select className="text-sm font-bold text-gray-600 bg-transparent outline-none cursor-pointer hover:text-gray-900 transition">
                <option>최신 등록순</option>
                <option>마감 임박순</option>
                <option>낮은 가격순</option>
              </select>
            </div>
          </div>

          {/* 🌟 선택된 뷰 모드에 따라 레이아웃 동적 변경 */}
          <div className={viewMode === 'GRID' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" : "flex flex-col gap-4"}>
            {productList.map((item) => (
              <div 
                key={item.id} 
                className={`bg-white rounded-[24px] border border-gray-200 shadow-sm flex hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group overflow-hidden ${
                  viewMode === 'GRID' ? 'flex-col' : 'flex-row items-stretch'
                }`}
              >
                
                {/* 썸네일 영역 */}
                <div className={`bg-gray-100 relative overflow-hidden flex items-center justify-center shrink-0 ${
                  viewMode === 'GRID' ? 'w-full h-48' : 'w-32 md:w-48'
                }`}>
                  {item.thumbnail ? (
                    <img src={item.thumbnail} alt={item.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <ImageIcon size={32} />
                      <span className="text-xs font-bold">이미지 없음</span>
                    </div>
                  )}
                  <span className={`absolute top-3 left-3 text-[11px] font-black px-2.5 py-1 rounded-md shadow-sm z-10 ${
                    item.status === '모집 중' ? 'bg-blue-500 text-white' : 'bg-orange-500 text-white'
                  }`}>
                    {item.status}
                  </span>
                </div>
                
                {/* 정보 영역 */}
                <div className={`p-5 flex flex-col flex-grow ${viewMode === 'GRID' ? 'gap-4' : 'gap-3 justify-center'}`}>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-extrabold text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                      {item.major}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded-md">
                      <Clock size={12} />
                      <span>{item.deadline} 마감</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <h4 className={`font-extrabold text-gray-900 group-hover:text-blue-600 transition leading-snug ${
                      viewMode === 'GRID' ? 'text-base line-clamp-2' : 'text-lg line-clamp-1'
                    }`}>
                      {item.title}
                    </h4>
                    <span className="text-xs text-gray-400 font-semibold">{item.author}</span>
                  </div>

                  {/* 하단 진행 바 영역 (리스트 모드일 땐 너비를 적절히 조절) */}
                  <div className={`flex flex-col gap-2 pt-4 border-t border-gray-50 ${viewMode === 'GRID' ? 'mt-auto' : 'mt-2'}`}>
                    <div className="flex justify-between items-end">
                      <span className="text-lg font-black text-gray-900">{item.price}</span>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-gray-500">
                        <Users size={12} />
                        <span className={item.current >= item.target ? 'text-emerald-500' : 'text-blue-500'}>{item.current}</span>
                        <span>/ {item.target}명</span>
                      </div>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${item.current >= item.target ? 'bg-emerald-400' : 'bg-blue-500'}`}
                        style={{ width: `${(item.current / item.target) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-6">
            <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-bold rounded-full transition shadow-sm">
              더보기 (1 / 10)
            </button>
          </div>
        </section>

      </main>
    </div>
  );
};

export default BuyerProductsPage;