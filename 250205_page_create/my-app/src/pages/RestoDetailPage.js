import React, { useState } from "react";
import RestoImage from "../components/RestoImage";
import MenuInfo from "../components/MenuInfo";
import RestoInfo from "../components/RestoInfo";
// import Footer from "../components/layout/Footer";
import Layout from "../components/layout/Layout";
import Restonavbar
 from "../components/Restonavbar";
import Footer from "../components/layout/Footer";
function RestoDetailPage({ restaurant_id, user_id}) {
    const [activeTab, setActiveTab] = useState("menuinfo");

    const renderActiveTab = () => {
        if (activeTab === "menuinfo") {
            return <MenuInfo />;
        }
        if (activeTab === "restoinfo") {
            return <RestoInfo />;
        }
    }
    // restaurant_id로 가게 상세정보 불러오기
    // restaurant_id로 가게 메뉴 카테고리 불러오기
    // restaurant_id로 가게 메뉴 불러오기
    // restaurant_id로 썸네일 불러오기?
    // user_id와 restaurant_id로 찜 설정/해제하기

    // restaurant_id => 
    //   "id": 1,
    //   "name": "맛있는 음식점",
    //   "startDate": "2024-01-23",
    //   "isOpen": true,
    //   "isLive": true,
    //   "address": "서울시 강남구 역삼동 123-45",
    //   "lat": 37.12345,
    //   "lon": 127.1234,
    //   "description": "20년 전통의 맛집입니다.",
    //   "starAvg": 4.5,
    //   "cleannessAvg": 4.2,
    //   "reviewCnt": 128,
    //   "businessHours": "09:00 ~ 18:00",
    //   "closedDays": "월, 화 휴무",
    //   "originCountry": "김치: 국내산",
    //   "tel": "02-1234-5678",
    //   "photo": "https://",
    //   "thumbnail" : "https://"
    return (
        <div className="flex flex-col min-h-screen">
            {/* 상단 콘텐츠 */}
            <div className="flex-1">
                <div className="w-full h-[8vh] bg-white text-black border border-gray">
                    <Layout />
                </div>
                <div className="w-full h-16 bg-white text-black border border-gray">
                    <RestoImage /> {/* photo, thumbnail, isOpen, isLive, starAvg, cleannessAvg, reviewCnt*/}
                </div>
                <div className="w-full h-[8vh] bg-white text-black border border-gray">
                    <Restonavbar />
                </div>
                <div className="w-full bg-white text-black border-b border-gray flex">
                    <button
                        className={`flex-1 py-2 text-center ${
                            activeTab === "menuinfo"
                                ? "text-[#F78A16] border-b-2 border-[#F78A16]"
                                : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("menuinfo")}
                    >
                        메뉴 정보
                    </button>
                    <button
                        className={`flex-1 py-2 text-center ${
                            activeTab === "restoinfo"
                                ? "text-[#F78A16] border-b-2 border-[#F78A16]"
                                : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("restoinfo")}
                    >
                        가게 정보
                    </button>
                </div>
                <div className="w-full h-auto bg-white text-black border border-gray">
                    {renderActiveTab()}
                     {/* address, lat, lon, description, businessHours, closedDays, originCountry, tel*/}
                </div>
                <div className="w-full h-[8vh] bg-white text-black border border-gray">
                    <Footer />
                </div>
            </div>
            
        </div>
    );
}

export default RestoDetailPage;
