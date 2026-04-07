import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import API from '../../../api';
import './ChatWidget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { sender: 'bot', text: 'Hello! Welcome to BasketBistro. How can I help you today?' }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [chatHistory, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      const userMessage = { sender: 'user', text: message };
      const currentHistory = [...chatHistory, userMessage];
      setChatHistory(currentHistory);
      setMessage('');
      setIsTyping(true);
      
      try {
        const response = await API.post('/api/bb/chat', {
          message: userMessage.text,
          history: currentHistory.slice(1, -1) // Exclude the first dummy bot greeting and the current user message
        });
        
        if (response.data.success) {
          setChatHistory(prev => [...prev, { sender: 'bot', text: response.data.text }]);
        } else {
          setChatHistory(prev => [...prev, { sender: 'bot', text: 'Sorry, I encountered an error. Please try again later.' }]);
        }
      } catch (error) {
        setChatHistory(prev => [...prev, { sender: 'bot', text: 'Network error. Please try again.' }]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  return (
    <div className="chat-widget-container">
      {isOpen && (
        <div className="chat-window shadow-lg">
          <div className="chat-header">
            <div className="chat-header-title">
              <span className="online-indicator"></span>
              <h4>BasketBistro Support</h4>
            </div>
            <button className="close-btn" onClick={toggleChat} aria-label="Close Chat">
              <X size={20} />
            </button>
          </div>
          <div className="chat-body">
            {chatHistory.map((chat, index) => (
              <div key={index} className={`chat-message ${chat.sender}`}>
                <div className="message-content">{chat.text}</div>
              </div>
            ))}
            {isTyping && (
              <div className="chat-message bot">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-footer">
            <form onSubmit={handleSendMessage} className="chat-input-form">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="chat-input"
              />
              <button type="submit" className="send-btn" disabled={!message.trim()}>
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
      
      <button 
        className={`chat-toggle-btn ${isOpen ? 'open' : ''}`} 
        onClick={toggleChat}
        aria-label="Toggle Chat"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
};

export default ChatWidget;
