FROM node:16.15.0

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

RUN npm install bcrypt

COPY . .

CMD npm start