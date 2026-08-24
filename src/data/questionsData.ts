import { Question, Chapter, Subject } from '../types';
import { ALL_CHAPTERS } from './chaptersData';
import { ALL_SUBJECTS } from './subjectsData';
import { ALL_TOPICS } from './topicsData';
import { generateCurriculumQuestionsForChapter, balanceQuestionOptions } from './curriculumGenerator';

export const BESPOKE_PRESEEDED_QUESTIONS: Question[] = [
  // ================= GRADE 1 QUESTIONS =================
  {
    id: 'q-g1-m1-1',
    subjectId: 'g1-math',
    chapterId: 'ch-g1-m1',
    topicId: 'top-g1-m1-1',
    gradeId: 1,
    boardId: 'cbse',
    questionType: 'mcq',
    difficulty: 'easy',
    text: 'A little puppy is sleeping inside its cozy doghouse. Where is the puppy?',
    options: ['Inside the doghouse', 'Outside the doghouse', 'On the roof', 'Under the tree'],
    correctAnswer: 0,
    explanation: 'The puppy is enclosed within its doghouse, which means it is "inside".',
    hints: ['Think about being protected inside your warm bedroom.'],
    status: 'published',
  },
  {
    id: 'q-g1-m1-2',
    subjectId: 'g1-math',
    chapterId: 'ch-g1-m1',
    topicId: 'top-g1-m1-2',
    gradeId: 1,
    boardId: 'cbse',
    questionType: 'mcq',
    difficulty: 'easy',
    text: 'Which of the following objects can ROLL easily across the floor?',
    options: ['A round football', 'A square brick', 'A wooden dice', 'A flat book'],
    correctAnswer: 0,
    explanation: 'A football has a smooth, curved surface with no flat corners, so it rolls smoothly.',
    hints: ['Look for the shape that is perfectly round like a sphere.'],
    status: 'published',
  },
  {
    id: 'q-g1-m2-1',
    subjectId: 'g1-math',
    chapterId: 'ch-g1-m2',
    topicId: 'top-g1-m2-1',
    gradeId: 1,
    boardId: 'cbse',
    questionType: 'numerical',
    difficulty: 'easy',
    text: 'Count the stars: ★ ★ ★ ★ ★. How many stars are there in total?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 2,
    explanation: 'Counting one by one: 1, 2, 3, 4, 5 stars.',
    hints: ['Count each star on your fingers.'],
    status: 'published',
  },
  {
    id: 'q-g1-m3-1',
    subjectId: 'g1-math',
    chapterId: 'ch-g1-m3',
    topicId: 'top-g1-m3-1',
    gradeId: 1,
    boardId: 'cbse',
    questionType: 'mcq',
    difficulty: 'easy',
    text: 'Aarav has 3 red balloons and his sister gives him 2 more blue balloons. How many balloons does Aarav have now?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 2,
    explanation: '3 + 2 = 5 balloons in total.',
    hints: ['Start at 3 and count 2 steps forward: 4, 5.'],
    status: 'published',
  },
  {
    id: 'q-g1-e1-1',
    subjectId: 'g1-eng',
    chapterId: 'ch-g1-e1',
    topicId: 'top-g1-e1-1',
    gradeId: 1,
    boardId: 'cbse',
    questionType: 'mcq',
    difficulty: 'easy',
    text: 'What is the beginning sound of the word "Apple"?',
    options: ['/a/ as in Ant', '/b/ as in Ball', '/c/ as in Cat', '/d/ as in Duck'],
    correctAnswer: 0,
    explanation: 'The word "Apple" begins with the short vowel letter sound /a/.',
    hints: ['Say "Ah-pple" out loud.'],
    status: 'published',
  },
  {
    id: 'q-g1-v1-1',
    subjectId: 'g1-evs',
    chapterId: 'ch-g1-v1',
    topicId: 'top-g1-v1-1',
    gradeId: 1,
    boardId: 'cbse',
    questionType: 'mcq',
    difficulty: 'easy',
    text: 'Which sense organ helps you listen to your favorite song?',
    options: ['Ears', 'Eyes', 'Nose', 'Tongue'],
    correctAnswer: 0,
    explanation: 'We hear sounds, music, and voices through our two ears.',
    hints: ['Touch the sides of your head where you wear headphones.'],
    status: 'published',
  },

  // ================= GRADE 2 QUESTIONS =================
  {
    id: 'q-g2-m1-1',
    subjectId: 'g2-math',
    chapterId: 'ch-g2-m1',
    topicId: 'top-g2-m1-1',
    gradeId: 2,
    boardId: 'cbse',
    questionType: 'mcq',
    difficulty: 'easy',
    text: 'In the number 47, how many tens and how many ones are there?',
    options: ['4 tens and 7 ones', '7 tens and 4 ones', '40 tens and 7 ones', '4 tens and 0 ones'],
    correctAnswer: 0,
    explanation: 'In 47, the digit 4 is in the tens place (value 40) and 7 is in the ones place.',
    hints: ['The left digit represents bundles of 10.'],
    status: 'published',
  },
  {
    id: 'q-g2-m2-1',
    subjectId: 'g2-math',
    chapterId: 'ch-g2-m2',
    topicId: 'top-g2-m2-1',
    gradeId: 2,
    boardId: 'cbse',
    questionType: 'mcq',
    difficulty: 'medium',
    text: 'Solve: 28 + 15 = ?',
    options: ['41', '42', '43', '44'],
    correctAnswer: 2,
    explanation: 'Add ones: 8 + 5 = 13 (write 3, carry 1). Add tens: 2 + 1 + 1 (carry) = 4 tens. Total = 43.',
    hints: ['Regroup 13 ones into 1 ten and 3 ones.'],
    status: 'published',
  },
  {
    id: 'q-g2-e1-1',
    subjectId: 'g2-eng',
    chapterId: 'ch-g2-e1',
    topicId: 'top-g2-e1-1',
    gradeId: 2,
    boardId: 'cbse',
    questionType: 'mcq',
    difficulty: 'easy',
    text: 'Identify the ACTION word (verb) in this sentence: "The bright green frog jumps over the puddle."',
    options: ['frog', 'jumps', 'bright', 'puddle'],
    correctAnswer: 1,
    explanation: '"Jumps" describes what the frog is doing, so it is the action verb.',
    hints: ['Look for the word showing physical motion.'],
    status: 'published',
  },
  {
    id: 'q-g2-v1-1',
    subjectId: 'g2-evs',
    chapterId: 'ch-g2-v1',
    topicId: 'top-g2-v1-1',
    gradeId: 2,
    boardId: 'cbse',
    questionType: 'mcq',
    difficulty: 'easy',
    text: 'Which internal organ acts like an electric water pump to circulate blood to every part of our body?',
    options: ['Heart', 'Stomach', 'Lungs', 'Brain'],
    correctAnswer: 0,
    explanation: 'The human heart beats non-stop to pump oxygen-rich blood through our blood vessels.',
    hints: ['Put your hand over the center-left of your chest to feel it beating.'],
    status: 'published',
  },

  // ================= GRADE 3 QUESTIONS =================
  {
    id: 'q-g3-m1-1',
    subjectId: 'g3-math',
    chapterId: 'ch-g3-m1',
    topicId: 'top-g3-m1-1',
    gradeId: 3,
    boardId: 'cbse',
    questionType: 'mcq',
    difficulty: 'easy',
    text: 'If you look at a table from directly above (top view), what shape will you see?',
    options: ['A rectangle or square', 'Four tall legs', 'A triangle', 'A circle with legs'],
    correctAnswer: 0,
    explanation: 'From directly above, only the flat tabletop surface is visible, which is rectangular or square.',
    hints: ['Imagine a bird flying right over a dining table looking down.'],
    status: 'published',
  },
  {
    id: 'q-g3-m5-1',
    subjectId: 'g3-math',
    chapterId: 'ch-g3-m5',
    topicId: 'top-g3-m5-1',
    gradeId: 3,
    boardId: 'cbse',
    questionType: 'mcq',
    difficulty: 'easy',
    text: 'In the fraction 3/4, what does the number 4 represent?',
    options: ['The denominator (total equal parts in the whole)', 'The numerator (shaded parts)', 'The total price of the cake', 'The number of people eating'],
    correctAnswer: 0,
    explanation: 'The bottom number in a fraction is the denominator; it tells how many equal parts the whole unit is divided into.',
    hints: ['Denominator is Down at the bottom.'],
    status: 'published',
  },
  {
    id: 'q-g3-m5-2',
    subjectId: 'g3-math',
    chapterId: 'ch-g3-m5',
    topicId: 'top-g3-m5-2',
    gradeId: 3,
    boardId: 'cbse',
    questionType: 'mcq',
    difficulty: 'medium',
    text: 'Ananya has 12 colored pencils. She gives 1/2 of her pencils to her brother. How many pencils did she give away?',
    options: ['4', '5', '6', '7'],
    correctAnswer: 2,
    explanation: 'Half of 12 = 12 ÷ 2 = 6 pencils.',
    hints: ['Divide 12 into two equal groups.'],
    status: 'published',
  },
  {
    id: 'q-g3-v1-1',
    subjectId: 'g3-evs',
    chapterId: 'ch-g3-v1',
    topicId: 'top-g3-v1-1',
    gradeId: 3,
    boardId: 'cbse',
    questionType: 'mcq',
    difficulty: 'easy',
    text: 'Which animal uses camouflage to blend perfectly into tree branches and change its skin color?',
    options: ['Chameleon', 'Elephant', 'Peacock', 'Dog'],
    correctAnswer: 0,
    explanation: 'Chameleons have specialized pigment cells in their skin that change color to match their environment and express mood.',
    hints: ['A reptile famous for changing colors in leafy trees.'],
    status: 'published',
  },

  // ================= GRADE 4 QUESTIONS =================
  {
    id: 'q-g4-m2-1',
    subjectId: 'g4-math',
    chapterId: 'ch-g4-m2',
    topicId: 'top-g4-m2-1',
    gradeId: 4,
    boardId: 'cbse',
    questionType: 'mcq',
    difficulty: 'medium',
    text: 'Convert 4 kilometres and 350 metres into total metres.',
    options: ['4350 metres', '4035 metres', '43500 metres', '40035 metres'],
    correctAnswer: 0,
    explanation: '1 km = 1000 m. Therefore, 4 km = 4000 m. Adding 350 m gives 4000 + 350 = 4350 metres.',
    hints: ['Multiply 4 by 1000 and add 350.'],
    status: 'published',
  },
  {
    id: 'q-g4-s1-1',
    subjectId: 'g4-sci',
    chapterId: 'ch-g4-s1',
    topicId: 'top-g4-s1-1',
    gradeId: 4,
    boardId: 'cbse',
    questionType: 'mcq',
    difficulty: 'easy',
    text: 'Why do desert cactus plants have sharp thorns (spines) instead of broad green leaves?',
    options: [
      'To prevent loss of water through transpiration and protect from animals',
      'To attract honeybees for pollination',
      'To make the plant heavier in desert sand',
      'To absorb sunlight only during rainy nights'
    ],
    correctAnswer: 0,
    explanation: 'Spines minimize surface area to drastically reduce evaporation/transpiration of precious water, while deterring herbivores.',
    hints: ['Water is very scarce in the hot desert.'],
    status: 'published',
  },
  {
    id: 'q-g4-s2-1',
    subjectId: 'g4-sci',
    chapterId: 'ch-g4-s2',
    topicId: 'top-g4-s2-1',
    gradeId: 4,
    boardId: 'cbse',
    questionType: 'mcq',
    difficulty: 'easy',
    text: 'Which teeth are sharp and pointed, specifically designed for tearing tough food like meat?',
    options: ['Canines', 'Incisors', 'Molars', 'Premolars'],
    correctAnswer: 0,
    explanation: 'Canines are pointed teeth flanking the incisors, adapted for gripping and tearing food.',
    hints: ['Think of the sharp fangs of a tiger.'],
    status: 'published',
  },

  // ================= GRADE 5 QUESTIONS =================
  {
    id: 'q-g5-m1-1',
    subjectId: 'g5-math',
    chapterId: 'ch-g5-m1',
    topicId: 'top-g5-m1-1',
    gradeId: 5,
    boardId: 'cbse',
    questionType: 'mcq',
    difficulty: 'medium',
    text: 'In the International Place Value system, 1 Million is equal to how many Lakhs in the Indian system?',
    options: ['10 Lakhs', '1 Lakh', '100 Lakhs', '1 Crore'],
    correctAnswer: 0,
    explanation: '1 Million = 1,000,000 = 10,00,000 (10 Lakhs).',
    hints: ['Write 1 followed by 6 zeroes and place commas in Indian format: 10,00,000.'],
    status: 'published',
  },
  {
    id: 'q-g5-m4-1',
    subjectId: 'g5-math',
    chapterId: 'ch-g5-m4',
    topicId: 'top-g5-m4-1',
    gradeId: 5,
    boardId: 'cbse',
    questionType: 'mcq',
    difficulty: 'medium',
    text: 'A rectangular playground is 25 metres long and 10 metres wide. What is its AREA in square metres?',
    options: ['250 sq m', '70 sq m', '100 sq m', '500 sq m'],
    correctAnswer: 0,
    explanation: 'Area of rectangle = Length × Width = 25 m × 10 m = 250 sq m.',
    hints: ['Multiply the length by the breadth.'],
    status: 'published',
  },
  {
    id: 'q-g5-s1-1',
    subjectId: 'g5-sci',
    chapterId: 'ch-g5-s1',
    topicId: 'top-g5-s1-1',
    gradeId: 5,
    boardId: 'cbse',
    questionType: 'mcq',
    difficulty: 'easy',
    text: 'How do bats fly and hunt flying insects in pitch dark caves without hitting walls?',
    options: [
      'By emitting high-frequency ultrasonic sound waves and listening to the echoes (echolocation)',
      'By glowing in the dark with bio-luminescence',
      'By having microscopic thermal infrared cameras in their nose',
      'By following the smell of flower nectar'
    ],
    correctAnswer: 0,
    explanation: 'Bats use echolocation: they emit ultrasonic clicks and analyze reflected sound waves to map obstacles and prey in real time.',
    hints: ['Sound waves bounce back off solid objects as echoes.'],
    status: 'published',
  },

  // ================= GRADE 6 QUESTIONS =================
  {
    id: 'q-g6-m1-1',
    subjectId: 'g6-math',
    chapterId: 'ch-g6-m1',
    topicId: 'top-g6-m1-1',
    gradeId: 6,
    boardId: 'cbse',
    questionType: 'mcq',
    difficulty: 'medium',
    text: 'Evaluate using BODMAS: 20 + 4 × (10 - 6) ÷ 2 = ?',
    options: ['28', '24', '32', '48'],
    correctAnswer: 0,
    explanation: 'Step 1 (Brackets): (10 - 6) = 4. Expression becomes 20 + 4 × 4 ÷ 2. Step 2 (Division): 4 ÷ 2 = 2. Expression becomes 20 + 4 × 2. Step 3 (Multiplication): 4 × 2 = 8. Step 4 (Addition): 20 + 8 = 28.',
    hints: ['Calculate brackets first, then division and multiplication from left to right.'],
    status: 'published',
  },
  {
    id: 'q-g6-s1-1',
    subjectId: 'g6-sci',
    chapterId: 'ch-g6-s1',
    topicId: 'top-g6-s1-1',
    gradeId: 6,
    boardId: 'cbse',
    questionType: 'mcq',
    difficulty: 'medium',
    text: 'When a few drops of dilute Iodine solution are added to a crushed piece of boiled potato, what color indicates the presence of starch?',
    options: ['Blue-black', 'Bright brick red', 'Deep violet', 'Emerald green'],
    correctAnswer: 0,
    explanation: 'Starch reacts with iodine molecules to form a characteristic deep blue-black inclusion complex.',
    hints: ['Think of dark ink or blue-black fountain pen color.'],
    status: 'published',
  },

  // ================= GRADE 7 QUESTIONS =================
  {
    id: 'q-g7-m4-1',
    subjectId: 'g7-math',
    chapterId: 'ch-g7-m4',
    topicId: 'top-g7-m4-1',
    gradeId: 7,
    boardId: 'cbse',
    questionType: 'mcq',
    difficulty: 'medium',
    text: 'In a right-angled triangle, the base is 6 cm and the perpendicular is 8 cm. What is the length of the hypotenuse in cm?',
    options: ['10 cm', '12 cm', '14 cm', '100 cm'],
    correctAnswer: 0,
    explanation: 'By Pythagoras theorem: Hypotenuse² = Base² + Perpendicular² = 6² + 8² = 36 + 64 = 100. Hypotenuse = √100 = 10 cm.',
    hints: ['Square 6 and 8, add them together, then find the square root.'],
    status: 'published',
  },
  {
    id: 'q-g7-s2-1',
    subjectId: 'g7-sci',
    chapterId: 'ch-g7-s2',
    topicId: 'top-g7-s2-1',
    gradeId: 7,
    boardId: 'cbse',
    questionType: 'mcq',
    difficulty: 'medium',
    text: 'Heat from the Sun reaches the Earth through million miles of empty outer space primarily by which mechanism?',
    options: ['Radiation', 'Conduction', 'Convection', 'Advection'],
    correctAnswer: 0,
    explanation: 'Space is a vacuum with no molecules. Radiation carries energy through electromagnetic infrared waves without needing any medium.',
    hints: ['Which heat transfer mechanism works without any physical particles?'],
    status: 'published',
  },
  {
    id: 'q-g7-s3-1',
    subjectId: 'g7-sci',
    chapterId: 'ch-g7-s3',
    topicId: 'top-g7-s3-1',
    gradeId: 7,
    boardId: 'cbse',
    questionType: 'mcq',
    difficulty: 'medium',
    text: 'When a farmer’s agricultural soil becomes too acidic due to excessive chemical fertilisers, what should be added to neutralise it?',
    options: ['Quick lime (Calcium oxide) or Slaked lime (Calcium hydroxide)', 'Hydrochloric acid', 'Common salt', 'Distilled water'],
    correctAnswer: 0,
    explanation: 'Quick lime and slaked lime are basic substances that neutralise excess acidity in the soil, restoring healthy pH.',
    hints: ['To neutralise an acid, you need a safe base.'],
    status: 'published',
  },

  // ================= GRADE 8 QUESTIONS =================
  {
    id: 'q-g8-m4-1',
    subjectId: 'g8-math',
    chapterId: 'ch-g8-m4',
    topicId: 'top-g8-m4-1',
    gradeId: 8,
    boardId: 'cbse',
    questionType: 'mcq',
    difficulty: 'medium',
    text: 'Using the algebraic identity (a - b)², evaluate (99)² by writing it as (100 - 1)². What is the value?',
    options: ['9801', '9901', '9701', '9899'],
    correctAnswer: 0,
    explanation: '(100 - 1)² = 100² - 2(100)(1) + 1² = 10000 - 200 + 1 = 9801.',
    hints: ['Use a² - 2ab + b² where a = 100 and b = 1.'],
    status: 'published',
  },
  {
    id: 'q-g8-s3-1',
    subjectId: 'g8-sci',
    chapterId: 'ch-g8-s3',
    topicId: 'top-g8-s3-1',
    gradeId: 8,
    boardId: 'cbse',
    questionType: 'mcq',
    difficulty: 'hard',
    text: 'When an iron nail is immersed in a blue Copper Sulphate (CuSO4) solution for 30 minutes, what happens and why?',
    options: [
      'The solution turns light green and a brown layer of copper deposits on the nail because iron is more reactive than copper',
      'The solution turns deep purple and bubbles of chlorine gas form',
      'No reaction occurs because copper is more reactive than iron',
      'The nail dissolves completely into oxygen gas'
    ],
    correctAnswer: 0,
    explanation: 'Iron is higher than copper in the reactivity series. Fe displaces Cu: Fe + CuSO4 (blue) -> FeSO4 (green) + Cu (brown deposit).',
    hints: ['Displacement reaction: More reactive metal replaces less reactive metal.'],
    status: 'published',
  },

  // ================= GRADE 9 QUESTIONS =================
  {
    id: 'q-g9-p1-1',
    subjectId: 'g9-phy',
    chapterId: 'ch-g9-p1',
    topicId: 'top-g9-p1-1',
    gradeId: 9,
    boardId: 'cbse',
    questionType: 'mcq',
    difficulty: 'hard',
    text: 'A sports car accelerates uniformly from rest to a speed of 20 m/s in 4 seconds. Calculate the total distance traveled during this time in metres.',
    options: ['40 m', '80 m', '20 m', '16 m'],
    correctAnswer: 0,
    explanation: 'Initial velocity u = 0. Acceleration a = (v - u) / t = 20 / 4 = 5 m/s². Distance s = ut + 0.5 a t² = 0 + 0.5 × 5 × 4² = 0.5 × 5 × 16 = 40 metres.',
    hints: ['Find acceleration first using a = (v-u)/t, then use s = ut + 0.5at².'],
    status: 'published',
  },
  {
    id: 'q-g9-c3-1',
    subjectId: 'g9-chem',
    chapterId: 'ch-g9-c3',
    topicId: 'top-g9-c3-1',
    gradeId: 9,
    boardId: 'cbse',
    questionType: 'mcq',
    difficulty: 'hard',
    text: 'Calculate the number of moles present in 54 grams of pure water (H2O). (Atomic masses: H = 1 u, O = 16 u)',
    options: ['3 moles', '2 moles', '4 moles', '18 moles'],
    correctAnswer: 0,
    explanation: 'Molar mass of H2O = 2(1) + 16 = 18 g/mol. Number of moles n = Given mass / Molar mass = 54 g / 18 g/mol = 3 moles.',
    hints: ['Divide the mass (54 g) by the molecular mass of water (18 g/mol).'],
    status: 'published',
  },

  // ================= GRADE 10 QUESTIONS =================
  {
    id: 'q-g10-m2-1',
    subjectId: 'g10-math',
    chapterId: 'ch-g10-m2',
    topicId: 'top-g10-m2-1',
    gradeId: 10,
    boardId: 'cbse',
    questionType: 'mcq',
    difficulty: 'hard',
    text: 'For the quadratic equation 2x² - 4x + 3 = 0, what is the NATURE of the roots?',
    options: [
      'No real roots (Complex conjugate roots)',
      'Two distinct real and rational roots',
      'Two equal and real roots',
      'One real and one infinite root'
    ],
    correctAnswer: 0,
    explanation: 'Discriminant D = b² - 4ac = (-4)² - 4(2)(3) = 16 - 24 = -8. Since D < 0, the equation has no real roots.',
    hints: ['Compute Discriminant D = b² - 4ac and check if it is positive, zero, or negative.'],
    status: 'published',
  },
  {
    id: 'q-g10-s2-1',
    subjectId: 'g10-sci',
    chapterId: 'ch-g10-s2',
    topicId: 'top-g10-s2-1',
    gradeId: 10,
    boardId: 'cbse',
    questionType: 'mcq',
    difficulty: 'hard',
    text: 'Three resistors of 2 Ω, 3 Ω, and 6 Ω are connected in PARALLEL. Calculate the equivalent resistance of the network in Ohms.',
    options: ['1 Ω', '11 Ω', '0.5 Ω', '6 Ω'],
    correctAnswer: 0,
    explanation: '1/Rp = 1/2 + 1/3 + 1/6 = 3/6 + 2/6 + 1/6 = 6/6 = 1. Therefore, Rp = 1 Ω.',
    hints: ['Use 1/Rp = 1/R1 + 1/R2 + 1/R3 with a common denominator of 6.'],
    status: 'published',
  },

  // ================= GRADE 11 QUESTIONS =================
  {
    id: 'q-g11-p2-1',
    subjectId: 'g11-sci-phy',
    chapterId: 'ch-g11-p1',
    topicId: 'top-g11-p2-1',
    gradeId: 11,
    boardId: 'cbse',
    questionType: 'mcq',
    difficulty: 'hard',
    text: 'A projectile is launched from ground level with speed u at angle θ. Which of the following statements regarding its velocity at the HIGHEST point is correct?',
    options: [
      'The vertical velocity is 0 and the horizontal velocity is u cos θ',
      'Both horizontal and vertical components of velocity become zero',
      'The velocity is u and acts vertically downwards',
      'The acceleration of the projectile becomes zero at the vertex'
    ],
    correctAnswer: 0,
    explanation: 'At the apex of flight, the vertical velocity momentarily vanishes (v_y = 0), while horizontal velocity remains u cos θ because horizontal acceleration is zero.',
    hints: ['Gravity only acts vertically; horizontal velocity has no opposing force.'],
    status: 'published',
  },
  {
    id: 'q-g11-c2-1',
    subjectId: 'g11-sci-chem',
    chapterId: 'ch-g11-c2',
    topicId: 'top-g11-c2-1',
    gradeId: 11,
    boardId: 'cbse',
    questionType: 'mcq',
    difficulty: 'hard',
    text: 'According to VSEPR theory, what is the spatial geometry and bond angle of a Methane (CH4) molecule?',
    options: ['Tetrahedral, 109.5°', 'Square Planar, 90°', 'Trigonal Bipyramidal, 120° & 90°', 'Trigonal Pyramidal, 107°'],
    correctAnswer: 0,
    explanation: 'Carbon in CH4 has 4 bond pairs and 0 lone pairs (sp³ hybridization), minimizing electron pair repulsion in a regular tetrahedral arrangement with bond angles of 109.5°.',
    hints: ['4 equivalent bonding pairs around central carbon atom.'],
    status: 'published',
  },
  {
    id: 'q-g11-a1-1',
    subjectId: 'g11-com-acc',
    chapterId: 'ch-g11-a1',
    topicId: 'top-g11-a1-1',
    gradeId: 11,
    boardId: 'cbse',
    questionType: 'mcq',
    difficulty: 'medium',
    text: 'If a business firm purchases machinery worth ₹50,000 for cash, how does this impact the fundamental accounting equation (Assets = Liabilities + Capital)?',
    options: [
      'Total assets remain unchanged (one asset Machinery increases by ₹50,000, while another asset Cash decreases by ₹50,000)',
      'Total assets increase by ₹50,000 and Capital increases by ₹50,000',
      'Total liabilities increase by ₹50,000',
      'Capital decreases by ₹50,000 as an expense'
    ],
    correctAnswer: 0,
    explanation: 'Purchasing an asset for cash is an asset-composition shift: Machinery (Asset) increases by 50,000 and Cash (Asset) decreases by 50,000, leaving total assets unchanged.',
    hints: ['Both Cash and Machinery are assets.'],
    status: 'published',
  },
];

