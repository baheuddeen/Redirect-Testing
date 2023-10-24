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
        xml.urlrewrite.rule.forEach(rule => {
            const from = rule.from[0];
            const to = rule.to[0]._ ? rule.to[0]._ : rule.to[0];
            const rewriteRule = new RewriteRule({
                from: rule.from[0],
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
                const redirectUrl = res?.request?.res?.responseUrl?.replace(AxiosHelper.baseUrl,"");           
                it(`Valid Redirect rule, Actual: ${redirectUrl}, Expected: ${rewriteRule.expectedToLink}`, () => {
                    expect(redirectUrl).to.equal(rewriteRule.expectedToLink);
                })

            });
        });
    });
    run();
  }, 5000);
})();
