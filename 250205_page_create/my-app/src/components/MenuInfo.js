import React from "react";
import { useNavigate } from "react-router-dom";

function MenuInfo({ menuData, isLoading, error }) {
    const navigate = useNavigate();
    
    // ✅ 메뉴 상세 페이지 이동 함수 (선택한 메뉴의 `id` 전달)
    const handleMenuClick = (id) => {
        navigate(`/menu-detail/${id}`);  // ✅ 메뉴의 상세 페이지로 이동
    };

    // 로딩 상태 표시
    if (isLoading) return <div className="p-4 text-center">메뉴 정보를 불러오는 중...</div>;
    
    // 에러 발생 시 표시
    if (error) return <div className="p-4 text-red-500">메뉴 정보를 가져오는 중 오류 발생: {error}</div>;

    // ✅ menuData가 배열인지 확인 후 처리
    const menuList = Array.isArray(menuData) ? menuData : (menuData ? [menuData] : []);
    console.log("✅ 변환된 메뉴 데이터:", menuList);

    return (
        <div className="bg-gray-100 p-4 grid grid-cols-1 gap-4">
            {menuList.length > 0 ? (
                menuList.map((menu) => (
                    <div
                        key={menu.id}
                        onClick={() => handleMenuClick(menu.id)}  // ✅ 클릭 시 상세 페이지 이동
                        className="bg-white text-black border border-gray-300 rounded-lg p-4 flex items-center cursor-pointer hover:shadow-lg transition"
                    >
                        <img
                            src={menu.photo || "https://via.placeholder.com/150"}
                            alt={menu.name}
                            className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="ml-auto">
                            <p className={`text-lg font-semibold ${menu.soldout ? "text-gray-400" : ""}`}>
                                {menu.name} {menu.soldout && "(품절)"}
                            </p>
                            <p className="text-gray-500">₩ {menu.price?.toLocaleString() || "가격 미정"}</p>
                        </div>
                    </div>
                ))
            ) : (
                <div className="p-4 text-center text-gray-500">등록된 메뉴가 없습니다.</div>
            )}
        </div>
    );
}

export default MenuInfo;
