import { ReadingStory } from '../types';

export const ALL_STORIES: ReadingStory[] = [
  {
    id: 'story-g1-1',
    gradeId: 1,
    title: 'Pip the Little Robin Learns to Fly',
    genre: 'Animal Adventure',
    targetWpm: 45,
    passage: 'Pip was a tiny brown robin. He lived in a cozy nest on a tall apple tree. The morning sun was warm and golden. "You can do it, Pip!" cheered his mother. Pip took a deep breath, spread his soft wings, and flapped with all his might. Whoosh! He was flying high above the green grass and yellow buttercups. Pip chirped with pure joy!',
    wordCount: 65,
    difficultWords: ['robin', 'cozy', 'golden', 'flapped', 'buttercups'],
    comprehensionQuestions: [
      {
        question: 'Where did Pip live?',
        options: ['In a cozy nest on an apple tree', 'In a dark cave', 'Under a cold bridge', 'Inside a wooden box'],
        correctIndex: 0,
        explanation: 'Pip lived in a cozy nest built upon a tall apple tree.',
      },
      {
        question: 'How did Pip feel when he flew successfully?',
        options: ['Joyful and cheerful', 'Scared and sad', 'Sleepy', 'Angry'],
        correctIndex: 0,
        explanation: 'Pip chirped with pure joy after flying over the green grass.',
      },
    ],
  },
  {
    id: 'story-g3-1',
    gradeId: 3,
    title: 'The Secret of the Whispering Banyan Tree',
    genre: 'Mystery & Nature',
    targetWpm: 80,
    passage: 'In the tranquil village of Ramgarh stood a magnificent banyan tree with aerial roots reaching down like ancient wooden pillars. Whenever the evening breeze rustled its emerald leaves, villagers said the tree whispered forgotten tales. One summer afternoon, Aanya and Kabir noticed a family of spotted owlets peering curiously from a hollow trunk. By documenting the wildlife quietly without disturbance, the children helped declare the banyan grove a protected village sanctuary.',
    wordCount: 78,
    difficultWords: ['tranquil', 'magnificent', 'aerial roots', 'sanctuary', 'owlets'],
    comprehensionQuestions: [
      {
        question: 'What made the banyan tree special to the villagers?',
        options: [
          'Its vast aerial roots and leaves that rustled like whispering stories',
          'It produced golden apples',
          'It had metal branches',
          'It only grew during winter months'
        ],
        correctIndex: 0,
        explanation: 'The majestic banyan had deep aerial roots and rustling leaves that the villagers revered.',
      },
    ],
  },
  {
    id: 'story-g7-1',
    gradeId: 7,
    title: 'The Young Astronomer and the Meteor Shower',
    genre: 'Science Fiction',
    targetWpm: 120,
    passage: 'Midnight had settled over the quiet town, but fourteen-year-old Tara was wide awake on her terrace, calibrating her six-inch parabolic reflector telescope. Tonight marked the peak of the Perseid meteor shower—debris left behind by Comet Swift-Tuttle entering Earth’s upper atmosphere at velocities exceeding fifty kilometers per second. As atmospheric friction ionized the trail of gases, brilliant incandescent streaks illuminated the constellation Cassiopeia. Tara meticulously recorded the timing, trajectory, and radiant point of forty-two distinct meteors, contributing vital real-time citizen-science observational data to the international astronomical database.',
    wordCount: 92,
    difficultWords: ['calibrating', 'parabolic', 'ionized', 'incandescent', 'trajectory'],
    comprehensionQuestions: [
      {
        question: 'What causes the luminous streaks seen during a meteor shower?',
        options: [
          'Atmospheric friction ionizing comet debris particles at high velocity',
          'Fireworks exploding in the stratosphere',
          'Stars colliding with the Moon',
          'Solar flares reflecting off clouds'
        ],
        correctIndex: 0,
        explanation: 'Meteor streaks result when high-speed space dust vaporizes and ionizes surrounding atmospheric air.',
      },
    ],
  },
  {
    id: 'story-g10-1',
    gradeId: 10,
    title: 'The Archimedes Manuscript and the Lost Geometry',
    genre: 'Historical Science',
    targetWpm: 160,
    passage: 'Deep within the climate-controlled vaults of the conservation laboratory, Dr. Elena Vardas adjusted the focal plane of a multispectral ultraviolet scanner. Before her lay the famed Archimedes Palimpsest—a tenth-century parchment manuscript whose original mathematical treatises had been scraped clean in medieval monasteries to overwrite liturgical prayers. As the specialized narrow-band infrared sensors penetrated the iron-gall ink remnants, faint Greek diagrams of floating paraboloids and mechanical balance lemmas re-emerged from the parchment. Archimedes had calculated areas using early approximations of infinitesimal calculus nearly two millennia before Newton and Leibniz.',
    wordCount: 94,
    difficultWords: ['palimpsest', 'multispectral', 'paraboloids', 'infinitesimal', 'treatises'],
    comprehensionQuestions: [
      {
        question: 'How did scientists reveal the erased mathematical text of Archimedes?',
        options: [
          'Using multispectral ultraviolet and infrared narrow-band sensors',
          'By soaking the parchment in chemical acid',
          'By tracing over the pages with charcoal',
          'By asking medieval historians to rewrite from memory'
        ],
        correctIndex: 0,
        explanation: 'Multispectral imaging detects faint chemical remnants beneath upper ink layers without damaging the ancient parchment.',
      },
    ],
  },
];
