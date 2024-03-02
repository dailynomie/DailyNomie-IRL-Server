FROM node:16-buster

WORKDIR /usr/app
COPY ./package.json ./
RUN npm install --force
COPY ./ /usr/app
RUN NODE_OPTIONS=--max-old-space-size=8192 npm run build

FROM nginx
WORKDIR /usr/app
COPY --from=0 /usr/app/dist /usr/share/nginx/html
