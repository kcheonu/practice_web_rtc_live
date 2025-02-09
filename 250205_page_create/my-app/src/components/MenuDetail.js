import React, { useState } from "react";

function MenuDetail() {
    
    const Menu = [
        {
            id: 1,
            menuCategoryId: 1,
            name: '불고기',
            price: 15000,
            menuPhoto: "image-url",
            soldout: false
            
        }
    ];

    const [quantity, setQuantity] = useState(1); // 수량 상태
    const [totalPrice, setTotalPrice] = useState(Menu[0].price); // 총 가격 상태
    const handleAddToCart = () => {
        alert(`장바구니에 추가되었습니다!`);
        console.log(`✅ 버튼 클릭됨! (담기!!) 수량: ${quantity}, 총 가격: ${totalPrice}`);
    };
    
    const handleIncrease = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        setTotalPrice(newQuantity * Menu[0].price);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            setTotalPrice(newQuantity * Menu[0].price);
        }
    };
    return (
        <div className="p-4 bg-white border border-gray rounded-lg">
            
            <div className="flex items-center justify-between">
                <div className="text-lg font-bold mb-2">{Menu[0].name} {Menu[0].price}원</div>
                {/* <div className="mb-4">$</div> */}
                
                <div className="flex items-center mb-4">
                    <button
                        onClick={handleDecrease}
                        className="w-[3vh] h-[3vh] flex justify-center items-center text-sm border rounded-lg mx-1"
                    >
                        -
                    </button>
                    <div className="bg-gray-600 rounded-lg text-white">
                        <span className="text-lg mx-2">{quantity}</span>
                    </div>
                    <button
                        onClick={handleIncrease}
                        className="w-[3vh] h-[3vh] flex justify-center items-center text-sm border rounded-lg mx-1"
                    >
                        +
                    </button>
                </div>
            </div>
            <div
                className="sticky bottom-0 left-0 w-full bg-white p-4 border-t border-gray-300 flex items-center justify-between"
                style={{ zIndex: 10 }}
            >
                <div className="text-lg font-semibold">총 가격: {totalPrice}원</div>
                <button
                    onClick={handleAddToCart}
                    className="flex w-[10vh] h-[4vh] items-center justify-center text-sm text-white cursor-pointer bg-[#F78A16] rounded-lg"
                >
                    담기
                </button>
            </div>
        </div>
    );
}

export default MenuDetail;