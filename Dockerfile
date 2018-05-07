FROM node:7.7.2-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install

EXPOSE 3004

CMD [ "npm", "run", "docker:postgres" ]
