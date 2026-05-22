import React from 'react';
import { Home, FileText, MessageSquare, User, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { icon: <Home size={20} />, label: '홈', path: '/' },
    { icon: <FileText size={20} />, label: '게시판 보기', path: '#' },
    { icon: <MessageSquare size={20} />, label: '채팅', path: '#' },
    { icon: <User size={20} />, label: '마이페이지', path: '#' },
    { icon: <Settings size={20} />, label: '관리/설정', path: '#' },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 z-40">
      {/* 로고 영역 */}
      <div className="p-8">
        <h1 className="text-2xl font-black tracking-tighter text-gray-900">YU-BOOK</h1>
      </div>

      {/* 메뉴 리스트 */}
      <nav className="flex-grow px-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="flex items-center gap-4 px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all font-medium"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* 로그아웃 (하단 고정) */}
      <div className="p-4 border-t border-gray-100">
        <button className="flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-red-500 transition-colors w-full">
          <LogOut size={20} />
          <span className="font-medium">로그아웃</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;