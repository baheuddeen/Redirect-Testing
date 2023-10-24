"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RegexHelper_1 = __importDefault(require("./RegexHelper"));
class RedirectRule {
    constructor({ from, to, }) {
        this.regexValues = [];
        this.from =
            from.replace(/^/g, "") // delete ^
                .replace(/$/g, "") // delete $
                .split('/')
                .splice(1)
                .map((chunk) => {
                return {
                    text: chunk,
                    isRegex: RegexHelper_1.default.includeRegex(chunk),
                };
            });
        this.to = to.split('/')
            .splice(1)
            .map((chunk) => {
            return {
                text: chunk,
                hasRegex: chunk.includes('$'),
            };
        });
        this.fromLink = '';
        this.toLink = '';
    }
    buildLinks() {
        this.fromLink = this.from.map((fromEntry) => {
            if (!fromEntry.isRegex) {
                return fromEntry.text;
            }
            const regexValue = RegexHelper_1.default.getRegexValue(fromEntry.text);
            this.regexValues.push(regexValue);
            return;
        }).join('/');
        this.toLink = this.to.map((toEnrty) => {
            if (!toEnrty.hasRegex) {
                return toEnrty.text;
            }
            this.regexValues.forEach((value, index) => {
                const i = index + 1;
                toEnrty.text = toEnrty.text.replace(`$${i}`, value);
            });
            return toEnrty.text;
        }).join('/');
        return;
    }
}
exports.default = RedirectRule;
