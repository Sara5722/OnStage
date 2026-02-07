import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import marcusImage1 from '../assets/marcus.jpg';
import marcusImage2 from '../assets/marcus2.jpg';
import marcusImage3 from '../assets/marcus3.jpg';
import marcusImage4 from '../assets/marcus4.jpg';
import alexandraImage1 from '../assets/alexandra.jpg';
import alexandraImage2 from '../assets/alexandra2.jpg';
import alexandraImage3 from '../assets/alexandra3.jpg';
import alexandraImage4 from '../assets/alexandra4.jpg';
import dannyImage1 from '../assets/danny.jpg';
import dannyImage2 from '../assets/danny2.jpg';
import dannyImage3 from '../assets/danny3.jpg';
import dannyImage4 from '../assets/danny4.jpg';
import zendayaImage1 from '../assets/zendaya.jpg';
import zendayaImage2 from '../assets/zendaya2.jpg';
import zendayaImage3 from '../assets/zendaya3.jpg';
import zendayaImage4 from '../assets/zendaya4.jpg';
import arianaImage1 from '../assets/ariana.jpg';
import arianaImage2 from '../assets/ariana2.jpg';
import arianaImage3 from '../assets/ariana3.jpg';
import arianaImage4 from '../assets/ariana4.jpg';
import mikeImage1 from '../assets/mike.jpg';
import mikeImage2 from '../assets/mike2.jpg';
import mikeImage3 from '../assets/mike3.jpg';
import mikeImage4 from '../assets/mike4.jpg';
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
    abilities: ['Storyboarding', 'Casting', 'Festival Strategy', 'Script Development', 'Shot Design'],
    project: 'Movie',
    company: 'Walt Disney Studios',
    bio: 'Award-winning director specializing in indie dramas with a soft spot for character-driven thrillers. I love building collaborative sets where every department gets a voice, the tone is intentional, and the camera always has a point of view. Looking for passionate screenwriters and actors who want to make something tender, tense, and bold with a clear visual language.',
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
      alexandraImage1,
      alexandraImage2,
      alexandraImage3,
      alexandraImage4,
    ],
    genres: ['Drama', 'Thriller', 'Mystery'],
    quirks: ['Obsessed with blocking', 'Shoots on film when possible', 'Color palette moodboards'],
    seeking: [
      'Lead actor with dramatic range',
      'DP with moody visual style',
      'Script in final polish',
    ],
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
    abilities: ['Comedy Writing', 'Action Beats', 'Pitch Decks', 'Punch-Up', 'Writers Room'],
    project: 'TV',
    company: 'Netflix Studios',
    bio: 'Comedy-action screenwriter who loves smart banter and set pieces that actually matter. I build worlds with heart, high stakes, and a little chaos, plus plenty of room for improvisation. Multiple scripts in development. Seeking directors and producers who like fast feedback, table reads, and fearless rewrites that sharpen the story.',
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
      marcusImage1,
      marcusImage2,
      marcusImage3,
      marcusImage4,
    ],
    genres: ['Comedy', 'Action', 'Thriller'],
    quirks: ['Whiteboard addict', 'Cold-brew loyalist', 'Names characters after snacks'],
    reel: 'https://example.com/reel2'
  },
  {
    id: 3,
    name: 'Zendaya',
    role: 'Actor',
    age: 28,
    location: 'Los Angeles, CA',
    experience: 'Professional',
    pay: 'Recurring',
    abilities: ['Acting', 'Voiceover', 'Action Training', 'Dramatic Acting'],
    project: 'Movie',
    company: 'HBO',
    bio: 'Award-winning actor and producer known for emotionally grounded performances across film and television, including "Euphoria," the "Spider-Man" films, and "Dune." I am drawn to ambitious storytelling, strong directors, and characters with depth, vulnerability, and grit. I love sets that prioritize trust, rehearsal, and honest conversations about the work.',
    prompts: [
      {
        question: 'Role I am proudest of',
        answer: 'Characters who have to grow up too fast and still find their voice.'
      },
      {
        question: 'Set energy I love',
        answer: 'Focused, kind, and open to creative collaboration.'
      },
      {
        question: 'What I look for',
        answer: 'Stories that challenge me and teams that trust each other.'
      },
    ],
    images: [
      zendayaImage1,
      zendayaImage2,
      zendayaImage3,
      zendayaImage4,
    ],
    genres: ['Drama', 'Comedy', 'Sci-Fi'],
    quirks: ['Playlist for every role', 'Collects character journals', 'Loves long takes'],
    reel: 'https://example.com/reel3'
  },
  {
    id: 4,
    name: 'Ariana Grande',
    role: 'Actor',
    age: 31,
    location: 'Los Angeles, CA',
    experience: 'Professional',
    pay: 'Recurring',
    abilities: ['Singing', 'Acting', 'Voiceover', 'Songwriting', 'Dance'],
    project: 'Movie',
    company: 'Universal Pictures',
    bio: 'Grammy-winning singer and actor known for powerhouse vocals and emotionally honest performances. I love ambitious, high-craft storytelling with music at the center, from pop stages to film sets like "Wicked." Looking for collaborators who value precision, play, and heart, and who take the emotional beats as seriously as the big moments.',
    prompts: [
      {
        question: 'Creative sweet spot',
        answer: 'Big emotions, clean melodies, and characters who feel real.'
      },
      {
        question: 'Set energy I love',
        answer: 'Focused, warm, and playful with room to experiment.'
      },
      {
        question: 'What I look for',
        answer: 'Teams that are kind, prepared, and excited to build something bold.'
      },
    ],
    images: [
      arianaImage1,
      arianaImage2,
      arianaImage3,
      arianaImage4,
    ],
    genres: ['Pop', 'Musical', 'Drama', 'Romance'],
    quirks: ['Vocal warmups at sunrise', 'Likes handwritten lyric notes', 'Collects vintage mics'],
    reel: 'https://example.com/reel5'
  },
  {
    id: 5,
    name: 'Danny DeVito',
    role: 'Producer',
    age: 81,
    location: 'Los Angeles, CA',
    experience: 'Professional',
    pay: 'Expenses Covered',
    abilities: ['Producing', 'Financing', 'Talent Relations', 'Voiceover'],
    project: 'Movie',
    company: 'Jersey Films',
    bio: 'Veteran actor, director, and producer known for character-driven comedy and bold storytelling. I love projects with big heart, sharp wit, and a little bit of chaos. Looking to champion filmmakers who swing for the fences, respect the craft, and keep the set creative, collaborative, and on time.',
    prompts: [
      {
        question: 'Project I always say yes to',
        answer: 'Stories that are funny, fearless, and have real emotional stakes.'
      },
      {
        question: 'Most fun role energy',
        answer: 'The lovable wildcard who steals a scene with heart and mischief.'
      },
      {
        question: 'On-set vibe',
        answer: 'Warm, efficient, and always looking for the honest moment.'
      },
    ],
    images: [
      dannyImage1,
      dannyImage2,
      dannyImage3,
      dannyImage4,
    ],
    genres: ['Drama', 'Comedy', 'Documentary'],
    quirks: ['Always early to set', 'Loves practical gags', 'Champions new voices'],
    seeking: [
      'Ensemble casting for comedy',
      'Tone: character-driven heart',
      'Script ready to shoot',
    ],
    reel: 'https://example.com/reel4'
  },
  {
    id: 6,
    name: 'Mike Williams',
    role: 'Actor',
    age: 30,
    location: 'Chicago, IL',
    experience: 'Advanced',
    pay: 'Hourly',
    abilities: ['Stage Combat', 'Improvisation', 'Voiceover', 'Dialect Work', 'Motion Capture'],
    project: 'TV',
    company: 'Lionsgate Studios',
    bio: 'Versatile actor with a background in theater and on-camera work. I thrive in ensemble casts, love character-driven scripts, and bring grounded, quick-thinking energy to set. Looking for collaborators who value rehearsal, clear direction, and storytelling with momentum. I am especially drawn to projects that blend humor with high stakes.',
    prompts: [
      {
        question: 'Most fun on set',
        answer: 'Building a character through small, honest physical choices.'
      },
      {
        question: 'My sweet spot',
        answer: 'Dramedy roles that balance heart, humor, and stakes.'
      },
      {
        question: 'What I bring',
        answer: 'Preparedness, adaptability, and a collaborative mindset.'
      },
    ],
    images: [
      mikeImage1,
      mikeImage2,
      mikeImage3,
      mikeImage4,
    ],
    genres: ['Drama', 'Comedy', 'Thriller'],
    quirks: ['Keeps a role playlist', 'Notebook full of accents', 'Always ready for table reads'],
    reel: 'https://example.com/reel6'
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
              {currentProfile.quirks?.length > 0 && (
                <div className="card-seeking">
                  <span className="card-subtitle">Quirks</span>
                  <div className="card-seeking-tags">
                    {currentProfile.quirks.map((item, idx) => (
                      <span key={idx} className="seeking-tag">{item}</span>
                    ))}
                  </div>
                </div>
              )}
              {currentProfile.seeking?.length > 0 && (
                <div className="card-seeking">
                  <span className="card-subtitle">Looking for</span>
                  <div className="card-seeking-tags">
                    {currentProfile.seeking.map((item, idx) => (
                      <span key={idx} className="seeking-tag">{item}</span>
                    ))}
                  </div>
                </div>
              )}
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