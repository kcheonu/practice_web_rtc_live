import React, { useEffect, useState } from "react";
import RestoValue from "../components/RestoValue";

function RestoTotalReview({ restaurant_id }) {
    const validRestaurantId = restaurant_id || "1";
    const [reviews, setReviews] = useState([]);
    const [isPhotoOnly, setIsPhotoOnly] = useState(false);
    const [sortType, setSortType] = useState("LATEST"); // ✅ 기본 정렬 방식: 최신순
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log("restaurantId:", validRestaurantId);

    // ✅ 가게 리뷰 데이터 불러오기
    useEffect(() => {
        if (!validRestaurantId) {
            console.error("restaurantId is undefined. API request skipped.");
            return;
        }

        const fetchReviews = async () => {
            try {
                const response = await fetch(
                    `http://i12a701.p.ssafy.io:8080/api/reviews?restaurantId=${validRestaurantId}`
                );
                if (!response.ok) {
                    throw new Error(`Failed to fetch review data: ${response.status}`);
                }
                const data = await response.json();
                console.log("✅ 리뷰 데이터 API 응답:", data);

                // ✅ API 응답이 배열인지 확인 후 저장
                setReviews(Array.isArray(data) ? data : []);
                setLoading(false);
            } catch (err) {
                console.error("❌ Fetch Review Data Error:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchReviews();
    }, [validRestaurantId]);

    // ✅ 포토 리뷰 필터링 적용
    const filteredReviews = isPhotoOnly
        ? reviews.filter((review) => review.reviewPhoto)
        : reviews;

    // ✅ 정렬 기준 적용 함수
    const sortedReviews = [...filteredReviews].sort((a, b) => {
        if (sortType === "LATEST") {
            return new Date(b.writtenDatetime) - new Date(a.writtenDatetime); // 최신순 정렬
        } else if (sortType === "RATING") {
            return b.star - a.star; // 별점순 정렬 (높은 점수가 먼저)
        } else if (sortType === "CLEAN") {
            return b.cleanness - a.cleanness; // 청결도순 정렬 (높은 점수가 먼저)
        }
        return 0;
    });

    const handleCheckboxChange = (event) => {
        setIsPhotoOnly(event.target.checked);
    };

    // ✅ 정렬 옵션 변경 함수
    const handleSortChange = (event) => {
        setSortType(event.target.value);
    };

    // 로딩 상태 표시
    if (loading) return <div className="p-4 text-center">리뷰 정보를 불러오는 중...</div>;

    // 에러 발생 시 표시
    if (error) return <div className="p-4 text-red-500">리뷰 정보를 가져오는 중 오류 발생: {error}</div>;

    return (
        <div className="p-4 bg-white">
            <RestoValue 
                restaurantId={validRestaurantId}
            />
            {/* 리뷰 카운트 및 필터 */}
            <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-semibold">
                    리뷰 {reviews.length}개
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        className="w-4 h-4 mr-2 accent-[#F78A16]"
                        checked={isPhotoOnly}
                        onChange={handleCheckboxChange}
                    />
                    <span className="mr-4">포토 리뷰만</span>
                    
                    {/* ✅ 드롭다운 (토글) 정렬 선택 */}
                    <select 
                        className="px-4 py-1 rounded-lg text-sm bg-[#F78A16] text-black cursor-pointer"
                        value={sortType}
                        onChange={handleSortChange}
                    >
                        <option value="LATEST">최신순</option>
                        <option value="RATING">별점순</option>
                        <option value="CLEAN">청결순</option>
                    </select>
                </div>
            </div>

            {/* 리뷰 목록 */}
            <div>
                {sortedReviews.length > 0 ? (
                    sortedReviews.map((review) => (
                        <div key={review.id} className="mb-6">
                            {/* 사용자 리뷰 */}
                            <div className="flex items-center mb-2">
                                <img
                                    src="https://via.placeholder.com/40"
                                    alt="유저 프로필"
                                    className="w-10 h-10 rounded-full mr-3"
                                />
                                <div className="text-black">{review.userName || "익명"}</div>
                            </div>
                            <div className="w-[40vh] h-auto bg-[#F78A16] text-white p-4 rounded-lg">
                                {review.review}
                            </div>
                            {/* 리뷰 사진 */}
                            {review.reviewPhoto && (
                                <img
                                    src={review.reviewPhoto}
                                    alt="리뷰 사진"
                                    className="w-40 h-40 object-cover rounded-lg mt-2"
                                />
                            )}
                            {/* 사장님 답변 */}
                            {review.reply && (
                                <div>
                                    <div className="flex justify-end">
                                        <img
                                            src="https://via.placeholder.com/40"
                                            alt="사장님 프로필"
                                            className="w-10 h-10 rounded-full mr-3"
                                        />
                                    </div>
                                    <div className="flex justify-end"> 
                                        <div className="w-[40vh] items-center mt-4 ml-auto">
                                            <div className="bg-gray-200 text-gray-800 p-3 rounded-lg mt-1">
                                                {review.reply}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <hr className="border-t border-gray-300 my-4" />
                        </div>
                    ))
                ) : (
                    <div className="p-4 text-center text-gray-500">등록된 리뷰가 없습니다.</div>
                )}
            </div>
        </div>
    );
}

export default RestoTotalReview;
