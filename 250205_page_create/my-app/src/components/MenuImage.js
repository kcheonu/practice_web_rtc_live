// id : 1
// menuCategoryId : 1
// name : 불고기
// price : 15000
// menuPhoto : "image-url"
// soldout : false
import React from "react";

function MenuImage() {
    const Menu = [
        {
            id: 1,
            menuCategoryId: 1,
            name: '불고기',
            price: 15000,
            menuPhoto: "image-url",
            soldout: false // 변경 테스트 가능
        }
    ];

    return (
        <div className="">
            <div>
                <img src={Menu[0].menuPhoto} alt="메뉴 이미지" className="w-[200px] h-[200px] items-center flex-1"/>
                <div className="text-lg">
                    {Menu[0].soldout ? <p>재료소진으로 인한 품절입니다.</p> : <p>{Menu[0].name}</p>}
                </div>
                <div className="text-sm">
                    메뉴 설명 및 알레르기 정보
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    );
}

export default MenuImage;
