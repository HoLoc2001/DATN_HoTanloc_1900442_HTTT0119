FROM node:18-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npx prisma migrate dev --name init

CMD [ "npm",  "start"]