/**
 * Build the full question repository combining bespoke questions with
 * complete generated question coverage for every chapter in every subject.
 * Guarantees minimum 32-40 questions per subject across all 51 subjects!
 */
function buildAllQuestions(): Question[] {
  const manualMap = new Map<string, Question>();
  const balancedBespoke = BESPOKE_PRESEEDED_QUESTIONS.map((q, idx) =>
    balanceQuestionOptions(q, `${q.id}-${idx}`)
  );
  balancedBespoke.forEach((q) => manualMap.set(q.id, q));

  const result: Question[] = [...balancedBespoke];
  const subjectMap = new Map(ALL_SUBJECTS.map((s) => [s.id, s]));

  for (const chapter of ALL_CHAPTERS) {
    const subject = subjectMap.get(chapter.subjectId) || {
      id: chapter.subjectId,
      code: chapter.subjectId,
      name: chapter.title,
      iconName: 'BookOpen',
      gradeId: chapter.gradeId,
      boardId: chapter.boardId,
      color: '#3B82F6',
      description: chapter.description,
      chaptersCount: 4,
      totalQuestionsCount: 35,
    };

    const generated = generateCurriculumQuestionsForChapter(chapter, subject, ALL_TOPICS);
    for (const genQ of generated) {
      if (!manualMap.has(genQ.id)) {
        result.push(balanceQuestionOptions(genQ, `${genQ.id}-build`));
      }
    }
  }

  return result;
}

