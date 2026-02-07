import { useState, useRef, useEffect } from 'react';
import './Flicks.css';

// Mock data for flicks/reels
const mockFlicks = [
  {
    id: 1,
    creator: 'Alexandra Chen',
    role: 'Director',
    title: 'Indie Drama Scene',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop',
    likes: 1240,
    comments: 89,
    views: 15200,
    description: 'Behind the scenes of our latest indie drama. Looking for talented actors!'
  },
  {
    id: 2,
    creator: 'Marcus Johnson',
    role: 'Screenwriter',
    title: 'Script Reading',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=600&fit=crop',
    likes: 890,
    comments: 45,
    views: 9800,
    description: 'First table read of my new comedy script. Feedback welcome!'
  },
  {
    id: 3,
    creator: 'Sofia Martinez',
    role: 'Actor',
    title: 'Monologue Practice',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    likes: 2100,
    comments: 156,
    views: 23400,
    description: 'Practicing for an upcoming audition. What do you think?'
  },
  {
    id: 4,
    creator: 'David Kim',
    role: 'Producer',
    title: 'Project Announcement',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop',
    likes: 567,
    comments: 32,
    views: 6700,
    description: 'Excited to announce our next documentary project!'
  },
  {
    id: 5,
    creator: 'Emma Thompson',
    role: 'Actor',
    title: 'Character Study',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop',
    likes: 1890,
    comments: 112,
    views: 18900,
    description: 'Exploring my character for an upcoming role. Thoughts?'
  },
];

function Flicks() {
  const [flicks, setFlicks] = useState(mockFlicks);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    // Auto-play first video
    if (videoRefs.current[0]) {
      videoRefs.current[0].play().catch(() => {
        // Autoplay blocked, user interaction required
      });
    }
  }, []);

  const handleScroll = (e) => {
    const container = containerRef.current;
    if (!container) return;

    const scrollTop = container.scrollTop;
    const itemHeight = window.innerHeight;
    const newIndex = Math.round(scrollTop / itemHeight);

    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < flicks.length) {
      // Pause previous video
      if (videoRefs.current[currentIndex]) {
        videoRefs.current[currentIndex].pause();
      }
      
      setCurrentIndex(newIndex);
      
      // Play new video
      if (videoRefs.current[newIndex]) {
        videoRefs.current[newIndex].play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const togglePlayPause = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleLike = (id) => {
    setFlicks(prev => prev.map(flick => 
      flick.id === id ? { ...flick, likes: flick.likes + 1 } : flick
    ));
  };

  return (
    <div className="flicks-page">
      <div 
        className="flicks-container"
        ref={containerRef}
        onScroll={handleScroll}
      >
        {flicks.map((flick, index) => (
          <div 
            key={flick.id} 
            className="flick-item"
            onClick={() => togglePlayPause(index)}
          >
            <div className="flick-video-wrapper">
              <video
                ref={el => videoRefs.current[index] = el}
                src={flick.videoUrl}
                className="flick-video"
                loop
                muted
                playsInline
                poster={flick.thumbnail}
              />
              {videoRefs.current[index]?.paused && (
                <div className="play-overlay">
                  <div className="play-button">▶</div>
                </div>
              )}
            </div>
            
            <div className="flick-info">
              <div className="flick-header">
                <div className="creator-info">
                  <h3>{flick.creator}</h3>
                  <span className="creator-role">{flick.role}</span>
                </div>
                <div className="flick-stats">
                  <div className="stat-item">
                    <span className="stat-icon">👁</span>
                    <span>{flick.views.toLocaleString()}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">💬</span>
                    <span>{flick.comments}</span>
                  </div>
                </div>
              </div>
              
              <p className="flick-description">{flick.description}</p>
              
              <div className="flick-actions">
                <button 
                  className="action-icon like-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(flick.id);
                  }}
                >
                  <span className="icon">♥</span>
                  <span>{flick.likes.toLocaleString()}</span>
                </button>
                <button className="action-icon comment-btn">
                  <span className="icon">💬</span>
                  <span>Comment</span>
                </button>
                <button className="action-icon share-btn">
                  <span className="icon">↗</span>
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Flicks;

