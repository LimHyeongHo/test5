import React from 'react';
import { Save, Lock, User, Mail, Hash } from 'lucide-react';

const MyPageSettings = () => {
  return (
    <div className="bg-white rounded-[32px] p-8 border border-gray-200 shadow-sm flex flex-col gap-8">
      <div className="pb-6 border-b border-gray-100">
        <h4 className="text-lg font-bold text-gray-900">기본 정보 설정</h4>
        <p className="text-xs text-gray-400 font-medium mt-1">프로필 정보와 안전한 계정 관리를 위한 비밀번호를 변경할 수 있습니다.</p>
      </div>

      <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
        
        {/* 수정 불가 영역 (Read-only) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-500 flex items-center gap-1.5"><Hash size={14}/> 회원 고유 번호</label>
            <input type="text" value="#202407030LHH" disabled className="px-4 py-2.5 bg-gray-100 text-gray-500 rounded-xl text-sm font-semibold border-none outline-none" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-500 flex items-center gap-1.5"><Mail size={14}/> 이메일 계정</label>
            <input type="text" value="student@yuhan.ac.kr" disabled className="px-4 py-2.5 bg-gray-100 text-gray-500 rounded-xl text-sm font-semibold border-none outline-none" />
          </div>
        </div>

        {/* 수정 가능 영역 */}
        <div className="flex flex-col gap-6 px-2 mt-2">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5"><User size={14}/> 닉네임 (이름)</label>
            <input type="text" defaultValue="임형호" className="px-4 py-2.5 bg-white border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl text-sm font-semibold outline-none transition" />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5"><Lock size={14}/> 새 비밀번호</label>
            <input type="password" placeholder="변경할 비밀번호를 입력하세요" className="px-4 py-2.5 bg-white border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl text-sm font-semibold outline-none transition" />
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-gray-100 mt-2">
          <button type="submit" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition flex items-center gap-2 shadow-md">
            <Save size={16} /> 변경사항 저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyPageSettings;