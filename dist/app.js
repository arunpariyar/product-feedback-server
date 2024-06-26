"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const feedbackRoutes_1 = __importDefault(require("./routes/feedbackRoutes"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
//TODO refactor here and instead of using if habe cors url in the env file
if (process.env.NODE_ENV === 'development') {
    console.log('running in dev mode');
    app.use((0, morgan_1.default)('tiny'));
    const corsConfig = {
        origin: ['http://localhost:4200'],
    };
    app.use((0, cors_1.default)(corsConfig));
    console.log('dev server - cors applied 🪖');
}
else {
    console.log('running in prod mode)');
    app.use((0, cors_1.default)({
        origin: [
            'https://product-feedback-alpha.vercel.app',
            'https://product-feedback-6uik-4f6qtpuw3-arun-pariyars-projects.vercel.app',
            'https://product-feedback-server-daif.onrender.com/',
        ],
    }));
}
app.use(express_1.default.json());
app.use('/api/signup', userRoutes_1.default);
app.use('/api/login', authRoutes_1.default);
app.use('/api/feedback', feedbackRoutes_1.default);
exports.default = app;
