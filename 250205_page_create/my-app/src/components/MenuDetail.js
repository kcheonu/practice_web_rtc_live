import React, { useState } from "react";

function MenuDetail({ name, price, soldout }) {
    const [quantity, setQuantity] = useState(1);  // ✅ 수량 상태
    const [totalPrice, setTotalPrice] = useState(price);  // ✅ 총 가격 상태

    // ✅ 수량 증가
    const handleIncrease = () => {
        setQuantity(quantity + 1);
        setTotalPrice((quantity + 1) * price);
    };

    // ✅ 수량 감소
    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            setTotalPrice((quantity - 1) * price);
        }
    };

    // ✅ 장바구니 담기
    const handleAddToCart = () => {
        alert(`장바구니에 추가되었습니다!`);
        console.log(`✅ 버튼 클릭됨! (담기!!) 수량: ${quantity}, 총 가격: ${totalPrice}`);
    };

    return (
        <div className="w-full p-4">
            {/* ✅ 메뉴명 & 수량 선택을 같은 줄에 정렬 */}
            <div className="flex items-center justify-between mb-4">
                {/* ✅ 메뉴명 & 가격 */}
                <div className="text-lg font-bold">{name} {price}원</div>

                {/* ✅ 수량 선택 (같은 줄 오른쪽 정렬) */}
                {!soldout && (
                    <div className="flex items-center">
                        <button
                            onClick={handleDecrease}
                            className="w-[3vh] h-[3vh] flex justify-center items-center text-sm border rounded-lg mx-1"
                        >
                            -
                        </button>
                        <div className="bg-gray-600 rounded-lg text-white px-4 py-1 flex items-center">
                            <span className="text-lg">{quantity}</span>
                        </div>
                        <button
                            onClick={handleIncrease}
                            className="w-[3vh] h-[3vh] flex justify-center items-center text-sm border rounded-lg mx-1"
                        >
                            +
                        </button>
                    </div>
                )}
            </div>

            {/* ✅ 품절 여부 */}
            {soldout && <div className="text-red-500 font-semibold">🚨 품절된 메뉴입니다.</div>}

            {/* ✅ 총 가격 & 장바구니 버튼 */}
            {!soldout && (
                <div className="sticky bottom-0 left-0 w-full bg-white p-4 border-t border-gray-300 flex items-center justify-between"
                    style={{ zIndex: 10 }}>
                    <div className="text-lg font-semibold">총 가격: {totalPrice}원</div>
                    <button
                        onClick={handleAddToCart}
                        className="w-[10vh] h-[4vh] flex items-center justify-center text-sm text-white bg-[#F78A16] rounded-lg"
                    >
                        담기
                    </button>
                </div>
            )}
        </div>
    );
}

export default MenuDetail;
