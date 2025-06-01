# syntax=docker.io/docker/dockerfile:1

FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Expose port 3000
EXPOSE 3000

# Run development server
CMD ["npm", "run", "dev"]