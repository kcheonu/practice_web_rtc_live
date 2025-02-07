import React from "react";

function MenuDetail() {
    const Menu = [
        {
            id: 1,
            menuCategoryId: 1,
            name: '불고기',
            price: 15000,
            menuPhoto: "image-url",
            soldout: false
        }
    ];

    const handleClick = () => {
        alert("장바구니에 추가되었습니다. 수량을 정해주세요");
        console.log("✅ 버튼 클릭됨! (담기!!)");
    };
    
    return (
        <div className="">    
            <div>{Menu[0].price}</div>
            <button
                onClick={handleClick}
                className="flex w-[6vh] h-[3vh] items-center text-sm text-black cursor-pointer bg-[#F78A16] rounded-lg"
            >
                담기
            </button>
        </div>
    );
}

export default MenuDetail;