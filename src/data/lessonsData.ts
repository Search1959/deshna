import { Lesson } from '../types';

export const ALL_LESSONS: Lesson[] = [
  {
    id: 'les-g3-m5-1',
    chapterId: 'ch-g3-m5',
    topicId: 'top-g3-m5-1',
    title: 'Fractions: Numerator and Denominator Made Easy',
    readingTimeMin: 4,
    sections: [
      {
        title: '1. What is a Fraction?',
        content: 'A fraction is a small part of a whole thing.\n\nImagine you have a pizza cut into 4 equal slices. If you eat 1 slice, you ate 1 slice out of 4. In math, we write this as 1/4.',
        analogy: 'Fold a paper in half. You get 2 equal parts. Each part is half (1/2) of the paper.',
        example: 'If you color 3 parts out of 8 boxes in a bar, the fraction is 3/8.',
      },
      {
        title: '2. Top Number and Bottom Number',
        content: '• The BOTTOM number is called the DENOMINATOR (Down-number). It tells you how many total equal pieces there are.\n• The TOP number is called the NUMERATOR. It tells you how many pieces you have or picked.',
        analogy: 'Remember: "D" is for Denominator and "D" is for Down (bottom)!',
        example: 'In the fraction 3/5: 5 is at the bottom (total parts) and 3 is at the top (picked parts).',
      },
      {
        title: '3. Proper Fractions',
        content: 'When the top number is smaller than the bottom number (like 1/2 or 3/4), it is called a proper fraction. It is always less than 1 whole item.',
        example: '1/2 of an apple is less than 1 whole apple.',
      },
    ],
    keyTakeaways: [
      'A fraction shows equal parts of a whole thing.',
      'Bottom number (Denominator) = Total equal pieces.',
      'Top number (Numerator) = Pieces you take or count.',
    ],
    status: 'published',
  },
  {
    id: 'les-g6-s1-1',
    chapterId: 'ch-g6-s1',
    topicId: 'top-g6-s1-1',
    title: 'Food Nutrients: What Our Body Needs',
    readingTimeMin: 4,
    sections: [
      {
        title: '1. The 5 Main Food Nutrients',
        content: 'Our body needs healthy food to grow, run, and stay safe from sickness. Food gives us 5 key nutrients:\n\n1. Carbohydrates (give quick energy)\n2. Fats (store extra energy and keep us warm)\n3. Proteins (help muscles grow and heal cuts)\n4. Vitamins (protect our eyes, skin, and teeth)\n5. Minerals (build strong bones and pure blood)',
        analogy: 'Food is like fuel for a car. Without good fuel, our body cannot run well.',
        example: 'Rice, wheat, and potatoes give carbohydrates. Milk, eggs, and dal give protein.',
      },
      {
        title: '2. Simple Test for Starch (Iodine Test)',
        content: 'Starch is a common carbohydrate. To test for starch:\n• Take a piece of potato or boiled rice.\n• Put 2 drops of blue iodine liquid on it.\n• If it turns dark blue-black, starch is present!',
        example: 'A slice of raw potato turns dark blue-black with iodine drops.',
      },
      {
        title: '3. Simple Test for Protein',
        content: '• Mash a little food (like boiled dal or egg white) in a test tube with a little water.\n• Add 2 drops of copper sulphate and 10 drops of caustic soda.\n• If the color turns purple or violet, the food has protein!',
      },
    ],
    keyTakeaways: [
      'Carbohydrates and fats give us energy to work and play.',
      'Proteins help our body build muscles and repair damage.',
      'Iodine turns blue-black when starch is in the food.',
    ],
    status: 'published',
  },
  {
    id: 'les-g9-p1-1',
    chapterId: 'ch-g9-p1',
    topicId: 'top-g9-p1-1',
    title: 'Motion: Speed, Distance, and Velocity',
    readingTimeMin: 5,
    sections: [
      {
        title: '1. Distance vs Displacement',
        content: '• Distance is the total path length you walk or drive. It only tells you "how far" (no direction).\n• Displacement is the shortest straight line from where you started to where you stopped. It also has a direction.',
        analogy: 'If you walk 100 meters around a circular park and return to your starting gate: your Distance is 100 meters, but your Displacement is 0 meters!',
        example: 'A car odometer measures total distance travelled.',
      },
      {
        title: '2. Speed and Acceleration',
        content: '• Speed = Distance ÷ Time (how fast something moves).\n• Velocity = Speed in a given direction.\n• Acceleration = How quickly speed changes over time. Formula: a = (final speed - start speed) ÷ time.',
        analogy: 'Pressing the gas pedal in a car increases speed, which is acceleration.',
      },
      {
        title: '3. The 3 Easy Motion Formulas',
        content: 'When speed changes at a steady rate:\n1. v = u + at\n2. s = ut + 1/2 at²\n3. v² = u² + 2as\n\n(u = start speed, v = end speed, a = acceleration, t = time, s = distance travelled).',
      },
    ],
    keyTakeaways: [
      'Distance is total path; Displacement is the shortest straight line from start to finish.',
      'Acceleration means speeding up or slowing down.',
      'Speed = Distance ÷ Time.',
    ],
    status: 'published',
  },
  {
    id: 'les-g10-s2-1',
    chapterId: 'ch-g10-s2',
    topicId: 'top-g10-s2-1',
    title: 'Electricity: Ohm’s Law and Resistors Made Easy',
    readingTimeMin: 5,
    sections: [
      {
        title: '1. What is Ohm’s Law?',
        content: 'Ohm’s Law tells us how voltage (push), current (flow of electricity), and resistance (opposing flow) work together in a wire.\n\nFormula: V = I × R\n• V = Voltage (push from battery, measured in Volts)\n• I = Current (flow of electricity, measured in Amperes)\n• R = Resistance (resistance to current, measured in Ohms Ω)',
        analogy: 'Think of water in a pipe. Voltage is the water pump pressure, current is the flowing water, and resistance is a narrow spot in the pipe.',
        example: 'If a 12V battery is connected to a 4Ω bulb, the current is: I = 12 ÷ 4 = 3 Amperes.',
      },
      {
        title: '2. Series and Parallel Circuits',
        content: '• Series (One single path): Bulbs are connected one after another. If one bulb goes off, all go off. Total resistance adds up: R = R1 + R2.\n• Parallel (Separate branches): Each bulb has its own path. If one bulb turns off, other bulbs stay ON. Total resistance decreases.',
        analogy: 'Home lights are connected in parallel so turning off the kitchen light does not turn off the bedroom light.',
      },
    ],
    keyTakeaways: [
      'Ohm’s Law formula is: V = I × R (Voltage = Current × Resistance).',
      'In a series circuit, there is only one path for electricity.',
      'In a parallel circuit, electricity has multiple paths.',
    ],
    status: 'published',
  },
];

export { getIntelligentLessonForTopic } from './curriculumGenerator';

