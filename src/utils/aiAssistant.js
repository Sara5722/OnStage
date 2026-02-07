/**
 * Client-side AI assistant to help users find collaborators for their project.
 * Uses keyword matching and a talent knowledge base to suggest people.
 */

// Talent / opportunities aligned with Spotlight and Matching (for suggestions)
export const TALENT_LIST = [
  {
    id: 'sarah-chen',
    name: 'Sarah Chen',
    role: 'Screenwriter',
    genres: ['Drama', 'Indie'],
    location: 'Los Angeles',
    summary: 'Seeking Director for character-driven indie drama. Experience in emotional storytelling.',
    tags: ['Drama', 'Indie', 'Los Angeles'],
  },
  {
    id: 'marcus-johnson',
    name: 'Marcus Johnson',
    role: 'Director',
    genres: ['Thriller'],
    location: 'New York',
    summary: 'Casting lead actor for psychological thriller. 4-week shoot, NYC.',
    tags: ['Thriller', 'Paid', 'New York'],
  },
  {
    id: 'alexandra-martinez',
    name: 'Alexandra Martinez',
    role: 'Producer',
    genres: ['Comedy'],
    location: 'Remote',
    summary: 'Seeking comedy screenwriter for 8-episode web series. Ensemble comedy.',
    tags: ['Comedy', 'Series', 'Remote'],
  },
  {
    id: 'david-kim',
    name: 'David Kim',
    role: 'Actor',
    genres: ['Drama', 'Short Film'],
    location: 'Los Angeles',
    summary: 'Actor/producer seeking director for short film about identity and belonging.',
    tags: ['Short Film', 'Drama', 'Los Angeles'],
  },
  {
    id: 'alexandra-chen',
    name: 'Alexandra Chen',
    role: 'Director',
    genres: ['Drama', 'Thriller'],
    location: 'Los Angeles',
    summary: 'Award-winning director, indie dramas and character-driven thrillers.',
    tags: ['Drama', 'Thriller', 'Indie'],
  },
  {
    id: 'sofia-martinez',
    name: 'Sofia Martinez',
    role: 'Actor',
    genres: ['Drama', 'Comedy'],
    location: 'New York',
    summary: 'Actor with range in drama and comedy. Reel and headshot available.',
    tags: ['Drama', 'Comedy', 'New York'],
  },
];

const ROLES = ['director', 'actor', 'screenwriter', 'writer', 'producer', 'cinematographer', 'dp', 'editor'];
const GENRES = ['drama', 'comedy', 'thriller', 'horror', 'indie', 'short film', 'series', 'tv', 'movie', 'action', 'romance'];
const LOCATIONS = ['los angeles', 'la', 'new york', 'nyc', 'ny', 'remote', 'london', 'chicago', 'atlanta'];

function extractKeywords(text) {
  const lower = text.toLowerCase().replace(/[^\w\s]/g, ' ');
  const words = lower.split(/\s+/).filter((w) => w.length > 1);
  return words;
}

function matchRole(words) {
  for (const word of words) {
    if (ROLES.some((r) => word.includes(r) || r.includes(word))) {
      if (word.includes('director') || word === 'director') return 'Director';
      if (word.includes('actor') || word.includes('actress') || word === 'actor') return 'Actor';
      if (word.includes('screenwriter') || word.includes('writer')) return 'Screenwriter';
      if (word.includes('producer')) return 'Producer';
      if (word.includes('cinematographer') || word === 'dp') return 'Director'; // often paired with director search
      if (word.includes('editor')) return 'Director';
    }
  }
  return null;
}

function matchGenres(words) {
  const found = [];
  for (const word of words) {
    for (const g of GENRES) {
      if (word.includes(g) || g.includes(word)) {
        const label = g.charAt(0).toUpperCase() + g.slice(1);
        if (!found.includes(label)) found.push(label);
      }
    }
  }
  return found;
}

function matchLocation(words) {
  const text = words.join(' ');
  if (/\b(remote|remotely|anywhere)\b/.test(text)) return 'Remote';
  if (/\b(la|los angeles)\b/.test(text)) return 'Los Angeles';
  if (/\b(nyc|new york|ny)\b/.test(text)) return 'New York';
  if (/\blondon\b/.test(text)) return 'London';
  if (/\bchicago\b/.test(text)) return 'Chicago';
  if (/\batlanta\b/.test(text)) return 'Atlanta';
  return null;
}

function scoreTalent(talent, role, genres, location) {
  let score = 0;
  if (role && talent.role.toLowerCase() === role.toLowerCase()) score += 10;
  if (role && talent.summary.toLowerCase().includes(role.toLowerCase())) score += 5;
  if (genres.length) {
    for (const g of genres) {
      if (talent.genres.some((tg) => tg.toLowerCase().includes(g.toLowerCase()))) score += 4;
      if (talent.tags.some((t) => t.toLowerCase().includes(g.toLowerCase()))) score += 2;
    }
  }
  if (location) {
    if (talent.location.toLowerCase().includes(location.toLowerCase())) score += 6;
    if (talent.tags.some((t) => t.toLowerCase().includes(location.toLowerCase()))) score += 3;
  }
  return score;
}

/**
 * Get a bot reply and optional list of suggested people.
 * @param {string} userMessage - Latest user message
 * @param {{ role?: string, genres?: string[], location?: string }} context - Optional accumulated context
 * @returns {{ text: string, suggestions?: typeof TALENT_LIST }}
 */
export function getBotResponse(userMessage, context = {}) {
  const words = extractKeywords(userMessage);
  const role = context.role || matchRole(words);
  const genres = context.genres?.length ? context.genres : matchGenres(words);
  const location = context.location || matchLocation(words);

  // Greeting / generic help
  const wordCount = words.length;
  const msgLen = userMessage.trim().length;
  const isGreeting = /\b(hi|hello|hey|help|what can you do)\b/.test(userMessage.toLowerCase());
  if (wordCount <= 3 && (isGreeting || msgLen <= 3)) {
    return {
      text: "I'm here to help you find the right people for your project. Tell me what you're looking for—for example: \"I need a director for an indie drama\" or \"Looking for a screenwriter for a comedy series in LA.\" The more you share (role, type of project, location), the better I can suggest matches.",
      suggestions: null,
    };
  }

  // Score and sort talent
  const scored = TALENT_LIST.map((t) => ({
    talent: t,
    score: scoreTalent(t, role, genres, location),
  }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  const top = scored.slice(0, 4).map((s) => s.talent);

  if (top.length === 0) {
    return {
      text: "I don't have a perfect match yet. Try describing who you need: for example a **director**, **actor**, **screenwriter**, or **producer**, and the type of project (drama, comedy, thriller, indie, etc.) or location (LA, NYC, remote). I'll suggest people from the OnStage community who might be a fit.",
      suggestions: null,
    };
  }

  const rolePhrase = role ? ` for a ${role}` : '';
  const genrePhrase = genres.length ? ` in ${genres.slice(0, 2).join(' or ')}` : '';
  const locPhrase = location ? ` (${location})` : '';
  const intro =
    top.length === 1
      ? "Here's someone who might be a good fit:"
      : `Here are ${top.length} people who might be a good fit${rolePhrase}${genrePhrase}${locPhrase}:`;

  return {
    text: intro + " Check out their profiles on the Matching page to connect.",
    suggestions: top,
  };
}
