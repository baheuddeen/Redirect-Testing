"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RegexHelper_1 = __importDefault(require("./RegexHelper"));
class RewriteRule {
    constructor({ from, to, }) {
        this.regexValues = [];
        this.from =
            from === null || from === void 0 ? void 0 : from.replace(/^/g, "").replace(/\$/g, "").trim().split('/').splice(1).map((chunk) => {
                return {
                    text: chunk,
                    isRegex: RegexHelper_1.default.includeRegex(chunk),
                };
            });
        this.to = to.split('/')
            .splice(1)
            .map((chunk) => {
            if (chunk.indexOf("?%{query-string}") != -1) {
                this.hasQueryString = true;
            }
            return {
                text: chunk,
                hasRegex: chunk.includes('$'),
            };
        });
        this.fromLink = '';
        this.expectedToLink = '';
    }
    buildLinks() {
        this.fromLink = "/" + this.from.map((fromEntry) => {
            if (!fromEntry.isRegex) {
                return fromEntry.text;
            }
            const regexValue = RegexHelper_1.default.getRegexValue(fromEntry.text);
            this.regexValues.push(regexValue);
            return regexValue;
        }).join('/');
        this.expectedToLink = "/" + this.to.map((toEnrty) => {
            if (!toEnrty.hasRegex) {
                return toEnrty.text;
            }
            this.regexValues.forEach((value, index) => {
                const i = index + 1;
                toEnrty.text = toEnrty.text.replace(`$${i}`, value);
            });
            return toEnrty.text;
        }).join('/');
        // add https to abs redirects;
        if (this.expectedToLink.startsWith("//")) {
            this.expectedToLink = "https:" + this.expectedToLink;
        }
        if (!this.hasQueryString) {
            return;
        }
        const queryStringValue = "?" + RegexHelper_1.default.genRandomString();
        this.fromLink += queryStringValue;
        this.expectedToLink = this.expectedToLink.replace("?%{query-string}", queryStringValue);
        return;
    }
}
exports.default = RewriteRule;
