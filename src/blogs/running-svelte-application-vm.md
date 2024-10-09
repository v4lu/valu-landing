---
title: Running Svelte on Virtual Machine
date: '15.10.2024'
desc: 'Short tutorial about creating Docker Svelte containers'
cover: '/cover/svelte-cover.webp'
---

# Running Svelte on a Virtual Machine with Docker

## Introduction

This comprehensive guide will walk you through the process of deploying a Svelte application on a Virtual Private Server (VPS) using Docker containers. We'll cover everything from setting up your VPS to configuring a reverse proxy with SSL encryption. By the end of this tutorial, you'll have a production-ready Svelte application accessible via a custom domain with HTTPS.

Before we begin, it's important to note that we have a prerequisite guide on dockerizing a Svelte application. If you haven't already containerized your Svelte app, please refer to our detailed blog post: [How to Dockerize a Svelte App](https://valu-media.com/blog/dockerize-svelte). This post provides essential information on creating a Docker image for your Svelte application, which is a crucial step in this deployment process.

## 1. Setting Up Your VPS

We recommend using Netcup for VPS hosting due to their reliable and affordable solutions.

1. Sign up at [Netcup](https://www.netcup.eu/).
2. Choose a suitable VPS plan.
3. Complete the purchase and wait for the provisioning email.

## 2. Installing Docker and Docker Compose

Connect to your VPS via SSH and run the following commands:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install docker.io docker-compose -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
```

Log out and log back in for the group changes to take effect.

Verify the installations:

```bash
docker --version
docker-compose --version
```

## 3. Creating a New User

For security reasons, create a new user with sudo privileges:

```bash
adduser <username>
usermod -aG sudo <username>
su <username>
```

Use this new user account for all subsequent operations.

## 4. Configuring Domain DNS

1. Purchase a domain from [Porkbun](https://porkbun.com/) or your preferred registrar.
2. Add an A record pointing to your VPS IP address.
3. (Optional) Add a CNAME record for `www` subdomain.

Allow time for DNS propagation before proceeding.

## 5. Dockerizing Your Svelte Application

Create a `Dockerfile` in your project root:

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --no-frozen-lockfile
COPY . .
RUN pnpm run build

# Stage 2: Production
FROM node:20-alpine
RUN npm install -g pnpm
WORKDIR /app
COPY --from=builder /app/build ./build
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --prod --no-frozen-lockfile
EXPOSE 3000
CMD ["node", "build"]
```

## 6. Building the Docker Image

Navigate to your project directory and run:

```bash
docker build -t svelte-app .
```

## 7. Creating a Docker Compose File

Create a `docker-compose.yml` file:

```yaml
version: '3'

services:
  reverse-proxy:
    image: traefik:v3.1
    command:
      - '--api.insecure=true'
      - '--api.dashboard=true'
      - '--providers.docker'
      - '--providers.docker.exposedbydefault=false'
      - '--entryPoints.websecure.address=:443'
      - '--certificatesresolvers.myresolver.acme.tlschallenge=true'
      - '--certificatesresolvers.myresolver.acme.email=your-email@example.com'
      - '--certificatesresolvers.myresolver.acme.storage=/letsencrypt/acme.json'
      - '--entrypoints.web.address=:80'
      - '--entrypoints.web.http.redirections.entrypoint.to=websecure'
      - '--entrypoints.web.http.redirections.entrypoint.scheme=https'
    ports:
      - '80:80'
      - '443:443'
      - '8080:8080'
    volumes:
      - letsencrypt:/letsencrypt
      - /var/run/docker.sock:/var/run/docker.sock
    restart: always
    networks:
      - app-network

  svelte-app:
    image: svelte-app
    restart: always
    networks:
      - app-network
    labels:
      - 'traefik.enable=true'
      - 'traefik.http.services.svelte-app.loadbalancer.server.port=3000'
      - 'traefik.http.routers.svelte-app.rule=Host(`yourdomain.com`) || Host(`www.yourdomain.com`)'
      - 'traefik.http.routers.svelte-app.entrypoints=websecure'
      - 'traefik.http.routers.svelte-app.tls.certresolver=myresolver'
      - 'traefik.http.middlewares.redirect-to-non-www.redirectregex.regex=^https://www.yourdomain.com/(.*)'
      - 'traefik.http.middlewares.redirect-to-non-www.redirectregex.replacement=https://yourdomain.com/$${1}'
      - 'traefik.http.routers.svelte-app.middlewares=redirect-to-non-www'

networks:
  app-network:

volumes:
  letsencrypt:
```

Replace `yourdomain.com` and `your-email@example.com` with your actual domain and email.

## 8. Configuring the Firewall

Enable UFW and allow necessary ports:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status
```

## 9. Setting Up Traefik as a Reverse Proxy

Traefik is configured in the Docker Compose file to handle routing and SSL certificate management.

## 10. Deploying Your Application

Run the following command to start your services:

```bash
docker-compose up -d
```

This will start both the Traefik reverse proxy and your Svelte application.

## Conclusion

Congratulations! You have successfully deployed your Svelte application on a VPS using Docker and Traefik. Your application is now live and accessible via HTTPS at your domain.

Some key benefits of this setup include:

- Containerized deployment for consistency and ease of management
- Automatic SSL certificate management with Let's Encrypt
- Reverse proxy handling for improved security and performance
- Easy scalability for future growth

Remember to keep your system and Docker images updated regularly for security and performance improvements.

For any issues or further customization, refer to the official documentation of Docker, Traefik, and Svelte.

---

Your Svelte application is now live and accessible at https://yourdomain.com. Enjoy your newly deployed website!
