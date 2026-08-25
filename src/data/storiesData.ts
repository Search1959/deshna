import { ReadingStory } from '../types';

export const ALL_STORIES: ReadingStory[] = [
  // 1. English - Grade 1
  {
    id: 'story-g1-1',
    gradeId: 1,
    title: 'Pip the Little Robin Learns to Fly',
    genre: 'Animal Adventure',
    language: 'English',
    languageCode: 'en',
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

  // 2. English - Grade 2 (Animal Adventure & Nature)
  {
    id: 'story-g2-1',
    gradeId: 2,
    title: 'Sammy the Brave Squirrel and the Giant Oak',
    genre: 'Animal Adventure',
    language: 'English',
    languageCode: 'en',
    targetWpm: 60,
    passage: 'Sammy was a lively grey squirrel who loved gathering crunchy acorns in the green forest. One breezy morning, he noticed a tiny baby sparrow shivering on a low branch near a rushing stream. Sammy quickly gathered soft pine needles and dried moss to weave a warm shelter. When the mother bird returned, she sang a sweet melody of gratitude. Sammy danced playfully along the branches, proud of his good deed.',
    wordCount: 72,
    difficultWords: ['gathering', 'shivering', 'gratitude', 'melody', 'shelter'],
    comprehensionQuestions: [
      {
        question: 'Why was the baby sparrow shivering?',
        options: ['It was cold on a low branch near the stream', 'It was playing a game', 'It was eating acorns', 'It was flying high'],
        correctIndex: 0,
        explanation: 'The baby sparrow was feeling cold near the rushing stream before Sammy built a shelter.',
      },
      {
        question: 'What did Sammy use to create the warm shelter?',
        options: ['Soft pine needles and dried moss', 'Heavy stones', 'Plastic covers', 'Ice cubes'],
        correctIndex: 0,
        explanation: 'Sammy collected soft forest pine needles and moss.',
      },
    ],
  },

  // 3. English - Grade 3 (Mystery & Nature)
  {
    id: 'story-g3-1',
    gradeId: 3,
    title: 'The Secret of the Whispering Banyan Tree',
    genre: 'Mystery & Nature',
    language: 'English',
    languageCode: 'en',
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
          'It only grew during winter months',
        ],
        correctIndex: 0,
        explanation: 'The majestic banyan had deep aerial roots and rustling leaves that the villagers revered.',
      },
    ],
  },

  // 4. English - Grade 4 (Math Quest & Curiosity)
  {
    id: 'story-g4-1',
    gradeId: 4,
    title: 'The Mystery of the Sundial and the Palace Shadow',
    genre: 'Science & History',
    language: 'English',
    languageCode: 'en',
    targetWpm: 95,
    passage: 'Princess Maya loved exploring the ancient stone observatory in Jaipur. She carried a brass notebook and a wooden ruler. At precisely twelve noon on the summer solstice, she noticed that the giant gnomon cast the shortest shadow of the entire year. By measuring the angle of the sunlight and calculating the ratios, Maya verified how astronomical instruments helped ancient astronomers calculate time and planetary motions without modern clocks. Her grandfather smiled proudly at her scientific curiosity.',
    wordCount: 80,
    difficultWords: ['observatory', 'solstice', 'gnomon', 'astronomical', 'ratios'],
    comprehensionQuestions: [
      {
        question: 'When was the sundial shadow shortest?',
        options: ['At noon on the summer solstice', 'At midnight', 'During winter evening', 'At sunrise'],
        correctIndex: 0,
        explanation: 'The sun reaches its highest celestial altitude at noon on the summer solstice, creating the shortest shadow.',
      },
    ],
  },

  // 5. English - Grade 5 (Space Science & Exploration)
  {
    id: 'story-g5-1',
    gradeId: 5,
    title: 'Chandrayaan: Landing on the Moon’s South Pole',
    genre: 'Space Science',
    language: 'English',
    languageCode: 'en',
    targetWpm: 110,
    passage: 'The control center fell silent as telemetry signals flashed across the giant screens. Millions of citizens held their breath. The Vikram lander fired its liquid propulsion thrusters to decelerate smoothly against lunar gravity. With extreme precision, the automated guidance computer identified a safe boulder-free touchdown site near the South Pole. "Lander touchdown confirmed!" announced the mission director. Cheerful applause erupted nationwide as the Pragyan rover prepared to roll down its ramp to search for water ice.',
    wordCount: 81,
    difficultWords: ['telemetry', 'propulsion', 'decelerate', 'automated', 'precision'],
    comprehensionQuestions: [
      {
        question: 'What was the Pragyan rover looking for on the lunar South Pole?',
        options: ['Water ice and mineral composition', 'Alien ruins', 'Sandstorms', 'Liquid oceans'],
        correctIndex: 0,
        explanation: 'Scientists explore the permanently shadowed craters of the lunar south pole for traces of water ice.',
      },
    ],
  },

  // 6. English - Grade 6 (Environmental Science)
  {
    id: 'story-g6-1',
    gradeId: 6,
    title: 'The Great River Expedition and the Mangrove Guardians',
    genre: 'Environmental Science',
    language: 'English',
    languageCode: 'en',
    targetWpm: 115,
    passage: 'Navigating through the brackish waterways of the Sundarbans, twelve-year-old Dev observed how stilt roots of mangrove trees interlocked to stabilize delicate muddy banks against tidal surges. These coastal forests acted as a natural shield against destructive tropical cyclones and served as nurseries for vibrant fish species. Recognizing the urgent threat of plastic debris, Dev and his local youth club initiated a river-bank cleanup, inspiring three neighboring schools to protect the mangrove ecosystem.',
    wordCount: 76,
    difficultWords: ['brackish', 'interlocked', 'cyclones', 'nurseries', 'ecosystem'],
    comprehensionQuestions: [
      {
        question: 'How do mangrove roots protect coastal regions?',
        options: ['They stabilize shorelines and act as natural shields against storm surges', 'They freeze the river water', 'They block sunlight', 'They drain water completely'],
        correctIndex: 0,
        explanation: 'Interlocking stilt roots trap sediment and buffer coastlines against powerful cyclone tides.',
      },
    ],
  },

  // 7. English - Grade 7 (Science Fiction)
  {
    id: 'story-g7-1',
    gradeId: 7,
    title: 'The Young Astronomer and the Meteor Shower',
    genre: 'Science Fiction',
    language: 'English',
    languageCode: 'en',
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
          'Solar flares reflecting off clouds',
        ],
        correctIndex: 0,
        explanation: 'Meteor streaks result when high-speed space dust vaporizes and ionizes surrounding atmospheric air.',
      },
    ],
  },

  // 8. English - Grade 10 (Historical Science)
  {
    id: 'story-g10-1',
    gradeId: 10,
    title: 'The Archimedes Manuscript and the Lost Geometry',
    genre: 'Historical Science',
    language: 'English',
    languageCode: 'en',
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
          'By asking medieval historians to rewrite from memory',
        ],
        correctIndex: 0,
        explanation: 'Multispectral imaging detects faint chemical remnants beneath upper ink layers without damaging the ancient parchment.',
      },
    ],
  },

  // 9. Hindi - Grade 2 (Panchatantra & Moral)
  {
    id: 'story-hi-g2',
    gradeId: 2,
    title: 'नन्ही गिलहरी और बहती नदी (The Little Squirrel)',
    genre: 'Moral & Nature',
    language: 'Hindi',
    languageCode: 'hi',
    targetWpm: 55,
    passage: 'एक सुंदर हरे-भरे जंगल में चीकू नाम की एक नन्ही गिलहरी रहती थी। एक दिन नदी का पानी बहुत तेज़ बह रहा था। चीकू ने देखा कि किनारे पर एक छोटी चींटी पानी में बह रही थी। चीकू ने तुरंत एक सूखा पत्ता तोड़ा और पानी में गिरा दिया। चींटी पत्ते पर चढ़ गई और उसकी जान बच गई। चींटी ने चीकू को धन्यवाद दिया। सच्ची मित्रता और मदद से हर मुश्किल आसान हो जाती है।',
    wordCount: 75,
    difficultWords: ['गिलहरी', 'धन्यवाद', 'मित्रता', 'मुश्किल', 'किनारे'],
    comprehensionQuestions: [
      {
        question: 'चीकू ने चींटी की जान कैसे बचाई?',
        options: ['पानी में सूखा पत्ता गिराकर', 'दौड़कर दूर जाकर', 'पेड़ पर छिपकर', 'शोर मचाकर'],
        correctIndex: 0,
        explanation: 'चीकू ने पत्ता पानी में डालकर चींटी को उस पर चढ़ने में मदद की।',
      },
      {
        question: 'इस कहानी से हमें क्या सीख मिलती है?',
        options: ['दूसरों की निस्वार्थ मदद करनी चाहिए', 'अकेले रहना चाहिए', 'किसी से बात नहीं करनी चाहिए', 'नदी में तैरना चाहिए'],
        correctIndex: 0,
        explanation: 'जरूरतमंद की मदद करने से सच्ची मित्रता और भलाई बढ़ती है।',
      },
    ],
  },

  // 10. Hindi - Grade 3 (Panchatantra Folklore)
  {
    id: 'story-hi-g3',
    gradeId: 3,
    title: 'पंचतंत्र: एकता में ही सच्चा बल है (Strength in Unity)',
    genre: 'Panchatantra',
    language: 'Hindi',
    languageCode: 'hi',
    targetWpm: 75,
    passage: 'एक घने जंगल में कबूतरों का एक दल रहता था। उनका मुखिया चित्रग्रीव बहुत समझदार था। एक दिन शिकारी ने दाना डालकर उन पर जाल फेंक दिया। सभी कबूतर जाल में फंसकर घबरा गए। तब चित्रग्रीव ने कहा— "घबराओ मत! यदि हम सब एक साथ एक ही दिशा में अपने पंख फड़फड़ाएँ, तो हम इस जाल को लेकर उड़ सकते हैं।" सभी ने मिलकर पूरी ताकत लगाई और जाल सहित आसमान में उड़ गए। उन्होंने मिलकर अपनी आज़ादी हासिल की।',
    wordCount: 82,
    difficultWords: ['चित्रग्रीव', 'दिशा', 'फड़फड़ाएँ', 'आज़ादी', 'शिकारी'],
    comprehensionQuestions: [
      {
        question: 'कबूतरों के मुखिया का क्या नाम था?',
        options: ['चित्रग्रीव', 'चीकू', 'रॉबिन', 'तेनाली'],
        correctIndex: 0,
        explanation: 'कबूतरों के बुद्धिमान मुखिया का नाम चित्रग्रीव था।',
      },
      {
        question: 'कबूतर जाल से कैसे मुक्त हुए?',
        options: ['सबने मिलकर एक साथ जाल लेकर उड़ान भरी', 'शिकारी ने उन्हें छोड़ दिया', 'जाल खुद कट गया', 'वे चुपचाप बैठे रहे'],
        correctIndex: 0,
        explanation: 'एकजुट होकर सबने एक साथ जोर लगाया और जाल लेकर उड़ गए।',
      },
    ],
  },

  // 11. Hindi - Grade 4 (Tenali Raman & Wit)
  {
    id: 'story-hi-g4',
    gradeId: 4,
    title: 'तेनालीराम और जादुई कुआँ (Tenali Raman and the Magic Well)',
    genre: 'Folklore & Wit',
    language: 'Hindi',
    languageCode: 'hi',
    targetWpm: 90,
    passage: 'महाराज कृष्णदेवराय के दरबार में एक धूर्त व्यापारी आया। उसने दावा किया कि उसके पास ऐसा जादुई बीज है जो खारे पानी को मीठा बना देता है। तेनालीराम ने व्यापारी की चालाकी समझ ली। अगले दिन तेनालीराम ने महाराज के सामने खारे पानी में साधारण मिश्री और नींबू मिलाकर पेश किया और कहा कि सच्चा जादू विज्ञान और समझदारी में है, किसी ढोंग में नहीं। महाराज ने प्रसन्न होकर तेनालीराम की तीव्र बुद्धि की प्रशंसा की।',
    wordCount: 78,
    difficultWords: ['कृष्णदेवराय', 'व्यापारी', 'साधारण', 'प्रशंसा', 'विज्ञान'],
    comprehensionQuestions: [
      {
        question: 'तेनालीराम ने दरबार में क्या सिद्ध किया?',
        options: ['सच्चा जादू विज्ञान और समझदारी में है', 'व्यापारी सच बोल रहा था', 'पानी खारा ही रहता है', 'जादू सब कुछ कर सकता है'],
        correctIndex: 0,
        explanation: 'तेनालीराम ने बताया कि तर्क और विज्ञान से ही सच सामने आता है।',
      },
    ],
  },

  // 12. Hindi - Grade 5 (Space Exploration & Science)
  {
    id: 'story-hi-g5',
    gradeId: 5,
    title: 'चंद्रयान की ऐतिहासिक अंतरिक्ष यात्रा (Chandrayaan Space Odyssey)',
    genre: 'Space Science',
    language: 'Hindi',
    languageCode: 'hi',
    targetWpm: 105,
    passage: 'भारतीय वैज्ञानिकों के अथक परिश्रम से चंद्रयान-३ का विक्रम लैंडर चंद्रमा के दक्षिणी ध्रुव पर सफलतापूर्वक उतरा। जैसे ही लैंडर ने चंद्रमा की सतह को छुआ, पूरे देश में तिरंगा लहराने लगा और वैज्ञानिकों के चेहरे खुशी से खिल उठे। इसके बाद प्रज्ञान रोवर बाहर निकला और उसने चंद्रमा की मिट्टी में सल्फर, एल्युमिनियम और लोहे जैसे खनिजों की उपस्थिति दर्ज की। यह भारत के गौरवशाली वैज्ञानिक सामर्थ्य का अनुपम प्रमाण है।',
    wordCount: 75,
    difficultWords: ['अथक परिश्रम', 'सफलतापूर्वक', 'वैज्ञानिकों', 'सामर्थ्य', 'खनिजों'],
    comprehensionQuestions: [
      {
        question: 'प्रज्ञान रोवर ने चंद्रमा की मिट्टी में किन तत्वों की पहचान की?',
        options: ['सल्फर, एल्युमिनियम और खनिज', 'सोना और हीरे', 'प्लास्टिक और लकड़ी', 'केवल समुद्री जल'],
        correctIndex: 0,
        explanation: 'प्रज्ञान रोवर के स्पेक्ट्रोस्कोप ने सल्फर और अन्य महत्वपूर्ण खनिजों के प्रमाण दर्ज किए।',
      },
    ],
  },

  // 13. Marathi - Grade 6 (Historical Valor & Maharashtra)
  {
    id: 'story-mr-g6',
    gradeId: 6,
    title: 'सह्याद्रीचे दुर्ग आणि शिवरायांची नीती (Forts of Sahyadri)',
    genre: 'Historical Science',
    language: 'Marathi',
    languageCode: 'mr',
    targetWpm: 90,
    passage: 'सह्याद्रीच्या उत्तुंग रांगांमध्ये छत्रपती शिवाजी महाराजांनी स्वराज्याची स्थापना केली. रायगड, प्रतापगड आणि सिंधुदुर्ग या जलदुर्गांची रचना अत्यंत उत्कृष्ट स्थापत्यकलेचा नमुना आहे. महाराजांनी स्थानिक मावळ्यांना सोबत घेऊन गनिमी काव्याचा प्रभावी वापर केला. जलसंवर्धन आणि पर्यावरण रक्षणासाठी दुर्गांवर पाण्याचे हौद आणि हिरवेगार वृक्ष जोपासले गेले. ही प्रेरणादायी युद्धनीती आणि सुशासन आजही संपूर्ण विश्वात आदराने अभ्यासले जाते.',
    wordCount: 65,
    difficultWords: ['स्थापत्यकला', 'गनिमी कावा', 'जलसंवर्धन', 'सुशासन', 'उत्तुंग'],
    comprehensionQuestions: [
      {
        question: 'शिवरायांनी गडांवर कशाची उत्तम व्यवस्था केली होती?',
        options: ['पाण्याचे हौद, तटबंदी आणि पर्यावरण रक्षण', 'केवळ सोन्याचे महाल', 'मोठ्या बाजारपेठा', 'काचेचे रस्ते'],
        correctIndex: 0,
        explanation: 'गडांवर जलसंवर्धन आणि नैसर्गिक रचनेचा पुरेपूर वापर करण्यात आला होता.',
      },
    ],
  },

  // 14. Gujarati - Grade 3 (Folk Tale & Wisdom)
  {
    id: 'story-gu-g3',
    gradeId: 3,
    title: 'ચતુર કાગડો અને બુદ્ધિનો ઉપયોગ (The Clever Crow)',
    genre: 'Folk Tale',
    language: 'Gujarati',
    languageCode: 'gu',
    targetWpm: 75,
    passage: 'ઉનાળાના બળબળતા બપોરે એક કાગડાને ખૂબ તરસ લાગી હતી. તે પાણીની શોધમાં આમતેમ ભટકતો રહ્યો. છેવટે તેને એક બગીચામાં માટીનો ઘડો દેખાયો. ઘડામાં પાણી ખૂબ ઊંડે હતું. કાગડાએ હિંમત ન હારી. તેણે આજુબાજુથી નાના કાંકરા લાવીને એક પછી એક ઘડામાં નાખ્યા. ધીમે ધીમે પાણી ઉપર આવ્યું. કાગડાએ સંતોષથી પાણી પીધું અને આકાશમાં ઊડી ગયો. મહેનત અને બુદ્ધિથી દરેક મુશ્કેલી ઉકેલાય છે.',
    wordCount: 68,
    difficultWords: ['બળબળતા', 'હિંમત', 'કાંકરા', 'સંતોષ', 'મુશ્કેલી'],
    comprehensionQuestions: [
      {
        question: 'કાગડાએ પાણી ઉપર લાવવા માટે શું કર્યું?',
        options: ['ઘડામાં એક પછી એક કાંકરા નાખ્યા', 'ઘડો તોડી નાખ્યો', 'પાણી ઢોળી દીધું', 'બીજા પક્ષીઓને બોલાવ્યા'],
        correctIndex: 0,
        explanation: 'કાંકરા નાખવાથી ઘડાનું પાણી સપાટી પર આવ્યું.',
      },
    ],
  },

  // 15. Tamil - Grade 4 (Traditional Wisdom)
  {
    id: 'story-ta-g4',
    gradeId: 4,
    title: 'ஒற்றுமையே வலிமை தரும் (Unity is Strength)',
    genre: 'Moral & Culture',
    language: 'Tamil',
    languageCode: 'ta',
    targetWpm: 80,
    passage: 'ஒரு அழகான கிராமத்தில் முதியவர் ஒருவர் வாழ்ந்து வந்தார். அவரது மகன்கள் எப்போதும் தங்களுக்குள் சண்டையிட்டு வந்தனர். ஒரு நாள் தந்தை அவர்களுக்கு பல குச்சிகள் கொண்ட ஒரு கட்டை கொடுத்து உடைக்கச் சொன்னார். யாராலும் அதை உடைக்க முடியவில்லை. பின்னர் ஒவ்வொரு குச்சியாக கொடுத்தபோது எளிதில் உடைத்தனர். "நீங்கள் தனித்தனியாக இருந்தால் பலவீனமாவீர்கள், ஒன்றுபட்டால் யாராலும் வெல்ல முடியாது" என்று தந்தை அறிவுரை கூறினார்.',
    wordCount: 60,
    difficultWords: ['ஒற்றுமை', 'பலவீனம்', 'அறிவுரை', 'வெல்ல', 'சண்டையிட்டு'],
    comprehensionQuestions: [
      {
        question: 'தந்தை மகன்களுக்கு என்ன படிப்பினை கற்பித்தார்?',
        options: ['ஒன்றுபட்டு வாழ்வதே வலிமை தரும்', 'தனித்து வாழ்வதே சிறந்தது', 'சண்டை போடுவது நல்லது', 'குச்சிகளை சேகரிக்க வேண்டும்'],
        correctIndex: 0,
        explanation: 'ஒற்றுமையே வலிமை என்ற உயரிய பண்பை தந்தை உணர்த்தினார்.',
      },
    ],
  },

  // 16. Sanskrit - Grade 6 (Ancient Wisdom & Slokas)
  {
    id: 'story-sa-g6',
    gradeId: 6,
    title: 'विद्या धनं सर्वधनप्रधानम् (The Supreme Wealth of Knowledge)',
    genre: 'Wisdom & Ethics',
    language: 'Sanskrit',
    languageCode: 'sa',
    targetWpm: 60,
    passage: 'संसारे विद्या एव श्रेष्ठं धनं वर्तते। न चौरहार्यं न च राजहार्यं न भ्रातृभाज्यं न च भारकारि। व्यये कृते वर्धते एव नित्यं विद्याधनं सर्वधनप्रधानम्। यः जनः विद्याम् अर्जयति सः सर्वत्र आदरं प्राप्नोति। ज्ञानस्य प्रकाशेन अज्ञानस्य अन्धकारः नश्यति। अतः बाल्यकालात् एव परिश्रमेण विद्याभ्यासः करणीयः। विद्या मनुष्यस्य परमं भूषणम् अस्ति।',
    wordCount: 55,
    difficultWords: ['चौरहार्यम्', 'भ्रातृभाज्यम्', 'सर्वधनप्रधानम्', 'अर्जयति', 'भूषणम्'],
    comprehensionQuestions: [
      {
        question: 'कथं विद्याधनं सर्वधनप्रधानम् उच्यते?',
        options: ['व्यये कृते नित्यं वर्धते, चौरैः चोरयितुं न शक्यते', 'एतत् नष्टं भवति', 'एतत् केवलं राजा प्राप्नोति', 'एतत् भारकारि अस्ति'],
        correctIndex: 0,
        explanation: 'विद्या धनं यत् व्यये कृते वर्धते न च केनापि हर्तुं शक्यते।',
      },
    ],
  },

  // 17. Bengali - Grade 2 (Animal & Nature Tale)
  {
    id: 'story-bn-g2',
    gradeId: 2,
    title: 'ছোট্ট কাঠবিড়ালি ও বর্ষার সকাল (The Little Squirrel and Rainy Morning)',
    genre: 'Animal & Nature',
    language: 'Bengali',
    languageCode: 'bn',
    targetWpm: 55,
    passage: 'একটি সুন্দর সবুজ বনে চিকু নামের এক ছোট্ট কাঠবিড়ালি থাকত। বর্ষার এক সকালে ঝিরঝির করে বৃষ্টি পড়ছিল। চিকু দেখল একটি ছোট্ট রঙিন প্রজাপতি ভিজে গিয়ে উড়তে পারছে না। চিকু তাড়াতাড়ি একটি বড় শালপাতা এনে প্রজাপতির মাথার উপর ছাতার মতো ধরল। একটু পরে রোদ উঠলে প্রজাপতিটি ডানা মেলে উড়ে গেল এবং চিকুকে মিষ্টি সুরে ধন্যবাদ জানাল। সৎ কাজ ও ভালোবাসা সবসময় আনন্দ এনে দেয়।',
    wordCount: 68,
    difficultWords: ['কাঠবিড়ালি', 'প্রজাপতি', 'শালপাতা', 'ধন্যবাদ', 'ভালোবাসা'],
    comprehensionQuestions: [
      {
        question: 'চিকু প্রজাপতিকে কীভাবে বৃষ্টির হাত থেকে বাঁচাল?',
        options: ['শালপাতা দিয়ে ছাতার মতো আশ্রয় দিয়ে', 'গাছের কোটরে লুকিয়ে রেখে', 'জলে ফেলে দিয়ে', 'উড়ে গিয়ে'],
        correctIndex: 0,
        explanation: 'চিকু একটি বড় শালপাতা এনে প্রজাপতির মাথায় ছাতার মতো ধরেছিল।',
      },
      {
        question: 'এই গল্প থেকে আমরা কী শিখি?',
        options: ['বিপদে অন্যের পাশে দাঁড়ানো উচিত', 'বৃষ্টিতে ভেজা ঠিক নয়', 'একাকী থাকা ভালো', 'প্রজাপতি ধরা উচিত'],
        correctIndex: 0,
        explanation: 'অসহায়কে সাহায্য করলে মনের আনন্দ বৃদ্ধি পায়।',
      },
    ],
  },

  // 18. Bengali - Grade 3 (Upendrakishore Folklore: Tuntuni)
  {
    id: 'story-bn-g3',
    gradeId: 3,
    title: 'টুনটুনি ও বুদ্ধিমান নাপিতের গল্প (The Clever Tuntuni Bird)',
    genre: 'Folklore & Wit',
    language: 'Bengali',
    languageCode: 'bn',
    targetWpm: 70,
    passage: 'এক গাছে বাস করত ছোট্ট এক চতুর টুনটুনি পাখি। তার পায়ে ফুটেছিল একটি ধারালো বেগুন কাঁটা। টুনটুনি উড়ে গেল এক নাপিতের কাছে কাঁটাটি বের করে দিতে। নাপিত খুব যত্ন নিয়ে নরুন দিয়ে কাঁটাটি বের করে দিল। টুনটুনি খুশি হয়ে নাপিতকে ধন্যবাদ জানিয়ে গান গাইতে গাইতে উড়ে গেল। বুদ্ধি ও মিষ্ট ব্যবহার দিয়ে যেকোনো সমস্যা সহজে মেটানো যায়।',
    wordCount: 65,
    difficultWords: ['টুনটুনি', 'ধারালো', 'নরুন', 'সমস্যা', 'মিষ্ট'],
    comprehensionQuestions: [
      {
        question: 'টুনটুনির পায়ে কী ফুটেছিল?',
        options: ['ধারালো বেগুন কাঁটা', 'গোলাপের কাঁটা', 'কাঁচের টুকরো', 'পাথর'],
        correctIndex: 0,
        explanation: 'টুনটুনির পায়ে একটি তীক্ষ্ণ বেগুন কাঁটা ফুটেছিল।',
      },
    ],
  },

  // 19. Bengali - Grade 4 (Gopal Bhar & Wit)
  {
    id: 'story-bn-g4',
    gradeId: 4,
    title: 'গোপাল ভাঁড় ও বুদ্ধির পরীক্ষা (Gopal Bhar and the Wit Test)',
    genre: 'Folklore & Humor',
    language: 'Bengali',
    languageCode: 'bn',
    targetWpm: 85,
    passage: 'মহারাজা কৃষ্ণচন্দ্রের রাজসভায় এক অহংকারী পন্ডিত এসে দাবি করলেন তিনি সবচেয়ে জ্ঞানী। তিনি রাজসভার সবাইকে কঠিন প্রশ্ন করলেন কিন্তু কেউই উত্তর দিতে পারলেন না। তখন গোপাল ভাঁড় এক পাত্র মিষ্টি ও সরিষার দানা নিয়ে এসে বললেন, "প্রথমে গুণে বলুন এই পাত্রে ঠিক কতটি সরিষা আছে!" পন্ডিত অপ্রস্তুত হয়ে মাথা নিচু করলেন। মহারাজা গোপালের প্রত্যুৎপন্নমতিত্বের ভূয়সী প্রশংসা করলেন।',
    wordCount: 66,
    difficultWords: ['কৃষ্ণচন্দ্র', 'অহংকারী', 'প্রত্যুৎপন্নমতিত্ব', 'ভূয়সী', 'সরিষা'],
    comprehensionQuestions: [
      {
        question: 'গোপাল ভাঁড় অহংকারী পন্ডিতকে কীভাবে পরাস্ত করলেন?',
        options: ['পাত্রে রাখা সরিষার সংখ্যা গুণতে বলে উপস্থিত বুদ্ধির পরিচয় দিয়ে', 'যুদ্ধ করে', 'উপহার দিয়ে', 'সভা ত্যাগ করে'],
        correctIndex: 0,
        explanation: 'গোপাল ভাঁড় তাঁর উপস্থিত বুদ্ধি দিয়ে অহংকারী পন্ডিতকে শিক্ষা দেন।',
      },
    ],
  },

  // 20. Bengali - Grade 6 (Sundarbans & Nature Heritage)
  {
    id: 'story-bn-g6',
    gradeId: 6,
    title: 'সুন্দরবনের ম্যানগ্রোভ বন ও রয়েল বেঙ্গল টাইগার (Guardians of Sundarbans)',
    genre: 'Environmental Science',
    language: 'Bengali',
    languageCode: 'bn',
    targetWpm: 95,
    passage: 'বিশ্বের বৃহত্তম ম্যানগ্রোভ বনাঞ্চল সুন্দরবন ভারতের এক অমূল্য প্রাকৃতিক সম্পদ। এখানে সুন্দরী, গরান ও গেঁওয়া গাছের শ্বাসমূল ও ঠেসমূল মাটিকে আঁকড়ে ধরে বঙ্গোপসাগরের তীব্র সামুদ্রিক জলোচ্ছ্বাস থেকে উপকূলকে রক্ষা করে। এই রহস্যময় বনেই রাজকীয় ভঙ্গিমায় বিচরণ করে রয়েল বেঙ্গল টাইগার ও চিত্রল হরিণ। সুন্দরবনের এই জীববৈচিত্র্য ও পরিবেশগত ভারসাম্য রক্ষা করা আমাদের সকলের জাতীয় কর্তব্য।',
    wordCount: 64,
    difficultWords: ['বনাঞ্চল', 'শ্বাসমূল', 'জলোচ্ছ্বাস', 'জীববৈচিত্র্য', 'সামুদ্রিক'],
    comprehensionQuestions: [
      {
        question: 'সুন্দরবনের ম্যানগ্রোভ কীভাবে উপকূলকে রক্ষা করে?',
        options: ['শ্বাসমূল ও ঠেসমূল দিয়ে মাটিকে আঁকড়ে ধরে তীব্র জলোচ্ছ্বাস প্রতিরোধ করে', 'জল শুকিয়ে ফেলে', 'শীতল বাতাস তৈরি করে', 'বন্যা ডেকে আনে'],
        correctIndex: 0,
        explanation: 'ম্যানগ্রোভ গাছের শিকড় মাটি দৃঢ়ভাবে ধরে উপকূলকে সামুদ্রিক ঝড়ের হাত থেকে বাঁচায়।',
      },
    ],
  },

  // 21. Telugu - Grade 3 (Panchatantra Wisdom)
  {
    id: 'story-te-g3',
    gradeId: 3,
    title: 'తెలివైన తాబేలు మరియు కొంగలు (The Wise Turtle and the Cranes)',
    genre: 'Panchatantra',
    language: 'Telugu',
    languageCode: 'te',
    targetWpm: 70,
    passage: 'ఒక అందమైన సరస్సులో కంబుగ్రీవుడు అనే తాబేలు ఉండేది. దానికి ఇద్దరు కొంగలు మంచి స్నేహితులు. ఎండాకాలంలో సరస్సు ఎండిపోవడంతో కొంగలు తాబేలును మరొక పెద్ద చెరువుకు తీసుకెళ్లడానికి ఒక కర్రను పట్టుకోమని చెప్పాయి. తాబేలు కర్రను గట్టిగా పట్టుకుని ఆకాశంలో ఎగిరింది. సరైన సమయస్ఫూర్తి మరియు క్రమశిక్షణతో ప్రయాణం విజయవంతమైంది.',
    wordCount: 48,
    difficultWords: ['కంబుగ్రీవుడు', 'సమయస్ఫూర్తి', 'క్రమశిక్షణ', 'స్నేహితులు'],
    comprehensionQuestions: [
      {
        question: 'తాబేలు ఎవరి సహాయంతో కొత్త చెరువుకు వెళ్లింది?',
        options: ['తన స్నేహితులైన కొంగల సహాయంతో', 'చేపల సహాయంతో', 'నక్క సహాయంతో', 'ఒంటరిగా నడిచి'],
        correctIndex: 0,
        explanation: 'కొంగలు కర్ర సహాయంతో తాబేలును సురక్షితంగా తీసుకెళ్లాయి.',
      },
    ],
  },
];
