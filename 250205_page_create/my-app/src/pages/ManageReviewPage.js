import React from "react";
import ManageReview from "../components/ManageReview"; // ManageReview 컴포넌트를 import

function ManageReviewPage() {
    return (
        <div>
            <div className="w-full h-[8vh]">
                Header
            </div>
            
            {/* ManageReview 컴포넌트를 호출하여 렌더링 */}
            <div>
                <ManageReview />
            </div>
        </div>
    );
}

export default ManageReviewPage;
