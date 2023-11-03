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
            const to = rule.to[0]._ ? rule.to[0]._ : rule.to[0];
            const rewriteRule = new RewriteRule({
                from,
                // @ts-ignore
                to,
            });
            rewriteRule.buildLinks();            
            if (uniqueRules.indexOf(rewriteRule.fromLink) != -1) {
                return;
            }
            uniqueRules.push(rewriteRule.fromLink)
            context(`Test Suit For Rule from: ${rule.from[0]} to`, () => {
                let res;
                it(`Get valid status code 200, 301, 302 or 404`, async () =>{
                    const response = await axios.sendRequest(rewriteRule.fromLink);
                    res = response;
                });
                it(`Valid Redirect rule Request URL ${rewriteRule.fromLink}`, () => { 
                    if(!res?.headers?.location) {
                        throw new Error("no location Response")
                    }                   
                    const redirectUrl = res.headers.location
                        .replace("/onshape-corp-dev", "")
                        .replace("/onshape-corp-stage", "")
                        .replace("/onshape-corp-live", "");  
                    if (redirectUrl.trim() != rewriteRule.expectedToLink.trim()) {
                        throw new Error (`Actual: ${redirectUrl} Not Equal Expected: ${rewriteRule.expectedToLink}`);
                    }         
                })

            });
        });
    });
    run();
  }, 5000);
})();
