import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/layout/Footer';

const MyPage = () => {
  const navigate = useNavigate();

  // 임시 리뷰 데이터
  const reviews = [
    {
      id: 1,
      storeName: "내만삼겹살 송파점",
      menu: "삼겹살(feat. 육즙왕광)",
      rating: 1,
      hygiene: 1,
    }
  ];

  const renderStars = (count) => {
    return Array(5).fill(0).map((_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={faStar}
        className={`text-sm ${index < count ? "text-[#F78A16]" : "text-gray-200"}`}
      />
    ));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        {/* 프로필 섹션 */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center">
            {/* 프로필 이미지 */}
            <div className="relative">
              <img
                src="/api/placeholder/160/160"
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover border border-gray-300"
              />
            </div>

            {/* 닉네임 및 정보 수정 버튼 */}
            <div className="ml-6 flex flex-col justify-center">
              <h2 className="text-2xl font-bold">밥먹다 살찐떡</h2>
              <div
                onClick={() => navigate("/mypage/edit")}
                className="flex items-center text-sm text-gray-600 cursor-pointer mt-2 ml-0.5"
              >
                <span>정보 수정</span>
                <FontAwesomeIcon icon={faChevronRight} className="ml-1 text-xs" />
              </div>
            </div>
          </div>
        </div>

        {/* 리뷰 섹션 */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">전체 리뷰</h3>
            <div
              onClick={() => navigate('/reviews')}
              className="flex items-center text-gray-600 cursor-pointer"
            >
              <span className="text-sm">전체보기</span>
              <FontAwesomeIcon icon={faChevronRight} className="ml-1 text-xs" />
            </div>
          </div>

          {reviews.map((review) => (
            <div key={review.id} className="border border-gray-100 rounded-lg p-4 flex">
              {/* 이미지 부분 */}
              <div className="mr-5 flex items-center justify-center">
                <img 
                  src={review.image} 
                  alt='이미지가 없습니다.' 
                  className="w-32 h-32 object-cover border"
                />
              </div>

              {/* 리뷰 내용 부분 */}
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{review.storeName}</span>
                </div>
                <div className="text-sm text-gray-600 mb-3">{review.menu}</div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 w-16">별점</span>
                    <div>{renderStars(review.rating)}</div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 w-16">위생점수</span>
                    <div>{renderStars(review.hygiene)}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MyPage;