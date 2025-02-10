import React from "react";
import StreamingView from "../components/StreamingView";
import ChatRoom from "../components/ChatRoom";
import ManageOrder from "../components/ManageOrder";

function ManageOrderandStreamingPage() {
    return (
        <div className="flex min-h-screen">
            {/* 주문 관리 */}
            <div className="w-2/3 h-full bg-gray-100 p-4 overflow-y-auto flex flex-col">
                <ManageOrder />
            </div>

            {/* 방송 및 채팅 */}
            <div className="w-1/3 flex flex-col bg-white">
                {/* Streaming Section */}
                <div className="flex-1 flex items-center justify-center overflow-hidden border-b border-gray-300">
                    <StreamingView />
                </div>
                {/* Chat Room Section */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    <ChatRoom />
                </div>
            </div>
        </div>
    );
}

export default ManageOrderandStreamingPage;
