import { Question, Chapter, Subject, Topic } from '../types';
import { balanceQuestionOptions } from '../data/curriculumGenerator';

/**
 * Generates an instant, high-quality, chapter-specific practice question
 * with zero network latency.
 */
export function generateInstantChapterQuestion(
  chapter?: Chapter | null,
  subject?: Subject | null,
  topic?: Topic | null,
  seedIndex: number = 0,
  lang: string = 'en'
): Question {
  const gradeId = chapter?.gradeId || subject?.gradeId || 3;
  const boardId = chapter?.boardId || 'cbse';
  const chapId = chapter?.id || 'ch-custom';
  const subjId = subject?.id || chapter?.subjectId || 'subj-custom';
  const topId = topic?.id || `top-${chapId}-1`;
  const chapTitle = chapter?.title || 'Core Concepts';
  const subjName = subject?.name || 'Subject';
  const topTitle = topic?.title || 'Fundamentals';

  const isHindi = lang === 'hi';
  const isBengali = lang === 'bn';
  const isMarathi = lang === 'mr';

  const qId = `gen-q-${chapId}-${Date.now()}-${seedIndex + 1}`;

  // Subject-specific dynamic generation templates
  const subjLower = (subjId + ' ' + subjName).toLowerCase();
  const chapLower = chapTitle.toLowerCase();

  // 1. Math Word Problems & Numerical Reasoning
  if (subjLower.includes('math') || subjLower.includes('गणित')) {
    if (gradeId <= 2) {
      const num1 = 4 + (seedIndex % 5) * 2;
      const num2 = 3 + (seedIndex % 4);
      const sum = num1 + num2;
      const wrong1 = sum + 2;
      const wrong2 = Math.max(1, sum - 2);
      const wrong3 = sum + 1;

      return balanceQuestionOptions({
        id: qId,
        chapterId: chapId,
        subjectId: subjId,
        topicId: topId,
        gradeId,
        boardId,
        questionType: 'mcq',
        difficulty: 'easy',
        text: isHindi
          ? `रोहन के पास ${num1} सेब हैं और उसकी बहन ने उसे ${num2} और सेब दिए। अब रोहन के पास कुल कितने सेब हैं?`
          : isBengali
          ? `রোহনের কাছে ${num1}টি আপেল আছে এবং তার বোন তাকে আরও ${num2}টি আপেল দিল। রোহনের কাছে মোট কতগুলি আপেল হল?`
          : isMarathi
          ? `रोहनकडे ${num1} सफरचंद आहेत आणि त्याच्या बहिणीने त्याला आणखी ${num2} सफरचंद दिले. आता रोहनकडे एकूण किती सफरचंद आहेत?`
          : `Rohan has ${num1} apples and his sister gives him ${num2} more. How many apples does Rohan have in total?`,
        options: [
          `${sum} ${isHindi ? 'सेब' : isBengali ? 'আপেল' : isMarathi ? 'सफरचंद' : 'apples'}`,
          `${wrong1} ${isHindi ? 'सेब' : isBengali ? 'আপেল' : isMarathi ? 'सफरचंद' : 'apples'}`,
          `${wrong2} ${isHindi ? 'सेब' : isBengali ? 'আপেল' : isMarathi ? 'सफरचंद' : 'apples'}`,
          `${wrong3} ${isHindi ? 'सेब' : isBengali ? 'আপেল' : isMarathi ? 'सफरचंद' : 'apples'}`,
        ],
        correctAnswer: 0,
        explanation: isHindi
          ? `कुल संख्या = ${num1} + ${num2} = ${sum} सेब।`
          : isBengali
          ? `মোট সংখ্যা = ${num1} + ${num2} = ${sum} টি আপেল।`
          : `Total apples = ${num1} + ${num2} = ${sum}.`,
        hints: [isHindi ? 'दोनों संख्याओं को एक साथ जोड़ें।' : 'Add the two given numbers together.'],
        status: 'published',
      }, qId);
    } else if (gradeId <= 5) {
      // Grade 3-5: Addition, Subtraction, Give and Take, Fractions, Perimeter
      if (chapLower.includes('give and take') || chapLower.includes('लेना और देना') || chapLower.includes('addition') || chapLower.includes('जोड़')) {
        const base = 120 + (seedIndex % 6) * 35;
        const sub = 45 + (seedIndex % 5) * 12;
        const diff = base - sub;
        const w1 = diff + 10;
        const w2 = diff - 10;
        const w3 = base + sub;

        return balanceQuestionOptions({
          id: qId,
          chapterId: chapId,
          subjectId: subjId,
          topicId: topId,
          gradeId,
          boardId,
          questionType: 'mcq',
          difficulty: 'medium',
          text: isHindi
            ? `एक खिलौनों की दुकान में ${base} खिलौना कारें थीं। दोपहर तक ${sub} कारें बिक गईं। दुकान में अब कितनी कारें बची हैं?`
            : isBengali
            ? `একটি খেলনার দোকানে ${base}টি খেলনা গাড়ি ছিল। দুপুর পর্যন্ত ${sub}টি বিক্রি হল। দোকানে এখন কতগুলি গাড়ি বাকি রইল?`
            : `A toy shop had ${base} toy cars in stock. By afternoon, ${sub} cars were sold. How many toy cars are left in the shop?`,
          options: [
            `${diff} ${isHindi ? 'कारें' : 'cars'}`,
            `${w1} ${isHindi ? 'कारें' : 'cars'}`,
            `${w2} ${isHindi ? 'कारें' : 'cars'}`,
            `${w3} ${isHindi ? 'कारें' : 'cars'}`,
          ],
          correctAnswer: 0,
          explanation: isHindi
            ? `बची हुई कारें = ${base} - ${sub} = ${diff} कारें।`
            : `Remaining cars = ${base} - ${sub} = ${diff} cars.`,
          hints: [isHindi ? 'बिक्री के बाद बची संख्या जानने के लिए घटाव (Subtraction) करें।' : 'Subtract the sold items from the initial stock.'],
          status: 'published',
        }, qId);
      } else if (chapLower.includes('shapes') || chapLower.includes('आकार') || chapLower.includes('angles') || chapLower.includes('कोण')) {
        return balanceQuestionOptions({
          id: qId,
          chapterId: chapId,
          subjectId: subjId,
          topicId: topId,
          gradeId,
          boardId,
          questionType: 'mcq',
          difficulty: 'easy',
          text: isHindi
            ? 'एक समकोण (Right Angle) का सटीक माप कितना होता है?'
            : isBengali
            ? 'একটি সমকোণের (Right Angle) সঠিক পরিমাপ কত ডিগ্রি?'
            : 'What is the exact measurement of a Right Angle?',
          options: ['90°', '45°', '180°', '60°'],
          correctAnswer: 0,
          explanation: isHindi
            ? 'समकोण हमेशा 90 अंश (degrees) का होता है, जैसे किसी कमरे के कोने में दीवारें मिलती हैं।'
            : 'A right angle measures exactly 90 degrees (formed by perpendicular lines).',
          hints: [isHindi ? 'अंग्रेजी अक्षर "L" के कोने को याद करें।' : 'Think of the letter "L" or the corner of a notebook.'],
          status: 'published',
        }, qId);
      } else {
        // General fraction / number puzzle
        const parts = 4 + (seedIndex % 3) * 2;
        const taken = 1;
        return balanceQuestionOptions({
          id: qId,
          chapterId: chapId,
          subjectId: subjId,
          topicId: topId,
          gradeId,
          boardId,
          questionType: 'mcq',
          difficulty: 'medium',
          text: isHindi
            ? `एक पिज्जा को ${parts} बराबर टुकड़ों में काटा गया। प्रिया ने ${taken} टुकड़ा खाया। उसने पिज्जा का कितना भिन्न (Fraction) खाया?`
            : `A pizza was sliced into ${parts} equal pieces. Priya ate ${taken} slice. What fraction of the pizza did she eat?`,
          options: [`${taken}/${parts}`, `${parts}/${taken}`, `${taken}/${parts + 1}`, `${parts - 1}/${parts}`],
          correctAnswer: 0,
          explanation: isHindi
            ? `भिन्न = (खाए गए टुकड़े) / (कुल बराबर टुकड़े) = ${taken}/${parts}`
            : `Fraction = (Part eaten) / (Total equal slices) = ${taken}/${parts}.`,
          hints: [isHindi ? 'अंश (Numerator) ऊपर और हर (Denominator) नीचे होता है।' : 'Numerator is the parts taken, denominator is the total parts.'],
          status: 'published',
        }, qId);
      }
    } else if (gradeId <= 8) {
      // Middle School Math: Integers, Algebra, Rational Numbers
      const a = (seedIndex % 5) + 3;
      const b = (seedIndex % 4) + 5;
      const ans = a * b + 12;
      return balanceQuestionOptions({
        id: qId,
        chapterId: chapId,
        subjectId: subjId,
        topicId: topId,
        gradeId,
        boardId,
        questionType: 'mcq',
        difficulty: 'medium',
        text: isHindi
          ? `यदि ${a}x + 12 = ${ans}, तो x का मान क्या होगा?`
          : `If ${a}x + 12 = ${ans}, what is the value of x?`,
        options: [`x = ${b}`, `x = ${b + 2}`, `x = ${Math.max(1, b - 2)}`, `x = ${b * 2}`],
        correctAnswer: 0,
        explanation: isHindi
          ? `${a}x = ${ans} - 12 = ${a * b} ⇒ x = ${a * b} / ${a} = ${b}`
          : `${a}x = ${ans} - 12 = ${a * b} ⇒ x = ${a * b} / ${a} = ${b}.`,
        hints: [isHindi ? 'पहले दोनों पक्षों से 12 घटाएं, फिर x के गुणांक से भाग दें।' : 'Subtract 12 from both sides, then divide by the coefficient of x.'],
        status: 'published',
      }, qId);
    } else {
      // High School Math: Linear equations, Quadratics, Trigonometry
      return balanceQuestionOptions({
        id: qId,
        chapterId: chapId,
        subjectId: subjId,
        topicId: topId,
        gradeId,
        boardId,
        questionType: 'mcq',
        difficulty: 'medium',
        text: isHindi
          ? `त्रिकोणमिति की मूलभूत सर्वसमिका sin²θ + cos²θ का मान किसके बराबर है?`
          : `According to trigonometric identities, what is the value of sin²θ + cos²θ for any acute angle θ?`,
        options: ['1', '0', '2', 'tan θ'],
        correctAnswer: 0,
        explanation: isHindi
          ? 'पाइथागोरस प्रमेय से: sin²θ + cos²θ = (p/h)² + (b/h)² = (p² + b²)/h² = h²/h² = 1.'
          : 'By Pythagorean theorem: sin²θ + cos²θ = (p/h)² + (b/h)² = (p² + b²)/h² = h²/h² = 1.',
        hints: [isHindi ? 'यह त्रिकोणमिति की सबसे पहली सर्वसमिका है।' : 'Recall the fundamental identity from the right-angled triangle theorem.'],
        status: 'published',
      }, qId);
    }
  }

  // 2. Science / EVS (Environmental Studies)
  if (subjLower.includes('science') || subjLower.includes('evs') || subjLower.includes('पर्यावरण') || subjLower.includes('विज्ञान')) {
    if (gradeId <= 5) {
      const scienceBank = [
        {
          textEn: `During photosynthesis, green leaves produce food and release which vital gas into the air?`,
          textHi: `प्रकाश संश्लेषण (Photosynthesis) के दौरान हरी पत्तियां भोजन बनाती हैं और कौन सी महत्वपूर्ण गैस छोड़ती हैं?`,
          optsEn: ['Oxygen (O₂)', 'Carbon Dioxide (CO₂)', 'Nitrogen (N₂)', 'Methane'],
          optsHi: ['ऑक्सीजन (O₂)', 'कार्बन डाइऑक्साइड (CO₂)', 'नाइट्रोजन (N₂)', 'मीथेन'],
          expEn: 'Plants absorb carbon dioxide and release pure oxygen into the atmosphere during photosynthesis.',
          expHi: 'पौधे प्रकाश संश्लेषण के समय कार्बन डाइऑक्साइड लेकर शुद्ध ऑक्सीजन गैस वातावरण में छोड़ते हैं।',
          hintEn: 'Think of the gas humans and animals inhale to stay alive.',
          hintHi: 'यह वही गैस है जो हम सांस लेते समय शरीर में लेते हैं।'
        },
        {
          textEn: `What are animals that eat ONLY plants, fruits, and grass called?`,
          textHi: `केवल पेड़-पौधे, घास और फल खाने वाले जंतुओं को क्या कहा जाता है?`,
          optsEn: ['Herbivores (शाकाहारी)', 'Carnivores (मांसाहारी)', 'Omnivores (सर्वाहारी)', 'Parasites (परजीवी)'],
          optsHi: ['शाकाहारी (Herbivores)', 'मांसाहारी (Carnivores)', 'सर्वाहारी (Omnivores)', 'परजीवी (Parasites)'],
          expEn: 'Herbivores are animals that eat strictly plant-based matter like grass and leaves (e.g., cows, deer, rabbits).',
          expHi: 'गाय, हिरण और खरगोश जैसे पौधे खाने वाले जीवों को शाकाहारी कहा जाता है।',
          hintEn: 'Examples include deer, cows, and elephants.',
          hintHi: 'गाय और हिरण इसके प्रमुख उदाहरण हैं।'
        },
        {
          textEn: `The process by which liquid water heats up and turns into water vapor is known as:`,
          textHi: `पानी के गर्म होकर भाप (वाष्प) में बदलने की प्रक्रिया को क्या कहते हैं?`,
          optsEn: ['Evaporation (वाष्पीकरण)', 'Condensation (संघनन)', 'Precipitation (वर्षा)', 'Freezing (जमना)'],
          optsHi: ['वाष्पीकरण (Evaporation)', 'संघनन (Condensation)', 'वर्षा (Precipitation)', 'जमना (Freezing)'],
          expEn: 'Evaporation is the phase transition from liquid water to gaseous water vapor due to heat energy.',
          expHi: 'गर्मी पाकर पानी का भाप बनकर हवा में उड़ना वाष्पीकरण कहलाता है।',
          hintEn: 'Think of wet clothes drying outside in the sunshine.',
          hintHi: 'धूप में गीले कपड़ों के सूखने की प्रक्रिया को याद करें।'
        }
      ];

      const item = scienceBank[seedIndex % scienceBank.length];
      return balanceQuestionOptions({
        id: qId,
        chapterId: chapId,
        subjectId: subjId,
        topicId: topId,
        gradeId,
        boardId,
        questionType: 'mcq',
        difficulty: 'easy',
        text: isHindi ? item.textHi : item.textEn,
        options: isHindi ? item.optsHi : item.optsEn,
        correctAnswer: 0,
        explanation: isHindi ? item.expHi : item.expEn,
        hints: [isHindi ? item.hintHi : item.hintEn],
        status: 'published',
      }, qId);
    } else {
      // Grade 6-10 Science
      return balanceQuestionOptions({
        id: qId,
        chapterId: chapId,
        subjectId: subjId,
        topicId: topId,
        gradeId,
        boardId,
        questionType: 'mcq',
        difficulty: 'medium',
        text: isHindi
          ? `न्यूटन के गति के तीसरे नियम के अनुसार, "प्रत्येक क्रिया के बराबर और..." क्या होता है?`
          : `According to Newton's Third Law of Motion, for every action force, there is:`,
        options: [
          isHindi ? 'विपरीत दिशा में समान प्रतिक्रिया (Equal and opposite reaction)' : 'An equal and opposite reaction force',
          isHindi ? 'समान दिशा में दुगुनी प्रतिक्रिया' : 'A larger force in the same direction',
          isHindi ? 'शून्य प्रतिक्रिया' : 'No reacting force at all',
          isHindi ? 'केवल घर्षण बल' : 'Only gravitational pull'
        ],
        correctAnswer: 0,
        explanation: isHindi
          ? 'न्यूटन का तीसरा नियम बताता है कि जब वस्तु A वस्तु B पर बल लगाती है, तो B भी A पर बराबर और विपरीत दिशा में बल लगाती है।'
          : 'Newton’s Third Law states that forces always occur in matched action-reaction pairs.',
        hints: [isHindi ? 'सोचें कि नाव से कूदते समय नाव पीछे क्यों जाती है।' : 'Think about why a rocket moves forward when exhaust gas pushes backward.'],
        status: 'published',
      }, qId);
    }
  }

  // 3. English / Languages
  if (subjLower.includes('english') || subjLower.includes('अंग्रेजी') || subjLower.includes('gram')) {
    const englishBank = [
      {
        text: `Choose the correct Collective Noun: "A _____ of birds flew across the evening sky."`,
        options: ['flock', 'herd', 'pack', 'swarm'],
        explanation: 'A group of birds or sheep is referred to as a "flock".',
        hint: 'Use "flock" for birds and sheep, "pack" for wolves, and "herd" for cattle.'
      },
      {
        text: `Identify the Adjective in this sentence: "The smart student solved the puzzle quickly."`,
        options: ['smart', 'solved', 'quickly', 'student'],
        explanation: '"Smart" is an adjective describing the quality of the noun "student".',
        hint: 'An adjective describes or gives more information about a noun.'
      },
      {
        text: `Fill in the blank with the correct tense: "She _____ her homework before dinner yesterday."`,
        options: ['completed', 'completes', 'will complete', 'is completing'],
        explanation: '"Yesterday" indicates simple past tense, so we use the past form "completed".',
        hint: 'Look for the time marker "yesterday".'
      }
    ];

    const item = englishBank[seedIndex % englishBank.length];
    return balanceQuestionOptions({
      id: qId,
      chapterId: chapId,
      subjectId: subjId,
      topicId: topId,
      gradeId,
      boardId,
      questionType: 'mcq',
      difficulty: 'easy',
      text: item.text,
      options: item.options,
      correctAnswer: 0,
      explanation: item.explanation,
      hints: [item.hint],
      status: 'published',
    }, qId);
  }

  // 4. Default Universal Concept Question
  return balanceQuestionOptions({
    id: qId,
    chapterId: chapId,
    subjectId: subjId,
    topicId: topId,
    gradeId,
    boardId,
    questionType: 'mcq',
    difficulty: 'medium',
    text: isHindi
      ? `अध्याय "${chapTitle}" के अनुसार, दिए गए विषय "${topTitle}" को हल करने के लिए सबसे उपयुक्त विधि कौन सी है?`
      : `In the chapter "${chapTitle}", which of the following best demonstrates the core principle of "${topTitle}"?`,
    options: [
      isHindi ? 'चरणबद्ध विश्लेषण और मूल नियमों का सही अनुप्रयोग' : 'Applying step-by-step reasoning according to established curriculum rules',
      isHindi ? 'केवल परिणाम का बिना जांचे अनुमान लगाना' : 'Relying purely on rough intuition without verification',
      isHindi ? 'महत्वपूर्ण इकाइयों और चरणों की अनदेखी करना' : 'Ignoring fundamental standard units and initial given conditions',
      isHindi ? 'केवल अंतिम उत्तर याद कर लेना' : 'Memorizing isolated answers without conceptual understanding',
    ],
    correctAnswer: 0,
    explanation: isHindi
      ? 'अवधारणाओं को चरणबद्ध तरीके से समझकर और नियमों का पालन करके ही सटीक परिणाम प्राप्त किया जा सकता है।'
      : 'Mastery is achieved through structured step-by-step conceptual reasoning and accurate verification.',
    hints: [isHindi ? 'बुनियादी संकल्पना और नियमों पर ध्यान केंद्रित करें।' : 'Focus on the foundational principles taught in this chapter.'],
    status: 'published',
  }, qId);
}
