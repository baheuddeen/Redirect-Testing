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
const xml2js_1 = __importDefault(require("xml2js"));
// TODO Add rewrite rule type
function xmlParser(xmlString) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, rej) => {
            const parser = new xml2js_1.default.Parser();
            // Parse the XML string
            parser.parseString(xmlString, (err, result) => {
                if (err) {
                    rej('Error parsing XML:' + err);
                }
                else {
                    // Access the parsed XML data
                    res(result);
                }
            });
        });
    });
}
exports.default = xmlParser;
