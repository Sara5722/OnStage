import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/background new.png';
import logoImage from '../assets/onstage transparent.png';
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
      <div className="home-hero">
        {/* Background Collage Image */}
        <div className="hero-background">
          <img src={backgroundImage} alt="Film industry collage background" />
        </div>

        {/* Actions and Logo at Bottom Right */}
        <div className="hero-logo-section">
            <div className="hero-logo">
              <img src={logoImage} alt="OnStage" />
            </div>

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

      {/* Featured Opportunities Section */}
      <div className="opportunities-section">
        <div className="opportunities-container">
          <div className="opportunity-panel">
            <div className="opportunity-content">
              <div className="opportunity-header">
                <span className="opportunity-role">Screenwriter</span>
                <span className="opportunity-name">Sarah Chen</span>
              </div>
              <h3 className="opportunity-title">Seeking Director for Indie Drama</h3>
              <p className="opportunity-text">
                I'm looking for a director to bring my character-driven indie drama script to life. 
                The story follows a young woman's journey through loss and self-discovery. Seeking 
                someone with experience in emotional storytelling and visual poetry. Budget: $50K-$100K.
              </p>
              <div className="opportunity-tags">
                <span className="tag">Drama</span>
                <span className="tag">Indie</span>
                <span className="tag">Los Angeles</span>
              </div>
              <a href="#" className="continue-reading">
                View full post <span className="arrow">→</span>
              </a>
            </div>
            <div className="opportunity-image">
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=500&fit=crop" 
                alt="Sarah Chen - Screenwriter"
              />
            </div>
          </div>

          <div className="opportunity-panel">
            <div className="opportunity-content">
              <div className="opportunity-header">
                <span className="opportunity-role">Director</span>
                <span className="opportunity-name">Marcus Johnson</span>
              </div>
              <h3 className="opportunity-title">Casting Lead Actor for Thriller</h3>
              <p className="opportunity-text">
                Casting for a psychological thriller shooting in NYC this fall. Looking for a male 
                lead, 25-35, with strong dramatic range. Must be available for 4-week shoot. 
                Union/non-union welcome. Reel and headshot required.
              </p>
              <div className="opportunity-tags">
                <span className="tag">Thriller</span>
                <span className="tag">Paid</span>
                <span className="tag">New York</span>
              </div>
              <a href="#" className="continue-reading">
                View full post <span className="arrow">→</span>
              </a>
            </div>
            <div className="opportunity-image">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop" 
                alt="Marcus Johnson - Director"
              />
            </div>
          </div>

          <div className="opportunity-panel">
            <div className="opportunity-content">
              <div className="opportunity-header">
                <span className="opportunity-role">Producer</span>
                <span className="opportunity-name">Alexandra Martinez</span>
              </div>
              <h3 className="opportunity-title">Seeking Screenwriter for Comedy Series</h3>
              <p className="opportunity-text">
                Production company seeking experienced comedy screenwriter for 8-episode web series. 
                Looking for someone with sharp wit and experience in ensemble comedy. Budget secured. 
                Remote collaboration possible.
              </p>
              <div className="opportunity-tags">
                <span className="tag">Comedy</span>
                <span className="tag">Series</span>
                <span className="tag">Remote</span>
              </div>
              <a href="#" className="continue-reading">
                View full post <span className="arrow">→</span>
              </a>
            </div>
            <div className="opportunity-image">
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop" 
                alt="Alexandra Martinez - Producer"
              />
            </div>
          </div>

          <div className="opportunity-panel">
            <div className="opportunity-content">
              <div className="opportunity-header">
                <span className="opportunity-role">Actor</span>
                <span className="opportunity-name">David Kim</span>
              </div>
              <h3 className="opportunity-title">Looking for Director for Short Film</h3>
              <p className="opportunity-text">
                Actor/producer seeking a visionary director for my passion project - a 15-minute 
                short film about identity and belonging. I'll be starring and producing. Looking 
                for someone who shares this vision and can bring creative energy to the project.
              </p>
              <div className="opportunity-tags">
                <span className="tag">Short Film</span>
                <span className="tag">Drama</span>
                <span className="tag">Los Angeles</span>
              </div>
              <a href="#" className="continue-reading">
                View full post <span className="arrow">→</span>
              </a>
            </div>
            <div className="opportunity-image">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop" 
                alt="David Kim - Actor"
              />
            </div>
          </div>
        </div>
      </div>

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
