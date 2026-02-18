# Node version-package we are using to build the application
FROM  AS builder

# Set up the work directory
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Copy the package files


# run the install command


# copy the entire code base


# run the build command


# something different  
FROM nginx:alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]