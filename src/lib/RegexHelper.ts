export default class RegexHelper {
    static specialCharactersInRegex = [
        '*',      // Asterisk
        '.*',      // Asterisk
        '.+',      // Plus
        '|',      // Vertical Bar or Pipe
        '[',     // Square Brackets
        '(',     // Round Brackets or Parentheses
        '{',     // Curly Braces
        '^',      // Caret or Circumflex
        '$',      // Dollar Sign
        '\\',     // Backslash
        '??',     // Non-greedy Asterisk
        '+?',     // Non-greedy Plus
        '??',     // Non-greedy Question Mark
        '}?',    // Non-greedy Curly Braces
        '(?i)',   // Positive Lookahead
        '(?s)',   // Positive Lookbehind
        '(?x)',   // Positive Lookbehind
        '(?=...)', // Positive Lookahead
        '(?!...)', // Negative Lookahead
        '(?<=...)', // Positive Lookbehind
        '(?<!...)'  // Negative Lookbehind
      ];

      public static includeRegex (text: string): boolean {
        for (const char of RegexHelper.specialCharactersInRegex ) {
            if (text.includes(char)) {
                return true;
            }
        }
        return false;
      }

      public static getRegexValue(text: string) {
        if (text.includes('*') || text.includes('.+') || text.includes('.*')) {
            if(!text.includes('?')) {
                return RegexHelper.genRandomString();
            }
            const textBeforeQuestionMark = text.split('?')[0];  
            return textBeforeQuestionMark;
        }
        if (text.includes('[')) {
            return "en";
        }
      }

      static getRandomChar() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const randomIndex = Math.floor(Math.random() * characters.length);
        return characters[randomIndex];
      }

      static genRandomString() { 
        return "random-string".split('').map(() => RegexHelper.getRandomChar()).join(''); 
      }
}