export const ALL_PRESEEDED_QUESTIONS: Question[] = buildAllQuestions();

/**
 * Intelligent Dynamic Question Generator
 * Returns questions for any chapter, ensuring NO subject or chapter is ever blank.
 */
export function getIntelligentQuestionsForChapter(
  chapterId: string,
  subjectId: string,
  gradeId: number,
  chapterTitle?: string,
  subjectName?: string
): Question[] {
  const existing = ALL_PRESEEDED_QUESTIONS.filter((q) => q.chapterId === chapterId);
  if (existing.length > 0) {
    return existing;
  }

  const dummyChapter = {
    id: chapterId,
    subjectId,
    gradeId,
    boardId: 'cbse',
    number: 1,
    title: chapterTitle || 'Core Concepts & Problem Solving',
    description: 'Comprehensive practice and conceptual verification.',
    estMinutes: 45,
    learningObjectives: ['Master fundamental principles', 'Solve exam-pattern questions with accuracy'],
    status: 'published' as const,
  };

  const dummySubject = {
    id: subjectId,
    code: subjectId,
    name: subjectName || 'Subject',
    iconName: 'BookOpen',
    gradeId,
    boardId: 'cbse',
    color: '#3B82F6',
    description: 'Subject curriculum',
    chaptersCount: 4,
    totalQuestionsCount: 35,
  };

  const generated = generateCurriculumQuestionsForChapter(dummyChapter, dummySubject, ALL_TOPICS);
  return generated.map((q, idx) => balanceQuestionOptions(q, `${q.id}-${idx}-intel`));
}

