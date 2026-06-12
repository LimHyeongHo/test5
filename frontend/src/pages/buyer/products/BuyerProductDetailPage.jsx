import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Users, BookOpen, ChevronLeft, CheckCircle, Share2, AlertCircle } from 'lucide-react';
import Header from '../../../components/layout/Header';

const BuyerProductDetailPage = () => {
  // 1. 주소창에서 상품 고유 ID 추출 (예: /buyer/products/1 -> id = "1")
  const { id } = useParams();
  
  const [product, setProduct] = useState(null);
  const [isJoined, setIsJoined] = useState(false); // 테스트용: 공구 참여 상태 토글

  // 🛠️ 임시 더미 데이터 (MySQL DB에 저장될 데이터 구조와 일치시킵니다)
  const dummyProducts = [
    { 
      id: "1", 
      title: '명품 Java Programming (개정 4판)', 
      major: '컴퓨터소프트웨어', 
      author: '황기태, 김효수 저', 
      publisher: '생능출판',
      originalPrice: 33000, 
      price: 24000, 
      currentCount: 8, 
      targetCount: 10, 
      deadline: '2026-06-15',
      dDay: 'D-5',
      status: '모집 중',
      thumbnail: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop',
      description: '컴퓨터소프트웨어 전공 필수 과목인 자바 프로그래밍 교재입니다. 깨끗하게 사용했으며, 시험에 자주 나오는 핵심 단원 위주로 깔끔하게 정리된 필기 노트(PDF)를 함께 공유해 드립니다. 공구 인원이 다 모이면 학과 로비 혹은 과사무실 앞에서 일괄 배부할 예정입니다.'
    }
  ];

  useEffect(() => {
    /* ==========================================================================
      💡 [백엔드 & MySQL 연동 데이터 처리 시 가이드 주석]
      ==========================================================================
      
      1. MySQL Table Schema 구조 예시:
         CREATE TABLE products (
           id INT AUTO_INCREMENT PRIMARY KEY,
           title VARCHAR(255) NOT NULL,
           major VARCHAR(100),
           author VARCHAR(100),
           publisher VARCHAR(100),
           original_price INT,
           price INT,
           current_count INT DEFAULT 0,
           target_count INT,
           deadline DATE,
           thumbnail_url VARCHAR(500),
           description TEXT
         );

      2. Spring Boot Repository SQL 쿼리 예시:
         @Query("SELECT p FROM Product p WHERE p.id = :id")
         Optional<Product> findProductDetailById(@Param("id") Long id);
         
         (실제 내부적으로 실행되는 원시 SQL: SELECT * FROM products WHERE id = ?)

      3. React 프론트엔드 API Fetch 코드 예시:
         fetch(`http://localhost:8080/api/buyer/products/${id}`)
           .then(res => res.json())
           .then(data => setProduct(data))
           .catch(err => console.log(err));
    */

    // 지금은 더미 데이터에서 id가 일치하는 항목을 찾아 세팅합니다.
    const found = dummyProducts.find(item => item.id === id);
    setProduct(found || dummyProducts[0]); // 없을 경우 데모용으로 1번 데이터 노출
  }, [id]);

  // 공구 참여하기 버튼 클릭 핸들러 (테스트용)
  const handleJoinToggle = () => {
    if (!product) return;
    
    if (!isJoined) {
      /* 💡 [MySQL 연동 시 참여 로직 주석]
        UPDATE products SET current_count = current_count + 1 WHERE id = ?;
        INSERT INTO joint_purchases (user_id, product_id, join_date) VALUES (?, ?, NOW());
      */
      product.currentCount += 1;
      setIsJoined(true);
      alert('🎉 공동구매(N빵) 탑승 완료! 공구 달성 시 알림을 보내드립니다.');
    } else {
      /* 💡 [MySQL 연동 시 취소 로직 주석]
        UPDATE products SET current_count = current_count - 1 WHERE id = ?;
        DELETE FROM joint_purchases WHERE user_id = ? AND product_id = ?;
      */
      product.currentCount -= 1;
      setIsJoined(false);
      alert('공동구매 참여가 취소되었습니다.');
    }
  };

  if (!product) return <div className="p-8 text-center font-bold">도서 정보를 불러오는 중입니다...</div>;

  const progressRatio = Math.min(Math.round((product.currentCount / product.targetCount) * 100), 100);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <Header />

      <main className="flex-grow max-w-7xl w-full mx-auto p-4 md:p-8 flex flex-col gap-6">
        
        {/* 뒤로가기 네비게이션 */}
        <div className="flex items-center justify-between">
          <Link to="/buyer/products" className="flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-gray-900 transition">
            <ChevronLeft size={18} />
            목록으로 돌아가기
          </Link>
          <button className="p-2 text-gray-400 hover:text-gray-600 bg-white border border-gray-200 rounded-xl transition shadow-sm">
            <Share2 size={16} />
          </button>
        </div>

        {/* 메인 레이아웃 그리드 (PC 2열 분할) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 좌측 컬럼: 이미지 및 도서 상세 설명 */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* 큰 이미지 박스 */}
            <div className="bg-white rounded-[32px] border border-gray-200 p-4 md:p-6 shadow-sm flex items-center justify-center aspect-[4/3] md:aspect-[16/10] overflow-hidden relative">
              <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover rounded-2xl" />
              <span className="absolute top-8 left-8 bg-red-500 text-white text-xs font-black px-3 py-1.5 rounded-md shadow-md">
                {product.dDay} 마감
              </span>
            </div>

            {/* 도서 소개글 */}
            <div className="bg-white rounded-[32px] p-6 md:p-8 border border-gray-200 shadow-sm flex flex-col gap-4">
              <h3 className="text-lg font-black text-gray-950 border-b border-gray-100 pb-3">도서 및 공구 소개</h3>
              <p className="text-gray-600 text-sm md:text-base font-medium leading-relaxed whitespace-pre-wrap">
                {product.description}
              </p>
            </div>

            {/* 안전 거래 유의사항 (블록체인 강조) */}
            <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100 flex gap-3">
              <AlertCircle className="text-blue-500 shrink-0 mt-0.5" size={20} />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-blue-900">N방 안전 투명 거래 안내</span>
                <span className="text-xs text-blue-700 font-semibold leading-relaxed">
                  본 플랫폼은 영수증 검증 및 결제 내역을 블록체인 상에 투명하게 기록하여 거래 조작을 방지합니다. 모집 정원이 100% 달성되면 스마트 계약에 의해 안전하게 거래 및 배부가 확정됩니다.
                </span>
              </div>
            </div>
          </div>

          {/* 우측 컬럼: 구매 및 공구 현황 컨트롤 패널 (스티키 고정 효과 추가) */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-24">
            <div className="bg-white rounded-[32px] p-6 md:p-8 border border-gray-200 shadow-sm flex flex-col gap-6">
              
              {/* 태그 & 학과 */}
              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded">
                  {product.major} 전공
                </span>
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                  <Clock size={14} />
                  <span>마감일: {product.deadline}</span>
                </div>
              </div>

              {/* 제목 및 저자 정보 */}
              <div className="flex flex-col gap-1.5">
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
                  {product.title}
                </h1>
                <span className="text-sm font-bold text-gray-400">
                  {product.author} | {product.publisher}
                </span>
              </div>

              {/* 가격 정보 (정가 대비 할인가 구조 적용) */}
              <div className="bg-gray-50 rounded-2xl p-4 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 line-through font-bold">정가 {product.originalPrice.toLocaleString()}원</span>
                  <span className="text-xs text-emerald-600 font-black mt-0.5">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% 파괴 할인가
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl md:text-3xl font-black text-blue-600">{product.price.toLocaleString()}원</span>
                  <span className="text-xs text-gray-500 font-bold block mt-0.5">(인당 부담금)</span>
                </div>
              </div>

              {/* 공구 진행률 상황판 */}
              <div className="flex flex-col gap-3 pt-2">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-black text-gray-900 flex items-center gap-1.5">
                    <Users size={16} className="text-blue-500" />
                    모집 현황 <span className="text-blue-600">{progressRatio}%</span>
                  </span>
                  <span className="text-sm font-bold text-gray-600">
                    <span className="font-black text-gray-900">{product.currentCount}</span> / {product.targetCount} 명
                  </span>
                </div>
                
                {/* 진행 게이지 */}
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${isJoined ? 'bg-emerald-500' : 'bg-blue-600'}`} 
                    style={{ width: `${progressRatio}%` }}
                  ></div>
                </div>
              </div>

              {/* 🌟 구매자 최종 액션 버튼 (참여 여부에 따른 조건부 UI) */}
              <button
                onClick={handleJoinToggle}
                className={`w-full py-4 rounded-2xl font-black text-base md:text-lg transition-all shadow-md flex items-center justify-center gap-2 ${
                  isJoined
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100'
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/20'
                }`}
              >
                {isJoined ? (
                  <>
                    <CheckCircle size={20} />
                    공구 탑승 완료 (취소하기)
                  </>
                ) : (
                  '공동구매 참여하기 (N빵 탑승)'
                )}
              </button>

            </div>
          </div>

        </div>

      </main>
    </div>
  );
};

export default BuyerProductDetailPage;