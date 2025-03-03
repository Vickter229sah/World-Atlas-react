import { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you with your travel plans?", fromBot: true },
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  // API Keys
  const huggingFaceApiKey = "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"; // Hugging Face API Key
  const modelID = "facebook/blenderbot-400M-distill"; // Model ID for Hugging Face
  const unsplashApiKey = "rX5YMZeK1z30Mk_zpz9_7ZwGYyQ26DOv20XKsySvkbs"; // Unsplash Access Key

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    // Add the user's message to the chat
    const newMessages = [...messages, { text: userInput, fromBot: false }];
    setMessages(newMessages);
    setUserInput("");
    setLoading(true);

    try {
      // Concatenate previous messages for context (for Hugging Face)
      const conversationHistory = messages
        .map((msg) => `${msg.fromBot ? "Bot" : "User"}: ${msg.text}`)
        .join("\n");

      // Call Hugging Face API
      const response = await axios.post(
        `https://api-inference.huggingface.co/models/${modelID}`,
        { inputs: `${conversationHistory}\nUser: ${userInput}\nBot:` },
        {
          headers: {
            Authorization: `Bearer ${huggingFaceApiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Get the bot's message from Hugging Face API response
      const botMessage =
        response.data[0]?.generated_text || "I couldn't understand that.";

      // Fetch an image from Unsplash based on the user input (Fixed)
      const unsplashResponse = await axios.get(
        `https://api.unsplash.com/search/photos?query=${userInput}&client_id=${unsplashApiKey}&per_page=1`
      );

      const imageUrl = unsplashResponse.data.results[0]?.urls?.small || "";

      // Update the chat with both the bot's response and an image (if any)
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botMessage, fromBot: true, image: imageUrl },
      ]);
    } catch (error) {
      console.error("Error:", error);

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Sorry, something went wrong. Please try again.", fromBot: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <h1 className="worldatlas-title">🌍 Welcome to WorldAtlas</h1>
      <p className="worldatlas-subtitle">Explore countries, weather, and more!</p>
      <div className="chatbot-header">✈️ Travel Assistant</div>

      <div className="chatbot-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.fromBot ? "bot-message" : "user-message"}`}>
            <p>{msg.text}</p>
            {msg.image && <img src={msg.image} alt="Travel" className="chatbot-image" />}
          </div>
        ))}
        {loading && <div className="message bot-message">Typing...</div>}
      </div>

      <div className="chatbot-input">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask me something about travel..."
        />
        <button onClick={handleSendMessage} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
