import React from "react";

function MenuImage({ photo, name, soldout }) {
    return (
        <div className="flex flex-col items-center">
            {/* ✅ 메뉴 이미지 */}
            <img 
                src={photo || "https://via.placeholder.com/150"} // 기본 이미지 설정
                alt="메뉴 이미지" 
                className="w-[200px] h-[200px] object-cover rounded-lg"
            />

            {/* ✅ 메뉴명 & 품절 상태 */}
            <div className="text-lg font-semibold mt-2">
                {soldout ? <p className="text-red-500">🚨 재료소진으로 인한 품절입니다.</p> : <p>{name}</p>}
            </div>

            {/* ✅ 메뉴 설명 및 추가 정보 */}
            <div className="text-sm text-gray-500 mt-1">
                메뉴 설명 및 알레르기 정보
            </div>
        </div>
    );
}

export default MenuImage;
