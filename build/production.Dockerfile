
#Build src to dist
FROM node:17.9 as builder

RUN mkdir -p /usr/app

COPY ["package.json", "package-lock.json", "ormconfig.js", "build/app-start.sh", "/usr/app"]

WORKDIR /usr/app

RUN npm install --only=production

COPY [".", "/usr/app"]

RUN npm install

#RUN npm run test

RUN npm run build

#Production Build
FROM node:17.9

RUN mkdir -p /usr/app

COPY ["package.json", "package-lock.json", "ormconfig.js", "build/app-start.sh", "/usr/app"]

WORKDIR /usr/app

RUN npm install --only=production

COPY --from=builder ["/usr/app/dist", "/usr/app"]

EXPOSE $PORT

CMD ["/bin/bash", "app-start.sh"]
