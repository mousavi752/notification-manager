# Stage 1: Build the application
FROM node:21-alpine AS build

WORKDIR /app
COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./
COPY apps/notification-panel ./apps/notification-panel

RUN npm install
RUN npx nx run notification-panel:build --skip-nx-cache=true

# Stage 2: Create the production image
FROM nginx:alpine

COPY dist/apps/notification-panel /usr/share/nginx/html
COPY apps/notification-panel/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
