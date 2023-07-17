# Base Image
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Expose port and start application
ENV PORT 80
EXPOSE 80
CMD [ "node", "app.js" ]
