import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MenuDetail from "../components/MenuDetail";
import MenuImage from "../components/MenuImage";

function MenuDetailPage() {
    const { menuId } = useParams();  // ✅ URL에서 `menuId` 가져오기
    const [menuData, setMenuData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log("✅ 현재 선택된 메뉴 ID:", menuId);

    // ✅ `menuId`에 맞는 메뉴 데이터 불러오기
    useEffect(() => {
        if (!menuId) {
            console.error("❌ menuId is undefined. API 요청을 스킵합니다.");
            return;
        }

        const fetchMenuData = async () => {
            try {
                const response = await fetch(`http://i12a701.p.ssafy.io:8080/api/menus/${menuId}`);
                if (!response.ok) throw new Error("❌ Failed to fetch menu data");
                const data = await response.json();
                console.log("✅ Menu Data:", data);

                setMenuData(data);
                setLoading(false);
            } catch (err) {
                console.error("❌ Fetch Menu Data Error:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchMenuData();
    }, [menuId]);

    // ✅ 로딩 상태 표시
    if (loading) return <div className="p-4 text-center">🍽 메뉴 정보를 불러오는 중...</div>;
    
    // ✅ 에러 발생 시 표시
    if (error) return <div className="p-4 text-red-500">❌ 메뉴 정보를 가져오는 중 오류 발생: {error}</div>;

    return (
        <div className="flex flex-col items-center p-4 bg-white border border-gray rounded-lg">
            {/* ✅ MenuImage 컴포넌트에 데이터 전달 */}
            <MenuImage 
                photo={menuData.photo} 
                name={menuData.name} 
                soldout={menuData.soldout} 
            />

            {/* ✅ MenuDetail 컴포넌트에 데이터 전달 */}
            <MenuDetail 
                name={menuData.name} 
                price={menuData.price} 
                soldout={menuData.soldout}
            />
        </div>
    );
}

export default MenuDetailPage;
