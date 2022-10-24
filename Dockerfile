
# Stage 1
FROM node:12 as build-step
RUN mkdir -p /app/ls10_net_notes
WORKDIR /app/ls10_net_notes

COPY package.json /app/ls10_net_notes
RUN npm install
COPY . /app/ls10_net_notes
RUN npm run build
# Stage 2
FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-step /app/ls10_net_notes/dist/notes-app /usr/share/nginx/html
EXPOSE 8080

