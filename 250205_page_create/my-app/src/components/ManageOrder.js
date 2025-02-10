import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import DetailOrder from "../components/DetailOrder";

function ManageOrder() {
    const orders = [
        { id: 1, name: "주문 2", date: "2025-01-21 19:14", address: "홍길동123", price: "29,000원" },
        { id: 2, name: "주문 3", date: "2025-01-21 19:14", address: "홍길동123", price: "28,000원" },
        { id: 3, name: "주문 4", date: "2025-01-21 19:14", address: "고현역숲속37", price: "28,000원" },
        { id: 4, name: "주문 5", date: "2025-01-21 19:15", address: "청담동456", price: "30,000원" },
        { id: 5, name: "주문 6", date: "2025-01-21 19:16", address: "성수동789", price: "32,000원" },
    ];

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3;

    const handleNextPage = () => {
        if ((currentPage + 1) * itemsPerPage < orders.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const paginatedOrders = orders.slice(
        currentPage * itemsPerPage,
        currentPage * itemsPerPage + itemsPerPage
    );

    return (
        <div className="w-full h-full bg-gray-100 p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4 text-center bg-[#F8F5F0] py-2">
                주문 내역들
            </h2>
            <div className="grid grid-cols-3 gap-4">
                {paginatedOrders.map((order) => (
                    <div
                        key={order.id}
                        className="p-4 bg-[#F8F5F0] rounded-lg shadow-md flex flex-col justify-between h-auto"
                    >
                        <p className="text-lg font-semibold">{order.name}</p>
                        <p>날짜: {order.date}</p>
                        <p>주소: {order.address}</p>
                        <p>전화번호: 010-XXXX-XXXX</p>
                        <div className="flex-1 overflow-y-auto">
                            <DetailOrder />
                        </div>
                        <p>가격: {order.price}</p>
                        <textarea
                            className="mt-2 border rounded-md p-2 w-full h-16 resize-none"
                            placeholder="추가 요청사항"
                        ></textarea>
                        <button className="mt-2 bg-orange-500 text-white py-2 px-4 rounded-lg">
                            주문완료
                        </button>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={handlePreviousPage}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2"
                    disabled={currentPage === 0}
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                    이전
                </button>
                <button
                    onClick={handleNextPage}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2"
                    disabled={(currentPage + 1) * itemsPerPage >= orders.length}
                >
                    다음
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </div>
    );
}

export default ManageOrder;
