# Stage 1 : Build Stage
FROM node:22-alpine AS builder

#  set the working directory in the application
WORKDIR /app

# copy package files
COPY package*.json ./
COPY prisma ./prisma/

#  install all the dependencies
RUN npm install

# generate prisma client
RUN npx prisma generate

# copy the rest
COPY . .

# building the application
RUN npm run build

# Stage 2 : Production Stage
FROM node:20-alpine AS production

WORKDIR /app

# copy package file
COPY package*.json ./

# install dependencies
RUN npm install --only:production

# copy the built from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# generate prisma client
RUN npx prisma generate

# expose port
EXPOSE 3001

# the command to run the dist
CMD ["node", "dist/app.js"]
