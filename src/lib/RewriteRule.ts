import RegexHelper from "./RegexHelper";
import axios from "axios";

type FromEntry = {
    text: string,
    isRegex: boolean,
}; 
type ToEnrty = {
    text: string,
    hasRegex: boolean,
};

export default class RewriteRule {
    from: FromEntry[];
    to: ToEnrty [];
    fromLink: string;
    expectedToLink: string;
    actualToLink: string;
    regexValues: string[] = [];
    hasQueryString: boolean;
    

    constructor({
        from,
        to,
    }: {
        from: string,
        to: string,
    }) {
        this.from = 
            from.replace(/^/g, "") // delete ^
            .replace(/\$/g, "")  // delete $
            .split('/')
            .splice(1)
            .map((chunk) => {
                return { 
                    text: chunk,
                    isRegex: RegexHelper.includeRegex(chunk),
                }
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
                }
            });
        this.fromLink = '';
        this.expectedToLink = '';
    }

    public buildLinks() {
        this.fromLink = "/" + this.from.map((fromEntry) => {
            if (!fromEntry.isRegex) {
                return fromEntry.text;
            }
            const regexValue = RegexHelper.getRegexValue(fromEntry.text);
            this.regexValues.push(regexValue);
            return regexValue
        }).join('/');
        this.expectedToLink = "/" + this.to.map((toEnrty) => {
            if (!toEnrty.hasRegex) {
                return toEnrty.text;
            }
            this.regexValues.forEach((value, index) => {
                const i = index +1;
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
        const queryStringValue = "?" + RegexHelper.genRandomString();
        this.fromLink += queryStringValue;
        this.expectedToLink = this.expectedToLink.replace("?%{query-string}", queryStringValue);
        
        return;
    }
}