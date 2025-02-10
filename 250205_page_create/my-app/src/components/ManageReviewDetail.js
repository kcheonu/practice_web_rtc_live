import React, { useState } from "react";

function ManageReviewDetail({ review, onBack }) {
    const [reply, setReply] = useState(review.reply); // 초기값으로 review.reply 설정
    const [inputValue, setInputValue] = useState(""); // 답글 입력값 상태 관리

    // ✅ 답글 저장 함수
    const handleReplySave = () => {
        if (!inputValue.trim()) {
            alert("답글 내용을 입력해주세요!");
            return;
        }
        setReply(inputValue); // reply 값을 업데이트
        alert(`답글이 저장되었습니다: "${inputValue}"`);
        console.log(`✅ 답글 저장됨: ${inputValue}`);
        setInputValue(""); // 입력값 초기화
        // 실제 API 연동 시 POST/PUT 요청
    };

    // ✅ Enter 키 이벤트 처리
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleReplySave();
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <button
                onClick={onBack}
                className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
                뒤로 가기
            </button>
            <div className="flex flex-col items-center space-y-4">
                {/* Review Photo */}
                <img
                    src={review.reviewPhoto}
                    alt="리뷰 사진"
                    className="w-48 h-48 object-cover rounded-lg"
                />
                {/* Review Content */}
                <h2 className="text-lg font-bold">{review.username}</h2>
                <p className="text-gray-700">{review.content}</p>
                {/* Tags */}
                <div className="flex space-x-2">
                    {review.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                {/* Ratings */}
                <div className="flex space-x-4">
                    <div>
                        <span className="text-sm text-gray-500">맛평점: </span>
                        {Array.from({ length: 5 }, (_, index) => (
                            <span
                                key={`star-${index}`}
                                className={
                                    index < review.starValue
                                        ? "text-orange-500"
                                        : "text-gray-300"
                                }
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <div>
                        <span className="text-sm text-gray-500">위생평점: </span>
                        {Array.from({ length: 5 }, (_, index) => (
                            <span
                                key={`clean-${index}`}
                                className={
                                    index < review.cleannessValue
                                        ? "text-orange-500"
                                        : "text-gray-300"
                                }
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>
                <p className="text-sm text-gray-500">{review.writtenDatetime}</p>

                {/* Reply Section */}
                <div className="w-full mt-4">
                    <h3 className="text-lg font-bold mb-2">사장님 답글</h3>
                    {reply ? (
                        <div className="p-4 bg-gray-100 rounded-lg text-gray-800">
                            {reply}
                        </div>
                    ) : (
                        <div>
                            <textarea
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyPress}
                                rows="3"
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="답글을 입력하세요..."
                            ></textarea>
                            <button
                                onClick={handleReplySave}
                                className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                            >
                                답글 저장
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ManageReviewDetail;
