import React from 'react';
import { Store, Users, ChevronRight } from 'lucide-react';

const MyPageProjects = () => {
  // 임시 판매(개설) 데이터
  const projectList = [
    { id: 1, title: '운영체제 10판 (A+ 필기 포함)', date: '2026.05.20 등록', status: '모집 중', current: 3, target: 5, color: 'text-blue-700 bg-blue-100' },
    { id: 2, title: '라즈베리파이 4 풀세트', date: '2026.05.15 등록', status: '발송 대기', current: 10, target: 10, color: 'text-emerald-700 bg-emerald-100' },
  ];

  return (
    <div className="bg-white rounded-[32px] p-8 border border-gray-200 shadow-sm flex flex-col gap-6">
      <div className="flex items-center gap-3 pb-6 border-b border-gray-100">
        <Store className="text-emerald-500" size={24} />
        <h4 className="text-lg font-bold text-gray-900">내 판매 프로젝트</h4>
      </div>

      <div className="flex flex-col gap-4">
        {projectList.map((project) => (
          <div key={project.id} className="flex items-center justify-between p-5 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-sm transition cursor-pointer group">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-black px-2.5 py-1 rounded-md ${project.color}`}>
                  {project.status}
                </span>
                <span className="text-xs text-gray-400 font-medium">{project.date}</span>
              </div>
              <h5 className="text-base font-extrabold text-gray-900 group-hover:text-emerald-600 transition">{project.title}</h5>
              
              <div className="flex items-center gap-1.5 text-sm font-bold text-gray-600 mt-1">
                <Users size={14} className="text-gray-400" />
                <span>모집 인원: <span className={project.current === project.target ? 'text-emerald-600' : 'text-blue-600'}>{project.current}</span> / {project.target}명</span>
              </div>
            </div>
            <ChevronRight className="text-gray-300 group-hover:text-emerald-500 transition" size={20} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPageProjects;