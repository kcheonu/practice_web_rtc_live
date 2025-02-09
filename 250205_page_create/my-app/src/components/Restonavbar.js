import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronRight,
    faMap,
    faStar,
    faHeart
  } from '@fortawesome/free-solid-svg-icons';
function Restonavbar({}) {
    const [resto, setResto] = useState([
        {
            name: "몽글계란 덮밥-목동점",
            starAvg: 5.0,
            reviewCnt: 1234,
            isLive: true,
            isLike: false,
        },
    ]);

    const toggleLike = () => {
        setResto((prevResto) => {
            const updatedResto = { ...prevResto[0], isLike: !prevResto[0].isLike };
            return [updatedResto];
        });
    };
    return (
        <div className="flex justify-between items-center border-b p-4">
            <div className="flex flex-col">
                <p className="text-lg">{resto[0].name}</p>
                <p className="flex items-center text-sm text-gray-600">
                    <FontAwesomeIcon icon={faStar} className="text-[#F87A16] mr-1" />
                    {resto[0].starAvg.toFixed(1)} ({resto[0].reviewCnt.toLocaleString()})
                    <FontAwesomeIcon icon={faChevronRight} className="ml-2 text-gray-400" />
                </p>
            </div>
            <div className="flex items-center space-x-2">
                {resto[0].isLive && (
                    <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-md">Live On</span>
                )}
                <FontAwesomeIcon
                    icon={faHeart}
                    className={`text-lg cursor-pointer ${resto[0].isLike ? "text-red-500" : "text-gray-400"}`}
                    onClick={toggleLike}
                />
                <FontAwesomeIcon icon={faMap} className="text-lg text-gray-500" />
            </div>
        </div>
    );
}

export default Restonavbar;