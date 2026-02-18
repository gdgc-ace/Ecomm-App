# ShopEase Frontend Docker Guide

## Local Build & Run

### 1. Build the image

```bash
docker build -t shopease-frontend .
```

### 2. Run the container

```bash
docker run -p 8080:80 shopease-frontend
```

### 3. Access

Go to `http://localhost:8080` in your browser.

## CI/CD Deployment

Images are automatically built and pushed to **Docker Hub** and **Amazon ECR** on every push to the `frontend` branch.

### Tags

- `latest`: The most recent commit
- `<SHA>`: Unique commit hash

### Manual Push (optional)

```bash
docker tag shopease-frontend <your-docker-id>/shopease-frontend:latest
docker push <your-docker-id>/shopease-frontend:latest
```
