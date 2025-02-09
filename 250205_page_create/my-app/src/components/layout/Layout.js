import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

function Layout() {
  const location = useLocation();
  
  // 현재 경로에 따라 Header props 설정
  const getHeaderProps = () => {
    switch(location.pathname) {
      case '/cart':
        return {
          title: "장바구니",
          showBackButton: true,
          showCartButton: false,
          showAlertButton: false
        };
      case '/payment':
        return {
          title: "결제하기",
          showBackButton: true,
          showCartButton: false,
          showAlertButton: false
        };
      case '/liked':
        return {
          title: "찜",
          showBackButton: false,
          showCartButton: true,
          showAlertButton: false
        };
      case '/review/:orderId':
        return {
          title: "리뷰 쓰기",
          showBackButton: false,
          showCartButton: false,
          showAlertButton: false
        };
      case '/mypage':
        return {
          title: "MY 투당",
          showBackButton: false,
          showCartButton: false,
          showAlertButton: true
        };
      case '/mypage/edit':
        return {
          title: "정보 수정",
          showBackButton: false,
          showCartButton: false,
          showAlertButton: false
        };
      case '/reviews':
        return {
          title: "내 리뷰",
          showBackButton: true,
          showCartButton: false,
          showAlertButton: false
        };
      case '/alert':
        return {
          title: "알림 센터",
          showBackButton: true,
          showCartButton: false,
          showAlertButton: false
        };
      case '/menu-detail':
        return {
          showBackButton: true,
          showCartButton: true,
          showAlertButton: false
        };
      case '/resto-review':
        return {
          showBackButton: true,
          showCartButton: true,
          showAlertButton: false
        }
      case '/resto-detail':
        return {
          showBackButton: true,
          showCartButton: true,
          showAlertButton: false
        }
      case '/streaming-view':
        return {
          showBackButton: true,
          showCartButton: true,
          showAlertButton: false
        }
      default:
        return {
          title: "홈",
          showBackButton: false,
          showCartButton: true,
          showAlertButton: false
        };
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <Header {...getHeaderProps()} />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;