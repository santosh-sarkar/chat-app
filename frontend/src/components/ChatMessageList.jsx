import { useEffect, useRef } from "react";

const ChatMessageList = ({ messages, currentUser }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  if (!messages || messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center px-6 py-5 text-center text-gray-400">
        <div>
          <p className="text-lg font-medium text-gray-200">No messages yet</p>
          <p className="mt-1 text-sm">Start the conversation with a message.</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex-1 space-y-3 overflow-y-auto px-6 py-5">
      {messages.map((message) => {
        const sender = typeof message.sender === "object" ? message.sender : null;
        const senderId = sender ? sender._id : message.sender;
        const isMine =
          currentUser && senderId && String(senderId) === String(currentUser._id);

        return (
          <div
            key={message._id}
            className={`max-w-[75%] rounded-xl px-4 py-3 ${
              isMine ? "ml-auto bg-gray-700" : "bg-gray-800 text-gray-100"
            }`}
          >
            <span className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-gray-300">
              {isMine ? "You" : sender?.name || "User"}
            </span>

            <p className="whitespace-pre-wrap wrap-break-word text-sm">
              {message.message}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessageList;
