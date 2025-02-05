import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { TiShoppingCart } from "react-icons/ti";

function Header({ title, showBackButton = false, showCartButton = false }) {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <header className="w-full h-[8vh] bg-white border-b flex items-center px-4">
      {/* 왼쪽 영역 */}
      <div className="w-[20vw] flex justify-start">
        {showBackButton && (
          <button
            onClick={handleGoBack}
            className="text-gray-600"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        )}
      </div>

      {/* 중앙 제목 영역 - absolute로 중앙 배치 */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <h1 className="text-lg font-medium whitespace-nowrap">{title}</h1>
      </div>

      {/* 오른쪽 영역 */}
      <div className="w-[20vw] flex justify-end ml-auto">
        {isLoggedIn ? (
          <button onClick={() => navigate('/cart')} className="text-gray-600">
            <TiShoppingCart size={28} />
          </button>
        ) : (
          <button 
            onClick={() => navigate('/login-select')} 
            className="text-gray-600 text-sm font-medium whitespace-nowrap"
          >
            로그인 / 회원가입
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;