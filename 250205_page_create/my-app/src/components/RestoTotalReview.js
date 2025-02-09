import React, { useState } from "react";

function RestoTotalReview() {
    const [isPhotoOnly, setIsPhotoOnly] = useState(false);

    const restoinfo = [
        {
            id: 1,
            reviewCnt: 1234,
        },
    ];

    const restovalue = [
        {
            id: 1,
            userName: "밥먹다 살찐떡",
            reviewPhoto: "https://via.placeholder.com/100", // 예제 이미지 URL
            review: "너무 맛있게 잘 먹었습니다. 다음에 또 다시 만나고 싶은 맛이네요! 양도 많고 최고!",
            reply: "주문해 주셔서 감사합니다 ^^",
            star: 4.5,
            writtenDatetime: "2024-01-23",
        },
        {
            id: 2,
            userName: "국먹다 체함",
            reviewPhoto: null,
            review: "생각보다 국물이 짰어요.",
            reply: null,
            star: 3.0,
            writtenDatetime: "2024-01-22",
        },
    ];

    // 필터링된 리뷰 데이터
    const filteredReviews = isPhotoOnly
        ? restovalue.filter((review) => review.reviewPhoto)
        : restovalue;

    const handleCheckboxChange = (event) => {
        setIsPhotoOnly(event.target.checked);
    };

    return (
        <div className="p-4 bg-white">
            {/* 리뷰 카운트 및 필터 */}
            <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-semibold">
                    리뷰 {restoinfo[0].reviewCnt}개
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        className="w-4 h-4 mr-2 accent-[#F78A16]"
                        checked={isPhotoOnly}
                        onChange={handleCheckboxChange}
                    />
                    <span className="mr-4">포토 리뷰만</span>
                    <button className="bg-[#F78A16] text-white px-4 py-1 rounded-lg text-sm">
                        최신순
                    </button>
                </div>
            </div>

            {/* 리뷰 목록 */}
            <div>
                {filteredReviews.map((review) => (
                    <div key={review.id} className="mb-6">
                        {/* 사용자 리뷰 */}
                        <div className="flex items-center mb-2">
                            <img
                                src="https://via.placeholder.com/40"
                                alt="유저 프로필"
                                className="w-10 h-10 rounded-full mr-3"
                            />
                            <div className="text-black">{review.userName}</div>
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
                ))}
            </div>
        </div>
    );
}

export default RestoTotalReview;