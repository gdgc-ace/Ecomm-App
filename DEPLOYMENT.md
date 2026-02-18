# Deployment Guide

## ✅ Changes Made

### 1. Fixed GitHub Actions Workflow (`.github/workflows/integration.yml`)
- ✅ Completed all missing configuration values
- ✅ Fixed syntax errors (missing spaces in Docker tags, incorrect template syntax)
- ✅ Added proper job dependencies (backend-ci and frontend-ci run first)
- ✅ Build-and-deploy only runs on successful CI tests
- ✅ Separated concerns: CI tests run on all pushes/PRs, deployment only on main branch

### 2. Fixed Dockerfiles
- ✅ **Backend Dockerfile**: Fixed `npm install --only=production` flag
- ✅ **Frontend Dockerfile**: Fixed missing hyphen in `node:22-alpine`
- ✅ Created `.dockerignore` for frontend

### 3. Git Push
- ✅ All changes committed and pushed to GitHub
- ✅ Commit: "Fix CI/CD pipeline: Update GitHub Actions workflow and Dockerfiles"

## 🔐 Required GitHub Secrets

You mentioned you already added secrets. Verify these are set in your GitHub repository:

**Settings → Secrets and variables → Actions → Repository secrets**

Required secrets:
- `DOCKER_USERNAME` - Your Docker Hub username
- `DOCKER_PASSWORD` - Your Docker Hub password or access token

## 🚀 How the CI/CD Pipeline Works

### On Every Push/Pull Request:
1. **Backend CI Job**
   - Checks out code
   - Installs Node.js 20.x
   - Installs dependencies
   - Generates Prisma client
   - Runs build check

2. **Frontend CI Job**
   - Checks out code
   - Installs Node.js 20.x
   - Installs dependencies
   - Runs ESLint
   - Runs build check

### On Push to Main Branch (After CI Passes):
3. **Build and Deploy Job**
   - Logs into Docker Hub
   - Builds and pushes backend Docker image
   - Builds and pushes frontend Docker image

## 📦 Docker Images

Your images will be pushed to:
- **Backend**: `<your-username>/ecommerce-backend:latest`
- **Frontend**: `<your-username>/ecommerce-frontend:latest`

## 🔍 Monitoring the Deployment

1. Go to your GitHub repository
2. Click on **Actions** tab
3. You'll see the workflow running
4. Click on the workflow run to see detailed logs

## 🐳 Running the Deployed Images

Once images are pushed to Docker Hub, you can run them:

### Backend
```bash
docker pull <your-username>/ecommerce-backend:latest
docker run -p 3000:3001 \
  -e DATABASE_URL="your-database-url" \
  <your-username>/ecommerce-backend:latest
```

### Frontend
```bash
docker pull <your-username>/ecommerce-frontend:latest
docker run -p 80:80 <your-username>/ecommerce-frontend:latest
```

## 🔧 Environment Variables for Production

### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@host:5432/database
PORT=3001
NODE_ENV=production
```

### Frontend
Update `VITE_API_URL` in your build to point to your production backend.

## 📝 Next Steps

1. ✅ Code is pushed to GitHub
2. ⏳ GitHub Actions will automatically trigger
3. ⏳ CI tests will run (backend + frontend)
4. ⏳ If tests pass, Docker images will be built and pushed
5. ✅ Images available on Docker Hub

## 🎯 Deployment Options

### Option 1: AWS ECS/Fargate
- Use the Docker images from Docker Hub
- Configure task definitions
- Set up load balancer

### Option 2: AWS EC2
- Pull images from Docker Hub
- Run with docker-compose

### Option 3: Kubernetes
- Use the Docker images in your K8s manifests
- Deploy to EKS or any K8s cluster

### Option 4: Docker Compose (Simple)
Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  backend:
    image: <your-username>/ecommerce-backend:latest
    ports:
      - "3000:3001"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - NODE_ENV=production
  
  frontend:
    image: <your-username>/ecommerce-frontend:latest
    ports:
      - "80:80"
    depends_on:
      - backend
```

## 🐛 Troubleshooting

### If GitHub Actions Fails:
1. Check the Actions tab for error logs
2. Verify secrets are correctly set
3. Ensure Docker Hub credentials are valid

### If Docker Build Fails:
1. Test locally: `docker build -t test ./backend`
2. Check Dockerfile syntax
3. Verify all dependencies are in package.json

### If Deployment Fails:
1. Check Docker Hub for images
2. Verify image tags match
3. Check network connectivity

## 📊 Workflow Status

Check your workflow status at:
`https://github.com/<your-username>/forked/actions`

---

**Status**: ✅ All files fixed and pushed to GitHub
**Next**: Monitor GitHub Actions for successful deployment
