
FROM node:16.15.0

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

COPY public/images ./public/images

CMD node dbConfiguration.js;npm start;