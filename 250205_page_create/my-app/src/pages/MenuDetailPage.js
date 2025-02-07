import React from "react";
import MenuImage from "../components/MenuImage";
import MenuDetail from "../components/MenuDetail";
import Layout from "../components/layout/Layout";

function MenuDetailPage({ menu_id, user_id }) {
    // menu_id로 메뉴옵션 카테고리 불러오기
    // menu_id로 메뉴옵션 불러오기
    // user_id로 장바구니조회
    // user_id로 장바구니 조회해서 나온 메뉴의 가게 id와 현재 메뉴의 가게 id가 다르면 장바구니 초기화
    // user_id로 장바구니 품목 추가
    // user_id로 장바구니 품목 메뉴 옵션 추가가
    console.log('hello')
    return (
        <div className="flex1">
            
            <div className="w-full h-[8vh] bg-white text-black border border-gray">
                <Layout />
            </div>
            <br></br>
            <div className="w-full h-auto bg-white text-black border border-white">
                <MenuImage />
            </div>
            <div className="w-full h-auto bg-white text-black border border-gray ">
                <MenuDetail />
            </div>
        </div>
    );
}

export default MenuDetailPage;
