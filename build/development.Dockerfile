FROM node:17.9

RUN mkdir -p /usr/app

VOLUME ["/usr/app/"]

WORKDIR /usr/app

EXPOSE 3000

CMD npm install

CMD npm run start:debug