# ========================
# 🔧 Builder Stage
# ========================
FROM node:20-alpine AS builder

# Use bash for better debugging
SHELL ["/bin/sh", "-c"]

# 1. Set working directory
WORKDIR /app

# 2. Install PNPM
RUN corepack enable && corepack prepare pnpm@latest --activate

# 3. Copy lockfiles & package metadata first (for better caching)
COPY pnpm-lock.yaml ./
COPY package.json ./
COPY tsconfig.json ./
COPY next.config.js ./
COPY .npmrc ./

# 4. Install dependencies (using cached layers)
RUN pnpm install --frozen-lockfile

# 5. Copy the rest of the app source
COPY . .

# 6. Build the Next.js app
RUN pnpm build

---

# ========================
# 🏃 Runtime Stage
# ========================
FROM node:20-alpine AS runner

# Enable PNPM
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set environment to production
ENV NODE_ENV=production
ENV PORT=3000

# 1. Set working directory
WORKDIR /app

# 2. Copy only production files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/.npmrc .npmrc

# 3. Install only production dependencies
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile --prod

# 4. Expose app port
EXPOSE 3000

# 5. Start app
CMD ["pnpm", "start"]