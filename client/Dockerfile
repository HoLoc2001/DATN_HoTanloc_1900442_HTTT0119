FROM node:18-alpine

WORKDIR /react-vite-app

EXPOSE 8000

COPY package.json package-lock.json ./

RUN npm install --force

COPY . ./

# RUN npm run build 
CMD ["npm", "run", "start"]