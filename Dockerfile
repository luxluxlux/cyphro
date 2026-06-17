# Build stage (includes Chromium for react-snap)
FROM ghcr.io/puppeteer/puppeteer:24.40.0 AS build

# Switch to root to install system dependencies
USER root
WORKDIR /app

# Minimal dependencies required for headless Chromium
RUN apt-get update && apt-get install -y --no-install-recommends \
    libnss3 \
    libxss1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libgtk-3-0 \
    libgbm1 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libxfixes3 \
    libxi6 \
    libxtst6 \
    libxext6 \
    libx11-6 \
    ca-certificates \
    fonts-liberation \
    && rm -rf /var/lib/apt/lists/*

COPY client/package*.json ./
RUN npm ci

COPY client/ ./
RUN npm run build


# Runtime stage
FROM nginx:1.29-alpine

COPY nginx/dev.conf /etc/nginx/conf.d/default.conf
COPY nginx/gzip.conf /etc/nginx/conf.d/gzip.conf
COPY nginx/common/app.conf /etc/nginx/common/app.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
