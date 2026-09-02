import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatComposer from "../components/ChatComposer";
import ChatHeader from "../components/ChatHeader";
import ChatMessageList from "../components/ChatMessageList";
import { useAuth } from "../context/AuthContext";
import { useMessages } from "../context/MessageContext";


const ChatPage = () => {
  const navigate = useNavigate();
  const { user, logout, authLoading } = useAuth();
  const {
    messages,
    totalMessages,
    totalUsers,
    joinMessage,
    sendMessage,
  } = useMessages();
  const [input, setInput] = useState("");

  if (authLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-gray-900 text-gray-100">
        Loading chat...
      </div>
    );
  }

  const currentUser = user || null;

  const handleSend = async() => {
    const trimmed = input.trim();
    if (!trimmed) return;
    sendMessage(currentUser._id, trimmed);
    setInput("");
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-900 text-gray-100">
      <ChatHeader
        user={currentUser}
        messageCount={totalMessages}
        userCount={totalUsers}
        onLogout={handleLogout}
      />

      <main className="flex min-h-0 flex-1 flex-col overflow-hidden bg-gray-900">
        {joinMessage && (
          <div className="border-b border-gray-700 bg-gray-800 px-4 py-2 text-center text-xs font-medium text-gray-200">
            {joinMessage}
          </div>
        )}

        <ChatMessageList messages={messages} currentUser={currentUser} />

        <ChatComposer
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onSend={handleSend}
        />
      </main>
    </div>
  );
};

export default ChatPage;
