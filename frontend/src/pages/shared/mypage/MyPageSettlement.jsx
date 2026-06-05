import React from 'react';
import { CreditCard, Landmark, AlertCircle, CheckCircle2 } from 'lucide-react';

const MyPageSettlement = () => {
  return (
    <div className="bg-white rounded-[32px] p-8 border border-gray-200 shadow-sm flex flex-col gap-8">
      <div className="pb-6 border-b border-gray-100 flex justify-between items-end">
        <div>
          <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <CreditCard className="text-emerald-500" size={24} /> 정산 관리
          </h4>
          <p className="text-xs text-gray-400 font-medium mt-1">안전한 거래를 위한 정산 계좌와 누적 수익을 확인하세요.</p>
        </div>
      </div>

      {/* 누적 정산금 카드 */}
      <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 flex flex-col gap-2">
        <span className="text-sm font-bold text-emerald-800">이번 달 출금 가능 정산금</span>
        <div className="flex items-baseline gap-1">
          <h2 className="text-3xl font-black text-emerald-900">125,000</h2>
          <span className="text-lg font-bold text-emerald-700">원</span>
        </div>
        <button className="mt-2 w-max px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition shadow-sm">
          정산금 출금 신청
        </button>
      </div>

      {/* 등록된 정산 계좌 */}
      <div className="flex flex-col gap-4 mt-2">
        <h5 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
          <Landmark size={16} className="text-gray-500"/> 내 정산 계좌
        </h5>
        
        <div className="p-5 border border-gray-200 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              {/* 은행 로고 자리 */}
              <Landmark size={20} className="text-gray-400" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-gray-900">카카오뱅크</span>
                <span className="bg-gray-100 text-gray-600 text-[10px] px-1.5 py-0.5 rounded font-bold">주계좌</span>
              </div>
              <span className="text-xs text-gray-500 font-medium font-mono mt-0.5">3333-01-2345678</span>
            </div>
          </div>
          <button className="text-xs font-bold text-gray-500 hover:text-gray-900 px-3 py-1.5 border border-gray-200 rounded-lg transition">
            계좌 변경
          </button>
        </div>

        <div className="flex items-start gap-1.5 mt-2 bg-gray-50 p-3 rounded-xl">
          <AlertCircle size={14} className="text-gray-400 mt-0.5 shrink-0" />
          <p className="text-[11px] text-gray-500 leading-relaxed">
            정산 계좌는 본인 명의의 계좌만 등록 가능하며, 계좌 변경 시 관리자의 승인이 필요할 수 있습니다. 출금 신청 후 입금까지 영업일 기준 1~2일이 소요됩니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyPageSettlement;