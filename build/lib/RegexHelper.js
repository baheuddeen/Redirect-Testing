"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegexHelper {
    static includeRegex(text) {
        for (const char of RegexHelper.specialCharactersInRegex) {
            if (text.includes(char)) {
                return true;
            }
        }
        return false;
    }
    static getRegexValue(text) {
        if (text.includes('*') || text.includes('.+') || text.includes('.*')) {
            if (!text.includes('?')) {
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
RegexHelper.specialCharactersInRegex = [
    '*',
    '.*',
    '.+',
    '|',
    '[',
    '(',
    '{',
    '^',
    '$',
    '\\',
    '??',
    '+?',
    '??',
    '}?',
    '(?i)',
    '(?s)',
    '(?x)',
    '(?=...)',
    '(?!...)',
    '(?<=...)',
    '(?<!...)' // Negative Lookbehind
];
exports.default = RegexHelper;
