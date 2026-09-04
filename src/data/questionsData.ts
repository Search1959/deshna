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
 * Normalize board-prefixed subject IDs (e.g., 'cbse-g3-math' -> 'g3-math')
 */
export function normalizeSubjectKey(subjectId: string): string {
  if (!subjectId) return '';
  return subjectId.replace(/^(cbse|icse|wbbse|state|cam|isc|wb|sb|intl|ib)-/i, '').toLowerCase();
}

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
  const normSubjectMap = new Map(ALL_SUBJECTS.map((s) => [normalizeSubjectKey(s.id), s]));

  for (const chapter of ALL_CHAPTERS) {
    const normChKey = normalizeSubjectKey(chapter.subjectId);
    const subject =
      subjectMap.get(chapter.subjectId) ||
      normSubjectMap.get(normChKey) || {
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
  const normTarget = normalizeSubjectKey(subjectId);
  const targetCode = normTarget.replace(/^g\d+-/, ''); // e.g. 'math', 'sci', 'evs'

  // Match subject questions from pool
  const subjectQuestions: Question[] = [];
  const seenTexts = new Set<string>();

  const isMatchingSubject = (qSubjectId: string, qGradeId?: number) => {
    if (qSubjectId === subjectId) return true;
    const normQ = normalizeSubjectKey(qSubjectId);
    if (normQ === normTarget) return true;
    if (qGradeId === gradeId) {
      const qCode = normQ.replace(/^g\d+-/, '');
      if (qCode === targetCode) return true;
      if (
        gradeId <= 5 &&
        ((targetCode === 'evs' && qCode === 'sci') || (targetCode === 'sci' && qCode === 'evs'))
      ) {
        return true;
      }
    }
    return false;
  };

  for (const q of poolFromSource) {
    if (isMatchingSubject(q.subjectId, q.gradeId)) {
      const cleanText = q.text.trim();
      if (!seenTexts.has(cleanText)) {
        seenTexts.add(cleanText);
        subjectQuestions.push(q);
      }
    }
  }

  // Identify all curriculum chapters for this subject
  const allChaptersList = customChapters || ALL_CHAPTERS;
  const subjectChapters = allChaptersList.filter((c) =>
    isMatchingSubject(c.subjectId, c.gradeId)
  );

  // If pool has fewer than targetCount, generate dynamically from subject chapters
  if (subjectQuestions.length < targetCount && subjectChapters.length > 0) {
    const subjectObj: Subject =
      customSubject ||
      ALL_SUBJECTS.find((s) => s.id === subjectId || normalizeSubjectKey(s.id) === normTarget) || {
        id: subjectId,
        code: subjectId,
        name: customSubject?.name || normTarget.toUpperCase(),
        iconName: 'BookOpen',
        gradeId,
        boardId: 'cbse',
        color: '#3B82F6',
        description: 'Mock Exam Subject',
        chaptersCount: subjectChapters.length,
        totalQuestionsCount: 40,
      };

    for (const chap of subjectChapters) {
      if (subjectQuestions.length >= targetCount) break;
      const extraQuestions = generateCurriculumQuestionsForChapter(chap, subjectObj, ALL_TOPICS);
      for (const eq of extraQuestions) {
        const cleanText = eq.text.trim();
        if (!seenTexts.has(cleanText)) {
          seenTexts.add(cleanText);
          subjectQuestions.push(eq);
          if (subjectQuestions.length >= targetCount) break;
        }
      }
    }
  }

  // If still under targetCount (e.g. specialized or smaller subjects), generate authentic supplemental questions
  if (subjectQuestions.length < targetCount) {
    const sName = customSubject?.name || normTarget.toUpperCase();
    let step = 0;
    const maxSafetyIterations = 150;

    while (subjectQuestions.length < targetCount && step < maxSafetyIterations) {
      step++;
      const chap =
        subjectChapters[(step - 1) % Math.max(1, subjectChapters.length)] || {
          id: `mock-ch-${step}`,
          title: `${sName} Topic ${step}`,
          number: ((step - 1) % 4) + 1,
        };

      const qNum = subjectQuestions.length + 1;
      let newQ: Question;

      if (targetCode.includes('math')) {
        const pattern = step % 4;
        if (pattern === 0) {
          const valA = step * 14 + 23;
          const valB = step * 8 + 17;
          const ans = valA + valB;
          newQ = {
            id: `q-mock-${subjectId}-${qNum}`,
            topicId: `top-mock-${subjectId}-${step}`,
            chapterId: chap.id,
            subjectId,
            gradeId,
            boardId: 'cbse',
            questionType: 'numerical',
            difficulty: step % 2 === 0 ? 'easy' : 'medium',
            text: `[Problem #${qNum}] In ${chap.title}: What is the exact sum of ${valA} and ${valB}?`,
            options: [`${ans}`, `${ans + 10}`, `${ans - 5}`, `${ans + 100}`],
            correctAnswer: 0,
            explanation: `${valA} + ${valB} = ${ans}. Aligning by place value and adding ones then tens gives ${ans}.`,
            hints: ['Add column by column starting from the ones place.'],
            stepByStepSolution: [`Step 1: ${valA} + ${valB}`, `Step 2: Sum = ${ans}`],
            status: 'published',
          };
        } else if (pattern === 1) {
          const groups = (step % 6) + 3;
          const items = (step % 5) + 4;
          const total = groups * items;
          newQ = {
            id: `q-mock-${subjectId}-${qNum}`,
            topicId: `top-mock-${subjectId}-${step}`,
            chapterId: chap.id,
            subjectId,
            gradeId,
            boardId: 'cbse',
            questionType: 'numerical',
            difficulty: 'medium',
            text: `[Application #${qNum}] In ${chap.title}: If a teacher distributes ${items} notebooks to each of ${groups} students, how many total notebooks are distributed?`,
            options: [`${total} notebooks`, `${total + 4} notebooks`, `${total - 2} notebooks`, `${groups + items} notebooks`],
            correctAnswer: 0,
            explanation: `Total notebooks = ${groups} groups × ${items} notebooks per group = ${total} notebooks.`,
            hints: ['Multiply the number of groups by the quantity in each group.'],
            stepByStepSolution: [`Step 1: ${groups} × ${items} = ${total}`],
            status: 'published',
          };
        } else if (pattern === 2) {
          const side = (step % 8) + 5;
          const perimeter = 4 * side;
          newQ = {
            id: `q-mock-${subjectId}-${qNum}`,
            topicId: `top-mock-${subjectId}-${step}`,
            chapterId: chap.id,
            subjectId,
            gradeId,
            boardId: 'cbse',
            questionType: 'numerical',
            difficulty: 'medium',
            text: `[Geometry #${qNum}] In ${chap.title}: What is the perimeter of a square whose side length is ${side} cm?`,
            options: [`${perimeter} cm`, `${perimeter + 4} cm`, `${side * side} cm`, `${perimeter - 2} cm`],
            correctAnswer: 0,
            explanation: `The perimeter of a square is 4 × side length = 4 × ${side} = ${perimeter} cm.`,
            hints: ['Perimeter of square = 4 × side.'],
            stepByStepSolution: [`Step 1: 4 × ${side} cm = ${perimeter} cm`],
            status: 'published',
          };
        } else {
          const num = (step % 5) + 2;
          const den = num + 3;
          newQ = {
            id: `q-mock-${subjectId}-${qNum}`,
            topicId: `top-mock-${subjectId}-${step}`,
            chapterId: chap.id,
            subjectId,
            gradeId,
            boardId: 'cbse',
            questionType: 'mcq',
            difficulty: 'easy',
            text: `[Fraction Analysis #${qNum}] In ${chap.title}: In the fraction ${num}/${den}, what does the number ${den} represent?`,
            options: [
              `The total number of equal parts into which the whole is divided`,
              `The number of parts currently taken or shaded`,
              `The remainder after dividing the numerator`,
              `The total count of whole shapes`,
            ],
            correctAnswer: 0,
            explanation: `In any fraction a/b, the denominator (b) represents the total number of equal parts in the whole.`,
            hints: ['Denominator is the bottom number indicating total equal divisions.'],
            stepByStepSolution: [`Denominator ${den} = Total equal parts.`],
            status: 'published',
          };
        }
      } else if (
        targetCode.includes('sci') ||
        targetCode.includes('evs') ||
        targetCode.includes('phy') ||
        targetCode.includes('chem') ||
        targetCode.includes('bio')
      ) {
        const pattern = step % 4;
        if (pattern === 0) {
          newQ = {
            id: `q-mock-${subjectId}-${qNum}`,
            topicId: `top-mock-${subjectId}-${step}`,
            chapterId: chap.id,
            subjectId,
            gradeId,
            boardId: 'cbse',
            questionType: 'mcq',
            difficulty: 'easy',
            text: `[Scientific Inquiry #${qNum}] In "${chap.title}": Why is controlling variables essential during an experiment?`,
            options: [
              `To ensure that any observed change is caused exclusively by the single tested variable`,
              `To make the experiment complete without recording measurements`,
              `To avoid using calibrated scientific tools`,
              `To change multiple factors at the same time randomly`,
            ],
            correctAnswer: 0,
            explanation: `Controlling variables isolates the cause-and-effect relationship, ensuring empirical validity.`,
            hints: ['A fair test changes only one factor at a time.'],
            stepByStepSolution: ['Step 1: Isolate independent variable.', 'Step 2: Keep control variables constant.'],
            status: 'published',
          };
        } else if (pattern === 1) {
          newQ = {
            id: `q-mock-${subjectId}-${qNum}`,
            topicId: `top-mock-${subjectId}-${step}`,
            chapterId: chap.id,
            subjectId,
            gradeId,
            boardId: 'cbse',
            questionType: 'mcq',
            difficulty: 'medium',
            text: `[Physical & Biological Mechanisms #${qNum}] In "${chap.title}": How is energy converted or utilized in this system?`,
            options: [
              `Energy transforms between kinetic, potential, thermal, or chemical states while total energy is conserved`,
              `Energy is permanently lost forever without transforming`,
              `Energy is spontaneously generated from zero input`,
              `Energy can only exist in solid form`,
            ],
            correctAnswer: 0,
            explanation: `The Universal Law of Conservation of Energy dictates that energy transforms without being created or destroyed.`,
            hints: ['First Law of Thermodynamics.'],
            stepByStepSolution: ['Energy transforms across states while total sum remains constant.'],
            status: 'published',
          };
        } else if (pattern === 2) {
          newQ = {
            id: `q-mock-${subjectId}-${qNum}`,
            topicId: `top-mock-${subjectId}-${step}`,
            chapterId: chap.id,
            subjectId,
            gradeId,
            boardId: 'cbse',
            questionType: 'mcq',
            difficulty: 'medium',
            text: `[Ecological Balance #${qNum}] In "${chap.title}": What happens when natural cycles or feedback loops are disturbed?`,
            options: [
              `The equilibrium of the ecosystem shifts, requiring conservation and sustainable management`,
              `The ecosystem instantly doubles in biodiversity`,
              `Physical laws cease to apply completely`,
              `All living organisms become completely immune to environmental factors`,
            ],
            correctAnswer: 0,
            explanation: `Ecological stability depends on interconnected balance; disruptions trigger cascading impacts on species and habitats.`,
            hints: ['Think of food chains and resource equilibrium.'],
            stepByStepSolution: ['Ecosystems rely on balance between biotic and abiotic factors.'],
            status: 'published',
          };
        } else {
          newQ = {
            id: `q-mock-${subjectId}-${qNum}`,
            topicId: `top-mock-${subjectId}-${step}`,
            chapterId: chap.id,
            subjectId,
            gradeId,
            boardId: 'cbse',
            questionType: 'mcq',
            difficulty: 'hard',
            text: `[Empirical Evidence #${qNum}] In "${chap.title}": Which observation provides verifiable proof for theoretical models in this topic?`,
            options: [
              `Quantitative measurements collected with calibrated instruments and repeated trials`,
              `Unverified hearsay without experimental logs`,
              `Assumptions made without recording units of measurement`,
              `Personal subjective preference without data`,
            ],
            correctAnswer: 0,
            explanation: `Scientific models require repeatable, quantitative experimental data to be verified.`,
            hints: ['Empirical proof requires measurement and repeatability.'],
            stepByStepSolution: ['Measurement with calibrated instruments ensures accuracy.'],
            status: 'published',
          };
        }
      } else if (
        targetCode.includes('eng') ||
        targetCode.includes('lang') ||
        targetCode.includes('lit') ||
        targetCode.includes('hindi') ||
        targetCode.includes('bengali')
      ) {
        // English and Languages
        const pattern = step % 4;
        if (pattern === 0) {
          newQ = {
            id: `q-mock-${subjectId}-${qNum}`,
            topicId: `top-mock-${subjectId}-${step}`,
            chapterId: chap.id,
            subjectId,
            gradeId,
            boardId: 'cbse',
            questionType: 'mcq',
            difficulty: 'easy',
            text: `[Grammar & Syntax #${qNum}] In "${chap.title}": Which rule is essential for writing grammatically correct sentences?`,
            options: [
              `The finite verb must always agree in number and person with its grammatical subject`,
              `Adjectives must always be placed after the period at the end of a sentence`,
              `Punctuation marks are optional and should be avoided in formal writing`,
              `Every noun in a sentence must be capitalized regardless of position`,
            ],
            correctAnswer: 0,
            explanation: `Subject-verb agreement is the foundational rule of syntax: singular subjects take singular verbs, and plural subjects take plural verbs.`,
            hints: ['Think of subject-verb agreement.'],
            stepByStepSolution: ['Ensure the verb matches the subject in person and number.'],
            status: 'published',
          };
        } else if (pattern === 1) {
          newQ = {
            id: `q-mock-${subjectId}-${qNum}`,
            topicId: `top-mock-${subjectId}-${step}`,
            chapterId: chap.id,
            subjectId,
            gradeId,
            boardId: 'cbse',
            questionType: 'mcq',
            difficulty: 'medium',
            text: `[Vocabulary & Context #${qNum}] In "${chap.title}": When encountering an unfamiliar word in a passage, what is the best strategy?`,
            options: [
              `Analyze the surrounding context clues, root words, and prefixes/suffixes to deduce meaning`,
              `Skip the entire paragraph and guess the story outcome`,
              `Assume the word has the exact opposite meaning of what the sentence describes`,
              `Ignore the word completely and continue reading without understanding`,
            ],
            correctAnswer: 0,
            explanation: `Context clues and morphological analysis (roots and affixes) allow active readers to determine vocabulary meanings efficiently.`,
            hints: ['Look at clues in neighboring sentences.'],
            stepByStepSolution: ['Use context clues and word roots to infer meaning.'],
            status: 'published',
          };
        } else if (pattern === 2) {
          newQ = {
            id: `q-mock-${subjectId}-${qNum}`,
            topicId: `top-mock-${subjectId}-${step}`,
            chapterId: chap.id,
            subjectId,
            gradeId,
            boardId: 'cbse',
            questionType: 'mcq',
            difficulty: 'medium',
            text: `[Reading Comprehension #${qNum}] In "${chap.title}": What is the primary purpose of identifying the author's central theme?`,
            options: [
              `To understand the core message or moral lesson that unifies all narrative events and arguments`,
              `To count how many paragraphs contain dialogue marks`,
              `To memorize every single character's minor spoken line`,
              `To find the longest word printed on the page`,
            ],
            correctAnswer: 0,
            explanation: `The central theme reveals the overarching lesson or argument the writer intends to communicate to the reader.`,
            hints: ['Theme is the big idea or underlying message of a text.'],
            stepByStepSolution: ['Determine the main message the text conveys.'],
            status: 'published',
          };
        } else {
          newQ = {
            id: `q-mock-${subjectId}-${qNum}`,
            topicId: `top-mock-${subjectId}-${step}`,
            chapterId: chap.id,
            subjectId,
            gradeId,
            boardId: 'cbse',
            questionType: 'mcq',
            difficulty: 'hard',
            text: `[Writing Conventions #${qNum}] In "${chap.title}": When drafting a formal composition or letter, which tone and structure is standard?`,
            options: [
              `Clear, courteous, well-structured paragraphs with precise vocabulary and proper salutation/sign-off`,
              `Informal texting acronyms, unpunctuated stream of consciousness, and emotional slang`,
              `Writing one continuous unpunctuated run-on sentence for the entire text`,
              `Using vague, ambiguous statements so the reader has to guess your request`,
            ],
            correctAnswer: 0,
            explanation: `Formal writing requires clarity, courteous tone, organized paragraphs, and conventional layout.`,
            hints: ['Formal letters maintain polite language and clear organization.'],
            stepByStepSolution: ['Plan greeting, clear body paragraphs with purpose, and formal closure.'],
            status: 'published',
          };
        }
      } else {
        // Social Science, Commerce, General
        const pattern = step % 4;
        if (pattern === 0) {
          newQ = {
            id: `q-mock-${subjectId}-${qNum}`,
            topicId: `top-mock-${subjectId}-${step}`,
            chapterId: chap.id,
            subjectId,
            gradeId,
            boardId: 'cbse',
            questionType: 'mcq',
            difficulty: 'easy',
            text: `[Socio-Historical Context #${qNum}] In "${chap.title}": What is the primary historical significance or institutional role examined?`,
            options: [
              `It established foundational rules, rights, and organizational systems that shaped societal progress`,
              `It had zero influence on governance or living conditions`,
              `It was enacted without any records or constitutional documentation`,
              `It was completely reversed within 24 hours with no legacy`,
            ],
            correctAnswer: 0,
            explanation: `Historical milestones in ${chap.title} laid institutional frameworks for modern rights and civic structures.`,
            hints: ['Consider the long-term impact on democratic society.'],
            stepByStepSolution: ['Analyze the historical development and its lasting institutional legacy.'],
            status: 'published',
          };
        } else if (pattern === 1) {
          newQ = {
            id: `q-mock-${subjectId}-${qNum}`,
            topicId: `top-mock-${subjectId}-${step}`,
            chapterId: chap.id,
            subjectId,
            gradeId,
            boardId: 'cbse',
            questionType: 'mcq',
            difficulty: 'medium',
            text: `[Civic & Democratic Rights #${qNum}] In "${chap.title}": Why is the principle of separation of powers vital for stable governance?`,
            options: [
              `It prevents arbitrary tyranny by establishing mutual checks and balances among Legislature, Executive, and Judiciary`,
              `It merges all branches under a single non-elected official`,
              `It eliminates public elections and court reviews`,
              `It removes all legal protections for citizens`,
            ],
            correctAnswer: 0,
            explanation: `Separation of powers ensures no single branch possesses unchecked authority, safeguarding democratic liberty.`,
            hints: ['Checks and balances between Legislature, Executive, and Judiciary.'],
            stepByStepSolution: ['Three independent branches protect constitutional democracy.'],
            status: 'published',
          };
        } else if (pattern === 2) {
          newQ = {
            id: `q-mock-${subjectId}-${qNum}`,
            topicId: `top-mock-${subjectId}-${step}`,
            chapterId: chap.id,
            subjectId,
            gradeId,
            boardId: 'cbse',
            questionType: 'mcq',
            difficulty: 'medium',
            text: `[Geographical & Resource Distribution #${qNum}] In "${chap.title}": How does physical geography determine human settlement patterns?`,
            options: [
              `Availability of fresh water, fertile soil, and hospitable climates encourages denser human civilization and agriculture`,
              `Human settlements thrive exclusively in barren, waterless desert dunes`,
              `Topography and climate have zero impact on human settlement or economy`,
              `Agriculture is most productive on frozen polar mountain peaks`,
            ],
            correctAnswer: 0,
            explanation: `River basins and fertile plains historically provided the vital sustenance for flourishing civilizations.`,
            hints: ['Water availability and fertile soils drive human settlements.'],
            stepByStepSolution: ['Physical geography directly shapes economic activities and settlement density.'],
            status: 'published',
          };
        } else {
          newQ = {
            id: `q-mock-${subjectId}-${qNum}`,
            topicId: `top-mock-${subjectId}-${step}`,
            chapterId: chap.id,
            subjectId,
            gradeId,
            boardId: 'cbse',
            questionType: 'mcq',
            difficulty: 'hard',
            text: `[Analytical Evaluation #${qNum}] In "${chap.title}": When evaluating primary source evidence or historical documents, what critical step must be taken?`,
            options: [
              `Corroborate accounts across multiple independent sources and assess the context and authorship`,
              `Accept a single unverified claim without questioning potential bias`,
              `Discard all archaeological artifacts that do not align with modern assumptions`,
              `Ignore the time period and language of the original author`,
            ],
            correctAnswer: 0,
            explanation: `Critical historical inquiry requires evaluating provenance, intent, and corroboration with archaeological evidence.`,
            hints: ['Cross-reference multiple sources to verify historical reliability.'],
            stepByStepSolution: ['Check author context, cross-verify with other documents, evaluate evidence.'],
            status: 'published',
          };
        }
      }

      const cleanText = newQ.text.trim();
      if (!seenTexts.has(cleanText)) {
        seenTexts.add(cleanText);
        subjectQuestions.push(balanceQuestionOptions(newQ, `mock-seed-${subjectId}-${qNum}`));
      }
    }
  }

  // Deterministically balance all options across A, B, C, D and ensure uniqueness
  return subjectQuestions.slice(0, targetCount).map((q, idx) =>
    balanceQuestionOptions(q, `${q.id}-${idx}-mockfinal`)
  );
}


