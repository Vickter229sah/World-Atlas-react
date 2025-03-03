import { useState } from "react";
import Chatbot from "./Chatbot"; // Import your existing Chatbot component

const ChatbotButton = () => {
  const [showChat, setShowChat] = useState(false);

  const toggleChatWindow = () => {
    setShowChat(!showChat);
  };

  return (
    <div>
      {/* Chatbot Button */}
      <div className="chatbot-button" onClick={toggleChatWindow}>
        💬
      </div>

      {/* Conditionally show the Chatbot when clicked */}
      {showChat && <Chatbot />}
    </div>
  );
};

export default ChatbotButton;
