import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// (나중에 DB 연결 전까지 화면이 깨지지 않도록 임시로 놔두는 가짜 데이터입니다)
const mockBooks = [
  {
    id: 1,
    title: "명품 Java Programming (개정4판)",
    author: "황기태, 김효수 저 | 생능출판",
    department: "컴퓨터소프트웨어",
    originalPrice: 33000,
    discountPrice: 24000,
    currentParticipants: 8,
    targetParticipants: 10,
    dDay: 3,
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600"
  },
  {
    id: 2,
    title: "쉽게 배우는 스프링 부트 3 웹 개발",
    author: "구멍가게 코딩단 저 | 남가람북스",
    department: "컴퓨터소프트웨어",
    originalPrice: 29000,
    discountPrice: 21000,
    currentParticipants: 4,
    targetParticipants: 5,
    dDay: 5,
    imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600"
  },
  {
    id: 3,
    title: "Do it! 리액트 모던 웹 개발 교과서",
    author: "박성호 저 | 이지스퍼블리싱",
    department: "컴퓨터소프트웨어",
    originalPrice: 35000,
    discountPrice: 26000,
    currentParticipants: 12,
    targetParticipants: 20,
    dDay: 1,
    imageUrl: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=600"
  },
  {
    id: 4,
    title: "알고리즘 문제 해결 전략 (인사이트)",
    author: "구종만 저 | 인사이트",
    department: "정보통신",
    originalPrice: 50000,
    discountPrice: 38000,
    currentParticipants: 2,
    targetParticipants: 10,
    dDay: 7,
    imageUrl: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=600"
  }
];

const Home = () => {
  // 1. 상태 관리: 화면에 보여줄 책 데이터를 담는 진짜 '그릇'입니다. (초기값은 가짜 데이터)
  const [books, setBooks] = useState(mockBooks); 
  
  const [selectedDept, setSelectedDept] = useState("전체");
  const departments = ["전체", "컴퓨터소프트웨어", "정보통신", "인공지능", "비즈니스IT"];

  // 2. 데이터베이스 연동 포인트 (컴포넌트가 처음 화면에 뜰 때 한 번만 실행됨)
  useEffect(() => {
    /*
     * ==========================================
     * 🚨 [백엔드 API 연동 위치] 🚨
     * 나중에 Spring Boot 서버가 완성되면 주석을 풀고 아래 코드를 활용하세요!
     * ==========================================
     *
     * axios.get('http://localhost:8080/api/books')  // 1. Spring Boot 서버로 책 목록 달라고 요청
     * .then(response => {
     * setBooks(response.data);                  // 2. 성공하면 진짜 DB 데이터를 books 그릇에 담기! (화면 자동 갱신)
     * })
     * .catch(error => {
     * console.error("DB 데이터를 불러오는데 실패했습니다:", error);
     * });
     */
  }, []);

  // 3. 학과 선택 필터링 로직 (진짜 그릇인 books를 필터링)
  const filteredBooks = selectedDept === "전체" 
    ? books 
    : books.filter(book => book.department === selectedDept);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-gray-900">
      
      {/* 상단 네비게이션 헤더 */}
      <header className="flex justify-between items-center p-6 border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="font-bold text-2xl tracking-tight text-gray-900 cursor-pointer">
          <Link to="/">YU-BOOK</Link>
        </div>
        <nav className="flex items-center gap-8">
          <ul className="flex gap-8 text-sm font-medium text-gray-700">
            <li><a href="#" className="text-blue-600 font-semibold">공동구매 목록</a></li>
            <li><a href="#" className="hover:text-blue-600 transition">마이페이지</a></li>
            <li><a href="#" className="hover:text-blue-600 transition">고객지원</a></li>
          </ul>
          <Link 
            to="/login" 
            className="text-xs font-semibold text-gray-500 border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition"
          >
            로그아웃
          </Link>
        </nav>
      </header>

      {/* 메인 히어로 배너 영역 */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col gap-3">
          <span className="bg-blue-500/30 text-blue-200 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full w-max">
            Yuhan University Joint Purchase
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight">
            전공책, 이제 친구들과 모여서 <span className="text-yellow-300">N빵</span> 하세요!
          </h2>
          <p className="text-blue-100 font-medium text-base max-w-xl">
            학과 인원이 모일수록 가격은 파괴됩니다. 안전한 블록체인 기반 거래로 투명하고 저렴하게 전공 서적을 구입해 보세요.
          </p>
        </div>
      </section>

      {/* 콘텐츠 메인 영역 */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-6 md:p-8 flex flex-col gap-8">
        
        {/* 학과 필터 탭 바 */}
        <div className="flex gap-2 overflow-x-auto pb-2 border-b border-gray-200">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-150 whitespace-nowrap ${
                selectedDept === dept
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* 전공책 공동구매 리스트 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => {
            const achievementRate = Math.round((book.currentParticipants / book.targetParticipants) * 100);
            
            return (
              <div 
                key={book.id} 
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col group cursor-pointer"
              >
                {/* 책 썸네일 및 디데이 배지 */}
                <div className="relative pt-[75%] bg-gray-100 overflow-hidden">
                  <img 
                    src={book.imageUrl} 
                    alt={book.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-red-500 text-white font-bold text-xs px-2.5 py-1 rounded-md shadow-sm">
                    D-{book.dDay}
                  </span>
                  <span className="absolute top-3 right-3 bg-gray-900/80 text-white text-xs px-2.5 py-1 rounded-md backdrop-blur-sm">
                    {book.department}
                  </span>
                </div>

                {/* 카드 설명 바디 */}
                <div className="p-5 flex flex-col flex-grow gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-bold text-lg text-gray-950 line-clamp-1 group-hover:text-blue-600 transition">
                      {book.title}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">{book.author}</p>
                  </div>

                  {/* 가격 정보 (정가 대비 할인가) */}
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-gray-400 line-through text-sm font-medium">
                      {book.originalPrice.toLocaleString()}원
                    </span>
                    <span className="text-blue-600 font-extrabold text-xl">
                      {book.discountPrice.toLocaleString()}원
                    </span>
                  </div>

                  {/* 달성률 프로그레스 바 및 인원수 */}
                  <div className="flex flex-col gap-1.5 mt-auto pt-2">
                    <div className="flex justify-between text-xs font-bold text-gray-700">
                      <span>모집 현황 ({achievementRate}%)</span>
                      <span className="text-blue-600">{book.currentParticipants} / {book.targetParticipants} 명</span>
                    </div>
                    {/* 게이지 바 백그라운드 */}
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200/50">
                      {/* 실제 달성도 바 */}
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 rounded-full"
                        style={{ width: `${achievementRate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Home;