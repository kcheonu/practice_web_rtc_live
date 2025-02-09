import React from "react";
import { useNavigate } from "react-router-dom";
// restaurantid로 가게에 존재하는 메뉴들 조회
// {/* resaurant_id, id? */}
// "id": 1,
// "menuCategoryId": 1,
// "name": "불고기",
// "price": 15000,
// "menuPhoto": "image_url",
// "soldout": false
function MenuInfo() {
    // const soldout = false
    const navigate = useNavigate()
    const menuData = [
        {
            id: 1,
            menuCategoryId: 1,
            name: "불고기",
            price: 15000,
            menuPhoto: "https://via.placeholder.com/150",
            soldout: false,
        },
        {
            id: 2,
            menuCategoryId: 2,
            name: "비빔밥",
            price: 12000,
            menuPhoto: "https://via.placeholder.com/150",
            soldout: true,
        },
        {
            id: 3,
            menuCategoryId: 3,
            name: "돼지갈비",
            price: 17000,
            menuPhoto: "https://via.placeholder.com/150",
            soldout: false,
        },
    ];

    const handleMenuClick = (id) => {
        navigate('/menu-detail/${id)');
    };

    return(
        <div className="bg-gray-100 p-4 grid grid-cols-1 gap-4">
            {menuData.map((menu) => (
                <div
                    key={menu.id}
                    onClick={() => handleMenuClick(menu.id)}
                    className="bg-white text-black border border-gray-300 rounded-lg p-4 flex items-center cursor-pointer hover:shadow-lg transition"
                >
                    <img
                        src={menu.menuPhoto}
                        alt={menu.name}
                        className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="ml-auto">
                        <p className={`text-lg font-semibold ${menu.soldout ? "text-gray-400" : ""}`}>
                            {menu.name} {menu.soldout && "(품절)"}
                        </p>
                        <p className="text-gray-500">$ {menu.price.toLocaleString()}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MenuInfo;