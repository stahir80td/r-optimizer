# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files from root
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy public folder and src folder
COPY public ./public
COPY src ./src

# Build the app
RUN npm run build

# Production stage  
FROM nginx:alpine

# Copy built files from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Configure nginx for SPA
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
    location /healthz { \
        access_log off; \
        return 200 "OK"; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]