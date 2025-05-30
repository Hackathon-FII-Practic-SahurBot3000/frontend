# 🧱 Base image for dependencies and building
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies only from package.json and package-lock.json
COPY package*.json ./

# Install deps with a clean cache
RUN npm ci

# Copy all other source code
COPY . .

# Build Next.js app (outputs to .next/)
RUN npm run build

# Copy only needed files to production image
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Install only production dependencies
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
RUN npm ci --omit=dev

# Copy built app and public/static assets
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/.env ./.env

# Tell Next to serve the app
ENV NODE_ENV production
ENV PORT 3000

# Expose the port
EXPOSE 3000

# Default command to run the app
CMD ["npx", "next", "start"]