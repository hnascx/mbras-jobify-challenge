FROM node:20-alpine AS frontend
WORKDIR /app/frontend
RUN npm install -g pnpm
COPY frontend/package*.json ./
RUN pnpm install
COPY frontend/ .
EXPOSE 3000
CMD ["pnpm", "run", "dev"]

FROM node:20-alpine AS backend
WORKDIR /app/backend
RUN npm install -g pnpm
COPY backend/package*.json ./
RUN pnpm install
COPY backend/ .
RUN npx prisma generate
EXPOSE 3001
CMD ["pnpm", "run", "dev"] 