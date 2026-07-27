# Multi-stage Dockerfile for Backend Services / Common TypeScript build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first
COPY common/package*.json ./common/
COPY api_gateway/package*.json ./api_gateway/
COPY auth_service/package*.json ./auth_service/
COPY product_service/package*.json ./product_service/
COPY order_service/package*.json ./order_service/

# Copy source code
COPY common ./common
COPY api_gateway ./api_gateway
COPY auth_service ./auth_service
COPY product_service ./product_service
COPY order_service ./order_service

# Build common module
WORKDIR /app/common
RUN npm install

# Build API Gateway
WORKDIR /app/api_gateway
RUN npm install && npm run build

# Build Auth Service
WORKDIR /app/auth_service
RUN npm install && npm run build

# Build Product Service
WORKDIR /app/product_service
RUN npm install && npm run build

# Build Order Service
WORKDIR /app/order_service
RUN npm install && npm run build

# Runner stage
FROM node:20-alpine AS runner
WORKDIR /app

ARG SERVICE_PATH

COPY --from=builder /app /app

WORKDIR /app/${SERVICE_PATH}

EXPOSE 3000

CMD ["npm", "start"]
