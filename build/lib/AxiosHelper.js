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
const axios_1 = __importDefault(require("axios"));
class AxiosHelper {
    constructor() {
        this.customAxios = axios_1.default.create({
            baseURL: AxiosHelper.baseUrl,
            timeout: 5000,
            validateStatus: (validateStatus) => {
                return (validateStatus >= 200 && validateStatus < 350) || validateStatus == 404;
            },
            // maxRedirects: 2,
            // auth: {
            //   username: 'yourUsername',
            //   password: 'yourPassword',
            // },
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'none',
                'Sec-Fetch-User': '?1',
                'Pragma': 'no-cache',
                'Cache-Control': 'no-cache',
            },
        });
    }
    sendRequest(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestConfig = {
                method: 'GET',
                url: url,
            };
            return this.customAxios(requestConfig);
        });
    }
}
AxiosHelper.baseUrl = "https://onshape-corp-dev-test.cphostaccess.com";
exports.default = AxiosHelper;