/**
 * High-Yield Mock Exam Question Provider
 * Guarantees a full 30-question mock test for ANY subject across all grades (1-11).
 */
export function getMockExamQuestionsForSubject(
  subjectId: string,
  gradeId: number,
  targetCount: number = 30,
  customQuestions?: Question[],
  customChapters?: Chapter[],
  customSubject?: Subject
): Question[] {
  const poolFromSource = customQuestions || ALL_PRESEEDED_QUESTIONS;
  let subjectQuestions = poolFromSource.filter(
    (q) => q.subjectId === subjectId || (q.gradeId === gradeId && q.subjectId.includes(subjectId.replace(/^g\d+-/, '')))
  );

  const subjectChapters =
    customChapters?.filter((c) => c.subjectId === subjectId) ||
    ALL_CHAPTERS.filter((c) => c.subjectId === subjectId);

  // If pool has fewer than targetCount, generate from chapters
  if (subjectQuestions.length < targetCount) {
    subjectChapters.forEach((chap) => {
      const extra = getIntelligentQuestionsForChapter(
        chap.id,
        subjectId,
        gradeId,
        chap.title,
        customSubject?.name
      );
      extra.forEach((eq) => {
        if (!subjectQuestions.some((sq) => sq.id === eq.id || sq.text === eq.text)) {
          subjectQuestions.push(eq);
        }
      });
    });
  }

  // If still under targetCount, generate supplemental comprehensive questions to reach 30
  if (subjectQuestions.length < targetCount) {
    const needed = targetCount - subjectQuestions.length;
    const sName = customSubject?.name || subjectId.replace(/^g\d+-/, '').toUpperCase();

    for (let i = 0; i < needed; i++) {
      const chap = subjectChapters[i % Math.max(1, subjectChapters.length)] || {
        id: `mock-ch-${i + 1}`,
        title: `${sName} Concept Review ${i + 1}`,
        number: (i % 4) + 1,
      };

      const qNum = subjectQuestions.length + 1;
      const newQ: Question = {
        id: `q-mock-${subjectId}-${qNum}`,
        topicId: `top-mock-${subjectId}-${(i % 4) + 1}`,
        chapterId: chap.id,
        subjectId,
        gradeId,
        boardId: 'cbse',
        questionType: 'mcq',
        difficulty: i % 3 === 0 ? 'easy' : i % 3 === 1 ? 'medium' : 'hard',
        text: `[Mock Exam Q${qNum}] For Grade ${gradeId} ${sName} (${chap.title}): Which statement accurately applies the fundamental core concepts taught in this curriculum?`,
        options: [
          `Apply systematic step-by-step reasoning, verify against standard definitions, and follow proper units and rules.`,
          `Skip foundational conceptual steps and rely on unverified estimations.`,
          `Disregard standard formulas and theoretical rules outlined in the syllabus.`,
          `Assume inverse proportions without calculating or checking given data.`,
        ],
        correctAnswer: 0,
        explanation: `In Grade ${gradeId} ${sName} (${chap.title}), mastering core concepts requires careful step-by-step application of definitions, rules, and structured verification.`,
        hints: [`Recall the fundamental principles covered in Chapter: ${chap.title}.`],
        stepByStepSolution: [
          `Step 1: Identify given parameters in ${chap.title}.`,
          `Step 2: Apply the standard Grade ${gradeId} ${sName} conceptual framework.`,
          `Step 3: Arrive at the verified solution.`,
        ],
        status: 'published',
      };

      subjectQuestions.push(balanceQuestionOptions(newQ, `mock-seed-${subjectId}-${qNum}`));
    }
  }

  // Balance all options across A, B, C, D
  return subjectQuestions.slice(0, targetCount).map((q, idx) =>
    balanceQuestionOptions(q, `${q.id}-${idx}-mockfinal`)
  );
}


