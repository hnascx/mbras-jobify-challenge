"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("@fastify/cors"));
const fastify_1 = __importDefault(require("fastify"));
const jobs_1 = require("./routes/jobs");
const app = (0, fastify_1.default)();
app.register(cors_1.default, {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
});
app.register(jobs_1.jobRoutes, { prefix: "/api/jobs" });
app
    .listen({
    port: 3001,
    host: "0.0.0.0",
})
    .then(() => {
    console.log("🚀 HTTP server running on http://localhost:3001");
});
