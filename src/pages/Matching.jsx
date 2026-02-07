import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import './Matching.css';

// Mock data for profiles
const mockProfiles = [
  {
    id: 1,
    name: 'Alexandra Chen',
    role: 'Director',
    age: 32,
    location: 'Los Angeles, CA',
    experience: 'Professional',
    pay: 'One-time',
    abilities: ['Storyboarding', 'Casting', 'Festival Strategy'],
    project: 'Movie',
    company: 'Walt Disney Studios',
    bio: 'Award-winning director specializing in indie dramas with a soft spot for character-driven thrillers. I love building collaborative sets where every department gets a voice. Looking for passionate screenwriters and actors who want to make something tender and bold.',
    prompts: [
      {
        question: 'Signature on-set ritual',
        answer: 'Morning table read with chai and a one-word intention from each crew lead.'
      },
      {
        question: 'Dream collaborator',
        answer: 'A cinematographer who treats shadows like dialogue.'
      },
      {
        question: 'Current obsession',
        answer: 'Stories where silence says more than the script.'
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1100&fit=crop',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=1100&fit=crop',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=1100&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=1100&fit=crop',
    ],
    genres: ['Drama', 'Thriller'],
    reel: 'https://example.com/reel1'
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    role: 'Screenwriter',
    age: 28,
    location: 'New York, NY',
    experience: 'Advanced',
    pay: 'Recurring',
    abilities: ['Comedy Writing', 'Action Beats', 'Pitch Decks'],
    project: 'TV',
    company: 'Netflix Studios',
    bio: 'Comedy-action screenwriter who loves smart banter and set pieces that actually matter. I build worlds with heart, high stakes, and a little chaos. Multiple scripts in development. Seeking directors and producers who like fast feedback and fearless rewrites.',
    prompts: [
      {
        question: 'Logline I can not stop pitching',
        answer: 'A burned-out stunt coordinator fakes a reality show to hide a real heist.'
      },
      {
        question: 'Room energy',
        answer: 'Collaborative, punchy, and always with a whiteboard of absurd ideas.'
      },
      {
        question: 'Plot twist I love',
        answer: 'The hero is the one who hired the villain.'
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1100&fit=crop',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1100&fit=crop',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1100&fit=crop',
      'https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?w=800&h=1100&fit=crop',
    ],
    genres: ['Comedy', 'Action'],
    reel: 'https://example.com/reel2'
  },
  {
    id: 3,
    name: 'Sofia Martinez',
    role: 'Actor',
    age: 26,
    location: 'Miami, FL',
    experience: 'Intermediate',
    pay: 'Hourly',
    abilities: ['Stunts', 'Voiceover', 'Bilingual'],
    project: 'Commercial',
    company: 'Amazon MGM Studios',
    bio: 'Bilingual actor with theater and film experience. I bring high energy, quick memorization, and a deep love of character work. Open to all genres and projects, especially commercials with cinematic flair.',
    prompts: [
      {
        question: 'Most unusual skill',
        answer: 'Can switch accents mid-sentence without breaking character.'
      },
      {
        question: 'Perfect set snack',
        answer: 'Spicy mango slices and iced cafecito.'
      },
      {
        question: 'Dream role',
        answer: 'A quiet action lead who solves everything with empathy.'
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=1100&fit=crop',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=1100&fit=crop',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=1100&fit=crop',
      'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=800&h=1100&fit=crop',
    ],
    genres: ['Drama', 'Comedy', 'Horror'],
    reel: 'https://example.com/reel3'
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Producer',
    age: 35,
    location: 'Los Angeles, CA',
    experience: 'Professional',
    pay: 'Expenses Covered',
    abilities: ['Financing', 'Scheduling', 'Talent Relations'],
    project: 'Movie',
    company: 'Warner Bros. Discovery',
    bio: 'Independent film producer focused on character-driven stories and emerging talent. I keep productions nimble, funded, and crew-friendly. Seeking directors and writers who care about story and process equally.',
    prompts: [
      {
        question: 'Green flag on a pitch',
        answer: 'A clear why-now and a plan for finishing, not just starting.'
      },
      {
        question: 'What I bring',
        answer: 'Budget clarity, schedule sanity, and a calm set.'
      },
      {
        question: 'Go-to wrap gift',
        answer: 'A custom zine with behind-the-scenes photos.'
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=1100&fit=crop',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1100&fit=crop',
      'https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?w=800&h=1100&fit=crop',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1100&fit=crop',
    ],
    genres: ['Drama', 'Documentary'],
    reel: 'https://example.com/reel4'
  },
];

const ageOptions = [
  'All Ages',
  'Infant',
  'Child',
  'Pre-teen',
  'Teen',
  'Young Adult',
  'Adult',
  'Middle Aged',
  'Mature',
];

const experienceOptions = [
  'All Experience',
  'Beginner',
  'Intermediate',
  'Advanced',
  'Professional',
];

const payOptions = [
  'All Pay',
  'Hourly',
  'One-time',
  'Recurring',
  'Expenses Covered',
];

const projectOptions = ['All Projects', 'Commercial', 'Movie', 'TV'];

const companyOptions = [
  'All Companies',
  'Walt Disney Studios',
  'Warner Bros. Discovery',
  'Universal Pictures',
  'Sony Pictures',
  'Paramount Pictures (Skydance)',
  'Netflix Studios',
  'Amazon MGM Studios',
  'Apple Studios',
  'Lionsgate Studios',
];

const CUSTOM_OPTION = '__custom__';

function Matching() {
  const profiles = mockProfiles;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [roleCustom, setRoleCustom] = useState('');
  const [genreFilter, setGenreFilter] = useState('All Genres');
  const [genreCustom, setGenreCustom] = useState('');
  const [ageFilter, setAgeFilter] = useState('All Ages');
  const [ageCustom, setAgeCustom] = useState('');
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [locationCustom, setLocationCustom] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('All Experience');
  const [experienceCustom, setExperienceCustom] = useState('');
  const [payFilter, setPayFilter] = useState('All Pay');
  const [payCustom, setPayCustom] = useState('');
  const [abilityFilter, setAbilityFilter] = useState('All Abilities');
  const [abilityCustom, setAbilityCustom] = useState('');
  const [projectFilter, setProjectFilter] = useState('All Projects');
  const [projectCustom, setProjectCustom] = useState('');
  const [companyFilter, setCompanyFilter] = useState('All Companies');
  const [companyCustom, setCompanyCustom] = useState('');
  const [showImages, setShowImages] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const roleOptions = useMemo(() => {
    const roles = new Set(profiles.map((profile) => profile.role));
    return ['All Roles', ...Array.from(roles).sort()];
  }, [profiles]);

  const genreOptions = useMemo(() => {
    const genres = new Set(profiles.flatMap((profile) => profile.genres));
    return ['All Genres', ...Array.from(genres).sort()];
  }, [profiles]);

  const locationOptions = useMemo(() => {
    const locations = new Set(profiles.map((profile) => profile.location));
    return ['All Locations', ...Array.from(locations).sort()];
  }, [profiles]);

  const abilityOptions = useMemo(() => {
    const abilities = new Set(profiles.flatMap((profile) => profile.abilities));
    return ['All Abilities', ...Array.from(abilities).sort()];
  }, [profiles]);

  const normalizedTerm = (value) => value.trim().toLowerCase();

  const ageLabel = (age) => {
    if (age <= 2) return 'Infant';
    if (age <= 9) return 'Child';
    if (age <= 12) return 'Pre-teen';
    if (age <= 17) return 'Teen';
    if (age <= 25) return 'Young Adult';
    if (age <= 44) return 'Adult';
    if (age <= 64) return 'Middle Aged';
    return 'Mature';
  };

  const filteredProfiles = useMemo(() => {
    const matchesCustomText = (value, custom) => {
      if (!normalizedTerm(custom)) return true;
      return normalizedTerm(value).includes(normalizedTerm(custom));
    };

    return profiles.filter((profile) => {
      const matchesRole = roleFilter === 'All Roles'
        || (roleFilter === CUSTOM_OPTION
          ? matchesCustomText(profile.role, roleCustom)
          : profile.role === roleFilter);
      const matchesGenre = genreFilter === 'All Genres'
        || (genreFilter === CUSTOM_OPTION
          ? profile.genres.some((genre) => matchesCustomText(genre, genreCustom))
          : profile.genres.includes(genreFilter));
      const matchesAge = ageFilter === 'All Ages'
        || (ageFilter === CUSTOM_OPTION
          ? matchesCustomText(ageLabel(profile.age), ageCustom)
          : ageLabel(profile.age) === ageFilter);
      const matchesLocation = locationFilter === 'All Locations'
        || (locationFilter === CUSTOM_OPTION
          ? matchesCustomText(profile.location, locationCustom)
          : profile.location === locationFilter);
      const matchesExperience = experienceFilter === 'All Experience'
        || (experienceFilter === CUSTOM_OPTION
          ? matchesCustomText(profile.experience, experienceCustom)
          : profile.experience === experienceFilter);
      const matchesPay = payFilter === 'All Pay'
        || (payFilter === CUSTOM_OPTION
          ? matchesCustomText(profile.pay, payCustom)
          : profile.pay === payFilter);
      const matchesAbility = abilityFilter === 'All Abilities'
        || (abilityFilter === CUSTOM_OPTION
          ? profile.abilities.some((ability) => matchesCustomText(ability, abilityCustom))
          : profile.abilities.includes(abilityFilter));
      const matchesProject = projectFilter === 'All Projects'
        || (projectFilter === CUSTOM_OPTION
          ? matchesCustomText(profile.project, projectCustom)
          : profile.project === projectFilter);
      const matchesCompany = companyFilter === 'All Companies'
        || (companyFilter === CUSTOM_OPTION
          ? matchesCustomText(profile.company, companyCustom)
          : profile.company === companyFilter);

      return (
        matchesRole
        && matchesGenre
        && matchesAge
        && matchesLocation
        && matchesExperience
        && matchesPay
        && matchesAbility
        && matchesProject
        && matchesCompany
      );
    });
  }, [
    profiles,
    roleFilter,
    roleCustom,
    genreFilter,
    genreCustom,
    ageFilter,
    ageCustom,
    locationFilter,
    locationCustom,
    experienceFilter,
    experienceCustom,
    payFilter,
    payCustom,
    abilityFilter,
    abilityCustom,
    projectFilter,
    projectCustom,
    companyFilter,
    companyCustom,
  ]);

  const currentProfile = filteredProfiles[currentIndex];
  const photoCount = currentProfile?.images?.length ?? 0;
  const activePhoto = photoCount > 0 ? currentProfile.images[photoIndex % photoCount] : null;

  useEffect(() => {
    setSwipeDirection(null);
    setIsAnimating(false);
  }, [currentIndex]);

  useEffect(() => {
    setPhotoIndex(0);
  }, [currentProfile?.id]);

  useEffect(() => {
    if (currentIndex >= filteredProfiles.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, filteredProfiles.length]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [
    roleFilter,
    roleCustom,
    genreFilter,
    genreCustom,
    ageFilter,
    ageCustom,
    locationFilter,
    locationCustom,
    experienceFilter,
    experienceCustom,
    payFilter,
    payCustom,
    abilityFilter,
    abilityCustom,
    projectFilter,
    projectCustom,
    companyFilter,
    companyCustom,
  ]);

  const handleLike = () => {
    if (isAnimating) return;
    setSwipeDirection('approve');
    setIsAnimating(true);
  };

  const handlePass = () => {
    if (isAnimating) return;
    setSwipeDirection('deny');
    setIsAnimating(true);
  };

  const handlePhotoTap = (event) => {
    if (!photoCount) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - bounds.left;
    const goNext = clickX >= bounds.width / 2;

    setPhotoIndex((prev) => {
      if (!photoCount) return 0;
      return goNext
        ? (prev + 1) % photoCount
        : (prev - 1 + photoCount) % photoCount;
    });
  };

  const handlePhotoKeyDown = (event) => {
    if (!photoCount) return;
    if (event.key === 'ArrowRight' || event.key === ' ') {
      event.preventDefault();
      setPhotoIndex((prev) => (prev + 1) % photoCount);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setPhotoIndex((prev) => (prev - 1 + photoCount) % photoCount);
    }
  };

  const handleLocationChange = (event) => {
    setLocationFilter(event.target.value);
  };

  const handleAnimationComplete = () => {
    if (!swipeDirection) return;
    setCurrentIndex((prev) => prev + 1);
    setSwipeDirection(null);
    setIsAnimating(false);
  };

  const renderFilters = () => (
    <div className={`matching-filters ${filtersOpen ? 'is-open' : ''}`}>
      <div className="filter-header">
        <div className="filter-actions">
          <button
            type="button"
            className="filter-toggle"
            onClick={() => setFiltersOpen((prev) => !prev)}
            aria-expanded={filtersOpen}
            aria-label={filtersOpen ? 'Hide filters' : 'Show filters'}
            title="Filters"
          >
            <svg className="icon-btn" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M3 5h18l-7 8v5l-4 2v-7z"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="image-toggle"
            onClick={() => setShowImages((prev) => !prev)}
            aria-label={showImages ? 'Hide images' : 'Show images'}
            title={showImages ? 'Hide Images' : 'Show Images'}
          >
            <svg className="icon-btn" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
              {!showImages && (
                <path
                  d="M4 4l16 16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      <div className={`filter-row ${filtersOpen ? 'is-open' : 'is-collapsed'}`}>
        <label className="filter-control">
          <span>Role</span>
          <select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}>
            {roleOptions.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
            <option value={CUSTOM_OPTION}>Custom...</option>
          </select>
          {roleFilter === CUSTOM_OPTION && (
            <input
              type="text"
              className="filter-custom-input"
              placeholder="Type a role"
              value={roleCustom}
              onChange={(event) => setRoleCustom(event.target.value)}
            />
          )}
        </label>
        <label className="filter-control">
          <span>Genre</span>
          <select value={genreFilter} onChange={(event) => setGenreFilter(event.target.value)}>
            {genreOptions.map((genre) => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
            <option value={CUSTOM_OPTION}>Custom...</option>
          </select>
          {genreFilter === CUSTOM_OPTION && (
            <input
              type="text"
              className="filter-custom-input"
              placeholder="Type a genre"
              value={genreCustom}
              onChange={(event) => setGenreCustom(event.target.value)}
            />
          )}
        </label>
        <label className="filter-control">
          <span>Age</span>
          <select value={ageFilter} onChange={(event) => setAgeFilter(event.target.value)}>
            {ageOptions.map((age) => (
              <option key={age} value={age}>{age}</option>
            ))}
            <option value={CUSTOM_OPTION}>Custom...</option>
          </select>
          {ageFilter === CUSTOM_OPTION && (
            <input
              type="text"
              className="filter-custom-input"
              placeholder="Type an age group"
              value={ageCustom}
              onChange={(event) => setAgeCustom(event.target.value)}
            />
          )}
        </label>
        <label className="filter-control">
          <span>Location</span>
          <select value={locationFilter} onChange={handleLocationChange}>
            {locationOptions.map((location) => (
              <option key={location} value={location}>{location}</option>
            ))}
            <option value={CUSTOM_OPTION}>Custom...</option>
          </select>
          {locationFilter === CUSTOM_OPTION && (
            <input
              type="text"
              className="filter-custom-input"
              placeholder="Type a location"
              value={locationCustom}
              onChange={(event) => setLocationCustom(event.target.value)}
            />
          )}
        </label>
        <label className="filter-control">
          <span>Experience</span>
          <select value={experienceFilter} onChange={(event) => setExperienceFilter(event.target.value)}>
            {experienceOptions.map((experience) => (
              <option key={experience} value={experience}>{experience}</option>
            ))}
            <option value={CUSTOM_OPTION}>Custom...</option>
          </select>
          {experienceFilter === CUSTOM_OPTION && (
            <input
              type="text"
              className="filter-custom-input"
              placeholder="Type experience"
              value={experienceCustom}
              onChange={(event) => setExperienceCustom(event.target.value)}
            />
          )}
        </label>
        <label className="filter-control">
          <span>Pay</span>
          <select value={payFilter} onChange={(event) => setPayFilter(event.target.value)}>
            {payOptions.map((pay) => (
              <option key={pay} value={pay}>{pay}</option>
            ))}
            <option value={CUSTOM_OPTION}>Custom...</option>
          </select>
          {payFilter === CUSTOM_OPTION && (
            <input
              type="text"
              className="filter-custom-input"
              placeholder="Type pay details"
              value={payCustom}
              onChange={(event) => setPayCustom(event.target.value)}
            />
          )}
        </label>
        <label className="filter-control">
          <span>Abilities</span>
          <select value={abilityFilter} onChange={(event) => setAbilityFilter(event.target.value)}>
            {abilityOptions.map((ability) => (
              <option key={ability} value={ability}>{ability}</option>
            ))}
            <option value={CUSTOM_OPTION}>Custom...</option>
          </select>
          {abilityFilter === CUSTOM_OPTION && (
            <input
              type="text"
              className="filter-custom-input"
              placeholder="Type an ability"
              value={abilityCustom}
              onChange={(event) => setAbilityCustom(event.target.value)}
            />
          )}
        </label>
        <label className="filter-control">
          <span>Project</span>
          <select value={projectFilter} onChange={(event) => setProjectFilter(event.target.value)}>
            {projectOptions.map((project) => (
              <option key={project} value={project}>{project}</option>
            ))}
            <option value={CUSTOM_OPTION}>Custom...</option>
          </select>
          {projectFilter === CUSTOM_OPTION && (
            <input
              type="text"
              className="filter-custom-input"
              placeholder="Type a project"
              value={projectCustom}
              onChange={(event) => setProjectCustom(event.target.value)}
            />
          )}
        </label>
        <label className="filter-control">
          <span>Company</span>
          <select value={companyFilter} onChange={(event) => setCompanyFilter(event.target.value)}>
            {companyOptions.map((company) => (
              <option key={company} value={company}>{company}</option>
            ))}
            <option value={CUSTOM_OPTION}>Custom...</option>
          </select>
          {companyFilter === CUSTOM_OPTION && (
            <input
              type="text"
              className="filter-custom-input"
              placeholder="Type a company"
              value={companyCustom}
              onChange={(event) => setCompanyCustom(event.target.value)}
            />
          )}
        </label>
      </div>
    </div>
  );

  if (!currentProfile) {
    return (
      <div className="matching-page">
        <div className="matching-container">
          {renderFilters()}
          <div className="no-more-profiles">
            <h2>No matches yet</h2>
            <p>Try widening your search or clearing a filter.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="matching-page">
      <div className="matching-container">
        {renderFilters()}
        <motion.div
          key={currentProfile.id}
          className="profile-layout"
          initial={{ x: 0, rotate: 0, scale: 0.98 }}
          animate={
            swipeDirection === 'approve'
              ? { x: 420, rotate: 6, scale: 1 }
              : swipeDirection === 'deny'
                ? { x: -420, rotate: -6, scale: 1 }
                : { x: 0, rotate: 0, scale: 1 }
          }
          transition={{ type: 'spring', stiffness: 180, damping: 26, mass: 0.9 }}
          onAnimationComplete={handleAnimationComplete}
        >
          <div className="card-stack">
            <div className="profile-stage">
              <div
                className="photo-gallery"
                role="button"
                tabIndex={0}
                onClick={handlePhotoTap}
                onKeyDown={handlePhotoKeyDown}
                aria-label="Tap left or right to change photos"
              >
                <div className="photo-section">
                  <div className={`card-image ${showImages ? '' : 'no-photo'}`}>
                    {showImages && activePhoto && (
                      <img
                        src={activePhoto}
                        alt={`${currentProfile.name} ${photoIndex + 1}`}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="image-action-buttons">
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
                aria-label="Approve"
              >
                ✓
              </button>
            </div>
          </div>
          <section className="profile-details">
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
              <div className="card-prompts">
                {currentProfile.prompts?.map((prompt, idx) => (
                  <div key={idx} className="prompt-card">
                    <span className="prompt-question">{prompt.question}</span>
                    <p className="prompt-answer">{prompt.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}

export default Matching;
