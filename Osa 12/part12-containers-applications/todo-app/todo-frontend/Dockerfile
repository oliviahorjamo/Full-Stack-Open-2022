FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY . .

ENV REACT_APP_BACKEND_URL="http://localhost:8080/api"

RUN npm ci

RUN npm run build

FROM build-stage AS test
COPY . .
RUN CI=true npm run test

FROM nginx:1.20-alpine

COPY --from=test /usr/src/app/build /usr/share/nginx/html
