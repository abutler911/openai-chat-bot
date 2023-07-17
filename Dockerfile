# FROM node:14
# WORKDIR /app
# COPY . /app
# RUN npm install
# ENV PORT 8080
# EXPOSE 8080
# CMD ["npm", "start"]

# Select the base image
FROM node:14

# Create app directory in Docker
WORKDIR /usr/src/app

# Install app dependencies by copying package.json and package-lock.json
COPY package*.json ./

RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source inside Docker image
COPY . .

# Your app binds to port 8080 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 80

# Define the command to run your app using CMD which defines your runtime
CMD [ "npm", "start" ]
