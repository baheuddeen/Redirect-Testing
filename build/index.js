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
const chai_1 = require("chai");
(() => {
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        const absPath = path_1.default.resolve();
        const xmlString = (yield promises_1.default.readFile(path_1.default.join(absPath, 'assets', 'rewrite.xml'))).toString();
        const xml = yield (0, xmlParser_1.default)(xmlString);
        const axios = new AxiosHelper_1.default();
        describe('Rewrite Rules', function () {
            xml.urlrewrite.rule.forEach(rule => {
                const rewriteRule = new RewriteRule_1.default({
                    from: rule.from[0],
                    // @ts-ignore
                    to: rule.to[0]._ ? rule.to[0]._ : rule.to[0],
                });
                rewriteRule.buildLinks();
                context(`Test Suit For Rule ${rule.from[0]}`, () => {
                    let res;
                    it(`Get valid status code 200, 301, 302 or 404`, () => __awaiter(this, void 0, void 0, function* () {
                        const response = yield axios.sendRequest(rewriteRule.fromLink);
                        res = response;
                    }));
                    it(`Get the expected redirect url  ${rewriteRule.expectedToLink}`, () => {
                        const redirectUrl = res.request.res.responseUrl.replace(AxiosHelper_1.default.baseUrl, "");
                        (0, chai_1.expect)(redirectUrl).to.equal(rewriteRule.expectedToLink);
                    });
                });
            });
        });
        run();
    }), 5000);
})();
