// import "./ChatComponent.css";
// import { useState, useRef, useEffect } from "react";

// function ChatComponent({ participantName }) {
//     const [messages, setMessages] = useState([{ user: "시스템", text: "가게 소개글" }]);
//     const [inputMessage, setInputMessage] = useState("");
//     const chatEndRef = useRef(null);
//     const chatContainerRef = useRef(null);

//     useEffect(() => {
//         if (chatContainerRef.current) {
//             chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//         }
//     }, [messages]);

//     const sendMessage = (e) => {
//         e.preventDefault();
//         if (inputMessage.trim() !== "") {
//             setMessages((prevMessages) => [
//                 prevMessages[0],
//                 ...prevMessages.slice(1).slice(-8),
//                 { user: participantName, text: inputMessage }
//             ]);
//             setInputMessage("");
//         }
//     };

//     return (
//         <div className="chat-section section bg-gray-400 p-1 rounded-lg">
//             <p className="text-md font-bold">채팅</p>
//             <div className="mb-1 bg-gray-400 text-[#F78A16] font-semibold p-1 rounded-lg text-center">
//                 <strong>{messages[0].user}:</strong> {messages[0].text}
//             </div>
//             <div 
//                 className="overflow-y-auto h-48 mt-1 border border-gray-400 p-1 rounded-lg text-xs leading-tight bg-gray-400"
//                 ref={chatContainerRef}
//             >
//                 {messages.slice(1).slice(-9).map((msg, index) => (
//                     <p key={index} className="mb-0.5 bg-gray-400 text-black p-1 rounded-lg">
//                         <strong>{msg.user}:</strong> {msg.text}
//                     </p>
//                 ))}
//                 <div ref={chatEndRef}></div>
//             </div>
//             <form onSubmit={sendMessage} className="mt-1">
//                 <input
//                     type="text"
//                     placeholder="채팅을 입력하세요"
//                     className="w-full p-1 rounded-lg text-black border border-black text-xs"
//                     value={inputMessage}
//                     onChange={(e) => setInputMessage(e.target.value)}
//                 />
//             </form>
//         </div>
//     );
// }

// export default ChatComponent;


// // App.jsx
// import {
//     LocalVideoTrack,
//     RemoteParticipant,
//     RemoteTrack,
//     RemoteTrackPublication,
//     Room,
//     RoomEvent
// } from "livekit-client";
// import "./App.css";
// import { useState } from "react";
// import VideoComponent from "./components/VideoComponent";
// import AudioComponent from "./components/AudioComponent";
// import ChatComponent from "./components/ChatComponent";

// let APPLICATION_SERVER_URL = "";
// let LIVEKIT_URL = "";
// configureUrls();

// function configureUrls() {
//     if (!APPLICATION_SERVER_URL) {
//         if (window.location.hostname === "localhost") {
//             APPLICATION_SERVER_URL = "http://localhost:6080/";
//         } else {
//             APPLICATION_SERVER_URL = "https://" + window.location.hostname + ":6443/";
//         }
//     }

//     if (!LIVEKIT_URL) {
//         if (window.location.hostname === "localhost") {
//             LIVEKIT_URL = "ws://localhost:7880/";
//         } else {
//             LIVEKIT_URL = "wss://" + window.location.hostname + ":7443/";
//         }
//     }
// }

// function App() {
//     const [room, setRoom] = useState(undefined);
//     const [localTrack, setLocalTrack] = useState(undefined);
//     const [remoteTracks, setRemoteTracks] = useState([]);
//     const [participantName, setParticipantName] = useState("Participant" + Math.floor(Math.random() * 100));
//     const [roomName, setRoomName] = useState("Test Room");
//     const [isHost, setIsHost] = useState(false);

//     async function joinRoom() {
//         const room = new Room();
//         setRoom(room);

//         room.on(RoomEvent.TrackSubscribed, (_track, publication, participant) => {
//             setRemoteTracks((prev) => [
//                 ...prev,
//                 { trackPublication: publication, participantIdentity: participant.identity }
//             ]);
//         });

