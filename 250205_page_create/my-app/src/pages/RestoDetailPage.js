import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RestoImage from "../components/RestoImage";
import MenuInfo from "../components/MenuInfo";
import RestoInfo from "../components/RestoInfo";
import Layout from "../components/layout/Layout";
import Restonavbar from "../components/Restonavbar";
import Footer from "../components/layout/Footer";

function RestoDetailPage() {
    const { id } = useParams();  // ✅ URL에서 restaurantId 가져오기
    const [restaurantData, setRestaurantData] = useState(null);
    const [menuData, setMenuData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log("✅ 현재 페이지의 restaurantId:", id);

    // ✅ 해당 `id`에 맞는 레스토랑 및 메뉴 정보 가져오기
    useEffect(() => {
        if (!id) {
            console.error("❌ restaurantId is undefined. API 요청을 스킵합니다.");
            return;
        }

        const fetchData = async () => {
            try {
                // ✅ 레스토랑 정보 가져오기
                const restaurantRes = await fetch(`http://i12a701.p.ssafy.io:8080/api/restaurants/${id}`);
                if (!restaurantRes.ok) throw new Error("❌ Failed to fetch restaurant data");
                const restaurantData = await restaurantRes.json();
                console.log("✅ Restaurant Data:", restaurantData);

                // ✅ 전체 메뉴 데이터 가져와서 restaurantId 기준으로 필터링
                const menuRes = await fetch(`http://i12a701.p.ssafy.io:8080/api/menus`);
                if (!menuRes.ok) throw new Error("❌ Failed to fetch menu data");
                const allMenus = await menuRes.json();
                console.log("✅ All Menus Data:", allMenus);

                // ✅ 현재 가게의 메뉴만 필터링
                const filteredMenuData = allMenus.filter(menu => menu.restaurantId === parseInt(id));
                console.log("✅ Filtered Menu Data:", filteredMenuData);

                setRestaurantData(restaurantData);
                setMenuData(filteredMenuData);
                setLoading(false);
            } catch (err) {
                console.error("❌ Fetch Data Error:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // ✅ 활성화된 탭 상태
    const [activeTab, setActiveTab] = useState("menuinfo");

    // ✅ 활성화된 탭 렌더링
    const renderActiveTab = () => {
        if (activeTab === "menuinfo") {
            return <MenuInfo menuData={menuData} isLoading={loading} error={error} />;
        }
        if (activeTab === "restoinfo") {
            return restaurantData ? (
                <RestoInfo
                    description={restaurantData.description}
                    address={restaurantData.address}
                    businessHours={restaurantData.businessHours}
                    closedDays={restaurantData.closedDays}
                    originCountry={restaurantData.originCountry}
                    tel={restaurantData.tel}
                />
            ) : null;
        }
    };

    // ✅ 로딩 및 에러 처리
    if (loading) return <div className="p-4 text-center">🍽 가게 및 메뉴 정보를 불러오는 중...</div>;
    if (error) return <div className="p-4 text-red-500">❌ 데이터 불러오기 오류: {error}</div>;

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <div className="w-full h-[8vh] bg-white text-black border border-gray">
                <Layout />
            </div>

            {/* Restaurant Image */}
            <div className="w-full h-16 bg-white text-black border border-gray">
                <RestoImage
                    photo={restaurantData?.photo}
                    thumbnail={restaurantData?.thumbnail}
                    isOpen={restaurantData?.open}
                />
            </div>

            {/* Restaurant Navbar */}
            <div className="w-full h-[12vh] bg-white text-black border border-gray">
                <Restonavbar
                    name={restaurantData?.name}
                    isLive={restaurantData?.live}
                    starAvg={restaurantData?.starAvg}
                    cleannessAvg={restaurantData?.cleannessAvg}
                    reviewCnt={restaurantData?.reviewCnt}
                    address={restaurantData?.address}
                />
            </div>

            {/* Tabs */}
            <div className="w-full bg-white text-black border-b border-gray flex">
                <button
                    className={`flex-1 py-2 text-center ${activeTab === "menuinfo" ? "text-[#F78A16] border-b-2 border-[#F78A16]" : "text-gray-500"}`}
                    onClick={() => setActiveTab("menuinfo")}
                >
                    메뉴 정보
                </button>
                <button
                    className={`flex-1 py-2 text-center ${activeTab === "restoinfo" ? "text-[#F78A16] border-b-2 border-[#F78A16]" : "text-gray-500"}`}
                    onClick={() => setActiveTab("restoinfo")}
                >
                    가게 정보
                </button>
            </div>

            {/* Active Tab Content */}
            <div className="w-full h-auto bg-white text-black border border-gray">
                {renderActiveTab()}
            </div>

            {/* Footer */}
            <div className="w-full h-[8vh] bg-white text-black border border-gray">
                <Footer />
            </div>
        </div>
    );
}

export default RestoDetailPage;
