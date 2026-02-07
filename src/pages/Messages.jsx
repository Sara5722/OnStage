import { useState } from 'react';
import './Messages.css';

// Mock conversations and messages
const mockConversations = [
  {
    id: '1',
    type: 'dm',
    name: 'Sarah Chen',
    role: 'Screenwriter',
    avatar: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'Sounds great! When are you free for a call?',
    lastTime: '2m',
    unread: 1,
  },
  {
    id: '2',
    type: 'dm',
    name: 'Marcus Johnson',
    role: 'Director',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'I sent over the script. Let me know your thoughts.',
    lastTime: '1h',
    unread: 0,
  },
  {
    id: 'group-1',
    type: 'group',
    name: 'Indie Drama Crew',
    avatars: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    ],
    members: [
      { name: 'Sarah Chen', role: 'Screenwriter' },
      { name: 'Marcus Johnson', role: 'Director' },
      { name: 'Alexandra Martinez', role: 'Producer' },
    ],
    lastMessage: 'Marcus: Table read is set for Thursday 3pm.',
    lastTime: '5m',
    unread: 0,
  },
  {
    id: '3',
    type: 'dm',
    name: 'Alexandra Martinez',
    role: 'Producer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'The budget looks good. We can move forward.',
    lastTime: 'Yesterday',
    unread: 0,
  },
  {
    id: '4',
    type: 'dm',
    name: 'David Kim',
    role: 'Actor',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'Thanks for connecting! Really excited about the project.',
    lastTime: '2d',
    unread: 0,
  },
];

const mockMessagesByConversation = {
  '1': [
    { id: 'm1', text: 'Hi! I saw your post about the indie drama. I\'d love to chat.', fromMe: false, time: '10:32' },
    { id: 'm2', text: 'Hey Sarah! Thanks for reaching out. I\'m definitely interested.', fromMe: true, time: '10:35' },
    { id: 'm3', text: 'That\'s wonderful. I\'m looking for someone who gets the emotional beats.', fromMe: false, time: '10:38' },
    { id: 'm4', text: 'I\'ve done a few dramas in that space. Want to hop on a call this week?', fromMe: true, time: '10:40' },
    { id: 'm5', text: 'Sounds great! When are you free for a call?', fromMe: false, time: '10:42' },
  ],
  '2': [
    { id: 'm1', text: 'Hey, saw your thriller casting. Still looking?', fromMe: true, time: 'Yesterday' },
    { id: 'm2', text: 'Yes! I sent over the script. Let me know your thoughts.', fromMe: false, time: '1h' },
  ],
  'group-1': [
    { id: 'm1', text: 'Hey everyone — let\'s lock the table read date.', fromMe: true, time: '10:00', senderName: null },
    { id: 'm2', text: 'I\'m free Thursday or Friday afternoon.', fromMe: false, time: '10:15', senderName: 'Sarah Chen' },
    { id: 'm3', text: 'Thursday 3pm works for me.', fromMe: false, time: '10:18', senderName: 'Marcus Johnson' },
    { id: 'm4', text: 'Table read is set for Thursday 3pm.', fromMe: false, time: '10:20', senderName: 'Marcus Johnson' },
  ],
  '3': [],
  '4': [
    { id: 'm1', text: 'Thanks for connecting! Really excited about the project.', fromMe: false, time: '2d' },
  ],
};

function Messages() {
  const [activeChat, setActiveChat] = useState('1');
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState(mockMessagesByConversation);

  const activeConversation = mockConversations.find((c) => c.id === activeChat);
  const activeMessages = messages[activeChat] || [];
  const isGroup = activeConversation?.type === 'group';

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const newMsg = {
      id: `m${Date.now()}`,
      text: inputText.trim(),
      fromMe: true,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      ...(isGroup && { senderName: null }),
    };
    setMessages((prev) => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMsg],
    }));
    setInputText('');
  };

  return (
    <div className="messages-page page-container">
      <div className="messages-layout">
        {/* Left: conversation list */}
        <aside className="messages-sidebar">
          <div className="messages-sidebar-header">
            <h1 className="messages-title">Messages</h1>
          </div>
          <div className="conversation-list">
            {mockConversations.map((conv) => (
              <button
                key={conv.id}
                type="button"
                className={`conversation-item ${conv.type === 'group' ? 'conversation-item--group' : ''} ${activeChat === conv.id ? 'active' : ''}`}
                onClick={() => setActiveChat(conv.id)}
              >
                <div className="conv-avatar-wrap">
                  {conv.type === 'group' ? (
                    <div className="conv-avatar-group">
                      {conv.avatars.slice(0, 3).map((src, i) => (
                        <img key={i} src={src} alt="" className="conv-avatar-group-img" />
                      ))}
                    </div>
                  ) : (
                    <img src={conv.avatar} alt={conv.name} className="conv-avatar" />
                  )}
                </div>
                <div className="conv-info">
                  <span className="conv-name">
                    {conv.type === 'group' && <span className="conv-group-badge">Group</span>}
                    {conv.name}
                  </span>
                  <span className="conv-preview">{conv.lastMessage}</span>
                </div>
                <div className="conv-meta">
                  <span className="conv-time">{conv.lastTime}</span>
                  {conv.unread > 0 && (
                    <span className="conv-unread-badge" aria-label={`${conv.unread} unread message${conv.unread === 1 ? '' : 's'}`}>
                      {conv.unread} unread
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Right: active chat */}
        <main className="messages-main">
          {activeConversation ? (
            <>
              <header className={`chat-header ${isGroup ? 'chat-header--group' : ''}`}>
                <button type="button" className="chat-back" aria-label="Back to list">
                  <span className="chat-back-icon">←</span>
                </button>
                {isGroup ? (
                  <div className="chat-header-avatar-group">
                    {activeConversation.avatars.slice(0, 3).map((src, i) => (
                      <img key={i} src={src} alt="" className="chat-header-avatar-group-img" />
                    ))}
                  </div>
                ) : (
                  <img src={activeConversation.avatar} alt={activeConversation.name} className="chat-header-avatar" />
                )}
                <div className="chat-header-info">
                  <span className="chat-header-name">
                    {isGroup && <span className="chat-header-group-label">Group</span>}
                    {activeConversation.name}
                  </span>
                  <span className="chat-header-role">
                    {isGroup
                      ? activeConversation.members.map((m) => m.name).join(', ')
                      : activeConversation.role}
                  </span>
                </div>
              </header>

              <div className="chat-messages">
                {activeMessages.length === 0 ? (
                  <div className="chat-empty">
                    <p>{isGroup ? 'No messages yet. Start the conversation!' : 'No messages yet. Say hi!'}</p>
                  </div>
                ) : (
                  activeMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`chat-bubble ${msg.fromMe ? 'sent' : 'received'} ${msg.senderName ? 'chat-bubble--with-sender' : ''}`}
                    >
                      {!msg.fromMe && msg.senderName && (
                        <span className="bubble-sender">{msg.senderName}</span>
                      )}
                      <span className="bubble-text">{msg.text}</span>
                      <span className="bubble-time">{msg.time}</span>
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={handleSend} className="chat-input-wrap">
                <label className="chat-attach" aria-label="Upload file">
                  <input type="file" className="chat-attach-input" />
                  <span className="chat-attach-icon">+</span>
                </label>
                <input
                  type="text"
                  className="chat-input"
                  placeholder={isGroup ? 'Message the group...' : 'Message...'}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <button type="submit" className="chat-send" aria-label="Send">
                  Send
                </button>
              </form>
            </>
          ) : (
            <div className="chat-placeholder">
              <p>Select a conversation to start messaging.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Messages;
