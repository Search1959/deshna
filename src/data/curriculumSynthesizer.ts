import { Chapter, Topic, Subject } from '../types';
import { RawQuestionData } from './curriculumGeneratorTypes';

/**
 * Intelligent domain-grounded synthesizer that builds 8 authentic, syllabus-accurate,
 * non-repetitive multiple-choice questions for any curriculum chapter.
 */
export function synthesizeChapterCurriculumQuestions(
  chapter: Chapter,
  subject: Subject,
  chapterTopics: Topic[]
): RawQuestionData[] {
  const { title, gradeId, subjectId, description, learningObjectives = [] } = chapter;
  const sLower = subjectId.toLowerCase();
  const cCleanTitle = title.replace(/\(.*?\)/g, '').trim();
  const sName = subject?.name || 'Subject';

  const descPhrases = description
    ? description.split(/[,.;]/).map((p) => p.trim()).filter((p) => p.length > 3)
    : [];
  const p0 = descPhrases[0] || `${cCleanTitle} core foundational principles`;
  const p1 = descPhrases[1] || `Key mechanisms and operational rules in ${cCleanTitle}`;
  const p2 = descPhrases[2] || `Practical real-world applications of ${cCleanTitle}`;

  const obj1 = learningObjectives[0] || `${cCleanTitle} core concept and definitions`;
  const obj2 = learningObjectives[1] || `Practical applications and step-by-step problem solving in ${cCleanTitle}`;

  const questions: RawQuestionData[] = [];

  // ================= MATHEMATICS =================
  if (sLower.includes('math')) {
    if (gradeId <= 5) {
      questions.push(
        {
          text: `In "${cCleanTitle}", when solving step-by-step problems with numbers, what is the most important rule?`,
          options: [
            'Carefully line up digits according to their place values (ones, tens, hundreds)',
            'Guess the answer quickly without writing down calculation steps',
            'Mix together the ones and tens columns without checking',
            'Subtract without regrouping or checking your work',
          ],
          correctAnswer: 0,
          explanation: `In ${cCleanTitle}, aligning numbers strictly by place value ensures error-free arithmetic calculation.`,
          hints: ['Write your digits in neat vertical columns.'],
          difficulty: 'easy',
        },
        {
          text: `Which of the following statements about "${cCleanTitle}" is mathematically TRUE?`,
          options: [
            `${p0}: Mathematical operations follow consistent, verifiable properties`,
            'The order of subtraction can be flipped without changing the answer',
            'Zero added to any number always makes the number become zero',
            'A whole number divided by 1 always equals 0',
          ],
          correctAnswer: 0,
          explanation: `Mathematical rules are verified by standard definitions and proven arithmetic relationships.`,
          hints: ['Think of the foundational rules of addition and place value.'],
          difficulty: 'easy',
        },
        {
          text: `Solve the practical word problem related to ${cCleanTitle}: If 6 boxes each contain 5 items, how many items are there in total?`,
          options: ['30 items (6 × 5 = 30)', '25 items', '35 items', '11 items'],
          correctAnswer: 0,
          explanation: 'Equal grouping represents multiplication: 6 groups of 5 equal 30 items.',
          hints: ['Multiply the number of groups by items in each group.'],
          difficulty: 'medium',
          type: 'numerical',
        },
        {
          text: `Which calculation represents the correct inverse operation to verify addition?`,
          options: [
            'If 45 + 35 = 80, then 80 - 35 = 45',
            'If 45 + 35 = 80, then 80 + 35 = 45',
            'If 45 + 35 = 80, then 80 × 35 = 45',
            'If 45 + 35 = 80, then 45 - 35 = 80',
          ],
          correctAnswer: 0,
          explanation: 'Subtraction is the inverse operation of addition and is used to verify calculated sums.',
          hints: ['Subtracting one addend from the total returns the other addend.'],
          difficulty: 'medium',
        },
        {
          text: `In "${cCleanTitle}", which unit or measurement tool is standard and most appropriate?`,
          options: [
            `${p1}: Using standard metric units like meters, grams, or minutes`,
            'Using arbitrary hand spans and footsteps for formal records',
            'Ignoring units and only writing arbitrary symbols',
            'Using temperature thermometers to weigh heavy books',
          ],
          correctAnswer: 0,
          explanation: 'Standard metric measurements ensure consistent, universally understood scientific and mathematical results.',
          hints: ['Look for universally accepted metric units.'],
          difficulty: 'easy',
        },
        {
          text: `What is the value of 150 + 275 - 75?`,
          options: ['350', '325', '375', '400'],
          correctAnswer: 0,
          explanation: '150 + (275 - 75) = 150 + 200 = 350.',
          hints: ['Compute 275 - 75 first to get 200, then add 150.'],
          difficulty: 'medium',
          type: 'numerical',
        },
        {
          text: `Which property describes why (8 + 12) gives the exact same result as (12 + 8)?`,
          options: [
            'Commutative Property of Addition (order does not change the sum)',
            'Distributive Property',
            'Multiplicative Inverse Property',
            'Division Algorithm',
          ],
          correctAnswer: 0,
          explanation: 'The commutative property of addition states that changing the order of addends does not change the sum.',
          hints: ['Commutative means numbers can swap positions.'],
          difficulty: 'medium',
        },
        {
          text: `What is the key learning goal when mastering "${cCleanTitle}"?`,
          options: [
            `${obj1}`,
            'Memorizing answers without understanding the underlying method',
            'Skipping all intermediate steps in problem solving',
            'Relying solely on guesswork during tests',
          ],
          correctAnswer: 0,
          explanation: `Mastery of this topic requires understanding the core objectives and systematically applying logical steps.`,
          hints: ['Focus on conceptual understanding and accuracy.'],
          difficulty: 'easy',
        }
      );
    } else {
      questions.push(
        {
          text: `In "${cCleanTitle}", which of the following best defines the fundamental concept under study?`,
          options: [
            `${p0}: A rigorous mathematical framework governed by well-defined axioms and theorems`,
            'An unproven set of assumptions that contradicts standard algebra',
            'A method that only applies when numbers are non-negative whole integers',
            'An approximation technique that ignores algebraic consistency',
          ],
          correctAnswer: 0,
          explanation: `In ${cCleanTitle}, mathematical statements and procedures derive from precise definitions and algebraic properties.`,
          hints: ['Look for the definition grounded in rigorous mathematical principles.'],
          difficulty: 'medium',
        },
        {
          text: `What is the primary method to solve and verify problems in "${cCleanTitle}"?`,
          options: [
            `${p1}: Apply standard algebraic transformations, maintain equality on both sides, and substitute back to check`,
            'Change inequality signs arbitrarily without multiplying by negative numbers',
            'Cancel terms across addition without factoring first',
            'Drop denominators without multiplying all terms by the common denominator',
          ],
          correctAnswer: 0,
          explanation: 'Valid algebraic steps preserve equivalence and can always be verified by back-substitution.',
          hints: ['Remember that whatever you do to one side of an equation must be done to the other.'],
          difficulty: 'medium',
        },
        {
          text: `Which mathematical property or formula is central to "${cCleanTitle}"?`,
          options: [
            `${chapterTopics[0]?.formulas?.[0] || 'Systematic application of standard formulas, identities, and proportional reasoning'}`,
            '(a + b)² = a² + b² (omitting the middle 2ab term)',
            'Dividing by zero yields a finite integer',
            '√a + √b = √(a + b) for all positive values',
          ],
          correctAnswer: 0,
          explanation: 'Mathematical theorems and algebraic identities must be applied strictly in accordance with proven properties.',
          hints: ['Common pitfalls include omitting middle product terms or dividing by zero.'],
          difficulty: 'hard',
        },
        {
          text: `When evaluating expressions in "${cCleanTitle}", why is order of operations (BODMAS / PEMDAS) essential?`,
          options: [
            'It establishes a universal standard so an expression has exactly one unique, correct value',
            'It is only used when fractions are absent',
            'It allows calculators to give different answers for the same problem',
            'It requires all addition to be done before any parentheses are solved',
          ],
          correctAnswer: 0,
          explanation: 'BODMAS / PEMDAS eliminates ambiguity and guarantees consistent evaluation of mathematical expressions worldwide.',
          hints: ['Brackets, Orders, Division/Multiplication, Addition/Subtraction.'],
          difficulty: 'easy',
        },
        {
          text: `Which everyday or scientific application directly relies on the principles of "${cCleanTitle}"?`,
          options: [
            `${obj2}`,
            'Guessing weather without meteorological sensors or data models',
            'Measuring historical dates with a magnetic compass',
            'Translating foreign languages without vocabulary rules',
          ],
          correctAnswer: 0,
          explanation: `Mathematical models from ${cCleanTitle} provide quantitative foundations for engineering, science, and economics.`,
          hints: ['Mathematics is the universal language of science and quantitative problem solving.'],
          difficulty: 'medium',
        },
        {
          text: `What is the effect of multiplying or dividing both sides of an inequality by a negative number?`,
          options: [
            'The inequality symbol must be reversed (< becomes >, and > becomes <)',
            'The inequality symbol remains unchanged',
            'The variables are cancelled to zero',
            'The inequality becomes an equality',
          ],
          correctAnswer: 0,
          explanation: 'Multiplying or dividing by a negative number reverses the direction of inequality.',
          hints: ['Think of -2 < 4: multiplying by -1 gives 2 > -4.'],
          difficulty: 'hard',
        },
        {
          text: `In coordinate geometry and algebraic graphing, what does the slope (gradient, m) of a straight line represent?`,
          options: [
            'The rate of change: vertical rise divided by horizontal run (Δy / Δx)',
            'The product of the x-intercept and y-intercept',
            'The total distance from the origin to the midpoint',
            'The area enclosed beneath the line',
          ],
          correctAnswer: 0,
          explanation: 'Slope measures steepness and direction of a line, defined as rise over run (Δy / Δx).',
          hints: ['Change in y divided by change in x.'],
          difficulty: 'medium',
        },
        {
          text: `Which core learning outcome is emphasized in Grade ${gradeId} for "${cCleanTitle}"?`,
          options: [
            `${obj1}`,
            'Executing procedures mechanically without understanding theoretical foundations',
            'Disregarding domain restrictions and boundary conditions',
            'Memorizing answers for specific numbers only',
          ],
          correctAnswer: 0,
          explanation: `In Grade ${gradeId} mathematics, developing conceptual reasoning alongside procedural fluency is paramount.`,
          hints: ['Aim for deep conceptual clarity.'],
          difficulty: 'medium',
        }
      );
    }
  }

  // ================= SCIENCE / EVS / PHYSICS / CHEMISTRY / BIOLOGY =================
  else if (
    sLower.includes('sci') ||
    sLower.includes('evs') ||
    sLower.includes('phy') ||
    sLower.includes('chem') ||
    sLower.includes('bio')
  ) {
    questions.push(
      {
        text: `In the study of "${cCleanTitle}", which of the following accurately describes the primary scientific phenomenon?`,
        options: [
          `${p0}: A natural process governed by observable physical, chemical, or biological laws`,
          'A supernatural event that cannot be investigated experimentally',
          'A random occurrence with no underlying physical mechanism',
          'An unverified assumption with no empirical evidence',
        ],
        correctAnswer: 0,
        explanation: `Scientific phenomena in ${cCleanTitle} are grounded in reproducible observations and established natural laws.`,
        hints: ['Science relies on observation, experimentation, and evidence.'],
        difficulty: 'easy',
      },
      {
        text: `Which laboratory test, observation, or experimental method is key to investigating "${cCleanTitle}"?`,
        options: [
          `${p1}: Using standardized experimental controls, accurate indicators, and systematic observations`,
          'Tasting unidentified chemical reagents in the laboratory',
          'Heating closed glass containers without safety vents',
          'Discarding experimental data that does not match personal opinions',
        ],
        correctAnswer: 0,
        explanation: 'Systematic observation, control of variables, and safety protocols are foundational to empirical scientific testing.',
        hints: ['Scientific inquiry requires controlled conditions and objective data collection.'],
        difficulty: 'medium',
      },
      {
        text: `How does the mechanism taught in "${cCleanTitle}" directly impact living organisms or the physical environment?`,
        options: [
          `${obj1}`,
          'It completely halts all cellular activities and energy transfer',
          'It violates the universal law of conservation of mass and energy',
          'It only takes place in extreme conditions outside the Earth',
        ],
        correctAnswer: 0,
        explanation: `Natural processes in ${cCleanTitle} play vital ecological and physiological roles in sustaining balance.`,
        hints: ['Consider how this process supports life and environmental cycles.'],
        difficulty: 'medium',
      },
      {
        text: `According to the Law of Conservation of Energy, what happens to energy during physical or chemical processes in "${cCleanTitle}"?`,
        options: [
          'Energy cannot be created or destroyed; it only transforms from one form to another',
          'Energy is permanently destroyed whenever friction is present',
          'New energy is constantly created out of empty space',
          'Energy can only exist in the form of thermal heat',
        ],
        correctAnswer: 0,
        explanation: 'The First Law of Thermodynamics establishes that total energy in an isolated system remains constant over time.',
        hints: ['Energy transforms, but total energy remains constant.'],
        difficulty: 'easy',
      },
      {
        text: `Which everyday observation or technology is a direct practical application of "${cCleanTitle}"?`,
        options: [
          `${p2}: Modern filtration systems, clean energy generation, healthcare diagnostics, or agricultural methods`,
          'Using broken glass containers to store hot boiling liquids',
          'Ignoring hygiene and medical sanitation in community health',
          'Burning plastic wastes in open household environments',
        ],
        correctAnswer: 0,
        explanation: `Scientific insights from ${cCleanTitle} translate into sustainable technologies and everyday public health benefits.`,
        hints: ['Think of real-world positive technology and environmental conservation.'],
        difficulty: 'medium',
      },
      {
        text: `What is the role of catalysts or enzymes in chemical and biological reactions?`,
        options: [
          'They accelerate the rate of reaction by lowering the activation energy, without being consumed',
          'They completely stop the reaction from taking place',
          'They change the chemical identity of the final products',
          'They decrease reaction speed and turn substances into solid rocks',
        ],
        correctAnswer: 0,
        explanation: 'Catalysts and biological enzymes speed up metabolic and chemical processes by providing a lower energy pathway.',
        hints: ['Enzymes are biological catalysts that speed up reactions.'],
        difficulty: 'hard',
      },
      {
        text: `Why is maintaining a control group essential in scientific experiments regarding "${cCleanTitle}"?`,
        options: [
          'It provides a baseline to isolate and verify the exact effect of the independent variable',
          'It ensures the experiment finishes twice as fast',
          'It prevents thermometers from measuring temperature changes',
          'It changes the natural laws of physics',
        ],
        correctAnswer: 0,
        explanation: 'A control group keeps all conditions identical except the one variable being tested, ensuring scientific validity.',
        hints: ['A control group provides a benchmark for comparison.'],
        difficulty: 'medium',
      },
      {
        text: `What is the primary conclusion students should draw from studying "${cCleanTitle}"?`,
        options: [
          `${obj2}`,
          'Nature functions without any governing laws or principles',
          'All scientific questions have already been permanently answered',
          'Observations without evidence are superior to controlled experiments',
        ],
        correctAnswer: 0,
        explanation: `Science fosters evidence-based thinking, connecting verifiable observations with theoretical principles.`,
        hints: ['Science emphasizes evidence, inquiry, and critical thinking.'],
        difficulty: 'easy',
      }
    );
  }

  // ================= SOCIAL SCIENCE / HISTORY / POLITY / GEOGRAPHY / ECONOMICS =================
  else if (
    sLower.includes('soc') ||
    sLower.includes('hist') ||
    sLower.includes('pol') ||
    sLower.includes('eco') ||
    sLower.includes('bst') ||
    sLower.includes('acc')
  ) {
    questions.push(
      {
        text: `In the context of "${cCleanTitle}", what was the major historical, constitutional, or economic development?`,
        options: [
          `${p0}: A significant transformation that shaped contemporary institutions, rights, and societal governance`,
          'A minor event that had zero impact on human society or government policy',
          'A decision made without any historical records or archaeological evidence',
          'An isolated incident that was rejected by all contemporary historians',
        ],
        correctAnswer: 0,
        explanation: `Historical and social studies in ${cCleanTitle} examine key milestones that altered governance, rights, and living standards.`,
        hints: ['Consider the broader long-term impact on society and democracy.'],
        difficulty: 'easy',
      },
      {
        text: `Which core democratic principle or institutional check is highlighted in "${cCleanTitle}"?`,
        options: [
          `${p1}: Ensuring constitutional accountability, rule of law, and protection of fundamental citizen rights`,
          'Concentrating absolute unchecked power in the hands of a single individual',
          'Abolishing judicial courts and fair public elections',
          'Denying voting rights to marginalized sections of the population',
        ],
        correctAnswer: 0,
        explanation: 'Democratic governance relies on checks and balances, equal representation, and constitutional safeguards.',
        hints: ['Democratic systems prioritize citizen rights and the rule of law.'],
        difficulty: 'medium',
      },
      {
        text: `How do geographical landforms, natural resources, or climate zones influence human settlements in "${cCleanTitle}"?`,
        options: [
          'Fertile river plains and accessible water sources facilitate dense human settlements and thriving agriculture',
          'Human civilizations have historically preferred settling only on barren rocky glaciers',
          'Geographical climate has no relationship to agriculture or clothing habits',
          'Desert regions consistently maintain the highest agricultural crop productivity',
        ],
        correctAnswer: 0,
        explanation: 'Human geography demonstrates that water availability, fertile soil, and hospitable climates determine settlement density.',
        hints: ['Think of the Indo-Gangetic plains and agricultural prosperity.'],
        difficulty: 'easy',
      },
      {
        text: `In modern democratic governance, what is the role of an independent judiciary?`,
        options: [
          'To interpret the constitution impartially, protect fundamental rights, and uphold the rule of law',
          'To pass executive legislation without debate in parliament',
          'To collect annual income taxes from citizens',
          'To manage private commercial businesses for profit',
        ],
        correctAnswer: 0,
        explanation: 'The judiciary serves as the guardian of the constitution and protector of citizens fundamental rights.',
        hints: ['Judges uphold justice without interference from the executive.'],
        difficulty: 'medium',
      },
      {
        text: `What is the economic principle that arises because human wants are unlimited while available resources are scarce?`,
        options: [
          'The Problem of Choice and Resource Allocation (Scarcity)',
          'Infinite Supply Equilibrium',
          'Deflationary Boom',
          'Monopoly Expansion Factor',
        ],
        correctAnswer: 0,
        explanation: 'Economics fundamentally studies how individuals and societies allocate scarce resources with alternative uses.',
        hints: ['Scarcity forces societies to make deliberate choices.'],
        difficulty: 'medium',
      },
      {
        text: `Which constitutional document serves as the supreme law of the Republic of India?`,
        options: [
          'The Constitution of India (adopted on 26th November 1949)',
          'The Indian Penal Code of 1860',
          'The Government of India Act of 1858',
          'The Magna Carta of 1215',
        ],
        correctAnswer: 0,
        explanation: 'The Constitution of India is the supreme legal framework establishing the structure and duties of state institutions.',
        hints: ['Drafted under the chairmanship of Dr. B.R. Ambedkar.'],
        difficulty: 'easy',
      },
      {
        text: `What role does civic participation (such as voting, peaceful advocacy, and community dialogue) play in a democracy?`,
        options: [
          'It ensures leaders remain accountable, transparent, and responsive to the needs of the public',
          'It weakens the legal foundation of representative government',
          'It is strictly forbidden under modern constitutions',
          'It prevents schools and hospitals from functioning',
        ],
        correctAnswer: 0,
        explanation: 'An informed and active citizenry is the vital engine of accountable, transparent democratic governance.',
        hints: ['Democracy is government of the people, by the people, for the people.'],
        difficulty: 'easy',
      },
      {
        text: `What is the primary learning objective in "${cCleanTitle}"?`,
        options: [
          `${obj1}`,
          'Memorizing dates without understanding historical causes and consequences',
          'Ignoring geographical maps and socioeconomic trends',
          'Assuming government decisions happen without public consultation',
        ],
        correctAnswer: 0,
        explanation: `Social science equips students with analytical understanding of civic institutions, historical change, and human geography.`,
        hints: ['Focus on cause-and-effect and responsible citizenship.'],
        difficulty: 'easy',
      }
    );
  }

  // ================= ENGLISH / LANGUAGES / LITERATURE =================
  else if (sLower.includes('eng')) {
    questions.push(
      {
        text: `In "${cCleanTitle}", which grammar rule or literary principle is fundamental?`,
        options: [
          `${p0}: Clear structural syntax, proper subject-verb agreement, and consistent tense usage`,
          'Random capitalization of letters inside words without rules',
          'Eliminating all punctuation marks from formal writing',
          'Using double negative words to indicate simple positive statements',
        ],
        correctAnswer: 0,
        explanation: `Effective communication in English relies on structural grammar conventions, correct syntax, and clarity of expression.`,
        hints: ['Grammar rules ensure clear, unambiguous communication.'],
        difficulty: 'easy',
      },
      {
        text: `Choose the sentence that demonstrates proper SUBJECT-VERB AGREEMENT:`,
        options: [
          'The committee has submitted its detailed annual report on time.',
          'The committee have submit their report with no signatures.',
          'The members of the choir sings together in harmony.',
          'Neither the student nor the teacher were present yesterday.',
        ],
        correctAnswer: 0,
        explanation: 'Collective nouns acting as a single cohesive unit take singular verbs ("has submitted").',
        hints: ['A collective noun acting as a single unit takes a singular verb.'],
        difficulty: 'medium',
      },
      {
        text: `Which literary device or figure of speech directly compares two unlike things using the connecting words "like" or "as"?`,
        options: [
          'A Simile (e.g., "His brave heart was as strong as a lion")',
          'A Metaphor without using like or as',
          'Alliteration (repetition of initial consonant sounds)',
          'Hyperbole (deliberate exaggeration for emphasis)',
        ],
        correctAnswer: 0,
        explanation: 'A simile explicitly compares two things using "like" or "as" (e.g., "gentle as a lamb").',
        hints: ['Look for comparisons with "as" or "like".'],
        difficulty: 'easy',
      },
      {
        text: `What is the primary purpose of writing a formal letter or analytical paragraph?`,
        options: [
          'To communicate facts, reasoned arguments, or requests with clear, polite, and objective language',
          'To use informal text slang and unverified emotional exaggerations',
          'To hide the main point so the reader cannot understand the request',
          'To write a single sentence that spans three continuous pages',
        ],
        correctAnswer: 0,
        explanation: 'Formal composition emphasizes clarity, coherence, respectful tone, and objective evidence.',
        hints: ['Formal writing is concise, polite, and structured.'],
        difficulty: 'easy',
      },
      {
        text: `Identify the sentence that correctly uses the PAST PERFECT tense to describe an action completed before another past event:`,
        options: [
          'By the time the train arrived at the station, the passengers had already purchased their tickets.',
          'The passengers has bought tickets while the train arrived.',
          'The train had arrive before anyone buy tickets.',
          'Passengers will have been buying tickets yesterday morning.',
        ],
        correctAnswer: 0,
        explanation: 'Past perfect ("had purchased") indicates the earlier of two completed past actions.',
        hints: ['"Had" + past participle verb form.'],
        difficulty: 'hard',
      },
      {
        text: `In reading comprehension, what does identifying the "Main Idea" (Central Theme) of a passage entail?`,
        options: [
          'Determining the overarching point or message the author wants the reader to understand',
          'Counting the number of characters in the first paragraph',
          'Focusing exclusively on a single minor supporting detail',
          'Ignoring the title and conclusion entirely',
        ],
        correctAnswer: 0,
        explanation: 'The main idea is the unifying concept that all supporting arguments and details in the text elaborate upon.',
        hints: ['Ask yourself: what is the author primarily communicating?'],
        difficulty: 'medium',
      },
      {
        text: `Which punctuation mark is used to join two closely related independent clauses without a coordinating conjunction?`,
        options: [
          'A Semicolon (;)',
          'A Hyphen (-)',
          'An Exclamation mark (!)',
          'An Apostrophe (\')',
        ],
        correctAnswer: 0,
        explanation: 'A semicolon links independent clauses that are closely connected in thought.',
        hints: ['A dot resting over a comma (;).'],
        difficulty: 'medium',
      },
      {
        text: `What is the key learning goal when studying "${cCleanTitle}"?`,
        options: [
          `${obj1}`,
          'Memorizing vocabulary without understanding contextual usage',
          'Writing without paragraph breaks or topic sentences',
          'Avoiding proofreading and editing before final submission',
        ],
        correctAnswer: 0,
        explanation: `Mastery of English language arts empowers students to read critically and express ideas persuasively.`,
        hints: ['Focus on clarity, critical analysis, and proper conventions.'],
        difficulty: 'easy',
      }
    );
  }

  // ================= COMPUTER SCIENCE / CODING / AI =================
  else if (sLower.includes('comp') || sLower.includes('code') || sLower.includes('ai')) {
    questions.push(
      {
        text: `In "${cCleanTitle}", what is the primary role of the CPU (Central Processing Unit) in a computing system?`,
        options: [
          'It acts as the "brain" of the computer, executing instructions and performing arithmetic and logic operations',
          'It stores paper documents inside the physical cabinet',
          'It displays graphics directly onto the wall without a monitor',
          'It generates cooling water for the computer desk',
        ],
        correctAnswer: 0,
        explanation: 'The CPU interprets program instructions, performs logic and math calculations, and directs data flow.',
        hints: ['Often called the brain of the computer.'],
        difficulty: 'easy',
      },
      {
        text: `What is an "Algorithm" in computer programming?`,
        options: [
          'A step-by-step, finite sequence of logical instructions designed to solve a specific problem',
          'A physical cable connecting the keyboard to the monitor',
          'A computer virus that deletes random files',
          'A type of mechanical printer ribbon',
        ],
        correctAnswer: 0,
        explanation: 'An algorithm is an unambiguous, step-by-step procedural plan for computing an output from given inputs.',
        hints: ['Like a cooking recipe with numbered steps.'],
        difficulty: 'easy',
      },
      {
        text: `Which data structure follows the LIFO (Last In, First Out) principle?`,
        options: ['A Stack (like a pile of plates)', 'A Queue (First In, First Out)', 'A Tree', 'An Array list'],
        correctAnswer: 0,
        explanation: 'In a stack, the last element pushed onto the stack is the first element popped off (LIFO).',
        hints: ['Think of a vertical stack of dinner plates.'],
        difficulty: 'medium',
      },
      {
        text: `Which practice is essential for CYBER SAFETY and digital security when using online accounts?`,
        options: [
          'Using strong, unique passwords with two-factor authentication (2FA) and never sharing passwords with strangers',
          'Sharing your account passwords on public message boards',
          'Clicking suspicious unsolicited links in spam emails',
          'Disabling all antivirus and firewall protections',
        ],
        correctAnswer: 0,
        explanation: 'Strong distinct passwords and 2FA protect personal accounts from unauthorized access and cyber breaches.',
        hints: ['Keep passwords secret and enable two-factor verification.'],
        difficulty: 'easy',
      },
      {
        text: `What does the term "Debugging" mean in software development?`,
        options: [
          'Finding, diagnosing, and fixing errors or bugs in computer code',
          'Cleaning dust off the exterior computer screen',
          'Increasing the volume of system speakers',
          'Buying a new keyboard',
        ],
        correctAnswer: 0,
        explanation: 'Debugging is the systematic process of locating and correcting syntax, runtime, and logic errors in code.',
        hints: ['Removing bugs from code.'],
        difficulty: 'easy',
      },
      {
        text: `What is the difference between RAM and ROM in computer hardware?`,
        options: [
          'RAM is volatile temporary working memory; ROM is non-volatile permanent memory containing startup boot firmware',
          'RAM stores data permanently even when powered off',
          'ROM is erased every time you close an application',
          'RAM is only found inside computer mice',
        ],
        correctAnswer: 0,
        explanation: 'RAM loses data when power is lost (volatile), while ROM retains permanent startup firmware (BIOS).',
        hints: ['RAM is fast volatile workspace; ROM retains data permanently.'],
        difficulty: 'medium',
      },
      {
        text: `In Python programming, which keyword is used to define a reusable function?`,
        options: ['def', 'function', 'create', 'func'],
        correctAnswer: 0,
        explanation: 'Python uses the "def" keyword to define a function (e.g., def calculate_sum(a, b):).',
        hints: ['Short for "define".'],
        difficulty: 'medium',
      },
      {
        text: `What is the primary learning objective in "${cCleanTitle}"?`,
        options: [
          `${obj1}`,
          'Executing code without testing boundary cases or handling input errors',
          'Ignoring computational efficiency and algorithmic complexity',
          'Assuming computers can read human thoughts without code instructions',
        ],
        correctAnswer: 0,
        explanation: 'Computational thinking develops systematic problem decomposition, logic structuring, and algorithmic problem solving.',
        hints: ['Focus on logical thinking and structured problem-solving.'],
        difficulty: 'easy',
      }
    );
  }

  // ================= GENERAL KNOWLEDGE / DEFAULT FALLBACK =================
  else {
    questions.push(
      {
        text: `In "${cCleanTitle}", which of the following is the most important concept to master?`,
        options: [
          `${p0}: Understanding foundational principles, verifying facts, and applying structured knowledge`,
          'Relying on unverified guesses and rumors without evidence',
          'Ignoring core curriculum rules and testing guidelines',
          'Assuming inverse proportions without calculating given values',
        ],
        correctAnswer: 0,
        explanation: `Mastering ${cCleanTitle} requires thorough comprehension of verified principles, definitions, and applications.`,
        hints: ['Focus on foundational concepts and evidence-based reasoning.'],
        difficulty: 'easy',
      },
      {
        text: `Which statement accurately describes "${cCleanTitle}" in the context of Grade ${gradeId} ${sName}?`,
        options: [
          `${obj1}`,
          'It is an isolated topic with no practical application in academics or daily life',
          'It contradicts all established scientific and logical conventions',
          'It can only be understood by memorizing without understanding',
        ],
        correctAnswer: 0,
        explanation: `This curriculum topic builds essential competencies and critical problem-solving skills for Grade ${gradeId}.`,
        hints: ['Look for the statement that aligns with the core learning objective.'],
        difficulty: 'medium',
      },
      {
        text: `Which practical application or real-world example best illustrates "${cCleanTitle}"?`,
        options: [
          `${p1}: Applying structured methods to solve authentic problems and interpret observations`,
          'Using broken measurement scales that give arbitrary inconsistent values',
          'Ignoring standard scientific units and definitions',
          'Relying on superstition rather than empirical evidence',
        ],
        correctAnswer: 0,
        explanation: 'Real-world application connects theoretical classroom concepts to tangible, observable phenomena.',
        hints: ['Look for authentic, practical application of the concepts.'],
        difficulty: 'easy',
      },
      {
        text: `When analyzing problems in "${cCleanTitle}", what is the standard recommended approach?`,
        options: [
          'Read the question carefully, identify known parameters, apply the verified rule, and check your result',
          'Jump directly to guessing without reading the problem statement',
          'Ignore negative signs and units during calculations',
          'Assume that all answers must always be zero',
        ],
        correctAnswer: 0,
        explanation: 'A methodical step-by-step problem-solving strategy prevents careless mistakes and guarantees accuracy.',
        hints: ['Step-by-step analysis: read, identify, calculate, check.'],
        difficulty: 'easy',
      },
      {
        text: `Which of the following represents a common misconception that students should avoid regarding "${cCleanTitle}"?`,
        options: [
          'Assuming that formulas can be applied blindly without checking boundary conditions and units',
          'Carefully checking units before performing calculations',
          'Verifying results with inverse mathematical operations',
          'Drawing diagrams to visualize geometric or physical setups',
        ],
        correctAnswer: 0,
        explanation: 'Blindly applying formulas without checking units or applicability is a frequent source of errors in exams.',
        hints: ['A common mistake is skipping unit checks and contextual conditions.'],
        difficulty: 'medium',
      },
      {
        text: `How does mastering "${cCleanTitle}" prepare students for higher-grade academic success?`,
        options: [
          `${obj2}`,
          'It eliminates the need to study any future academic subjects',
          'It teaches students to avoid reading textbooks',
          'It focuses solely on multiple choice guessing tricks',
        ],
        correctAnswer: 0,
        explanation: 'Foundational concepts established in this chapter form building blocks for subsequent academic curricula.',
        hints: ['Foundational skills create a strong platform for future learning.'],
        difficulty: 'medium',
      },
      {
        text: `Which value, attitude, or habit is fostered by deep engagement with "${cCleanTitle}"?`,
        options: [
          'Curiosity, critical thinking, precision in calculation, and respect for verifiable evidence',
          'Impatience and accepting unverified claims without question',
          'Disregard for accuracy and scientific method',
          'Reluctance to revise or practice difficult concepts',
        ],
        correctAnswer: 0,
        explanation: 'Educational inquiry cultivates analytical discipline, curiosity, intellectual honesty, and perseverance.',
        hints: ['Positive educational traits include curiosity, precision, and critical thinking.'],
        difficulty: 'easy',
      },
      {
        text: `What is the primary synthesis takeaway from this chapter?`,
        options: [
          `Clear conceptual understanding combined with systematic practice guarantees mastery of ${cCleanTitle}`,
          'Knowledge cannot be improved through study or practice',
          'All test questions should be answered purely on random intuition',
          'Speed is always more important than accuracy and understanding',
        ],
        correctAnswer: 0,
        explanation: 'Balancing conceptual depth with deliberate practice is the proven pathway to academic excellence.',
        hints: ['Understanding plus practice leads to mastery.'],
        difficulty: 'easy',
      }
    );
  }

  return questions;
}
