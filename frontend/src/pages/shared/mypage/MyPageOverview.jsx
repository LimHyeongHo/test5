import React from 'react';
import { User, ShieldCheck, Store, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyPageOverview = ({ userRole = 'BUYER' }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-[32px] p-8 border border-gray-200 shadow-sm flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pb-8 border-b border-gray-100">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-gray-50 flex items-center justify-center shadow-inner overflow-hidden flex-shrink-0 text-gray-400">
            <User size={40} />
          </div>
          
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h4 className="text-2xl font-extrabold text-gray-900">임형호</h4>
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
          onClick={() => navigate('../settings')} // 상대 경로로 세팅 페이지 이동
          className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-50 hover:text-gray-900 transition flex items-center gap-2 shadow-sm"
        >
          <Edit3 size={16} /> 프로필 수정
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8 px-2">
        <div className="flex flex-col gap-1.5"><span className="text-xs font-bold text-gray-400 uppercase tracking-wider">회원 고유 번호 (User ID)</span><p className="text-base font-semibold text-gray-900">#202407030LHH</p></div>
        <div className="flex flex-col gap-1.5"><span className="text-xs font-bold text-gray-400 uppercase tracking-wider">로그인 이메일 계정</span><p className="text-base font-semibold text-gray-900">student@yuhan.ac.kr</p></div>
        <div className="flex flex-col gap-1.5"><span className="text-xs font-bold text-gray-400 uppercase tracking-wider">가입 일시</span><p className="text-base font-semibold text-gray-900">2025년 09월 01일 14:30</p></div>
        <div className="flex flex-col gap-1.5"><span className="text-xs font-bold text-gray-400 uppercase tracking-wider">비밀번호</span>
          <div className="flex items-center gap-3">
            <p className="text-lg tracking-[0.2em] font-black text-gray-700 mt-1">********</p>
            <button onClick={() => navigate('../settings')} className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 transition">변경</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageOverview;