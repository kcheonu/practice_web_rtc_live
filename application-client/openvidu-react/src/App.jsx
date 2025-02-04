// 필요한 모듈 및 컴포넌트 import
import { Room, RoomEvent } from "livekit-client"; // LiveKit 라이브러리에서 Room과 이벤트 가져오기
import "./App.css";
import { useState } from "react"; // React의 useState 사용
import VideoComponent from "./components/VideoComponent"; // 비디오 컴포넌트
import AudioComponent from "./components/AudioComponent"; // 오디오 컴포넌트
import ChatComponent from "./components/ChatComponent"; // 채팅 컴포넌트
import OrderListComponent from "./components/OrderListComponent"; // 주문 목록 컴포넌트
import MenuDetailComponent from "./components/MenuDetailComponent";


// fontAwesome 아이콘 추가
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCartShopping } from "@fortawesome/free-solid-svg-icons"; // 필요한 아이콘 추가

// LiveKit 서버 또는 OpenVidu 서버의 기본 URL 설정
let APPLICATION_SERVER_URL = "";
let LIVEKIT_URL = "";

// 서버 URL을 환경에 맞게 자동 설정
configureUrls();

function configureUrls() {
    if (!APPLICATION_SERVER_URL) {
        if (window.location.hostname === "localhost") {
            APPLICATION_SERVER_URL = "http://localhost:6080/"; // 로컬 환경이면 로컬 서버 사용
        } else {
            APPLICATION_SERVER_URL = "https://" + window.location.hostname + ":6443/"; // 배포된 서버에서는 HTTPS 사용
        }
    }

    if (!LIVEKIT_URL) {
        if (window.location.hostname === "localhost") {
            LIVEKIT_URL = "ws://localhost:7880/"; // 로컬 WebSocket 서버 사용
        } else {
            LIVEKIT_URL = "wss://" + window.location.hostname + ":7443/"; // 배포된 서버에서는 보안 WebSocket 사용
        }
    }
}

