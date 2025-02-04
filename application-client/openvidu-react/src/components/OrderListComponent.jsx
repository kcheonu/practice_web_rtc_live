import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"; // 필요한 아이콘 추가

function OrderListComponent() {
    // 전달받은 participantID로 주문내역 조회 후, orders에 채우기기
    const [orders] = useState([
        { menu: "황금올리브", value: 16000, img: "https://via.placeholder.com/100" },
        { menu: "황금올리브(2)", value: 32000, img: "https://via.placeholder.com/100" },
        { menu: "황금올리브", value: 16000, img: "https://via.placeholder.com/100" },
    ]);

    // 주문 데이터가 변경될 때 실행되는 useEffect
    // watch?? 기능 사용하면서 실시간 추가되는지 확인해야되나요??
    useEffect(() => {
        console.log("현재 주문 목록이 업데이트되었습니다.");
    }, [orders]);

    // ✅ 버튼 클릭 시 실행될 함수
    const handleAddToCart = (menuName) => {
        console.log(`장바구니에 추가했습니다: ${menuName}`);
    };

    return (
        <div className="bg-white-100 rounded-lg shadow-md">
            <h3 className="text-md font-bold mb-2">현재 조리중인 주문 목록</h3>
            <div className="space-y-4">
                {orders.length > 0 ? (
                    orders.map((order, index) => (
                        <div
                            key={index}
                            className="flex items-center bg-white-100 rounded-lg border border-black p-3 justify-between"
                        >
                            {/* 이미지 */}
                            <img
                                src={order.img}
                                alt={order.menu}
                                className="w-8 h-8 rounded-lg object-cover mr-4"
                            />
                            <div>

                            {/* 메뉴 정보 */}
                            <div className="flex-1 text-right">
                                <p className="text-sm text-gray-800">
                                    {order.menu}
                                </p>
                                <p className="text-sm text-black">
                                    ₩{order.value.toLocaleString()}
                                </p>
                            </div>
                            
                            </div>
                            {/* 추가 버튼 */}
                            <button 
                            className="p-1 bg-white rounded-full text-black hover:bg-gray-100"
                            onClick={() => handleAddToCart(order.menu)}
                            >
                                <FontAwesomeIcon icon={faCartShopping} /> {/* 아이콘 추가 */}
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">현재 조리 중인 주문이 없습니다.</p>
                )}
            </div>
        </div>
    );
}

export default OrderListComponent;
