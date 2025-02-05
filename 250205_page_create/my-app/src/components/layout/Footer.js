import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faList,
  faHeart,
  faUser
} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const location = useLocation();
  
  const menuItems = [
    { name: "홈", path: "/", icon: faHome },
    { name: "주문내역", path: "/orders", icon: faList },
    { name: "찜", path: "/liked", icon: faHeart },
    { name: "MY투당", path: "/mypage", icon: faUser },
  ];

  return (
    <div className="w-full h-[10vh] border-t border-gray-100 bg-white">
      <div className="grid grid-cols-4 h-full">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex flex-col items-center justify-center cursor-pointer ${
              location.pathname === item.path
                ? "text-[#FF9C07]"
                : "text-gray-400"
            }`}
          >
            <FontAwesomeIcon icon={item.icon} />
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Footer;