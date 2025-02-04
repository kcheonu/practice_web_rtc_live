import { useEffect, useRef } from "react";

function VideoComponent({ track, participantIdentity, local = false, roomName, onCaptureFrame }) {
    const videoElement = useRef(null);

    useEffect(() => {
        if (videoElement.current) {
            track.attach(videoElement.current);
        }

        return () => {
            track.detach();
        };
    }, [track]);

    /**
     * ✅ 비디오 프레임을 캡처하고 부모로 전달
     */
    const captureFrame = () => {
        if (!videoElement.current) return;

        // Canvas 생성 및 비디오 프레임 캡처
        const canvas = document.createElement("canvas");
        canvas.width = videoElement.current.videoWidth;
        canvas.height = videoElement.current.videoHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(videoElement.current, 0, 0, canvas.width, canvas.height);

        // 캡처된 프레임을 base64 형식으로 변환
        const frameData = canvas.toDataURL("image/jpeg", 0.8);

        // 부모 컴포넌트로 전달
        if (onCaptureFrame) {
            onCaptureFrame(frameData);
        }
    };

    useEffect(() => {
        // 30초마다 캡처 실행
        const interval = setInterval(() => {
            captureFrame();
        }, 30000); // 30초

        return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
    }, []);

    // 로컬에 다운받아서 썸네일 이미지 확인용용
    // /**
    //  * ✅ 비디오 프레임을 캡처하고 저장
    //  */
    // const captureFrame = () => {
    //     if (!videoElement.current) return;

    //     // Canvas 생성 및 비디오 프레임 캡처
    //     const canvas = document.createElement("canvas");
    //     canvas.width = videoElement.current.videoWidth;
    //     canvas.height = videoElement.current.videoHeight;

    //     const ctx = canvas.getContext("2d");
    //     ctx.drawImage(videoElement.current, 0, 0, canvas.width, canvas.height);

    //     // 캡처된 프레임을 base64 형식으로 변환
    //     const frameData = canvas.toDataURL("image/jpeg", 0.8);

    //     // 부모 컴포넌트로 전달 (선택 사항)
    //     if (onCaptureFrame) {
    //         onCaptureFrame(frameData);
    //     }

    //     // ✅ 캡처된 이미지 다운로드 기능 추가
    //     saveThumbnail(frameData);
    // };

    // /**
    //  * ✅ 로컬 바탕화면에 썸네일 저장 (자동 다운로드)
    //  */
    // const saveThumbnail = (dataUrl) => {
    //     const link = document.createElement("a");
    //     link.href = dataUrl;
    //     link.download = `thumbnail_${new Date().toISOString()}.jpg`; // 파일명 자동 생성
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // };

    // useEffect(() => {
    //     // 30초마다 캡처 실행
    //     const interval = setInterval(() => {
    //         captureFrame();
    //     }, 30000); // 30초

    //     return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
    // }, []);


    return (
        <div id={"camera-" + participantIdentity} className="relative w-full h-auto">
            {/* 참가자 이름 및 방 이름 */}
            <p className="absolute top-2 left-2 bg-transparent text-black px-3 py-1 rounded-md text-sm font-bold z-10">
                {participantIdentity} {local ? " (RestaurantName)" : ""}
            </p>
    
            {/* 비디오 태그 */}
            <video
                ref={videoElement}
                id={track.sid ? track.sid.toString() : undefined}
                className="w-full h-auto object-cover rounded-md"
                autoPlay
                playsInline
            ></video>
        </div>
    );
}

export default VideoComponent;