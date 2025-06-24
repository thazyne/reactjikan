# Dockerfile untuk build React app dan serve dengan nginx
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
COPY tailwind.config.js ./
COPY postcss.config.js ./
RUN npm install
COPY . .
RUN npx tailwindcss -i ./src/tailwind.css -o ./src/index.css --minify
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
