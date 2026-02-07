import { useState, useRef, useEffect } from 'react';
import './Matching.css';

// Mock data for profiles
const mockProfiles = [
  {
    id: 1,
    name: 'Alexandra Chen',
    role: 'Director',
    age: 32,
    location: 'Los Angeles, CA',
    experience: '10+ years',
    bio: 'Award-winning director specializing in indie dramas. Looking for passionate screenwriters and actors.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop',
    genres: ['Drama', 'Thriller'],
    reel: 'https://example.com/reel1'
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    role: 'Screenwriter',
    age: 28,
    location: 'New York, NY',
    experience: '5 years',
    bio: 'Comedy and action screenwriter. Multiple scripts in development. Seeking directors and producers.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    genres: ['Comedy', 'Action'],
    reel: 'https://example.com/reel2'
  },
  {
    id: 3,
    name: 'Sofia Martinez',
    role: 'Actor',
    age: 26,
    location: 'Miami, FL',
    experience: '7 years',
    bio: 'Bilingual actor with theater and film experience. Open to all genres and projects.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop',
    genres: ['Drama', 'Comedy', 'Horror'],
    reel: 'https://example.com/reel3'
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Producer',
    age: 35,
    location: 'Los Angeles, CA',
    experience: '12+ years',
    bio: 'Independent film producer. Focus on character-driven stories and emerging talent.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop',
    genres: ['Drama', 'Documentary'],
    reel: 'https://example.com/reel4'
  },
];

function Matching() {
  const [profiles, setProfiles] = useState(mockProfiles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const cardRef = useRef(null);

  const currentProfile = profiles[currentIndex];

  useEffect(() => {
    if (currentIndex >= profiles.length) {
      // Reset or show end message
      setCurrentIndex(0);
    }
  }, [currentIndex, profiles.length]);

  const handleDragStart = (e) => {
    if (e.type === 'mousedown') {
      setDragStart({ x: e.clientX, y: e.clientY });
    } else {
      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
    setDragging(true);
  };

  const handleDrag = (e) => {
    if (!dragging) return;
    
    e.preventDefault();
    const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
    
    const deltaX = clientX - dragStart.x;
    const deltaY = clientY - dragStart.y;
    
    setOffset({ x: deltaX, y: deltaY });
    setRotation(deltaX * 0.1);
  };

  const handleDragEnd = () => {
    if (!dragging) return;
    
    const threshold = 100;
    if (Math.abs(offset.x) > threshold) {
      // Swipe left (pass) or right (like)
      if (offset.x > 0) {
        handleLike();
      } else {
        handlePass();
      }
    } else {
      // Reset position
      setOffset({ x: 0, y: 0 });
      setRotation(0);
    }
    
    setDragging(false);
  };

  const handleLike = () => {
    console.log('Liked:', currentProfile.name);
    setCurrentIndex(prev => prev + 1);
    setOffset({ x: 0, y: 0 });
    setRotation(0);
  };

  const handlePass = () => {
    console.log('Passed:', currentProfile.name);
    setCurrentIndex(prev => prev + 1);
    setOffset({ x: 0, y: 0 });
    setRotation(0);
  };

  if (!currentProfile) {
    return (
      <div className="matching-page">
        <div className="no-more-profiles">
          <h2>That's all for now!</h2>
          <p>Check back later for more profiles.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="matching-page">
      <div className="matching-container">
        <div className="card-stack">
          <div
            ref={cardRef}
            className="profile-card"
            onMouseDown={handleDragStart}
            onMouseMove={handleDrag}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDrag}
            onTouchEnd={handleDragEnd}
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) rotate(${rotation}deg)`,
              opacity: dragging ? 0.9 : 1,
              transition: dragging ? 'none' : 'transform 0.3s ease, opacity 0.3s ease',
            }}
          >
            <div className="card-image">
              <img src={currentProfile.image} alt={currentProfile.name} />
              <div className="card-overlay">
                <div className="card-info">
                  <h2>{currentProfile.name}</h2>
                  <div className="card-meta">
                    <span className="role-badge">{currentProfile.role}</span>
                    <span>{currentProfile.age} • {currentProfile.location}</span>
                  </div>
                  <p className="card-bio">{currentProfile.bio}</p>
                  <div className="card-genres">
                    {currentProfile.genres.map((genre, idx) => (
                      <span key={idx} className="genre-tag">{genre}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button 
            className="action-btn pass-btn"
            onClick={handlePass}
            aria-label="Pass"
          >
            ✕
          </button>
          <button 
            className="action-btn like-btn"
            onClick={handleLike}
            aria-label="Like"
          >
            ♥
          </button>
        </div>

        <div className="profile-counter">
          {currentIndex + 1} / {profiles.length}
        </div>
      </div>
    </div>
  );
}

export default Matching;

