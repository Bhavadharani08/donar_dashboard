import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "bot",
      text: "Hello Test User! 👋 I'm your Blood Donation Eligibility Assistant. Shall we begin?"
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [waitingForInput, setWaitingForInput] = useState(null);
  const [eligibilityData, setEligibilityData] = useState({});
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const addMessage = (sender, text) => {
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), sender, text }
    ]);
  };

  const checkEligibility = () => {
    setEligibilityData({});
    setWaitingForInput("weight");
    addMessage("bot", "Let's check your eligibility for blood donation. Please enter your weight in kg:");
  };

  const handleEligibilityInput = (value) => {
    if (waitingForInput === "weight") {
      const weight = parseFloat(value);
      if (isNaN(weight) || weight <= 0) {
        addMessage("bot", "Please enter a valid weight in kg:");
        return;
      }
      
      addMessage("user", `${weight} kg`);
      setEligibilityData(prev => ({ ...prev, weight }));
      setWaitingForInput("age");
      addMessage("bot", "Now, please enter your age:");
      
    } else if (waitingForInput === "age") {
      const age = parseInt(value);
      if (isNaN(age) || age <= 0) {
        addMessage("bot", "Please enter a valid age:");
        return;
      }
      
      addMessage("user", `${age} years old`);
      const updatedData = { ...eligibilityData, age };
      setEligibilityData(updatedData);
      setWaitingForInput(null);
      
      // Check eligibility
      if (updatedData.weight >= 50 && updatedData.age >= 18 && updatedData.age <= 60) {
        addMessage("bot", "✅ You are eligible to donate blood!");
      } else if (updatedData.weight < 50) {
        addMessage("bot", "❌ You need to weigh at least 50kg to safely donate blood.");
      } else if (updatedData.age < 18) {
        addMessage("bot", "❌ You must be at least 18 years old to donate.");
      } else if (updatedData.age > 60) {
        addMessage("bot", "⚠️ Donations after age 60 require special approval.");
      }
    }
  };

  const fetchTips = async (type) => {
    setLoading(true);
    try {
      let endpoint = "";
      if (type === "preparation") {
        endpoint = "/api/preparation-tips";
      } else if (type === "post") {
        endpoint = "/api/post-care";
      } else {
        throw new Error("Invalid tip type");
      }

      const res = await fetch(endpoint, { method: "POST" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      addMessage("bot", data.reply || "Sorry, I couldn't fetch tips.");
    } catch (err) {
      console.error(err);
      addMessage("bot", `❌ Failed to fetch ${type} tips.`);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuClick = (option) => {
    if (waitingForInput) return;
    
    addMessage("user", option);
    if (option === "Start Eligibility Check") {
      checkEligibility();
    } else if (option === "Preparation Tips") {
      fetchTips("preparation");
    } else if (option === "Post-Donation Care") {
      fetchTips("post");
    }
  };

  const handleInputSubmit = () => {
    const value = inputValue.trim();
    if (!value) return;
    
    if (waitingForInput) {
      handleEligibilityInput(value);
    } else {
      // Handle general chat input
      addMessage("user", value);
      addMessage("bot", "I'm here to help with blood donation queries. You can use the menu buttons above or ask me anything about blood donation!");
    }
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleInputSubmit();
    }
  };

  const getPlaceholder = () => {
    if (waitingForInput === "weight") return "Enter your weight in kg...";
    if (waitingForInput === "age") return "Enter your age...";
    return "Type your message...";
  };

  return (
    <div className="chatbot-page">
      <div className="chatbot-container">
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-left">
            <div className="bot-avatar">
              🤖
            </div>
            <div className="chatbot-info">
              <h3>BloodLink Assistant</h3>
              <p className="status">Online</p>
            </div>
          </div>
          <button className="close-button">×</button>
        </div>

        {/* Menu Buttons - Moved to top */}
        <div className="chatbot-menu-top">
          <button 
            onClick={() => handleMenuClick("Start Eligibility Check")}
            disabled={waitingForInput}
            className="menu-button primary"
          >
            Start Eligibility Check
          </button>
          <div className="menu-row">
            <button 
              onClick={() => handleMenuClick("Preparation Tips")}
              disabled={waitingForInput}
              className="menu-button secondary"
            >
              Preparation Tips
            </button>
            <button 
              onClick={() => handleMenuClick("Post-Donation Care")}
              disabled={waitingForInput}
              className="menu-button secondary"
            >
              Post-Donation Care
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.sender}`}>
              <div className="message-content">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))}
          {loading && (
            <div className="message bot">
              <div className="message-content">⏳ Loading...</div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input - Always visible */}
        <div className="chatbot-input">
          <div className="input-container">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={getPlaceholder()}
              className="input-field"
            />
            <button onClick={handleInputSubmit} className="send-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
          <p className="input-hint">Press Enter to send</p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;