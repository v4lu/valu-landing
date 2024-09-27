---
title: Nuxt Docker Build
date: '22.09.2024'
desc: 'Short tutorial about creating Docker Nuxt containers'
cover: '/cover/docker-nuxt-vite.webp'
---

# Intro

In this guide, we'll walk through the process of setting up a Nuxt.js application for self-hosting using Docker and pnpm. This approach combines the benefits of Nuxt's powerful Vue-based framework with Docker's containerization and pnpm's fast, disk-space-efficient package management.

## Prerequisites

- Basic knowledge of Nuxt.js, Docker, and pnpm (optional, if you don't want to use pnpm just replace it with npm)
- Docker installed on your machine
- Node.js and pnpm installed on your local development environment

## Step 1: Create a Nuxt Project

First, let's create a new Nuxt project using pnpm:

```bash
pnpm dlx nuxi@latest init app
cd app
pnpm install
```

## Step 2: Create a Dockerfile

In the root of your Nuxt project, create a file named `Dockerfile` with the following content:

```dockerfile
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
COPY --from=builder /app/.output ./output
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --prod --no-frozen-lockfile
EXPOSE 3000
CMD ["node", "output/server/index.mjs"]
```

This Dockerfile sets up a Node.js environment, installs pnpm, copies your Nuxt app, installs dependencies, builds the app, and sets up the command to run it.

## Step 3: Build and Run the Docker Container

Now, you can build and run your Dockerized Nuxt application:

```bash
# Build the Docker image
docker build -t nuxt-app .

# Run the container
docker run -p 3000:3000 nuxt-app
```

## Step 4: Using Docker Compose

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

3. Your Nuxt application should now be running and accessible at `http://localhost:3000`.

Using Docker Compose offers several advantages:

- It's easier to manage multiple services if you decide to add a database or other components later.
- You can easily set environment variables and other configurations.
- It provides a more declarative way to define your application's runtime environment.

## Conclusion

You've successfully set up a Nuxt.js application for self-hosting. This setup allows you to deploy your Nuxt app anywhere that supports Docker, giving you more control over your hosting environment and potentially reducing costs compared to managed platforms. Happy coding!
