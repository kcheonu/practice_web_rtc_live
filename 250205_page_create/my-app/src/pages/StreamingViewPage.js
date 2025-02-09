import React from "react";
import ChatRoom from "../components/ChatRoom";
import OrderList from "../components/OrderList";
import StreamingView from "../components/StreamingView";
import Layout from "../components/layout/Layout";

function StreamingViewPage({ room, localTrack, remoteTracks, leaveRoom, participantName, roomName, handleCaptureFrame }) {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="w-full h-[8vh]">
                <Layout />
            </div>
            <div>
                <div className="w-[50vh] h-[50vh]">
                    <StreamingView />
                </div>
                <div>
                    <OrderList />
                </div>
                <div>
                    {/* 통로 제공해줄것, 방송입장 시점부터 채팅 시작 100개 넘어가면 앞에서부터 삭제(큐 구현) */}
                    <ChatRoom /> 
                </div>
            </div>
        </div>
    );
}

export default StreamingViewPage;
