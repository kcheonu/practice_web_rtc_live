import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  const location = useLocation();
  
  // 현재 경로에 따라 Header props 설정
  const getHeaderProps = () => {
    switch(location.pathname) {
      case '/cart':
        return {
          title: "장바구니",
          showSearch: false,
          showBackButton: true,
          showCartButton: false
        };
      case '/payment':
        return {
          title: "결제하기",
          showSearch: false,
          showBackButton: true,
          showCartButton: false
        };
      case '/liked':
        return {
          title: "찜",
          showSearch: false,
          showBackButton: false,
          showCartButton: true
        };
      case '/review/:orderId':
        return {
          title: "리뷰 쓰기",
          showBackButton: false,
          showCartButton: false
        };
      default:
        return {
          title: "홈",
          showSearch: true,
          showBackButton: false,
          showCartButton: true
        };
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <Header {...getHeaderProps()} />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;