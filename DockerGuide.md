# Docker Guide

## Building the Docker Image

- ### Backend Docker Image
    ```teminal
    docker build -t ecommerce-application-backend:latest ./backend
    ```

- ### Frontend Docker Image
    ```terminal
    docker build -t ecommerce-application-frontend:latest ./frontend
    ```

## Running the Docker Image

- ### Backend Docker Image
    ```terminal
    docker run --name ecommerce-backend -p 3001:3001 --env-file .env ecommerce-application-backend
    ```

- ### Frontend Docker Image
    ```terminal
    docker run --name ecommerce-frontend -p 5173:80 --env-file .env ecommerce-application-frontend
    ```
