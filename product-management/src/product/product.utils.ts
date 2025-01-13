import * as crypto from 'crypto';

export class ProductCodeGenerator {
  /**
   * Generate a unique product code based on the product name.
   * @param name - Product name
   * @returns The generated product code
   */
  static generate(name: string): string {
    // Step 1: Hash the product name and take the first 4 characters.
    const hash = crypto.createHash('md5').update(name).digest('hex').slice(0, 4);

    // Step 2: Split the name into words and handle substrings.
    const words = name.split(' ');
    let substring = '';

    if (words.length === 1) {
      // Single word: Take the full name.
      substring = words[0];
    } else if (words.length === 2) {
      // Two words: Take first 3 chars of first word and last 3 chars of second word.
      const firstWord = words[0].slice(0, 3);
      const secondWord = words[1].slice(-3);
      substring = firstWord + secondWord;
    } else {
      // Multiple words: First 3 of first, middle 3 of middle, and last 3 of last.
      const firstWord = words[0].slice(0, 3);
      const middleWord = words[Math.floor(words.length / 2)];
      const middleChars = middleWord.slice(
        Math.floor((middleWord.length - 3) / 2),
        Math.floor((middleWord.length - 3) / 2) + 3
      );
      const lastWord = words[words.length - 1].slice(-3);
      substring = firstWord + middleChars + lastWord;
    }

    // Step 3: Determine the start and end indices.
    const startIndex = 0;
    const endIndex = name.length - 1;

    // Step 4: Combine into final product code.
    return `${hash}-${startIndex}${substring}${endIndex}`;
  }
}
