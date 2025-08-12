"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobRoutes = jobRoutes;
const axios_1 = __importDefault(require("axios"));
const prisma_1 = require("../lib/prisma");
const REMOTIVE_API_URL = "https://remotive.com/api/remote-jobs";
async function jobRoutes(app) {
    // Get all jobs from Remotive API
    app.get("/", async () => {
        const response = await axios_1.default.get(REMOTIVE_API_URL);
        return response.data;
    });
    // Get job by ID from Remotive API
    app.get("/:id", async (request) => {
        const { id } = request.params;
        const response = await axios_1.default.get(`${REMOTIVE_API_URL}/${id}`);
        return response.data;
    });
    // Get favorited jobs
    app.get("/favorites/:userId", async (request) => {
        const { userId } = request.params;
        const favorites = await prisma_1.prisma.favoriteJob.findMany({
            where: {
                userId,
            },
        });
        return favorites;
    });
    // Toggle favorite job
    app.post("/favorites", async (request) => {
        const { userId, jobId, jobData } = request.body;
        const existingFavorite = await prisma_1.prisma.favoriteJob.findUnique({
            where: {
                userId_jobId: {
                    userId,
                    jobId,
                },
            },
        });
        if (existingFavorite) {
            await prisma_1.prisma.favoriteJob.delete({
                where: {
                    userId_jobId: {
                        userId,
                        jobId,
                    },
                },
            });
            return { favorited: false };
        }
        await prisma_1.prisma.favoriteJob.create({
            data: {
                userId,
                jobId,
                jobData,
            },
        });
        return { favorited: true };
    });
}
