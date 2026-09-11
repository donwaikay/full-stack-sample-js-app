export interface Title {
  id: number;
  name: string;
  synopsis: string;
  genres: string[];
  maturity: string;
  year: number;
  durationMinutes: number;
  match: number;
  accent: string;
  videoUrl: string;
}

export interface Row {
  label: string;
  titleIds: number[];
}

// Playback uses a small set of real, freely-licensed short clips (Creative
// Commons Blender Foundation films re-encoded by test-videos.co.uk for HTML5
// video testing, plus an MDN CC0 sample), so "play" is genuine video
// playback rather than a stub, without any copyright risk. Kept small
// (~1-2MB) so playback starts quickly.
const SAMPLE_VIDEOS = [
  'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4',
  'https://test-videos.co.uk/vids/sintel/mp4/h264/720/Sintel_720_10s_2MB.mp4',
  'https://test-videos.co.uk/vids/jellyfish/mp4/h264/720/Jellyfish_720_10s_2MB.mp4',
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
];

const ACCENTS = ['#e50914', '#0071eb', '#8b5cf6', '#f59e0b', '#10b981', '#ec4899', '#6366f1', '#14b8a6'];

const RAW: Omit<Title, 'accent' | 'videoUrl'>[] = [
  { id: 1, name: 'Bunny Hill', synopsis: 'A gentle rabbit is pushed too far by a trio of bullying rodents and finally strikes back.', genres: ['Animation', 'Comedy'], maturity: 'PG', year: 2008, durationMinutes: 10, match: 97 },
  { id: 2, name: 'The Machine Dream', synopsis: 'Two clockwork societies clash as one dreamer risks everything to cross into the world of the machines.', genres: ['Sci-Fi', 'Fantasy'], maturity: 'PG-13', year: 2006, durationMinutes: 11, match: 95 },
  { id: 3, name: 'Windmark', synopsis: 'A young woman hunts the shapeshifting monster that destroyed her village, uncovering a darker truth.', genres: ['Fantasy', 'Action'], maturity: 'R', year: 2010, durationMinutes: 15, match: 93 },
  { id: 4, name: 'Steel Horizon', synopsis: 'In a future of clone labor, a factory worker begins to question what — and who — he really is.', genres: ['Sci-Fi', 'Drama'], maturity: 'PG-13', year: 2012, durationMinutes: 12, match: 96 },
  { id: 5, name: 'Blaze Point', synopsis: 'An elite driving crew tears across a neon coastline chasing one last score before sunrise.', genres: ['Action', 'Thriller'], maturity: 'PG-13', year: 2013, durationMinutes: 3, match: 89 },
  { id: 6, name: 'Escape Velocity', synopsis: 'A getaway crew has ninety seconds to clear the bridge before the whole district goes dark.', genres: ['Action', 'Thriller'], maturity: 'PG-13', year: 2013, durationMinutes: 2, match: 91 },
  { id: 7, name: 'Joyride Protocol', synopsis: 'Three friends, one borrowed supercar, and a coastal highway that was never built for this.', genres: ['Action', 'Comedy'], maturity: 'PG-13', year: 2012, durationMinutes: 2, match: 88 },
  { id: 8, name: 'Meltdown City', synopsis: 'When the reactor core goes critical, a skeleton crew has one shot to stop the meltdown.', genres: ['Action', 'Sci-Fi'], maturity: 'PG-13', year: 2011, durationMinutes: 2, match: 90 },
  { id: 9, name: 'Bullrun: Overdrive', synopsis: 'An underground cross-country rally becomes a battle of nerve, speed, and sabotage.', genres: ['Action', 'Documentary-Style'], maturity: 'PG-13', year: 2011, durationMinutes: 8, match: 86 },
  { id: 10, name: 'Paper Warren', synopsis: 'A lonely burrow of rabbits discovers that kindness is the only weapon the bullies can’t out-build.', genres: ['Animation', 'Family'], maturity: 'G', year: 2008, durationMinutes: 10, match: 94 },
  { id: 11, name: 'Iron Bloom', synopsis: 'A gardener in a mechanized city cultivates the last living seed on Earth.', genres: ['Sci-Fi', 'Drama'], maturity: 'PG', year: 2014, durationMinutes: 9, match: 92 },
  { id: 12, name: 'Glasswing', synopsis: 'A grounded engineer builds wings from scrap to reach a floating city she was told didn’t exist.', genres: ['Fantasy', 'Adventure'], maturity: 'PG', year: 2015, durationMinutes: 13, match: 90 },
];

export const CATALOG: Title[] = RAW.map((t, i) => ({
  ...t,
  accent: ACCENTS[i % ACCENTS.length],
  videoUrl: SAMPLE_VIDEOS[i % SAMPLE_VIDEOS.length],
}));

export const ROWS: Row[] = [
  { label: 'Trending Now', titleIds: [1, 4, 5, 9, 11] },
  { label: 'Sci-Fi Picks', titleIds: [2, 4, 8, 11] },
  { label: 'Action & Adventure', titleIds: [3, 5, 6, 7, 8, 9] },
  { label: 'Animation for Everyone', titleIds: [1, 10, 12] },
  { label: 'Critically Acclaimed', titleIds: [2, 3, 4, 11, 12] },
];

export const FEATURED_ID = 4;
