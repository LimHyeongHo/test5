import React from 'react';
import { Search, Bell, UserCircle } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-30">
      {/* 중앙 검색창 */}
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="어떤 전공책을 찾으시나요?"
          className="w-full bg-gray-100 border-none rounded-full py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
        />
      </div>

      {/* 우측 아이콘 세트 */}
      <div className="flex items-center gap-5">
        <button className="text-gray-500 hover:text-blue-600 relative">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>
        <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition">
          <UserCircle size={28} />
          <span className="font-semibold text-sm">홍길동 님</span>
        </button>
      </div>
    </header>
  );
};

export default Header;