import React from "react";

function RestoInfo({ address, businessHours, closedDays, tel, originCountry }) {
    return (
        <div className="p-4 border border-gray-300 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">가게 정보</h2>
            <p><strong>주소:</strong> {address || "정보 없음"}</p>
            <p><strong>운영시간:</strong> {businessHours || "정보 없음"}</p>

            {/* closedDays가 배열인지 확인하고, 배열이면 join 사용, 아니면 그대로 출력 */}
            <p>
                <strong>휴무일:</strong>{" "}
                {Array.isArray(closedDays) ? closedDays.join(", ") : closedDays || "정보 없음"}
            </p>

            <p><strong>전화번호:</strong> {tel || "정보 없음"}</p>

            {/* 원산지 표기 */}
            <div className="mt-2">
                <h3 className="text-md font-semibold">원산지 표기</h3>
                {originCountry && Object.keys(originCountry).length > 0 ? (
                    <ul className="list-disc pl-4">
                        {Object.entries(originCountry).map(([key, value]) => (
                            <li key={key}>
                                <strong>{key}</strong>: {value}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>정보 없음</p>
                )}
            </div>
        </div>
    );
}

export default RestoInfo;
