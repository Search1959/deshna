import { Question } from '../types';

/**
 * Normalizes text for clean, forgiving answer evaluation.
 * Strips extra whitespace, lowercase, strips outer punctuation,
 * and handles common numeric representations.
 */
export function normalizeAnswerText(val: any): string {
  if (val === null || val === undefined) return '';
  let str = String(val).trim().toLowerCase();

  // Remove common surrounding quotes, trailing period or comma
  str = str.replace(/^["'`]|["'`]$/g, '').replace(/[.,!?;:]+$/, '').trim();

  // Remove extra multiple spaces
  str = str.replace(/\s+/g, ' ');

  // Normalize common units or symbols if preceded by number
  // e.g. "100 c" -> "100", "9.8 m/s2" -> "9.8"
  return str;
}

/**
 * Checks if two values are numerically equal (e.g. "0.5" vs ".5" vs "0.50", or "12" vs "12.0")
 */
function isNumericMatch(studentStr: string, correctStr: string): boolean {
  // Strip common trailing units like %, deg, c, m, kg, rs, inr, cm
  const cleanStudent = studentStr.replace(/([0-9.]+)\s*(%|deg|c|m|kg|km|rs|inr|cm|s|sec|m\/s2|m\/s\^2|kph|km\/h)?$/i, '$1').trim();
  const cleanCorrect = correctStr.replace(/([0-9.]+)\s*(%|deg|c|m|kg|km|rs|inr|cm|s|sec|m\/s2|m\/s\^2|kph|km\/h)?$/i, '$1').trim();

  const numStudent = parseFloat(cleanStudent);
  const numCorrect = parseFloat(cleanCorrect);

  if (!isNaN(numStudent) && !isNaN(numCorrect)) {
    return Math.abs(numStudent - numCorrect) < 0.001;
  }
  return false;
}

/**
 * Gets index of correct option if question has options
 */
export function getCorrectOptionIndex(q: any): number {
  if (typeof q?.correctOptionIndex === 'number') return q.correctOptionIndex;
  if (typeof q?.correctAnswer === 'number') return q.correctAnswer;
  if (typeof q?.correctAnswer === 'string' && q.options && q.options.length > 0) {
    const idx = q.options.findIndex(
      (opt: string) => opt.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim()
    );
    if (idx !== -1) return idx;

    // Check letter (A, B, C, D)
    const letterIdx = q.correctAnswer.trim().toUpperCase().charCodeAt(0) - 65;
    if (letterIdx >= 0 && letterIdx < q.options.length) return letterIdx;
  }
  return 0;
}

/**
 * Checks if the student's answer is correct for any question type:
 * - MCQ (option index)
 * - fill_blank / numerical / short_answer (typed string/number)
 */
export function isStudentAnswerCorrect(q: Question | any, studentAnswer: any): boolean {
  if (studentAnswer === undefined || studentAnswer === null || studentAnswer === '') {
    return false;
  }

  // 1. Multiple Choice Questions (when student answer is a numeric index and question has options)
  const isMcqWithNumber =
    (q.questionType === 'mcq' || (q.options && q.options.length > 0)) &&
    typeof studentAnswer === 'number';

  if (isMcqWithNumber) {
    const correctIdx = getCorrectOptionIndex(q);
    return studentAnswer === correctIdx;
  }

  // 2. Input Box (fill_blank, numerical, short_answer, or text-based answers)
  const normStudent = normalizeAnswerText(studentAnswer);
  if (!normStudent) return false;

  // If correctAnswer is an array of acceptable answers
  if (Array.isArray(q.correctAnswer)) {
    return q.correctAnswer.some((ans: any) => {
      const normAns = normalizeAnswerText(ans);
      return normStudent === normAns || isNumericMatch(normStudent, normAns);
    });
  }

  // If correctAnswer is pipe-delimited string (e.g. "Photosynthesis|photo synthesis")
  if (typeof q.correctAnswer === 'string' && q.correctAnswer.includes('|')) {
    const parts = q.correctAnswer.split('|');
    return parts.some((p: string) => {
      const normP = normalizeAnswerText(p);
      return normStudent === normP || isNumericMatch(normStudent, normP);
    });
  }

  // If options exist, student might have typed the exact option text
  if (q.options && q.options.length > 0) {
    const correctIdx = getCorrectOptionIndex(q);
    const correctOptionText = normalizeAnswerText(q.options[correctIdx]);
    if (normStudent === correctOptionText) return true;
  }

  // Single correctAnswer
  const normCorrect = normalizeAnswerText(q.correctAnswer);
  if (normStudent === normCorrect) return true;

  // Numeric check
  if (isNumericMatch(normStudent, normCorrect)) {
    return true;
  }

  return false;
}

/**
 * Human-readable format of the correct expected answer
 */
export function getCorrectAnswerDisplay(q: Question | any): string {
  if (!q) return '';

  if (q.questionType === 'mcq' || (q.options && q.options.length > 0 && typeof q.correctAnswer === 'number')) {
    const idx = getCorrectOptionIndex(q);
    const letter = String.fromCharCode(65 + idx);
    const text = q.options?.[idx] || '';
    return `Option ${letter}: ${text}`;
  }

  if (Array.isArray(q.correctAnswer)) {
    return q.correctAnswer.join(' or ');
  }

  if (typeof q.correctAnswer === 'string' && q.correctAnswer.includes('|')) {
    return q.correctAnswer.split('|').join(' or ');
  }

  return String(q.correctAnswer ?? '');
}
