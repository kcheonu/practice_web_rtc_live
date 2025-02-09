import React from "react";
import RestoValue from "../components/RestoValue";
import RestoTotalReview from "../components/RestoTotalReview";
import Layout from "../components/layout/Layout";



function RestoReviewPage({ restoraunt_id, order_id, user_id }) {
    // restoraunt_id로 가게 리뷰 정보 불러오기(필터 포함_포토 리뷰만 보기)
    // restoraunt_id로 가게 정보 불러오기
    // order_id로 주문 내역 불러오기
    // order_id로 주문 내역 메뉴 불러오기
    // 주문 내역 메뉴 ID로 주문내역 메뉴 옵션 조회

    // 메뉴 ID로 메뉴 정보 불러오기
    // 메뉴 옵션 ID로 메뉴 옵션 조회

    // user_id와 restoraunt_id를 이용한 찜 설정/해제하기기

    return (
        <div className="flex flex-col min-h-screen">
            <div className="w-full h-[8vh] bg-white text-black border border-gray">
                <Layout />
            </div>
            <div className="w-full h-auto bg-white text-black border border-gray">
                <RestoValue />
            </div>
            <div className="w-full h-16 bg-white text-black border border-gray ">
                <RestoTotalReview />
            </div>
        </div>
    );
}

export default RestoReviewPage;
