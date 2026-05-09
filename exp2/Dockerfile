# --- Stage 1: build the Angular app (Node = compile environment) ---
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# production bundle → dist/exp2/browser
RUN npm run build

# --- Stage 2: serve static files with Nginx (lightweight container) ---
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/exp2/browser /usr/share/nginx/html
EXPOSE 80
