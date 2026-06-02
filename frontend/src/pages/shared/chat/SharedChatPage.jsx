import React, { useState } from 'react';
import { Store, Send, Image as ImageIcon, MoreVertical, Search, User, CheckCircle } from 'lucide-react';
import Header from '../../../components/layout/Header';

// 가상 채팅방 목록 데이터
const mockChatRooms = [
  { id: 1, targetName: '컴공요정', productName: '컴퓨터 구조 및 설계 6판', lastMessage: '네, 내일 학교 정문에서 뵐게요!', time: '오후 2:30', unread: 0 },
  { id: 2, targetName: 'A+폭격기', productName: '운영체제 10판', lastMessage: '혹시 필기 흔적이 어느 정도인가요?', time: '오전 11:15', unread: 2 },
  { id: 3, targetName: '복학생형', productName: '카시오 공학용 계산기', lastMessage: '계좌번호 남겨주시면 입금하겠습니다.', time: '어제', unread: 0 },
];

// 가상 채팅 대화 내역
const mockMessages = [
  { id: 1, sender: 'other', text: '안녕하세요! 컴퓨터 구조 책 아직 공구 참여 가능한가요?', time: '오후 2:10' },
  { id: 2, sender: 'me', text: '네, 현재 2자리 남아있습니다!', time: '오후 2:15' },
  { id: 3, sender: 'other', text: '다행이네요. 상태는 어떤가요?', time: '오후 2:16' },
  { id: 4, sender: 'me', text: '거의 새 책입니다. 필기 전혀 없어요.', time: '오후 2:20' },
  { id: 5, sender: 'other', text: '네, 내일 학교 정문에서 뵐게요!', time: '오후 2:30' },
];

const SharedChatPage = ({ userRole = 'SELLER' }) => {
  const [activeRoom, setActiveRoom] = useState(mockChatRooms[0]);
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    console.log("전송할 메시지:", message);
    setMessage(''); // 전송 후 입력창 비우기
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-gray-900 h-screen">
      <Header />

      {/* 권한에 따라 변하는 상단 배너 (조건부 렌더링) */}
      {userRole === 'SELLER' ? (
        <section className="bg-slate-900 text-white py-6 px-6 shadow-md shrink-0">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full w-max border border-emerald-500/30 flex items-center gap-1">
                <Store size={12} /> Seller Hub
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight">메시지 관리</h2>
              <p className="text-sm text-gray-400">구매자와의 소통을 한 곳에서 관리하세요.</p>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-white border-b border-gray-200 py-6 px-6 shrink-0">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">내 채팅</h2>
          </div>
        </section>
      )}

      {/* 메인 채팅 레이아웃 (좌측 리스트 + 우측 대화창) */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 md:p-6 pb-8 md:pb-12 flex gap-4 overflow-hidden min-h-0">
        
        {/* 좌측: 채팅방 목록 */}
        <aside className="w-full md:w-1/3 bg-white rounded-2xl border border-gray-200 shadow-sm flex-col overflow-hidden h-full hidden md:flex">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="채팅방 또는 참여자 검색" 
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          <div className="flex-grow overflow-y-auto">
            {mockChatRooms.map((room) => (
              <div 
                key={room.id} 
                onClick={() => setActiveRoom(room)}
                className={`p-4 border-b border-gray-50 flex items-start gap-3 cursor-pointer transition ${
                  activeRoom.id === room.id ? 'bg-blue-50/50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 flex-shrink-0">
                  <User size={20} />
                </div>
                <div className="flex flex-col flex-grow overflow-hidden">
                  <div className="flex justify-between items-center mb-0.5">
                    <h4 className="text-sm font-bold text-gray-900 truncate">{room.targetName}</h4>
                    <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap ml-2">{room.time}</span>
                  </div>
                  <p className="text-xs font-medium text-gray-500 truncate mb-1">{room.productName}</p>
                  <p className={`text-xs truncate ${room.unread > 0 ? 'text-gray-900 font-bold' : 'text-gray-500'}`}>
                    {room.lastMessage}
                  </p>
                </div>
                {room.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-4">
                    {room.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* 우측: 활성화된 대화창 */}
        <section className="flex-grow bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col overflow-hidden h-full">
          {/* 대화창 헤더 (상품 정보) */}
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white shrink-0">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 shrink-0">
                <Store size={20} />
              </div>
              <div className="flex flex-col truncate">
                <span className="text-[11px] font-bold text-gray-500">{activeRoom.targetName}</span>
                <h3 className="text-sm font-extrabold text-gray-900 truncate">{activeRoom.productName}</h3>
                <span className="text-xs text-blue-600 font-bold mt-0.5">공동구매 진행중</span>
              </div>
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition rounded-lg hover:bg-gray-100 shrink-0">
              <MoreVertical size={20} />
            </button>
          </div>

          {/* 대화 내용 스크롤 영역 */}
          <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-4 bg-gray-50/30">
            <div className="text-center my-2">
              <span className="text-[11px] font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                2026년 5월 24일 일요일
              </span>
            </div>

            {mockMessages.map((msg) => (
              <div key={msg.id} className={`flex max-w-[75%] ${msg.sender === 'me' ? 'self-end flex-row-reverse' : 'self-start'}`}>
                {msg.sender === 'other' && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 shrink-0 mr-2">
                    <User size={16} />
                  </div>
                )}
                <div className={`flex flex-col gap-1 ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-3 rounded-2xl text-sm ${
                    msg.sender === 'me' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium px-1">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 메시지 입력창 */}
          <div className="p-4 bg-white border-t border-gray-100 shrink-0">
            <form onSubmit={handleSendMessage} className="flex items-end gap-2 bg-gray-50 p-2 rounded-2xl border border-gray-200 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 transition">
              <button type="button" className="p-2.5 text-gray-400 hover:text-gray-600 transition rounded-xl hover:bg-gray-200 shrink-0">
                <ImageIcon size={20} />
              </button>
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="메시지를 입력하세요..."
                className="flex-grow bg-transparent outline-none text-sm resize-none py-2.5 max-h-32 min-h-[44px]"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
              />
              <button 
                type="submit" 
                disabled={!message.trim()}
                className={`p-2.5 rounded-xl transition shrink-0 flex items-center justify-center ${
                  message.trim() ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send size={18} className={message.trim() ? 'ml-0.5' : ''} />
              </button>
            </form>
          </div>
        </section>

      </main>
    </div>
  );
};

export default SharedChatPage;