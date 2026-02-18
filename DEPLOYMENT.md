# Deployment Guide

## GitHub Secrets Required

Make sure these secrets are added in your GitHub repository:
- `DOCKER_USERNAME` - Your Docker Hub username
- `DOCKER_PASSWORD` - Your Docker Hub access token

## Push to GitHub

```bash
# Add all changes
git add .

# Commit changes
git commit -m "Setup CI/CD workflows"

# Push to main branch
git push origin main
```

## What Happens After Push

### 1. Continuous Integration (CI)
- Tests backend on Node.js 20.x, 22.x, 24.x
- Tests frontend on Node.js 20.x, 22.x, 24.x
- Runs linting and build checks

### 2. Continuous Deployment (CD)
- Builds Docker images for backend and frontend
- Pushes images to Docker Hub:
  - `{DOCKER_USERNAME}/ecommerce-application-backend:latest`
  - `{DOCKER_USERNAME}/ecommerce-application-frontend:latest`

## Check Workflow Status

Go to: `https://github.com/{your-username}/{your-repo}/actions`

## Pull Docker Images

```bash
docker pull {DOCKER_USERNAME}/ecommerce-application-backend:latest
docker pull {DOCKER_USERNAME}/ecommerce-application-frontend:latest
```

## Run Containers

```bash
# Backend
docker run -p 3000:3001 -e DATABASE_URL="your-db-url" {DOCKER_USERNAME}/ecommerce-application-backend:latest

# Frontend
docker run -p 80:80 {DOCKER_USERNAME}/ecommerce-application-frontend:latest
```