function App() {
    // LiveKit의 Room 객체 상태 관리
    const [room, setRoom] = useState(undefined); // 현재 접속한 방 상태
    const [localTrack, setLocalTrack] = useState(undefined); // 로컬 비디오 트랙 상태
    const [remoteTracks, setRemoteTracks] = useState([]); // 원격 사용자의 비디오 및 오디오 트랙 저장

    // 참가자 정보 및 방 이름 상태
    const [participantName, setParticipantName] = useState("Participant" + Math.floor(Math.random() * 100)); // 참가자 이름을 랜덤하게 생성
    const [roomName, setRoomName] = useState("Test Room"); // 기본 방 이름 설정

    /**
     * ✅ 방에 참여하는 함수
     * 1. 새로운 LiveKit Room 객체 생성
     * 2. Room 이벤트 리스너 등록 (트랙이 추가/제거될 때 상태 업데이트)
     * 3. 방에 연결하고 비디오 및 마이크 활성화
     */
    async function joinRoom() {
        const room = new Room(); // 새로운 Room 객체 생성
        setRoom(room); // Room 상태 업데이트

        // 트랙이 구독(추가)될 때 실행되는 이벤트 리스너
        room.on(RoomEvent.TrackSubscribed, (_track, publication, participant) => {
            setRemoteTracks((prev) => [
                ...prev,
                { trackPublication: publication, participantIdentity: participant.identity }
            ]);
        });

        // 트랙이 구독 해제(삭제)될 때 실행되는 이벤트 리스너
        room.on(RoomEvent.TrackUnsubscribed, (_track, publication) => {
            setRemoteTracks((prev) => prev.filter((track) => track.trackPublication.trackSid !== publication.trackSid));
        });

        try {
            // 서버에서 방에 입장할 수 있는 토큰을 가져옴
            const token = await getToken(roomName, participantName);

            // LiveKit 서버에 연결
            await room.connect(LIVEKIT_URL, token);

            // 로컬 사용자의 카메라 및 마이크 활성화
            await room.localParticipant.enableCameraAndMicrophone();

            // 로컬 비디오 트랙을 상태에 저장
            setLocalTrack(room.localParticipant.videoTrackPublications.values().next().value.videoTrack);
        } catch (error) {
            console.log("There was an error connecting to the room:", error.message);
            await leaveRoom(); // 에러 발생 시 방 나가기
        }
    }

    /**
     * ✅ 방 나가기 함수
     * 1. 현재 참가자가 속한 Room 연결 해제
     * 2. 모든 상태 초기화
     */
    async function leaveRoom() {
        if (room) {
            await room.disconnect(); // 방 연결 해제
        }
        setRoom(undefined); // Room 상태 초기화
        setLocalTrack(undefined); // 로컬 트랙 초기화
        setRemoteTracks([]); // 원격 트랙 목록 초기화
    }

    /**
     * ✅ LiveKit 토큰 가져오기
     * 1. 서버에서 요청을 받아, 해당 방에 대한 접근을 허용하는 토큰을 가져옴
     */
    async function getToken(roomName, participantName) {
        const response = await fetch(APPLICATION_SERVER_URL + "token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                roomName: roomName,
                participantName: participantName
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Failed to get token: ${error.errorMessage}`);
        }

        const data = await response.json();
        return data.token; // 서버에서 받은 토큰 반환
    }

    /**
     * ✅ 캡처된 비디오 프레임을 서버로 전송
     */
    const sendThumbnailToServer = async (frameData) => {
        try {
            const response = await fetch("http://your-server-url/api/upload-thumbnail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ thumbnail: frameData }),
            });

            if (response.ok) {
                console.log("Thumbnail successfully uploaded!");
            } else {
                console.error("Failed to upload thumbnail:", response.statusText);
            }
        } catch (error) {
            console.error("Error uploading thumbnail:", error);
        }
    };

    /**
     * ✅ `VideoComponent`로부터 캡처된 썸네일 데이터를 처리
     */
    const handleCaptureFrame = (frameData) => {
        console.log("Captured Frame Data:", frameData);
        sendThumbnailToServer(frameData);
    };

    return (
        <>
            {/* ✅ 방에 입장하지 않은 경우, Join Form 렌더링 */}
            {!room ? (
                <div id="join">
                    <div id="join-dialog">
                        <h2>Join a Video Room</h2>
                        
                        
                        <form
                            onSubmit={(e) => {
                                joinRoom();
                                e.preventDefault(); // 기본 제출 방지
                            }}
                        >
                            <div>
                                <label htmlFor="participant-name">Participant</label>
                                <input
                                    id="participant-name"
                                    className="form-control"
                                    type="text"
                                    value={participantName}
                                    onChange={(e) => setParticipantName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="room-name">Room</label>
                                <input
                                    id="room-name"
                                    className="form-control"
                                    type="text"
                                    value={roomName}
                                    onChange={(e) => setRoomName(e.target.value)}
                                    required
                                />
                            </div>
                            <button className="btn btn-lg btn-success" type="submit" disabled={!roomName || !participantName}>
                                Join!
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <div id="room">
                    <div id="room-header">
                        <button className="btn bg-white rounded-full text-black" id="leave-room-button" onClick={leaveRoom}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                        <button className="p-2 bg-white rounded-full text-black hover:bg-gray-100" onClick={() => console.log("Go to Cart!")}>
                            <FontAwesomeIcon icon={faCartShopping} />
                        </button>
                    </div>

                    {/* ✅ 비디오 및 오디오 컴포넌트 렌더링 */}
                    <div id="layout-container" className="section">
                        {localTrack && (
                            <VideoComponent
                                track={localTrack}
                                participantIdentity={participantName}
                                local={true}
                                roomName={roomName}
                                onCaptureFrame={handleCaptureFrame} // 캡처 데이터 처리 콜백 전달
                            />
                        )}
                        {remoteTracks.map((remoteTrack) =>
                            remoteTrack.trackPublication.kind === "video" ? (
                                <VideoComponent
                                    key={remoteTrack.trackPublication.trackSid}
                                    track={remoteTrack.trackPublication.videoTrack}
                                    participantIdentity={remoteTrack.participantIdentity}
                                    roomName={roomName}
                                />
                            ) : (
                                <AudioComponent key={remoteTrack.trackPublication.trackSid} track={remoteTrack.trackPublication.audioTrack} />
                            )
                        )}
                    </div>

                    {/* ✅ 추가 기능 (채팅 및 주문 목록) */}
                    <div id="layout-container" className="section order-section">
                        <OrderListComponent />
                    </div>

                    <div id="layout-container" className="section chat-section">
                        <ChatComponent participantName={participantName} />
                    </div>
                    {/* <div id="layout-container" className="section menu-detail-section"> */}
                        {/* <MenuDetailComponent /> */}
                    {/* </div> */}
                </div>
            )}
        </>
    );
}

export default App;
