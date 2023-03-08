#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
#stage 2
FROM nginxinc/nginx-unprivileged 
COPY --from=node /app/dist/orders-app /usr/share/nginx/html