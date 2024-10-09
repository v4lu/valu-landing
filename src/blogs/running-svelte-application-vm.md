---
title: Running Svelte on Virtual Machine
date: '15.10.2024'
desc: 'Short tutorial about creating Docker Svelte containers'
cover: '/cover/svelte-cover.webp'
---

**In blog before we dockerized svelte image so please refere to it 1st**

## Description

This tutorial will guide you through the process of running a Svelte application on a virtual private server (VPS) using Docker containers. We recommend using Netcup for purchasing a VPS, as they provide reliable and affordable hosting solutions. Docker allows you to package your application and its dependencies into a container, making it easy to deploy and run consistently across different environments. By the end of this tutorial, you'll have a Svelte application running inside a Docker container on your Netcup VPS.

## Step 1: Set up a VPS on Netcup

1. Go to the Netcup website (https://www.netcup.eu/) and sign up for an account.
2. Choose a suitable VPS plan based on your requirements and budget.
3. Complete the purchase process and wait for your VPS to be provisioned.
4. Once your VPS is ready, you will receive an email with the login credentials and server details.

## Step 2: Install Docker and Docker Compose on your VPS

Connect to your VPS using SSH and follow these steps to install Docker and Docker Compose on Ubuntu/Debian:

1. Update the package lists and upgrade the system:

   ```bash
   sudo apt update
   sudo apt upgrade
   ```

2. Install Docker:

   ```bash
   sudo apt install docker.io
   ```

3. Start the Docker service and enable it to start on boot:

   ```bash
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

4. Add your user to the docker group to run Docker commands without sudo:

   ```bash
   sudo usermod -aG docker $USER
   ```

5. Log out and log back in for the group changes to take effect.

6. Install Docker Compose:

   ```bash
   sudo apt install docker-compose
   ```

7. Verify the installations by running:

   ```bash
   docker --version
   docker-compose --version
   ```

   You should see the respective versions printed in the output.

## Step 3: Create a New User

It is not recommended to work with the root user directly for security reasons. Instead, create a new user with sudo privileges to perform administrative tasks.

1. Connect to your VPS using SSH as the root user.

2. Create a new user (replace `<username>` with your desired username):

   ```bash
   adduser <username>
   ```

3. Set a strong password for the new user when prompted.

4. Grant the new user sudo privileges:

   ```bash
   usermod -aG sudo <username>
   ```

.5. Switch user

```bash
su <username>
```

From now on, use the new user account for all administrative tasks and prefix commands with `sudo` when necessary.

## Step 4: Point a Domain to Your VPS

To access your Svelte application using a domain name, you'll need to purchase a domain and point it to your VPS IP address. We recommend using Porkbun (https://porkbun.com/) for domain registration.

1. Go to the Porkbun website and search for your desired domain name.
2. Add the domain to your cart and complete the purchase process.
3. In your Porkbun account, navigate to the DNS management section for your domain.
4. Add a new DNS record with the following details:
   - Type: A
   - Name/Host: Leave it blank or enter @ for the root domain
   - Answer/Value: Enter the IP address of your Netcup VPS
   - TTL: Set it to a lower value (e.g., 300) for faster propagation
5. Save the DNS record.

It may take some time for the DNS changes to propagate globally. Once propagated, you'll be able to access your Svelte application using your domain name.

With your domain pointed to your VPS and a new user created, you're ready to proceed with containerizing your Svelte application in the next steps.

## Step 5: Dockerize Svelte application

In root of our project we should create Dockerfile

```dockerfile
# Stage 1: Build stage
FROM node:20-alpine AS builder

RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --no-frozen-lockfile
RUN rm -rf node_modules
COPY . .
RUN pnpm install --no-frozen-lockfile
RUN pnpm run build
RUN ls -la /app

# Stage 2: Runtime stage
FROM node:20-alpine

RUN npm install -g pnpm
WORKDIR /app
COPY --from=builder /app/build ./build
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --prod --no-frozen-lockfile

EXPOSE 3000
CMD ["node", "build"]
```

## Step 6: Build the Docker Image

1. Open a terminal and navigate to the directory containing your Svelte application and the Dockerfile. ( Git clone it to our VPS)

2. Build the Docker image by running the following command:

   ```bash
   docker build -t svelte-app .
   ```

   This command builds the Docker image using the Dockerfile in the current directory and tags it as `svelte-app`. You can replace `svelte-app` with your desired image name.

3. Wait for the build process to complete. Docker will download the necessary base images, install dependencies, and build your Svelte application.

## Step 7: Run the Docker Container

1. Once the Docker image is built, you can run the container using the following command:

   ```bash
   docker run -d -p 3000:3000 --name svelte-container svelte-app
   ```

   This command does the following:

   - `-d` runs the container in detached mode (in the background)
   - `-p 3000:3000` maps the container's port 3000 to the host's port 3000
   - `--name svelte-container` assigns a name to the container for easy reference
   - `svelte-app` is the name of the Docker image to run

2. Your Svelte application is now running inside the Docker container on your VPS.

3. You can access the application by opening a web browser and navigating to `http://your-domain.com:3000`.

## Step 8: Manage the Docker Container

Here are some useful Docker commands to manage your container:

- To stop the container:

  ```bash
  docker stop svelte-container
  ```

- To start the container:

  ```bash
  docker start svelte-container
  ```

- To remove the container:

  ```bash
  docker rm svelte-container
  ```

- To view the container logs:
  ```bash
  docker logs svelte-container
  ```

## Step 9: create docker compose

I am using Vim just for it

We will need more docker containers so best thing we can do is to group them in docker compose file

- Build docker image
- Create docker-compose.yml `vi docker-compose.yml`

```yaml
services:
  landing-page:
    image: <name of your image>
    port: '3000:3000' ## -> be aware later we will remove this port and use treafik
    networks:
      - valu

networks:
  valu:
```

- Run docker compose

```bash
docker-compose up -d
```

## Step 10: Enable Firewall

We will use ufw

- To enable only access trough ssh (443)

```bash
sudo ufw allow OpenSSH
```

- To enabled ufw

```bash
sudo ufw enable
sudo ufw status ## -> it should show us what is active
```

## Step 11: Setup Reverse Proxy using Traefik

```yaml
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
      - '--certificatesresolvers.myresolver.acme.email=lukabrkovic@proton.me'
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
      - valu # -> network of docker compose file
  landing-page:
    image: <image name>
    restart: always
    networks:
      - valu # -> network of docker compose file
    labels:
      - 'traefik.enable=true'
      - 'traefik.http.services.landing-page.loadbalancer.server.port=3000'
      - 'traefik.http.routers.landing-page.rule=Host(`<your domain>`) || Host(`www.<if you added www domain>`)'
      - 'traefik.http.routers.landing-page.entrypoints=websecure'
      - 'traefik.http.routers.landing-page.tls.certresolver=myresolver'
      - 'traefik.http.middlewares.redirect-to-non-www.redirectregex.regex=^https://www.<your domain>/(.*)'
      - 'traefik.http.middlewares.redirect-to-non-www.redirectregex.replacement=https://<your domain>/$${1}'
      - 'traefik.http.routers.landing-page.middlewares=redirect-to-non-www'

networks:
  valu: # -> network of docker compose file

volumes:
  letsencrypt:
```
