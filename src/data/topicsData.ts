import { Topic } from '../types';
import { ALL_CHAPTERS } from './chaptersData';
import { generateCurriculumTopicsForChapter } from './curriculumGenerator';

export const MANUAL_TOPICS: Topic[] = [
  // --- Grade 1 Topics ---
  { id: 'top-g1-m1-1', chapterId: 'ch-g1-m1', order: 1, title: 'Inside and Outside, Top and Bottom', difficulty: 'easy', summary: 'Understanding where things are in our 3D space.', keyConcepts: ['Inside vs Outside', 'Top vs Bottom', 'Near vs Far'] },
  { id: 'top-g1-m1-2', chapterId: 'ch-g1-m1', order: 2, title: 'Rolling and Sliding Shapes (Circles & Squares)', difficulty: 'easy', summary: 'Round objects roll smoothly, flat objects slide.', keyConcepts: ['Rolling objects', 'Sliding flat objects', 'Circles, squares, rectangles'] },
  { id: 'top-g1-m2-1', chapterId: 'ch-g1-m2', order: 1, title: 'Counting 1 to 9 with Colorful Objects', difficulty: 'easy', summary: 'One-to-one correspondence for counting numbers.', keyConcepts: ['Number words', 'Matching dots to digits', 'Count order'] },
  { id: 'top-g1-m3-1', chapterId: 'ch-g1-m3', order: 1, title: 'Putting Groups Together (Addition up to 10)', difficulty: 'easy', summary: 'Combine 2 apples and 3 apples to get 5 apples.', keyConcepts: ['Plus sign (+)', 'Total sum', 'Finger math'] },
  { id: 'top-g1-m4-1', chapterId: 'ch-g1-m4', order: 1, title: 'Taking Away (Subtraction up to 9)', difficulty: 'easy', summary: 'If you have 5 birds and 2 fly away, 3 remain.', keyConcepts: ['Minus sign (-)', 'Left over', 'Crossing out items'] },
  { id: 'top-g1-e1-1', chapterId: 'ch-g1-e1', order: 1, title: 'Short Vowel Sounds (a, e, i, o, u)', difficulty: 'easy', summary: 'Phonics sounds for early reading words like bat, pen, pig, top, sun.', keyConcepts: ['Short vowels', 'CVC blending', 'Letter sounds'] },
  { id: 'top-g1-v1-1', chapterId: 'ch-g1-v1', order: 1, title: 'My Wonderful Body & 5 Senses', difficulty: 'easy', summary: 'Eyes to see, ears to hear, nose to smell, tongue to taste, skin to feel.', keyConcepts: ['Five senses', 'Healthy body care', 'Face parts'] },

  // --- Grade 2 Topics ---
  { id: 'top-g2-m1-1', chapterId: 'ch-g2-m1', order: 1, title: 'Tens and Ones Place Value Bundles', difficulty: 'easy', summary: 'A bundle of 10 matchsticks equals 1 Ten. 3 tens and 4 ones make 34.', keyConcepts: ['Bundling tens', 'Place value columns', 'Expanded form (30 + 4)'] },
  { id: 'top-g2-m2-1', chapterId: 'ch-g2-m2', order: 1, title: '2-Digit Addition with Regrouping', difficulty: 'medium', summary: 'When ones add up to 10 or more, carry 1 over to the tens column.', keyConcepts: ['Column addition', 'Carry-over 10', 'Word problems'] },
  { id: 'top-g2-m3-1', chapterId: 'ch-g2-m3', order: 1, title: 'Counting Rupee Coins and Notes', difficulty: 'easy', summary: 'Adding coins (₹1, ₹2, ₹5) and notes (₹10, ₹20, ₹50, ₹100).', keyConcepts: ['Rupee symbol (₹)', 'Making change', 'Total price'] },
  { id: 'top-g2-e1-1', chapterId: 'ch-g2-e1', order: 1, title: 'Action Verbs and Doing Words', difficulty: 'easy', summary: 'Verbs tell what people and animals are doing (dance, swim, sing).', keyConcepts: ['Action verbs', 'Present continuous (-ing)', 'Subject action match'] },
  { id: 'top-g2-v1-1', chapterId: 'ch-g2-v1', order: 1, title: 'Organs Inside Us (Heart, Lungs, Stomach, Brain)', difficulty: 'easy', summary: 'The heart pumps blood, lungs breathe air, stomach digests food, brain thinks.', keyConcepts: ['Internal organs', 'Pumping heart', 'Breathing lungs'] },

  // --- Grade 3 Topics ---
  { id: 'top-g3-m1-1', chapterId: 'ch-g3-m1', order: 1, title: 'Views from Different Angles (Top, Front, Side)', difficulty: 'easy', summary: 'How everyday objects change in appearance depending on where you stand.', keyConcepts: ['Top view', 'Front view', 'Side elevation'] },
  { id: 'top-g3-m1-2', chapterId: 'ch-g3-m1', order: 2, title: 'Mirror Halves and Symmetry Lines', difficulty: 'easy', summary: 'When a shape can be folded into two matching identical halves.', keyConcepts: ['Line of symmetry', 'Mirror reflections', 'Symmetrical letters'] },
  { id: 'top-g3-m2-1', chapterId: 'ch-g3-m2', order: 1, title: '3-Digit Place Value & Expanded Notation', difficulty: 'easy', summary: 'Understanding hundreds, tens, and ones with base-10 blocks.', keyConcepts: ['Hundreds place', 'Expanded form (400 + 50 + 6)', 'Number names'] },
  { id: 'top-g3-m3-1', chapterId: 'ch-g3-m3', order: 1, title: 'Mental Addition Tricks & Column Sums', difficulty: 'medium', summary: 'Adding 3-digit numbers using friendly number jumps on an open number line.', keyConcepts: ['Mental jump strategy', 'Carrying to hundreds', 'Estimation check'] },
  { id: 'top-g3-m5-1', chapterId: 'ch-g3-m5', order: 1, title: 'Understanding Halves (1/2) and Quarters (1/4)', difficulty: 'easy', summary: 'Fractions represent equal divisions of a single whole unit.', keyConcepts: ['Equal parts', 'Numerator and Denominator', 'Visual unit fraction'] },
  { id: 'top-g3-m5-2', chapterId: 'ch-g3-m5', order: 2, title: 'Fractions of a Set or Collection', difficulty: 'medium', summary: 'Finding 1/2 of 10 chocolates or 1/4 of 12 balls.', keyConcepts: ['Set grouping', 'Division connection', 'Fraction word problems'] },
  { id: 'top-g3-e1-1', chapterId: 'ch-g3-e1', order: 1, title: 'Proper Nouns vs Common Nouns', difficulty: 'easy', summary: 'Common nouns name general items (city, boy), proper nouns name specific entities (Mumbai, Rohan).', keyConcepts: ['Capitalization rule', 'Proper nouns', 'Collective nouns'] },
  { id: 'top-g3-v1-1', chapterId: 'ch-g3-v1', order: 1, title: 'Animal Habitats and Adaptations', difficulty: 'easy', summary: 'Terrestrial, aquatic, arboreal, and aerial animal specializations.', keyConcepts: ['Habitat features', 'Carnivores/Herbivores', 'Camouflage'] },

  // --- Grade 4 Topics ---
  { id: 'top-g4-m1-1', chapterId: 'ch-g4-m1', order: 1, title: 'Properties of 3D Geometric Solids', difficulty: 'easy', summary: 'Faces, straight edges, and vertices of cubes, cuboids, prisms.', keyConcepts: ['Euler characteristic preview (F+V-E=2)', 'Faces, Edges, Vertices', 'Nets of solids'] },
  { id: 'top-g4-m2-1', chapterId: 'ch-g4-m2', order: 1, title: 'Metric Conversions (mm, cm, m, km)', difficulty: 'medium', summary: 'Multiplication by 10, 100, 1000 to convert between length units.', keyConcepts: ['1 m = 100 cm', '1 km = 1000 m', 'Unit conversions'] },
  { id: 'top-g4-s1-1', chapterId: 'ch-g4-s1', order: 1, title: 'Desert and Mountain Plant Adaptations', difficulty: 'easy', summary: 'Waxy coatings, spines replacing leaves, and conical shapes shedding snow.', keyConcepts: ['Xerophytic adaptations', 'Photosynthetic green stems', 'Stilt roots'] },
  { id: 'top-g4-s2-1', chapterId: 'ch-g4-s2', order: 1, title: 'Types of Human Teeth & Dental Health', difficulty: 'easy', summary: 'Incisors for biting, canines for tearing, molars for grinding.', keyConcepts: ['4 tooth types', 'Enamel protection', 'Plaque and cavities'] },

  // --- Grade 5 Topics ---
  { id: 'top-g5-m1-1', chapterId: 'ch-g5-m1', order: 1, title: 'Indian vs International Numbering System', difficulty: 'medium', summary: 'Lakhs and Crores vs Millions and Billions comma groupings.', keyConcepts: ['Indian place value (3,2,2)', 'International place value (3,3,3)', 'Large number word forms'] },
  { id: 'top-g5-m2-1', chapterId: 'ch-g5-m2', order: 1, title: 'Angles: Acute, Right, Obtuse, Straight', difficulty: 'easy', summary: 'Measuring rotation in degrees using a standard 180° protractor.', keyConcepts: ['Right angle = 90°', 'Acute < 90°', 'Obtuse > 90°', 'Protractor measurement'] },
  { id: 'top-g5-m4-1', chapterId: 'ch-g5-m4', order: 1, title: 'Perimeter and Area of Rectangles and Squares', difficulty: 'medium', summary: 'Perimeter = 2(L + W); Area = L x W in square units.', keyConcepts: ['Perimeter boundary length', 'Area surface coverage (cm² / m²)', 'Grid unit counting'] },
  { id: 'top-g5-s1-1', chapterId: 'ch-g5-s1', order: 1, title: 'Extraordinary Animal Senses & Echolocation', difficulty: 'easy', summary: 'How bats navigate in pitch dark and silkworms find partners miles away.', keyConcepts: ['Echolocation in bats', 'Pheromone scent trails in ants', 'Infrared vision in pit vipers'] },
  { id: 'top-g5-s2-1', chapterId: 'ch-g5-s2', order: 1, title: 'Molecular Arrangement in States of Matter', difficulty: 'medium', summary: 'Kinetic energy and intermolecular space differences between solids, liquids, and gases.', keyConcepts: ['Tightly packed solids', 'Flowing liquids', 'Compressible gases'] },

  // --- Grade 6 Topics ---
  { id: 'top-g6-m1-1', chapterId: 'ch-g6-m1', order: 1, title: 'BODMAS / Order of Operations', difficulty: 'medium', summary: 'Brackets, Orders, Division/Multiplication, Addition/Subtraction hierarchy.', keyConcepts: ['Order of precedence', 'Nested parentheses', 'Arithmetic simplification'] },
  { id: 'top-g6-m2-1', chapterId: 'ch-g6-m2', order: 1, title: 'Negative Numbers & Integer Addition Rules', difficulty: 'medium', summary: 'Rules for combining positive and negative signs on a directional number line.', keyConcepts: ['Additive inverse', '(-a) + (-b) = -(a+b)', 'Sign determination'] },
  { id: 'top-g6-m3-1', chapterId: 'ch-g6-m3', order: 1, title: 'Forming Algebraic Expressions with Variables', difficulty: 'medium', summary: 'Translating phrases like "5 more than twice x" into 2x + 5.', keyConcepts: ['Variable x, y', 'Constants', 'Coefficients', 'Algebraic modeling'] },
  { id: 'top-g6-s1-1', chapterId: 'ch-g6-s1', order: 1, title: 'Nutrient Tests & Deficiency Diseases', difficulty: 'medium', summary: 'Iodine test for starch, Biuret test for proteins, Scurvy from Vitamin C deficiency.', keyConcepts: ['Iodine blue-black reaction', 'Biuret violet reaction', 'Vitamin deficiency chart'] },
  { id: 'top-g6-s4-1', chapterId: 'ch-g6-s4', order: 1, title: 'Rectilinear Propagation & Pinhole Camera Optics', difficulty: 'medium', summary: 'Light travels in straight rays, producing inverted real images on the pinhole screen.', keyConcepts: ['Straight line propagation', 'Inverted pinhole image', 'Shadow umbra and penumbra'] },

  // --- Grade 7 Topics ---
  { id: 'top-g7-m1-1', chapterId: 'ch-g7-m1', order: 1, title: 'Distributive Property of Integers: a(b + c) = ab + ac', difficulty: 'medium', summary: 'Simplifying complex numeric and algebraic products using distributivity.', keyConcepts: ['Distributive law', 'Factoring common terms', 'Negative multiplication'] },
  { id: 'top-g7-m4-1', chapterId: 'ch-g7-m4', order: 1, title: 'The Pythagoras Theorem in Right Triangles', difficulty: 'medium', summary: 'In a right-angled triangle, hypotenuse² = base² + perpendicular² (h² = b² + p²).', keyConcepts: ['Hypotenuse', 'Pythagorean triplets (3,4,5 / 5,12,13)', 'Proof application'] },
  { id: 'top-g7-s1-1', chapterId: 'ch-g7-s1', order: 1, title: 'Photosynthesis: Light Absorption & Stomata Control', difficulty: 'medium', summary: 'Guard cells regulate stomatal opening for CO2 intake and transpiration.', keyConcepts: ['Stomatal pore mechanism', 'Chlorophyll pigment', 'Glucose and Oxygen synthesis'] },
  { id: 'top-g7-s2-1', chapterId: 'ch-g7-s2', order: 1, title: 'Conduction, Convection and Thermal Radiation', difficulty: 'medium', summary: 'Three distinct physical mechanisms of heat transfer in solids, liquids, and vacuums.', keyConcepts: ['Free electron conduction', 'Convection currents (Sea/Land breeze)', 'Infrared electromagnetic radiation'] },
  { id: 'top-g7-s3-1', chapterId: 'ch-g7-s3', order: 1, title: 'Neutralisation Reactions & pH Indicators', difficulty: 'medium', summary: 'Acid + Base -> Salt + Water + Heat; Litmus, phenolphthalein, and universal indicator.', keyConcepts: ['Neutralisation equation', 'Litmus color shifts', 'Antacid medicine chemistry'] },

  // --- Grade 8 Topics ---
  { id: 'top-g8-m1-1', chapterId: 'ch-g8-m1', order: 1, title: 'Density Property & Inserting Rational Numbers', difficulty: 'medium', summary: 'Between any two rational numbers a and b, there exist infinitely many rational numbers.', keyConcepts: ['Mean method (a+b)/2', 'Equating denominators', 'Density of rational numbers'] },
  { id: 'top-g8-m4-1', chapterId: 'ch-g8-m4', order: 1, title: 'Standard Algebraic Identities: (a±b)², a²-b²', difficulty: 'medium', summary: '(a+b)² = a² + 2ab + b²; (a-b)² = a² - 2ab + b²; (a+b)(a-b) = a² - b².', keyConcepts: ['Expansion formulas', 'Geometric visual proof', 'Rapid mental calculations'] },
  { id: 'top-g8-s3-1', chapterId: 'ch-g8-s3', order: 1, title: 'Reactivity Series of Metals & Displacement Reactions', difficulty: 'hard', summary: 'A more reactive metal displaces a less reactive metal from its aqueous salt solution.', keyConcepts: ['K > Na > Ca > Mg > Al > Zn > Fe > Cu', 'Displacement reaction observations', 'Corrosion resistance'] },
  { id: 'top-g8-s4-1', chapterId: 'ch-g8-s4', order: 1, title: 'Fluid Pressure & Atmospheric Barometer Dynamics', difficulty: 'medium', summary: 'Pressure increases with depth in liquids (P = hρg); atmospheric air pressure.', keyConcepts: ['P = Force / Area', 'Hydrostatic depth pressure', 'Atmospheric pressure (101.3 kPa)'] },

  // --- Grade 9 Topics ---
  { id: 'top-g9-m1-1', chapterId: 'ch-g9-m1', order: 1, title: 'Rationalising Denominators with Conjugates', difficulty: 'medium', summary: 'Multiplying numerator and denominator by the conjugate surd (√a - √b).', keyConcepts: ['Conjugate pairs', 'Difference of squares in surds', 'Simplifying radical expressions'] },
  { id: 'top-g9-p1-1', chapterId: 'ch-g9-p1', order: 1, title: 'Derivation of Kinematic Equations by Graphical Method', difficulty: 'hard', summary: 'Deriving v = u + at, s = ut + 0.5at², and v² = u² + 2as from velocity-time graphs.', keyConcepts: ['Slope represents acceleration', 'Area under v-t graph represents displacement', 'Uniform acceleration conditions'] },
  { id: 'top-g9-p2-1', chapterId: 'ch-g9-p2', order: 1, title: 'Newton’s Second Law & Momentum Conservation', difficulty: 'hard', summary: 'Rate of change of momentum is proportional to applied force (F = dp/dt = ma).', keyConcepts: ['Linear momentum p = mv', 'F = ma derivation', 'Recoil velocity of firearm m1v1 + m2v2 = 0'] },
  { id: 'top-g9-c3-1', chapterId: 'ch-g9-c3', order: 1, title: 'The Mole Concept & Avogadro’s Constant', difficulty: 'hard', summary: '1 mole = 6.022 x 10²³ elementary entities; Molar mass (g/mol).', keyConcepts: ['n = mass / molar mass', 'Avogadro number N_A', 'Stoichiometric particle counting'] },
  { id: 'top-g9-b1-1', chapterId: 'ch-g9-b1', order: 1, title: 'Plasma Membrane Osmosis & Cell Organelles', difficulty: 'medium', summary: 'Hypertonic, hypotonic, and isotonic solutions; mitochondria ATP synthesis.', keyConcepts: ['Semi-permeable lipid bilayer', 'Endosmosis vs Exosmosis', 'Cellular respiration in cristae'] },

  // --- Grade 10 Topics ---
  { id: 'top-g10-m1-1', chapterId: 'ch-g10-m1', order: 1, title: 'Fundamental Theorem of Arithmetic & Proof of Irrationality', difficulty: 'hard', summary: 'Every composite number can be uniquely factorized into primes. Proof that √5 is irrational by contradiction.', keyConcepts: ['Unique prime factorisation', 'Proof by contradiction', 'Coprime assumptions'] },
  { id: 'top-g10-m2-1', chapterId: 'ch-g10-m2', order: 1, title: 'Quadratic Formula & Nature of Roots (Discriminant)', difficulty: 'medium', summary: 'Roots x = (-b ± √(b² - 4ac)) / (2a); D > 0 distinct real, D = 0 equal, D < 0 no real roots.', keyConcepts: ['Discriminant D = b² - 4ac', 'Quadratic formula', 'Vertex of parabola'] },
  { id: 'top-g10-m3-1', chapterId: 'ch-g10-m3', order: 1, title: 'Standard Trigonometric Identities & Angle Values', difficulty: 'hard', summary: 'sin²θ + cos²θ = 1; 1 + tan²θ = sec²θ; 1 + cot²θ = cosec²θ. Values at 0°, 30°, 45°, 60°, 90°.', keyConcepts: ['Pythagorean trigonometric identities', 'Reciprocal ratios', 'Radian to degree conversions'] },
  { id: 'top-g10-s1-1', chapterId: 'ch-g10-s1', order: 1, title: 'Balancing Chemical Equations & Redox Reactions', difficulty: 'medium', summary: 'Oxidation is loss of electrons/gain of oxygen; Reduction is gain of electrons/loss of oxygen.', keyConcepts: ['Law of conservation of mass', 'Oxidising & reducing agents', 'Corrosion & rancidity'] },
  { id: 'top-g10-s2-1', chapterId: 'ch-g10-s2', order: 1, title: 'Ohm’s Law, Resistance Networks & Joule’s Heating', difficulty: 'hard', summary: 'V = IR; Series Rs = R1 + R2; Parallel 1/Rp = 1/R1 + 1/R2; Heat H = I²Rt.', keyConcepts: ['Resistivity ρ (rho)', 'Ohmic vs non-ohmic conductors', 'Electric power P = VI = I²R = V²/R'] },
  { id: 'top-g10-s3-1', chapterId: 'ch-g10-s3', order: 1, title: 'Double Circulation in the Human Heart & Nephron Excretion', difficulty: 'hard', summary: 'Systemic and pulmonary circulatory loops. Ultrafiltration in glomerulus and Bowman’s capsule.', keyConcepts: ['4 cardiac chambers and heart valves', 'Pulmonary artery vs vein', 'Urine concentration in loop of Henle'] },

  // --- Grade 11 Topics ---
  { id: 'top-g11-p1-1', chapterId: 'ch-g11-p1', order: 1, title: 'Dimensional Homogeneity & Error Propagation', difficulty: 'hard', summary: 'Checking physical equations using dimensional formulas [M^a L^b T^c]; Relative errors Δz/z = Δx/x + Δy/y.', keyConcepts: ['Dimensional formulas of G, h, μ0', 'Principle of homogeneity', 'Percentage uncertainty propagation'] },
  { id: 'top-g11-p2-1', chapterId: 'ch-g11-p2', order: 1, title: 'Projectile Motion: Trajectory, Maximum Height, Range', difficulty: 'hard', summary: 'Parametric equations x = (u cosθ)t, y = (u sinθ)t - 0.5gt²; Range R = (u² sin 2θ)/g.', keyConcepts: ['Parabolic trajectory proof', 'Complementary angle equal ranges (θ and 90°-θ)', 'Time of flight T = (2u sinθ)/g'] },
  { id: 'top-g11-c2-1', chapterId: 'ch-g11-c2', order: 1, title: 'VSEPR Theory, Hybridization & Molecular Orbitals', difficulty: 'hard', summary: 'Predicting shapes (linear, trigonal planar, tetrahedral, octahedral); sp³ hybridization in CH4; MO bond order.', keyConcepts: ['Bond pair vs Lone pair repulsion', 'Hybrid orbital overlap (sigma and pi bonds)', 'Bond order = 0.5(Nb - Na)'] },
  { id: 'top-g11-m1-1', chapterId: 'ch-g11-m1', order: 1, title: 'Injective, Surjective & Bijective Functions & Domain Analysis', difficulty: 'hard', summary: 'One-one (injective), onto (surjective), and inverse existence. Finding domains of √(f(x)) and 1/g(x).', keyConcepts: ['Injective horizontal line test', 'Surjective range = codomain', 'Domain restriction conditions'] },
  { id: 'top-g11-m4-1', chapterId: 'ch-g11-m4', order: 1, title: 'Calculus Limits: Standard Algebraic & Trigonometric Limits', difficulty: 'hard', summary: 'lim x->0 (sin x)/x = 1; lim x->a (x^n - a^n)/(x - a) = n a^(n-1); Continuity and first principles.', keyConcepts: ['Squeeze theorem', 'L’Hopital’s rule overview', 'First principle derivative definition f’(x) = lim h->0 [f(x+h)-f(x)]/h'] },
  { id: 'top-g11-a1-1', chapterId: 'ch-g11-a1', order: 1, title: 'The Fundamental Accounting Equation: Assets = Liabilities + Capital', difficulty: 'medium', summary: 'Every business transaction impacts at least two accounts to preserve mathematical balance.', keyConcepts: ['Dual aspect convention', 'Real, Personal, Nominal accounts', 'Debit what comes in, credit what goes out'] },
  { id: 'top-g11-ec1-1', chapterId: 'ch-g11-ec1', order: 1, title: 'Production Possibility Frontier (PPF) & Opportunity Cost', difficulty: 'medium', summary: 'Marginal Rate of Transformation (MRT = ΔY/ΔX); Concavity of PPF due to increasing opportunity cost.', keyConcepts: ['Scarcity and choice', 'Concave PPF curve', 'Shifts vs movements along PPF'] },
  { id: 'top-g11-po1-1', chapterId: 'ch-g11-po1', order: 1, title: 'Enforceability of Fundamental Rights vs Directive Principles', difficulty: 'hard', summary: 'Article 32 Constitutional Remedies (Writs: Habeas Corpus, Mandamus, Certiorari) vs Non-justiciable DPSPs.', keyConcepts: ['Justiciability under Art 32 & 226', '5 Constitutional Writs', 'Basic Structure Doctrine (Kesavananda Bharati)'] },
];

/**
 * Build the complete topic registry combining manual bespoke topics with
 * generated topic coverage across all 51 subjects and 200+ chapters.
 * Guarantees minimum 20 topics per subject!
 */
function buildAllTopics(): Topic[] {
  const manualMap = new Map<string, Topic>();
  MANUAL_TOPICS.forEach((t) => manualMap.set(t.id, t));

  const result: Topic[] = [...MANUAL_TOPICS];
  const processedChapterIds = new Set(MANUAL_TOPICS.map((t) => t.chapterId));

  for (const chapter of ALL_CHAPTERS) {
    const generated = generateCurriculumTopicsForChapter(chapter);
    for (const genTopic of generated) {
      if (!manualMap.has(genTopic.id)) {
        result.push(genTopic);
      }
    }
  }

  return result;
}

export const ALL_TOPICS: Topic[] = buildAllTopics();
