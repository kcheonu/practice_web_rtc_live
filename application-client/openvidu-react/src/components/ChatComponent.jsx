import { useState, useRef, useEffect } from "react";

function ChatComponent({ participantName }) {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const chatEndRef = useRef(null);

    // ✅ 시스템 메시지는 컴포넌트 처음 렌더링 시 추가
    useEffect(() => {
        setMessages([{ user: "시스템", text: "가게 소개글" }]);
    }, []);

    // 채팅창 자동 스크롤
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // 메시지 전송
    const sendMessage = (e) => {
        e.preventDefault();
        if (inputMessage.trim() !== "") {
            setMessages((prevMessages) => [
                ...prevMessages,
                { user: participantName, text: inputMessage }
            ]);
            setInputMessage("");
        }
    };

    return (
        <div className="bg-gray-100 rounded-lg shadow-md">
            {/* 채팅 메시지 목록 */}
            <div className="overflow-y-auto h-64 mb-2">
                {messages.map((msg, index) => (
                    <p
                        key={index}
                        className={`text-sm ${
                            msg.user === "시스템"
                                ? "font-bold text-red-500" // 시스템 메시지 스타일
                                : "text-gray-800"
                        }`}
                    >
                        <strong>{msg.user}:</strong> {msg.text}
                    </p>
                ))}
                <div ref={chatEndRef}></div>
            </div>

            {/* 입력 폼 */}
            <form onSubmit={sendMessage} className="flex">
                <input
                    type="text"
                    placeholder="채팅을 입력하세요"
                    className="flex-grow border border-gray-300 rounded-lg p-2 text-sm"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                />
                <button
                    type="submit"
                    className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"
                >
                    전송
                </button>
            </form>
        </div>
    );
}

export default ChatComponent;
