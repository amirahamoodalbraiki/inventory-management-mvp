# --- build stage ---
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_API_BASE=/api
ENV VITE_API_BASE=/api
RUN npm run build

# --- runtime stage ---
FROM nginx:1.27-alpine
# Nginx config with /api and /images proxy to Spring Boot
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Static assets
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80