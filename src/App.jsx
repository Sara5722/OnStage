import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Matching from './pages/Matching';
import Flicks from './pages/Flicks';
import Messages from './pages/Messages';
import './App.css';
import logoImage from './assets/onstage transparent.png';

function Navigation() {
  const location = useLocation();

  return (
    <nav className="nav">
      <Link to="/" className="nav-logo">
        <img src={logoImage} alt="OnStage" className="nav-logo-img" />
      </Link>
      <div className="nav-links">
        <Link 
          to="/" 
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          Home
        </Link>
        <Link 
          to="/matching" 
          className={`nav-link ${location.pathname === '/matching' ? 'active' : ''}`}
        >
          Matching
        </Link>
        <Link 
          to="/flicks" 
          className={`nav-link ${location.pathname === '/flicks' ? 'active' : ''}`}
        >
          Flicks
        </Link>
        <Link 
          to="/messages" 
          className={`nav-link ${location.pathname === '/messages' ? 'active' : ''}`}
        >
          Messages
        </Link>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/matching" element={<Matching />} />
          <Route path="/flicks" element={<Flicks />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
