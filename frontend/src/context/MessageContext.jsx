import { createContext, useContext, useEffect, useState } from "react";
import socket from "../services/socket";
import api from "../services/api";
import { useAuth } from "./AuthContext";


const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [totalMessages, setTotalMessages] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [systemMessage, setSystemMessage] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if(!user) return;
    const getMessages = async () => {
      try {
        const [messagesRes, statsRes] = await Promise.all([
          api.get("/messages"),
          api.get("/messages/stats"),
        ]);

        setMessages(messagesRes.data?.messages || []);
        setTotalMessages(statsRes.data.totalMessages);
        setTotalUsers(statsRes.data.totalUsers);
      } catch (error) {
        console.log(error);
      }
    };

    getMessages();
  }, [user]);

  useEffect(() => {
    const handleNewMessage = (message) => {
      setMessages((prev) => [...prev, message]);
      setTotalMessages((prev) => prev + 1);
    };

    const handleUserJoin = (user) => {
      setSystemMessage(`${user.name} joined the chat`);

      const timer = setTimeout(() => {
        setSystemMessage("");
      }, 2500);

      return () => clearTimeout(timer);
    };



    socket.on("message", handleNewMessage);
    socket.on("user_join", handleUserJoin);

    return () => {
      socket.off("message", handleNewMessage);
      socket.off("user_join", handleUserJoin);
    };
  }, []);

  const sendMessage = (senderId, message) => {
    socket.emit("send_message", {
      senderId,
      message,
    });
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        totalMessages,
        totalUsers,
        systemMessage,
        sendMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => useContext(MessageContext);