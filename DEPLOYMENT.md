# ShopEase Frontend Deployment

This guide covers deployment instructions for the ShopEase Frontend application.

## Vercel (Recommended)

1.  Connect your GitHub repository to Vercel.
2.  Import the project.
3.  The framework preset should automatically detect **Vite**.
4.  Set Environment Variables:
    - `VITE_API_URL`: URL of your backend API
5.  Deploy.

## AWS App Runner

### Option 1: Source Code Deployment

1.  Create an App Runner service.
2.  Choose **Source Code Repository** -> GitHub.
3.  Select the `frontend` branch.
4.  Configure build settings using `apprunner.yaml`:
    - Runtime: `Nodejs 18` or later
    - Build command: `npm install && npm run build`
    - Start command: `npm start`
    - Port: `8080`
5.  Add Environment Variables.
6.  Deploy.

### Option 2: Container Deployment (ECR)

1.  Push the Docker image to Amazon ECR (automated via CI/CD).
2.  Create an App Runner service.
3.  Choose **Amazon ECR**.
4.  Select the `shopease-frontend` image.
5.  Configure service:
    - Port: `80` (Nginx container default)
6.  Deploy.
