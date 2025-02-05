import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome,
  faList,
  faHeart,
  faUser 
} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    // 이 부분은 수정 필요
    { path: '/', icon: faHome, label: '홈' },
    { path: '/orders', icon: faList, label: '주문내역' },
    { path: '/likes', icon: faHeart, label: '찜' },
    { path: '/mypage', icon: faUser, label: 'MY 투당' }
  ];

  return (
    <div className="absolute bottom-0 w-full h-[10%] border-t border-gray-100 bg-white">
      <div className="grid grid-cols-4 h-full">
        {navItems.map((item) => (
          <div
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center cursor-pointer ${
              isActive(item.path) ? 'text-[#FF9C07]' : 'text-gray-400'
            }`}
          >
            <FontAwesomeIcon icon={item.icon} className="text-2xl" />
            <span className="text-xs mt-1">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;