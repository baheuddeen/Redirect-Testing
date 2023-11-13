"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const xmlParser_1 = __importDefault(require("./lib/xmlParser"));
const RewriteRule_1 = __importDefault(require("./lib/RewriteRule"));
const AxiosHelper_1 = __importDefault(require("./lib/AxiosHelper"));
(() => {
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        const absPath = path_1.default.resolve();
        const xmlString = (yield promises_1.default.readFile(path_1.default.join(absPath, 'assets', 'rewrite.xml'))).toString();
        const xml = yield (0, xmlParser_1.default)(xmlString);
        const axios = new AxiosHelper_1.default();
        describe('Rewrite Rules', function () {
            const rules = xml.urlrewrite.rule;
            const uniqueRules = [];
            rules.forEach(rule => {
                const from = rule.from[0];
                // xml file has duplicated rules.
                const to = rule.to[0]._ ? rule.to[0]._ : rule.to[0];
                const rewriteRule = new RewriteRule_1.default({
                    from,
                    // @ts-ignore
                    to,
                });
                rewriteRule.buildLinks();
                if (uniqueRules.indexOf(rewriteRule.fromLink) != -1) {
                    return;
                }
                uniqueRules.push(rewriteRule.fromLink);
                context(`Test Suit For Rule from: ${rule.from[0]} to`, () => {
                    let resTest;
                    it(`Get valid status code 200, 301, 302 or 404`, () => __awaiter(this, void 0, void 0, function* () {
                        var _a, _b, _c, _d;
                        const resTest = yield axios.sendRequestTest(rewriteRule.fromLink);
                        const resLive = yield axios.customAxiosLive(rewriteRule.fromLink);
                        const testLoc = (_b = (_a = resTest === null || resTest === void 0 ? void 0 : resTest.request) === null || _a === void 0 ? void 0 : _a.res) === null || _b === void 0 ? void 0 : _b.responseUrl;
                        const liveLoc = (_d = (_c = resLive === null || resLive === void 0 ? void 0 : resLive.request) === null || _c === void 0 ? void 0 : _c.res) === null || _d === void 0 ? void 0 : _d.responseUrl;
                        // console.log(testLoc, liveLoc);
                        if (liveLoc && !testLoc) {
                            throw new Error(`No Redirect detected For Test Env`);
                        }
                        if (testLoc && liveLoc) {
                            const testUrl = new URL(testLoc);
                            const liveUrl = new URL(liveLoc);
                            if (testUrl.pathname != liveUrl.pathname) {
                                throw new Error(`Actual: ${testUrl.pathname} Not Equal Expected: ${liveUrl.pathname}`);
                            }
                            if (liveUrl.search && liveUrl.search != testUrl.search) {
                                throw new Error(`Wrong Query Params Actual: ${testUrl.search} Not Equal Expected: ${liveUrl.search}`);
                            }
                        }
                    }));
                    // it(`Valid Redirect rule Request URL ${rewriteRule.fromLink}`, () => { 
                    //     if(!res?.headers?.location) {
                    //         throw new Error("No Redirect detected");
                    //     }                   
                    //     const redirectUrl = res.headers.location
                    //         .replace("/onshape-corp-dev", "")
                    //         .replace("/onshape-corp-stage", "")
                    //         .replace("/onshape-corp-live", "");  
                    //     if (redirectUrl.trim() != rewriteRule.expectedToLink.trim()) {
                    //         throw new Error (`Actual: ${redirectUrl} Not Equal Expected: ${rewriteRule.expectedToLink}`);
                    //     }         
                    // })
                });
            });
        });
        run();
    }), 5000);
})();
