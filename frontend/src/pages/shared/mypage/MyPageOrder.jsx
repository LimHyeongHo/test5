import React from 'react';
import { Package, ChevronRight, Clock } from 'lucide-react';

const MyPageOrders = () => {
  // 임시 주문 데이터 (스프링 부트, 리눅스 등 전공 관련 도서)
  const orderList = [
    { id: 1, title: '컴퓨터 구조 및 설계 6판', date: '2026.05.24', status: '진행중', price: '28,000원', color: 'text-blue-700 bg-blue-100' },
    { id: 2, title: '리눅스 시스템 관리자 가이드', date: '2026.05.10', status: '수령 대기', price: '32,000원', color: 'text-emerald-700 bg-emerald-100' },
    { id: 3, title: '스프링 부트 3 백엔드 개발자 되기', date: '2026.03.02', status: '완료', price: '21,000원', color: 'text-gray-600 bg-gray-100' },
  ];

  return (
    <div className="bg-white rounded-[32px] p-8 border border-gray-200 shadow-sm flex flex-col gap-6">
      <div className="flex items-center gap-3 pb-6 border-b border-gray-100">
        <Package className="text-blue-500" size={24} />
        <h4 className="text-lg font-bold text-gray-900">최근 참여 내역</h4>
      </div>

      <div className="flex flex-col gap-4">
        {orderList.map((order) => (
          <div key={order.id} className="flex items-center justify-between p-5 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-sm transition cursor-pointer group">
            <div className="flex flex-col gap-2">
              <span className={`text-[11px] font-black w-max px-2.5 py-1 rounded-md ${order.color}`}>
                {order.status}
              </span>
              <h5 className="text-base font-extrabold text-gray-900 group-hover:text-blue-600 transition">{order.title}</h5>
              <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                <Clock size={12} />
                <span>결제일: {order.date}</span>
                <span className="text-gray-300">|</span>
                <span className="text-gray-700 font-bold">{order.price}</span>
              </div>
            </div>
            <ChevronRight className="text-gray-300 group-hover:text-blue-500 transition" size={20} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPageOrders;