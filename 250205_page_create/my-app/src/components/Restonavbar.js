import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronRight,
    faMap,
    faStar,
    faHeart
} from '@fortawesome/free-solid-svg-icons';

// `props`를 받아 동적으로 렌더링
function Restonavbar({ name, starAvg, reviewCnt, isLive, isLike }) {
    const [liked, setLiked] = useState(isLike);

    // 찜 추가 및 해제 기능
    const toggleLike = () => {
        setLiked((prevLiked) => !prevLiked);
    };

    return (
        <div className="flex justify-between items-center border-b p-4">
            {/* 가게 정보 */}
            <div className="flex flex-col">
                <p className="text-lg">{name || "가게 이름 없음"}</p>
                <p className="flex items-center text-sm text-gray-600">
                    <FontAwesomeIcon icon={faStar} className="text-[#F87A16] mr-1" />
                    {starAvg?.toFixed(1) || "0.0"} ({reviewCnt?.toLocaleString() || "0"})
                    <FontAwesomeIcon icon={faChevronRight} className="ml-2 text-gray-400" />
                </p>
            </div>

            {/* 버튼 및 아이콘 */}
            <div className="flex items-center space-x-2">
                {isLive && (
                    <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-md">
                        Live On
                    </span>
                )}
                <FontAwesomeIcon
                    icon={faHeart}
                    className={`text-lg cursor-pointer ${liked ? "text-red-500" : "text-gray-400"}`}
                    onClick={toggleLike}
                />
                <FontAwesomeIcon icon={faMap} className="text-lg text-gray-500" />
            </div>
        </div>
    );
}

export default Restonavbar;
