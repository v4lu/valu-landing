# Stage 1: Build stage
FROM node:20-alpine AS builder
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --no-frozen-lockfile
COPY . .
RUN pnpm run build
RUN ls -la /app

# Stage 2: Runtime stage
FROM node:20-alpine
RUN npm install -g pnpm
WORKDIR /app
COPY --from=builder /app/package.json /app/pnpm-lock.yaml* ./
COPY --from=builder /app/build ./build
COPY --from=builder /app/src ./src
RUN pnpm install --prod --no-frozen-lockfile
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "build"]
