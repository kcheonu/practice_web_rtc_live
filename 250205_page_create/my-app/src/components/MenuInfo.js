import React from "react";
// {/* resaurant_id, id? */}
// "id": 1,
// "menuCategoryId": 1,
// "name": "불고기",
// "price": 15000,
// "menuPhoto": "image_url",
// "soldout": false
function MenuInfo() {
    // const soldout = false
    const menuPhoto = "image_url"
    const price = '15000'
    const name = '불고기'

    return(
        <div className="bg-white text-black border border-black rounded-lg">
            <div className="flex items-center justify-between">
                <p>{menuPhoto}</p>
                <div>
                    <p>{name}</p>
                    <p>$ {price}</p>
                </div>
            </div>
        </div>
    );
}

export default MenuInfo;