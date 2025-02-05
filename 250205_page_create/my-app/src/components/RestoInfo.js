import React from "react";

// address, lat, lon, description, businessHours, closedDays, originCountry, tel
function RestoInfo() {
    const address = '역삼역'
    const businessHours = '18:00 ~ 04:00'
    const closedDays = ['화요일, 수요일']
    const tel = '02-1234-1234'
    const originCountry = {'닭' : '브라질산', '김치' : '중국산'}

    return(
    <div>
        <p>주소 : {address} </p>
        <p>운영시간 : {businessHours} </p>
        <p>휴무일 : {closedDays} </p>
        <p>전화번호 : {tel} </p>
        <p>원산지 표기</p> 
        <ul>
        {Object.entries(originCountry).map(([key, value]) => (
            <li key={key}>
                {key} : {value}
            </li>
        ))}
        </ul>
    </div>
    );
}

export default RestoInfo;