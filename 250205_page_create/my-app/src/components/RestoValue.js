import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons';

// ⭐ 별점 아이콘 렌더링 함수
const renderStars = (count) => {
    return Array(5).fill(0).map((_, index) => (
        <FontAwesomeIcon
            key={index}
            icon={faStar}
            className={`text-sm ${index < count ? "text-[#F78A16]" : "text-gray-200"}`}
        />
    ));
};

function RestoValue({ restaurantId }) {
    const [restaurantData, setRestaurantData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log("✅ RestoValue에서 받은 restaurantId:", restaurantId);

    // ✅ 가게 데이터 가져오기 (API 호출)
    useEffect(() => {
        if (!restaurantId) {
            console.error("❌ restaurantId is undefined. API 요청을 스킵합니다.");
            return;
        }

        const fetchRestaurantData = async () => {
            try {
                const response = await fetch(
                    `http://i12a701.p.ssafy.io:8080/api/restaurants/${restaurantId}`
                );
                if (!response.ok) {
                    throw new Error(`Failed to fetch restaurant data: ${response.status}`);
                }
                const data = await response.json();
                console.log("✅ 가게 정보 API 응답:", data);

                setRestaurantData(data);
                setLoading(false);
            } catch (err) {
                console.error("❌ Fetch Restaurant Data Error:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchRestaurantData();
    }, [restaurantId]);

    // ✅ 찜하기 기능 (좋아요 버튼)
    const toggleLike = () => {
        setRestaurantData((prevData) => ({
            ...prevData,
            isLike: !prevData?.isLike
        }));
    };

    // ✅ 로딩 상태 표시
    if (loading) return <div className="p-4 text-center">가게 정보를 불러오는 중...</div>;

    // ✅ 에러 발생 시 표시
    if (error) return <div className="p-4 text-red-500">가게 정보를 가져오는 중 오류 발생: {error}</div>;

    return (
        <div>
            {/* 가게 이름 및 좋아요 버튼 */}
            <div className="flex items-center text-black text-lg justify-between border-gray">
                <div>{restaurantData?.name || "가게 이름 없음"}</div>
                <div className="flex items-center space-x-2">
                    {restaurantData?.isLive && (
                        <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-md">Live On</span>
                    )}
                    <FontAwesomeIcon
                        icon={faHeart}
                        className={`text-lg cursor-pointer ${restaurantData?.isLike ? "text-red-500" : "text-gray-400"}`}
                        onClick={toggleLike}
                    />
                </div>
            </div>

            {/* 별점 */}
            <div className="text-lg text-black">
                {restaurantData?.starAvg || "0.0"}
            </div>

            {/* 위생점수 및 별점 */}
            <div className="flex justify-center">
                <div className="flex items-center">
                    <span className="text-sm text-gray-500 w-16">별점</span>
                    <div>{renderStars(Math.round(restaurantData?.starAvg || 0))}</div>
                </div>
                <div className="flex items-center">
                    <span className="text-sm text-gray-500 w-16">위생점수</span>
                    <div>{renderStars(Math.round(restaurantData?.cleannessAvg || 0))}</div>
                </div>
            </div>
        </div>
    );
}

export default RestoValue;
