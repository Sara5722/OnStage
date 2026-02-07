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
          const firstEmpty = prev.photos.findIndex(p => p === '');
          if (firstEmpty === -1) return prev;
          const newPhotos = [...prev.photos];
          newPhotos[firstEmpty] = reader.result;
          return { ...prev, photos: newPhotos };
        });
        if (errors.photos) setErrors(prev => ({ ...prev, photos: '' }));
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  const removePhoto = (slotIndex) => {
    setFormData(prev => {
      const withRemoved = prev.photos.map((p, i) => (i === slotIndex ? '' : p));
      const filled = withRemoved.filter(p => p !== '');
      const newPhotos = [...filled, ...Array(4 - filled.length).fill('')];
      return { ...prev, photos: newPhotos };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.role) newErrors.role = 'Please select a role';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.experience.trim()) newErrors.experience = 'Experience level is required';
    if (!formData.bio.trim()) newErrors.bio = 'Bio is required';
    if (!formData.photos.some(photo => photo !== '')) newErrors.photos = 'Please upload at least one photo';
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
  };

  if (savedProfile && !isEditing) {
    const [headerPhoto, ...galleryPhotos] = savedProfile.photos.filter(p => p !== '');

    return (
      <div className="my-profile-page my-profile-view">
        <div className="profile-view-container">
          {headerPhoto && (
            <div className="profile-hero">
              <img src={headerPhoto} alt="Profile header" />
              <div className="profile-hero-overlay" />
            </div>
          )}

          <div className="profile-card-modern">
            <div className="profile-card-inner">
              <header className="profile-head">
                <h1 className="profile-name">{savedProfile.name}</h1>
                <div className="profile-meta-row">
                  {savedProfile.role && <span className="profile-role">{savedProfile.role}</span>}
                  {savedProfile.age && <span className="profile-age">{savedProfile.age}</span>}
                  {savedProfile.location && <span className="profile-location">{savedProfile.location}</span>}
                </div>
                {savedProfile.experience && (
                  <p className="profile-experience-badge">{savedProfile.experience}</p>
                )}
              </header>

              {savedProfile.bio && (
                <section className="profile-section">
                  <h3 className="profile-section-title">About</h3>
                  <p className="profile-bio-text">{savedProfile.bio}</p>
                </section>
              )}

              {savedProfile.genres.length > 0 && (
                <section className="profile-section">
                  <h3 className="profile-section-title">Genres</h3>
                  <div className="profile-genres-wrap">
                    {savedProfile.genres.map((genre, idx) => (
                      <span key={idx} className="profile-genre-pill">{genre}</span>
                    ))}
                  </div>
                </section>
              )}

              {savedProfile.reel && (
                <section className="profile-section">
                  <a href={savedProfile.reel} target="_blank" rel="noopener noreferrer" className="profile-reel-cta">
                    View demo reel
                  </a>
                </section>
              )}

              {galleryPhotos.length > 0 && (
                <section className="profile-section profile-gallery-section">
                  <h3 className="profile-section-title">Photos</h3>
                  <div className="profile-gallery">
                    {galleryPhotos.map((photo, idx) => (
                      <div className="profile-gallery-item" key={idx}>
                        <img src={photo} alt={`Gallery ${idx + 1}`} />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <div className="profile-actions-wrap">
                <button type="button" onClick={handleEdit} className="profile-edit-btn">
                  Edit profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const photoLabels = ['Header photo', 'Photo 2', 'Photo 3', 'Photo 4'];

  return (
    <div className="my-profile-page my-profile-form-page">
      <div className="profile-container profile-form-container">
        <h1 className="page-title">Create your profile</h1>
        <p className="page-subtitle">Add your details and four photos — the first will be your cover.</p>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-section form-section-photos">
            <h2 className="form-section-heading">Photos</h2>
            <p className="form-section-hint">First photo is your profile header. Add up to 4 images.</p>
            <div className="photos-grid-modern">
              {formData.photos.map((photo, idx) => (
                <div key={idx} className={`photo-slot-modern ${idx === 0 ? 'photo-slot-header' : ''}`}>
                  <span className="photo-slot-label">{photoLabels[idx]}</span>
                  {photo ? (
                    <div className="photo-preview-wrap">
                      <img src={photo} alt={photoLabels[idx]} className="photo-preview-img" />
                      <button
                        type="button"
                        className="remove-photo-btn"
                        onClick={() => removePhoto(idx)}
                        aria-label={`Remove ${photoLabels[idx]}`}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <label className="photo-add-slot">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="photo-file-input"
                      />
                      <span className="photo-add-icon">+</span>
                      <span className="photo-add-text">Add image</span>
                    </label>
                  )}
                </div>
              ))}
            </div>
            {errors.photos && <span className="error-message">{errors.photos}</span>}
          </div>

          <div className="form-section">
            <h2 className="form-section-heading">Basic information</h2>
            <div className="form-row form-row-double">
              <div className="form-group">
                <label htmlFor="name">Full name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="role">Role *</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={errors.role ? 'error' : ''}
                >
                  <option value="">Choose role</option>
                  {roleOptions.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
                {errors.role && <span className="error-message">{errors.role}</span>}
              </div>
            </div>
            <div className="form-row form-row-double">
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
                  placeholder="Age"
                  className={errors.age ? 'error' : ''}
                />
                {errors.age && <span className="error-message">{errors.age}</span>}
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
                {errors.location && <span className="error-message">{errors.location}</span>}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="experience">Experience level *</label>
              <input
                type="text"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g. 5 years, Beginner, Professional"
                className={errors.experience ? 'error' : ''}
              />
              {errors.experience && <span className="error-message">{errors.experience}</span>}
            </div>
          </div>

          <div className="form-section">
            <h2 className="form-section-heading">About you</h2>
            <div className="form-group">
              <label htmlFor="bio">Bio *</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself, your skills, and what you're looking for..."
                rows="5"
                className={errors.bio ? 'error' : ''}
              />
              {errors.bio && <span className="error-message">{errors.bio}</span>}
            </div>
          </div>

          <div className="form-section">
            <h2 className="form-section-heading">Preferred genres</h2>
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

          <div className="form-section">
            <h2 className="form-section-heading">Portfolio</h2>
            <div className="form-group">
              <label htmlFor="reel">Demo reel / portfolio URL</label>
              <input
                type="url"
                id="reel"
                name="reel"
                value={formData.reel}
                onChange={handleChange}
                placeholder="https://example.com/your-reel"
              />
            </div>
          </div>

          <div className="form-section form-section-submit">
            <button type="submit" className="submit-btn">
              Save profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MyProfile;
