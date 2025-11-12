# 1. Base image with full dependencies for building
FROM node:22-alpine AS base
WORKDIR /usr/src/app

# ARG HTTP_PROXY
# ARG HTTPS_PROXY
# ENV HTTP_PROXY=$HTTP_PROXY
# ENV HTTPS_PROXY=$HTTPS_PROXY

COPY package.json package-lock.json ./
RUN npm ci

# 2. Prune development dependencies for a lean production-ready node_modules
FROM base AS prod-deps
WORKDIR /usr/src/app
RUN npm prune --production

# 3. Build the application
FROM base AS builder
WORKDIR /usr/src/app
COPY --from=base /usr/src/app/node_modules ./node_modules
COPY . .
# Generate prisma client
RUN npx prisma generate
RUN npm run build

# 4. Production image
FROM node:22-alpine AS production
WORKDIR /usr/src/app

# Copy production dependencies
COPY --from=prod-deps /usr/src/app/node_modules ./node_modules
# Copy the generated Prisma Client
COPY --from=builder /usr/src/app/node_modules/.prisma/client ./node_modules/.prisma/client
# Copy compiled code
COPY --from=builder /usr/src/app/dist ./dist
# # Copy prisma config
# COPY --from=builder /usr/src/app/prisma.config.ts .
# Copy prisma schema for migrations
COPY --from=builder /usr/src/app/prisma/schema.prisma ./prisma/schema.prisma
# Copy migration files
COPY --from=builder /usr/src/app/prisma/migrations ./prisma/migrations 
# Copy package.json
COPY --from=builder /usr/src/app/package.json .

ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "run", "start:prod"]