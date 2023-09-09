FROM node:16

# Create app directory
WORKDIR /usr/src/app

EXPOSE 5000

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install --force
# Bundle app source
#COPY ./prisma .
COPY . .
# RUN npx prisma db pull
RUN npx prisma generate
# Creates a "dist" folder with the production build
#COPY . .

RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]