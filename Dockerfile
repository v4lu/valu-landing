# Stage 1: Build stage
FROM node:20-alpine AS builder
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --no-frozen-lockfile
COPY . .
RUN pnpm run build

# Stage 2: Runtime stage
FROM node:20-alpine
RUN npm install -g pnpm
WORKDIR /app
COPY --from=builder /app/package.json /app/pnpm-lock.yaml* ./
COPY --from=builder /app/build ./build
COPY --from=builder /app/src/blogs ./build/src/blogs
RUN pnpm install --prod --no-frozen-lockfile
RUN pnpm add js-yaml marked

EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "build"]