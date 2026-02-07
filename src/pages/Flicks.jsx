import { useState, useRef, useEffect } from 'react';
import './Flicks.css';

// Mock data for flicks/reels - YouTube Movie Trailers
const mockFlicks = [
  {
    id: 1,
    creator: 'Jon M. Chu',
    role: 'Director',
    title: 'Wicked',
    youtubeId: 'HgwOx31qsK4',
    likes: 2450,
    comments: 189,
    views: 45200,
    description: 'A revisionist Oz tale that lingers on girlhood, power, and the politics of being misunderstood. Less fairy tale, more identity study wrapped in spectacle.'
  },
  {
    id: 2,
    creator: 'Matt Reeves',
    role: 'Director',
    title: 'The Batman',
    youtubeId: 'mqqft2x_Aa4',
    likes: 3120,
    comments: 245,
    views: 67800,
    description: 'A rain-soaked neo-noir where Batman feels more like a recluse detective than a superhero, drifting through a city rotting from the inside.'
  },
  {
    id: 3,
    creator: 'Eiichiro Oda (Adapted)',
    role: 'Creator',
    title: 'One Piece (Live Action)',
    youtubeId: 'Ades3pQbeh8',
    likes: 2890,
    comments: 156,
    views: 54300,
    description: 'A surprisingly earnest pirate odyssey about chosen family and impossible dreams, balancing cartoonish joy with quiet emotional beats.'
  },
  {
    id: 4,
    creator: 'Bong Joon-ho',
    role: 'Director',
    title: 'Parasite',
    youtubeId: '5xH0HfJHsaY',
    likes: 4100,
    comments: 312,
    views: 78900,
    description: 'A genre-blurring social thriller where class tension simmers in silences, architecture, and what lurks just out of frame.'
  },
  {
    id: 5,
    creator: 'Park Chan-wook',
    role: 'Director',
    title: 'Decision to Leave',
    youtubeId: 'Bmoy73lhs-s',
    likes: 1890,
    comments: 112,
    views: 38900,
    description: 'A melancholic romantic mystery told in glances and half-truths, where longing is more dangerous than the crime itself.'
  },
];


function Flicks() {
  const [flicks, setFlicks] = useState(mockFlicks);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    // Optional: Handle scroll behavior for video transitions
  }, []);

  const handleScroll = (e) => {
    const container = containerRef.current;
    if (!container) return;

    const scrollTop = container.scrollTop;
    const itemHeight = window.innerHeight;
    const newIndex = Math.round(scrollTop / itemHeight);

    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < flicks.length) {
      setCurrentIndex(newIndex);
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
          >
            <div className="flick-video-wrapper">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${flick.youtubeId}`}
                title={flick.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="flick-video"
              ></iframe>
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