//         room.on(RoomEvent.TrackUnsubscribed, (_track, publication) => {
//             setRemoteTracks((prev) => prev.filter((track) => track.trackPublication.trackSid !== publication.trackSid));
//         });

//         try {
//             const token = await getToken(roomName, participantName);
//             await room.connect(LIVEKIT_URL, token);

//             if (participantName === "Host") {
//                 setIsHost(true);
//                 await room.localParticipant.enableCameraAndMicrophone();
//                 setLocalTrack(room.localParticipant.videoTrackPublications.values().next().value.videoTrack);
//             }
//         } catch (error) {
//             console.log("There was an error connecting to the room:", error.message);
//             await leaveRoom();
//         }
//     }

//     async function leaveRoom() {
//         if (room) {
//             await room.disconnect();
//         }
//         setRoom(undefined);
//         setLocalTrack(undefined);
//         setRemoteTracks([]);
//         setIsHost(false);
//     }

//     async function getToken(roomName, participantName) {
//         const response = await fetch(APPLICATION_SERVER_URL + "token", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 roomName: roomName,
//                 participantName: participantName
//             })
//         });

//         if (!response.ok) {
//             const error = await response.json();
//             throw new Error(`Failed to get token: ${error.errorMessage}`);
//         }

//         const data = await response.json();
//         return data.token;
//     }

//     return (
//         <>
//             {!room ? (
//                 <div id="join">
//                     <div id="join-dialog">
//                         <h2>Join a Video Room</h2>
//                         <form
//                             onSubmit={(e) => {
//                                 joinRoom();
//                                 e.preventDefault();
//                             }}
//                         >
//                             <div>
//                                 <label htmlFor="participant-name">Participant</label>
//                                 <input
//                                     id="participant-name"
//                                     className="form-control"
//                                     type="text"
//                                     value={participantName}
//                                     onChange={(e) => setParticipantName(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="room-name">Room</label>
//                                 <input
//                                     id="room-name"
//                                     className="form-control"
//                                     type="text"
//                                     value={roomName}
//                                     onChange={(e) => setRoomName(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                             <button className="btn btn-lg btn-success" type="submit" disabled={!roomName || !participantName}>
//                                 Join!
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             ) : (
//                 <div id="room">
//                     <div id="room-header">
//                         <h2 id="room-title">{roomName}</h2>
//                         <button className="btn btn-danger" id="leave-room-button" onClick={leaveRoom}>
//                             방송 나가기
//                         </button>
//                     </div>

//                     <div id="layout-container" className="section">
//                         {isHost && localTrack && (
//                             <VideoComponent track={localTrack} participantIdentity={participantName} local={true} />
//                         )}
//                         {remoteTracks.map((remoteTrack) =>
//                             remoteTrack.trackPublication.kind === "video" ? (
//                                 <VideoComponent
//                                     key={remoteTrack.trackPublication.trackSid}
//                                     track={remoteTrack.trackPublication.videoTrack}
//                                     participantIdentity={remoteTrack.participantIdentity}
//                                 />
//                             ) : (
//                                 <AudioComponent
//                                     key={remoteTrack.trackPublication.trackSid}
//                                     track={remoteTrack.trackPublication.audioTrack}
//                                 />
//                             )
//                         )}
//                     </div>

//                     <ChatComponent participantName={participantName} />
//                 </div>
//             )}
//         </>
//     );
// }

// export default App;


// // order
// import "./OrderListComponent.css";

// function OrderListComponent({ orders }) {
//     return (
//         <div className="order-section section">
//             <h3 className="text-lg font-bold">현재 조리중인 주문 목록</h3>
//             <ul className="space-y-2 mt-2">
//                 {orders.map((order, index) => (
//                     <li key={index} className="bg-white p-2 rounded-lg border border-black">
//                         {order.menu} {order.value}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default OrderListComponent;
