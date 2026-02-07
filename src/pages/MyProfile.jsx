import { useState } from 'react';
import './MyProfile.css';

function MyProfile() {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    age: '',
    location: '',
    experience: '',
    bio: '',
    genres: [],
    photos: ['', '', '', ''], // 4 photo slots
    reel: '',
  });

  const [savedProfile, setSavedProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const roleOptions = ['Actor', 'Director', 'Screenwriter', 'Producer', 'Cinematographer', 'Editor'];
  const genreOptions = ['Drama', 'Comedy', 'Action', 'Horror', 'Thriller', 'Sci-Fi', 'Romance', 'Documentary'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleGenreChange = (genre) => {
    setFormData(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => {
          const newPhotos = [...prev.photos];
          // Find the first empty slot (max 4)
          const emptyIndex = newPhotos.findIndex(photo => photo === '');
          if (emptyIndex !== -1 && newPhotos.filter(p => p !== '').length < 4) {
            newPhotos[emptyIndex] = reader.result;
          }
          return {
            ...prev,
            photos: newPhotos
          };
        });
        // Clear photos error when a photo is added
        if (errors.photos) {
          setErrors(prev => ({
            ...prev,
            photos: ''
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (index) => {
    setFormData(prev => {
      // Remove the photo at the given index and shift all photos left
      const filtered = prev.photos.filter((photo, i) => i !== index && photo !== '');
      // Fill the rest with empty slots to maintain 4 slots
      const newPhotos = [...filtered, ...Array(4 - filtered.length).fill('')];
      return {
        ...prev,
        photos: newPhotos
      };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }
    if (!formData.age) {
      newErrors.age = 'Age is required';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    if (!formData.experience.trim()) {
      newErrors.experience = 'Experience level is required';
    }
    if (!formData.bio.trim()) {
      newErrors.bio = 'Bio is required';
    }
    if (!formData.photos.some(photo => photo !== '')) {
      newErrors.photos = 'Please upload at least one photo';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setSavedProfile(formData);
      setIsEditing(false);
      setErrors({});
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setViewMode('edit');
  };

  // Profile View Component
  if (savedProfile && !isEditing) {
    const photosToDisplay = savedProfile.photos.filter(photo => photo !== '').slice(0, 4);

    // Determine photo placement logic
    let afterDescription = [];
    let afterGenres = [];
    if (photosToDisplay.length <= 3) {
      if (photosToDisplay[1]) afterDescription.push(photosToDisplay[1]);
      if (photosToDisplay[2]) afterGenres.push(photosToDisplay[2]);
    } else {
      // 4 photos: 2 after description, 2 after genres
      if (photosToDisplay[1]) afterDescription.push(photosToDisplay[1]);
      if (photosToDisplay[2]) afterDescription.push(photosToDisplay[2]);
      if (photosToDisplay[3]) afterGenres.push(photosToDisplay[3]);
    }

    return (
      <div className="my-profile-page">
        <div className="profile-view-container">
          {/* Header Photo */}
          {photosToDisplay[0] && (
            <div className="profile-header-photo">
              <img src={photosToDisplay[0]} alt="Header" />
            </div>
          )}
          {/* Profile Card */}
          <div className="profile-card-large">
            <div className="profile-card-overlay">
              <div className="profile-card-info">
                <div className="profile-card-content">
                  <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.18em' }}>
                    {savedProfile.name}
                    {savedProfile.age && (
                      <span style={{ fontWeight: 700, fontSize: '2.5rem', color: 'white', marginLeft: '0.18em', display: 'flex', alignItems: 'center' }}>
                        <span style={{fontSize: '1.3rem', margin: '0 0.18em', color: '#b0aeb3', verticalAlign: 'middle'}}>&bull;&nbsp;&nbsp;</span>
                        {savedProfile.age}
                      </span>
                    )}
                  </h1>
                  <div className="profile-card-meta">
                    <span className="role-badge">{savedProfile.role}</span>
                    <span>
                      {savedProfile.location && (
                        <span style={{fontSize: '1rem', margin: '0 0.18em', color: '#b0aeb3', verticalAlign: 'middle'}}>&bull;&nbsp;</span>
                      )}
                      {savedProfile.location}
                    </span>
                  </div>
                  <p className="profile-experience">{savedProfile.experience}</p>
                  <p className={`profile-bio ${photosToDisplay.length > 0 ? 'with-image' : ''}`}>{savedProfile.bio}</p>
                  {/* Photos after bio */}
                  {afterDescription.map((photo, idx) => (
                    <div className="profile-secondary-photo" key={`afterdesc-${idx}}`}>
                      <img src={photo} alt={`Secondary ${idx+1}`} />
                    </div>
                  ))}
                  {savedProfile.genres.length > 0 && (
                    <div className="genres-section">
                      <h3 className="genres-header">Genres</h3>
                      <div className="profile-genres">
                        {savedProfile.genres.map((genre, idx) => (
                          <span key={idx} className="genre-tag">{genre}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Photos after genres */}
                  {afterGenres.map((photo, idx) => (
                    <div className="profile-tertiary-photo" key={`aftergenre-${idx}}`}>
                      <img src={photo} alt={`Tertiary ${idx+1}`} />
                    </div>
                  ))}
                  {savedProfile.reel && (
                    <a href={savedProfile.reel} target="_blank" rel="noopener noreferrer" className="reel-link">
                      View Reel →
                    </a>
                  )}
                  {/* All Photos Grid (5x4) INSIDE CARD */}
                  {photosToDisplay.length > 0 && (
                    <div className="profile-photos-gallery">
                      {photosToDisplay.map((photo, idx) => (
                        <div className="profile-photo-item" key={`gallery-photo-${idx}}`}>
                          <img src={photo} alt={`Gallery Photo ${idx+1}`} />
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Edit Profile Button after all info/photos */}
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '2.5rem 0 0 0' }}>
                    <button onClick={handleEdit} className="action-btn edit-btn profile-edit-bottom">
                      ✎ Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-profile-page">
      <div className="profile-container">
        <h1 className="page-title">Create Your Profile</h1>
        
        <form onSubmit={handleSubmit} className="profile-form">
          {/* Profile Photos Grid */}
          <div className="form-section">
            <h2>Your Photos *</h2>
            <div className="photos-grid">
              {formData.photos.map((photo, idx) => (
                <div key={idx} className="photo-slot">
                  {photo ? (
                    <div className="photo-preview-container">
                      <img src={photo} alt={`Photo ${idx + 1}`} className="photo-preview" />
                      <button
                        type="button"
                        className="remove-photo-btn"
                        onClick={() => removePhoto(idx)}
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <label className="photo-add-btn">
                      <span className="plus-icon">+</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="file-input"
                        style={{ display: 'none' }}
                      />
                    </label>
                  )}
                </div>
              ))}
            </div>
            {errors.photos && <span className="error-message">❗{errors.photos}</span>}
          </div>

          {/* Basic Info */}
          <div className="form-section">
            <h2>Basic Information</h2>
            
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">❗{errors.name}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="role">Role *</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={errors.role ? 'error' : ''}
                >
                  <option value="">Choose Role</option>
                  {roleOptions.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
                {errors.role && <span className="error-message">❗{errors.role}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="age">Age *</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="18"
                  max="100"
                  placeholder="Your age"
                  className={errors.age ? 'error' : ''}
                />
                {errors.age && <span className="error-message">❗{errors.age}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, State"
                className={errors.location ? 'error' : ''}
              />
              {errors.location && <span className="error-message">❗{errors.location}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="experience">Experience Level *</label>
              <input
                type="text"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g., 5 years, Beginner, Professional"
                className={errors.experience ? 'error' : ''}
              />
              {errors.experience && <span className="error-message">❗{errors.experience}</span>}
            </div>
          </div>

          {/* Bio */}
          <div className="form-section">
            <h2>About You</h2>
            <div className="form-group">
              <label htmlFor="bio">Bio *</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself, your skills, and what you're looking for..."
                rows="6"
                className={errors.bio ? 'error' : ''}
              />
              {errors.bio && <span className="error-message">❗{errors.bio}</span>}
            </div>
          </div>

          {/* Genres */}
          <div className="form-section">
            <h2>Preferred Genres</h2>
            <div className="genres-grid">
              {genreOptions.map(genre => (
                <label key={genre} className="genre-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.genres.includes(genre)}
                    onChange={() => handleGenreChange(genre)}
                  />
                  <span>{genre}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="form-section">
            <h2>Portfolio Links</h2>
            <div className="form-group">
              <label htmlFor="reel">Demo Reel / Portfolio URL</label>
              <input
                type="url"
                id="reel"
                name="reel"
                value={formData.reel}
                onChange={handleChange}
                placeholder="https://example.com/yourShowreel"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="form-section">
            <button type="submit" className="submit-btn">
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MyProfile;
