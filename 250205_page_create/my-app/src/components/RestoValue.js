import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faHeart
} from '@fortawesome/free-solid-svg-icons';


const renderStars = (count) => {
    return Array(5).fill(0).map((_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={faStar}
        className={`text-sm ${index < count ? "text-[#F78A16]" : "text-gray-200"}`}
      />
    ));
  };

function RestoValue({ track, participantIdentity, local = false, onCaptureFrame }) {

   const [restoinfo, setResto] = useState([
           
    {
        id: 1,
        name: "맛있는 음식점",
        startDate: "2024-01-23",
        isOpen: true,
        isLive: true,
        address: "서울시 강남구 역삼동 123-45",
        lat: 37.12345,
        lon: 127.1234,
        description: "20년 전통의 맛집입니다.",
        starAvg: 4.5,
        cleannessAvg: 4.2,
        reviewCnt: 128,
        businessHours: "09:00 ~ 18:00",
        closedDays: "월, 화 휴무",
        originCountry: "김치: 국내산",
        tel: "02-1234-5678",
        photo: "https://",
        thumbnail : "https://"
    }, 
  ]);

    const toggleLike = () => {
      setResto((prevResto) => {
          const updatedResto = { ...prevResto[0], isLike: !prevResto[0].isLike };
          return [updatedResto];
      });
    };

    return(
    <div>
        <div className="flex items-center text-black text-lg justify-between border-gray">
          <div>
          {restoinfo[0].name}
          </div>
          <div className="flex items-center space-x-2">
                          {restoinfo[0].isLive && (
                              <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-md">Live On</span>
                          )}
                          <FontAwesomeIcon
                              icon={faHeart}
                              className={`text-lg cursor-pointer ${restoinfo[0].isLike ? "text-red-500" : "text-gray-400"}`}
                              onClick={toggleLike}
                          />
        </div>
        </div>
        <div className="text-lg text-black">
            {restoinfo[0].starAvg}
        </div>
        <div className="flex justify-center">
            <div className="flex items-center">
                <span className="text-sm text-gray-500 w-16">별점</span>
                <div>{renderStars(restoinfo[0].starAvg)}</div>
            </div>
            <div className="flex items-center">
                <span className="text-sm text-gray-500 w-16">위생점수</span>
                <div>{renderStars(restoinfo[0].cleannessAvg)}</div>
            </div>
        </div>
    </div>
    );
}

export default RestoValue;