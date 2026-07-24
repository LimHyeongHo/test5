import React from 'react';
import { useNavigate } from 'react-router-dom';

// [신규] 비로그인 상태로 보호된 라우트에 URL 직접 접근 시 안내 모달을 보여주고, "확인" 클릭 시 로그인 페이지로 이동
// (alert는 새로고침 없는 내비게이션에서 브라우저가 조용히 막는 경우가 있어 신뢰할 수 없어 화면에 직접 렌더링하는 방식으로 대체)
const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const loggedIn = !!localStorage.getItem('user_nickname');

  const goToLogin = () => navigate('/login', { replace: true });
  const goHome = () => navigate('/', { replace: true });

  if (!loggedIn) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs mx-4 overflow-hidden">
          <p className="text-base font-bold text-gray-900 text-center py-8 px-6">
            로그인이 필요한 서비스입니다
          </p>
          <div className="flex border-t border-gray-100">
            <button
              type="button"
              onClick={goHome}
              className="flex-1 py-3.5 text-sm font-medium text-gray-500 hover:bg-gray-50 transition"
            >
              취소
            </button>
            <button
              type="button"
              onClick={goToLogin}
              className="flex-1 py-3.5 text-sm font-bold text-blue-600 border-l border-gray-100 hover:bg-gray-50 transition"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    );
  }
  return children;
};

export default PrivateRoute;
