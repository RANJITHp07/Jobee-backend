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
exports.adminverify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminverify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = req.headers.authorization;
        const key = process.env.JWT_KEY;
        console.log(key);
        if (token && key) {
            const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
            if (decode) {
                req.user = decode;
                if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.admin) {
                    next();
                }
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(401).json({ message: 'Unauthorized' });
    }
});
exports.adminverify = adminverify;
