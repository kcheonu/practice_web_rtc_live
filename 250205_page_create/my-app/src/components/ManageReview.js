import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import ManageReviewDetail from "../components/ManageReviewDetail";

function ManageReview() {
    const [selectedReviewId, setSelectedReviewId] = useState(null);

    const reviews = [
        {
            id: 1,
            username: "CR777",
            reviewPhoto: "https://via.placeholder.com/150",
            content: "너무 맛있게 먹었습니다~ 다음에도 또 시켜먹을게요. 위생 점수도 만점 드립니다",
            starValue: 5,
            cleannessValue: 4.5,
            writtenDatetime: "2025/01/19",
            tags: ["적당한 양", "맛있음"],
        },
        {
            id: 2,
            username: "홍길동123",
            reviewPhoto: "https://via.placeholder.com/150",
            content: "처음 시켜봤는데 양도 많고 맛도 최고입니다~",
            starValue: 3,
            cleannessValue: 3.5,
            writtenDatetime: "2025/01/19",
            tags: ["적당한 양", "국물이 최고"],
        },
    ];

    const handleReviewSelect = (id) => {
        setSelectedReviewId(id);
    };

    if (selectedReviewId) {
        const selectedReview = reviews.find((review) => review.id === selectedReviewId);
        return (
            <ManageReviewDetail
                review={selectedReview}
                onBack={() => setSelectedReviewId(null)}
            />
        );
    }

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-4">리뷰 관리</h2>
            <div className="space-y-4">
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        className="flex items-start space-x-4 border-b pb-4 bg-gray-100 cursor-pointer"
                        onClick={() => handleReviewSelect(review.id)}
                    >
                        <img
                            src={review.reviewPhoto}
                            alt="리뷰 사진"
                            className="w-24 h-24 object-cover rounded-md"
                        />
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold">{review.username}</h3>
                                <span className="text-sm text-gray-500">{review.writtenDatetime}</span>
                            </div>
                            <div className="flex items-center mt-2 text-orange-500">
                                <span className="text-sm text-gray-500 mr-2">맛평점</span>
                                {Array.from({ length: 5 }, (_, index) => (
                                    <FontAwesomeIcon
                                        key={`star-${index}`}
                                        icon={faStar}
                                        className={index < review.starValue ? "text-orange-500" : "text-gray-300"}
                                    />
                                ))}
                            </div>
                            <div className="flex items-center mt-2 text-blue-500">
                                <span className="text-sm text-gray-500 mr-2">위생평점</span>
                                {Array.from({ length: 5 }, (_, index) => (
                                    <FontAwesomeIcon
                                        key={`clean-${index}`}
                                        icon={faCheckCircle}
                                        className={index < review.cleannessValue ? "text-blue-500" : "text-gray-300"}
                                    />
                                ))}
                            </div>
                            <p className="mt-2 text-gray-700">{review.content}</p>
                            <div className="mt-2 space-x-2">
                                {review.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManageReview;
