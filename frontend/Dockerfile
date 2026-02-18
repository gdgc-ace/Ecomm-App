# Node version-package we are using to build the application
FROM node:22-alpine AS builder

# Set up the work directory
WORKDIR /app

COPY package*.json ./

RUN npm install # Copy the package files

COPY . . 

# run the install command
RUN npm run build

FROM nginx:alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
