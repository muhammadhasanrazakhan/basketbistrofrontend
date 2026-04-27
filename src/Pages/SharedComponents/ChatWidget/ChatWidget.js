import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Plus, Minus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart, removeItemsFromCart } from '../../../actions/cartAction';
import toast from 'react-hot-toast';
import API from '../../../api';
import './ChatWidget.css';

const ChatWidget = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { sender: 'bot', text: 'Hello! Welcome to Mono Basket. How can I help you today?' }
  ]);
  const [chatMode, setChatMode] = useState('chat'); // 'chat' or 'agent'
  const [selectedModel, setSelectedModel] = useState('gemini-3-flash-preview');
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

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
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
      setIsTyping(true);

      try {
        const response = await API.post('/api/bb/chat', {
          message: userMessage.text,
          history: currentHistory.slice(1, -1), // Exclude the first dummy bot greeting and the current user message
          mode: chatMode,
          model: selectedModel,
          cart: cartItems
        });

        console.log("Chat API Response:", response.data);

        if (response.data.success) {
          const newBotMsg = { sender: 'bot', text: response.data.text };
          if (response.data.cardResponses) {
            newBotMsg.cardResponses = response.data.cardResponses.map(card => {
              if (card.action === 'remove') {
                const cartItem = cartItems.find(i => i.product === card.productId);
                const maxToRemove = cartItem ? cartItem.quantity : 1;
                if (card.quantity > maxToRemove) card.quantity = maxToRemove;
              }
              return card;
            });
          }
          setChatHistory(prev => [...prev, newBotMsg]);
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

  const handleInput = (e) => {
    setMessage(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 80)}px`;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const handleCardAction = (card, msgIndex, cardIndex, approved) => {
    if (approved) {
      if (card.action === 'add') {
        dispatch(addItemsToCart(
          card.productId,
          card.productName,
          card.price || 0,
          card.image || '',
          card.stock || 0,
          card.quantity
        ));
        toast.success(`Action applied for: ${card.productName}`);
      } else if (card.action === 'remove') {
        const cartItem = cartItems.find(i => i.product === card.productId);
        if (cartItem) {
          const remainingQuantity = cartItem.quantity - card.quantity;
          if (remainingQuantity > 0) {
            dispatch(addItemsToCart(
              cartItem.product,
              cartItem.name,
              cartItem.price,
              cartItem.image,
              cartItem.stock,
              remainingQuantity
            ));
            toast.success(`Removed ${card.quantity}x ${card.productName} from cart`);
          } else {
            dispatch(removeItemsFromCart(card.productId));
            toast.success(`Removed all ${card.productName} from cart`);
          }
        } else {
          dispatch(removeItemsFromCart(card.productId));
          toast.success(`Action applied for: ${card.productName}`);
        }
      }

      setChatHistory(prev => {
        const newHistory = [...prev];
        const targetCard = newHistory[msgIndex].cardResponses[cardIndex];
        targetCard.processed = true;
        targetCard.actionResult = 'approved';
        return newHistory;
      });

    } else {
      setChatHistory(prev => {
        const newHistory = [...prev];
        const targetCard = newHistory[msgIndex].cardResponses[cardIndex];
        targetCard.processed = true;
        targetCard.actionResult = 'declined';
        return newHistory;
      });
    }
  };

  const updateCardQuantity = (msgIndex, cardIndex, delta) => {
    setChatHistory(prev => {
      const newHistory = [...prev];
      const card = newHistory[msgIndex].cardResponses[cardIndex];
      if (card) {
        if (card.action === 'remove') {
          let newQuantity = card.quantity - delta;
          const cartItem = cartItems.find(i => i.product === card.productId);
          const maxToRemove = cartItem ? cartItem.quantity : card.quantity;
          if (newQuantity < 1) newQuantity = 1;
          if (newQuantity > maxToRemove) newQuantity = maxToRemove;
          card.quantity = newQuantity;
        } else {
          card.quantity = Math.max(1, card.quantity + delta);
        }
      }
      return newHistory;
    });
  };

  return (
    <div className="chat-widget-container">
      {isOpen && (
        <div className="chat-window shadow-lg">
          <div className="chat-header">
            <div className="chat-header-title">
              <span className="online-indicator"></span>
              <div className="chat-header-info">
                <h4>MonoBasket Support</h4>
              </div>
            </div>
            <button className="close-btn" onClick={toggleChat} aria-label="Close Chat">
              <X size={20} />
            </button>
          </div>
          <div className="chat-body">
            {chatHistory.map((chat, index) => (
              <div key={index} className={`chat-message ${chat.sender}`}>
                <div className="message-content">
                  {chat.text && chat.text.replace(/\*\*/g, '')}
                  {chat.cardResponses && chat.cardResponses.length > 0 && (
                    <div className="chat-cards-stack">
                      {chat.cardResponses.map((card, cardIndex) => (
                        <div key={cardIndex} className="chat-card-container">
                          <div className={card.processed ? "chat-card shadow-sm processed" : "chat-card shadow-sm"}>
                            <div className="chat-card-main">
                              <div className="chat-card-image">
                                <img src={card.image || '/placeholder.png'} alt={card.productName} />
                              </div>
                              <div className="chat-card-content">
                                <div className="product-info">
                                  <h6>{card.productName}</h6>
                                  <p className="store-name-text">{card.storeName || 'MonoBasket Store'}</p>
                                </div>
                              </div>
                            </div>

                            {/* Quantity Controls - Top Right Border */}
                            {!card.processed && (
                              <div className="card-quantity-controls">
                                <button
                                  onClick={() => updateCardQuantity(index, cardIndex, -1)}
                                  className="qty-btn"
                                  disabled={card.action === 'add' ? card.quantity <= 1 : card.quantity >= (cartItems.find(i => i.product === card.productId)?.quantity || card.quantity)}
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="qty-value">{card.action === 'remove' ? `-${card.quantity}` : card.quantity}</span>
                                <button
                                  onClick={() => updateCardQuantity(index, cardIndex, 1)}
                                  className="qty-btn"
                                  disabled={card.action === 'remove' ? card.quantity <= 1 : false}
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                            )}

                            {/* Action Buttons - Bottom Right Border */}
                            {!card.processed ? (
                              <div className="card-action-buttons">
                                <button onClick={() => handleCardAction(card, index, cardIndex, false)} className="btn-decline-small">Decline</button>
                                <button onClick={() => handleCardAction(card, index, cardIndex, true)} className="btn-accept-small">Accept</button>
                              </div>
                            ) : (
                              <div className="card-processed-badge">
                                <span>{card.actionResult === 'approved' ? (card.action === 'remove' ? 'Removed' : 'Added') : 'Cancelled'}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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
              <textarea
                ref={textareaRef}
                placeholder="Type your message..."
                value={message}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                className="chat-input"
                rows="1"
              />
              <button type="submit" className="send-btn" disabled={!message.trim()}>
                <Send size={18} />
              </button>
            </form>
            <div className="chat-controls-row">
              <div className="mode-toggle-footer">
                <span className={chatMode === 'chat' ? 'active' : ''} onClick={() => setChatMode('chat')}>Chat</span>
                <span className={chatMode === 'agent' ? 'active' : ''} onClick={() => setChatMode('agent')}>Agent</span>
              </div>
              <select
                className="model-selector"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
              >
                <option value="gemini-3-flash-preview">Gemini 3 Flash</option>
                <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
                <option value="gemini-3.1-flash-lite-preview">Gemini 3.1 Flash Lite</option>
                <option value="gemini-2.5-flash-lite">Gemini 2.5 Flash Lite</option>
              </select>
            </div>
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
