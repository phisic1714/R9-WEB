FROM node:24-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

ARG VITE_LIFF_ID
ARG VITE_BASE_PATH=/
ENV VITE_LIFF_ID=${VITE_LIFF_ID}
ENV VITE_BASE_PATH=${VITE_BASE_PATH}
RUN test -n "$VITE_LIFF_ID" && npm run build

FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /app/dist /etc/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
