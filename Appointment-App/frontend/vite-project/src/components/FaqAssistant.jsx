import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const FaqAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm the HeartCare Assistant. Ask me anything about appointments, payments, or your account." },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleAsk = async () => {
    if (!question.trim()) return;

    const userMessage = { sender: "user", text: question };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8001/api/faq/ask", {
        question: userMessage.text,
      });
      setMessages((prev) => [...prev, { sender: "bot", text: res.data.answer }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAsk();
  };

  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 1000 }}>
      {/* Floating button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            backgroundColor: "#e11d48",
            color: "white",
            border: "none",
            fontSize: "24px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            cursor: "pointer",
          }}
        >
          💬
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div
          style={{
            width: "340px",
            height: "460px",
            backgroundColor: "#fff",
            borderRadius: "16px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            fontFamily: "sans-serif",
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "#e11d48",
              color: "white",
              padding: "14px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: "15px" }}>🩺 HeartCare Assistant</div>
              <div style={{ fontSize: "11px", opacity: 0.85 }}>Ask about appointments & more</div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            style={{
              flex: 1,
              padding: "12px",
              overflowY: "auto",
              backgroundColor: "#f9fafb",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  backgroundColor: msg.sender === "user" ? "#e11d48" : "#ffffff",
                  color: msg.sender === "user" ? "white" : "#111827",
                  padding: "8px 12px",
                  borderRadius: "14px",
                  maxWidth: "80%",
                  fontSize: "13.5px",
                  lineHeight: "1.4",
                  boxShadow: msg.sender === "bot" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                }}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div
                style={{
                  alignSelf: "flex-start",
                  backgroundColor: "#ffffff",
                  padding: "8px 12px",
                  borderRadius: "14px",
                  fontSize: "13.5px",
                  color: "#6b7280",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                Typing...
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{ display: "flex", padding: "10px", borderTop: "1px solid #e5e7eb" }}>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question..."
              style={{
                flex: 1,
                border: "1px solid #d1d5db",
                borderRadius: "20px",
                padding: "8px 14px",
                fontSize: "13.5px",
                outline: "none",
              }}
            />
            <button
              onClick={handleAsk}
              disabled={loading}
              style={{
                marginLeft: "8px",
                backgroundColor: "#e11d48",
                color: "white",
                border: "none",
                borderRadius: "20px",
                padding: "8px 16px",
                fontSize: "13.5px",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaqAssistant;