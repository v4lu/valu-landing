---
title: Next.js Docker Build
date: '22.09.2024'
desc: 'Short tutorial about creating Docker Next.js containers'
cover: '/cover/docker-nextjs-vite.webp'
---

# Intro

In this guide, we'll walk through the process of setting up a Next.js application for self-hosting using Docker and pnpm. This approach combines the benefits of Next.js's powerful React-based framework with Docker's containerization and pnpm's fast, disk-space-efficient package management.

## Prerequisites

- Basic knowledge of Next.js, Docker, and pnpm (optional, if you don't want to use pnpm just replace it with npm)
- Docker installed on your machine
- Node.js and pnpm installed on your local development environment

## Step 1: Create a Next.js Project

First, let's create a new Next.js project using pnpm:

```bash
pnpm create next-app app
cd app
pnpm install
```

## Step 2: Create a Dockerfile

In the root of your Next.js project, create a file named `Dockerfile` with the following content:

```dockerfile
# Stage 1: Build stage
FROM node:20-alpine AS builder
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

# Stage 2: Runtime stage
FROM node:20-alpine
RUN npm install -g pnpm
WORKDIR /app
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
ENV PORT 3000
ENV NODE_ENV production
CMD ["node", "server.js"]
```

This Dockerfile sets up a Node.js environment, installs pnpm, copies your Next.js app, installs dependencies, builds the app, and sets up the command to run it.

## Step 3: Update next.config.js

Modify your `next.config.js` file to ensure your app is properly configured for production:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	experimental: {
		outputFileTracingRoot: undefined
	}
};

module.exports = nextConfig;
```

This configuration enables the standalone output mode, which is optimized for containerized environments.

## Step 4: Build and Run the Docker Container

Now, you can build and run your Dockerized Next.js application:

```bash
# Build the Docker image
docker build -t nextjs-app .

# Run the container
docker run -p 3000:3000 nextjs-app
```

## Step 5: Using Docker Compose

Instead of running the Docker container directly, we can use Docker Compose for a more manageable and scalable setup. Docker Compose allows you to define and run multi-container Docker applications.

1. Create a `docker-compose.yml` file in the root of your project:

```yaml
services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

This Docker Compose file defines a service named `app` that builds from the current directory (using your Dockerfile), maps port 3000, sets the NODE_ENV to production, and restarts the container unless it's explicitly stopped.

2. Build and run your application using Docker Compose:

```bash
# Build the Docker image and start the container
docker-compose up --build

# To run in detached mode (in the background)
docker-compose up -d --build

# To stop the container
docker-compose down
```

3. Your Next.js application should now be running and accessible at `http://localhost:3000`.

Using Docker Compose offers several advantages:

- It's easier to manage multiple services if you decide to add a database or other components later.
- You can easily set environment variables and other configurations.
- It provides a more declarative way to define your application's runtime environment.

## Conclusion

You've successfully set up a Next.js application for self-hosting. This setup allows you to deploy your Next.js app anywhere that supports Docker, giving you more control over your hosting environment and potentially reducing costs compared to managed platforms. Happy coding!
