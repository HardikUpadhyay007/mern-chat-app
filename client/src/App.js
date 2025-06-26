import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:5000');

function App() {
  const [username, setUsername] = useState('');
  const [inputName, setInputName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (username) {
      fetch('http://localhost:5000/api/messages')
        .then(res => res.json())
        .then(data => setMessages(data));
    }
  }, [username]);

  useEffect(() => {
    socket.on('chat message', msg => {
      setMessages(prev => [...prev, msg]);
    });
    return () => socket.off('chat message');
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: inputName })
    });
    if (res.ok) {
      setUsername(inputName);
    } else {
      const data = await res.json();
      setError(data.error);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('chat message', { username, text: message });
      setMessage('');
    }
  };

  if (!username) {
    return (
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Enter username (alice or bob)"
            value={inputName}
            onChange={e => setInputName(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <header>
        <h2>Chat App</h2>
        <span className="user">Logged in as <b>{username}</b></span>
      </header>
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={msg.username === username ? 'message own' : 'message'}>
            <span className="msg-user">{msg.username}</span>
            <span className="msg-text">{msg.text}</span>
            <span className="msg-time">{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className="input-form" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          disabled={!username}
        />
        <button type="submit" disabled={!message.trim()}>Send</button>
      </form>
    </div>
  );
}

export default App;
