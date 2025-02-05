import React from "react";
import ChatRoom from "../components/ChatRoom";
import OrderList from "../components/OrderList";
import StreamingView from "../components/StreamingView";

function StreamingViewPage({ room, localTrack, remoteTracks, leaveRoom, participantName, roomName, handleCaptureFrame }) {
    return (
        <div>
        <StreamingView />
        <OrderList />
        <ChatRoom />
        </div>
    );
}

export default StreamingViewPage;
