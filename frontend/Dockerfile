# Node version-package we are using to build the application
FROM  node:22-alpine AS builder

workdir /app


COPY  package*.json ./


RUN npm install

COPY . .

RUN npm run build
  
FROM nginx:alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
