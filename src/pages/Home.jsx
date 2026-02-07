import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Placeholder login logic
    console.log('Login:', { email, password });
    navigate('/matching');
  };

  return (
    <div className="home-page">
      <div className="striped-rectangle"></div>
      <div className="bar-under-rectangle"></div>
      <div className="home-hero">
        <div className="hero-content fade-in">
          <h1 className="hero-title">OnStage</h1>
          <p className="hero-subtitle">Where Film Industry Talent Meets Opportunity</p>
          <p className="hero-description">
            Connect with actors, directors, screenwriters, and producers. 
            Share your work, discover collaborators, and bring your vision to life.
          </p>
          
          {!showLogin ? (
            <div className="hero-actions">
              <button onClick={() => setShowLogin(true)} className="cta-button">
                Get Started
              </button>
              <button 
                onClick={() => setShowChatbot(true)} 
                className="cta-button secondary"
              >
                Ask AI Assistant
              </button>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="login-form fade-in">
              <h2>Welcome Back</h2>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="cta-button">Sign In</button>
                <button 
                  type="button" 
                  onClick={() => setShowLogin(false)}
                  className="cta-button secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* AI Chatbot Modal */}
      {showChatbot && (
        <div className="chatbot-overlay" onClick={() => setShowChatbot(false)}>
          <div className="chatbot-modal" onClick={(e) => e.stopPropagation()}>
            <div className="chatbot-header">
              <h3>AI Assistant</h3>
              <button 
                className="close-button"
                onClick={() => setShowChatbot(false)}
              >
                ×
              </button>
            </div>
            <div className="chatbot-content">
              <div className="chatbot-message bot">
                <p>Hello! I'm your AI assistant. How can I help you find the perfect collaborator today?</p>
              </div>
              <div className="chatbot-input-area">
                <input 
                  type="text" 
                  placeholder="Ask me anything about finding talent or projects..."
                  className="chatbot-input"
                />
                <button className="send-button">Send</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="features-section">
        <div className="feature-card">
          <div className="feature-icon">🎬</div>
          <h3>Discover Talent</h3>
          <p>Find actors, directors, and creatives that match your vision</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💬</div>
          <h3>Connect & Collaborate</h3>
          <p>Message directly and build your network in the industry</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎥</div>
          <h3>Showcase Work</h3>
          <p>Share your reels, scripts, and portfolio with the community</p>
        </div>
      </div>
    </div>
  );
}

export default Home;

