import fs from 'fs/promises';
import path from 'path';
import xmlParser from './lib/xmlParser';
import RewriteRule from './lib/RewriteRule';
import AxiosHelper from './lib/AxiosHelper';
import { expect } from "chai";


(() => { 
    setTimeout(async () => {
    const absPath = path.resolve();
    const xmlString = (await fs.readFile(path.join(absPath, 'assets', 'rewrite.xml'))).toString();
    const xml = await xmlParser(xmlString);
    const axios = new AxiosHelper();
    describe('Rewrite Rules', function () { 
        const rules = xml.urlrewrite.rule;
        const uniqueRules = [];
        rules.forEach(rule => {
            const from = rule.from[0];
            // xml file has duplicated rules.
            if (uniqueRules.indexOf(from) != -1) {
                return;
            }
            uniqueRules.push(from)
            const to = rule.to[0]._ ? rule.to[0]._ : rule.to[0];
            const rewriteRule = new RewriteRule({
                from,
                // @ts-ignore
                to,
            });
            rewriteRule.buildLinks();
            context(`Test Suit For Rule from: ${rule.from[0]} to`, () => {
                let res;
                it(`Get valid status code 200, 301, 302 or 404`, async () =>{
                    const response = await axios.sendRequest(rewriteRule.fromLink);
                    res = response;
                });
                it(`Valid Redirect rule Request URL ${rewriteRule.fromLink}`, () => {                    
                    const redirectUrl = res?.headers?.location
                        .replace("/onshape-corp-dev", "")
                        .replace("/onshape-corp-stage", "")
                        .replace("/onshape-corp-live", "");  
                    if (redirectUrl != rewriteRule.expectedToLink) {
                        throw new Error (`Actual: ${redirectUrl} Not Equal Expected: ${rewriteRule.expectedToLink}`);
                    }         
                })

            });
        });
    });
    run();
  }, 5000);
})();
