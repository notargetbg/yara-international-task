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
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const pageSize = 30;
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
// move this to router
app.get('/events', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query);
    try {
        const { data } = yield axios_1.default.get('https://app.ticketmaster.com/discovery/v2/events.json', {
            responseType: 'stream',
            params: Object.assign({ apikey: process.env.API_KEY, size: pageSize }, req.query)
        });
        data.pipe(res);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Something went wrong');
    }
}));
app.get('/events/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield axios_1.default.get(`https://app.ticketmaster.com/discovery/v2/events/${req.params.id}`, {
            responseType: 'stream',
            params: {
                apikey: process.env.API_KEY,
            }
        });
        data.pipe(res);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Something went wrong');
    }
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
