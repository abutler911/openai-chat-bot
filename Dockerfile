# Use an official Node.js runtime as the parent image
FROM node:14

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle the app source inside the Docker image
COPY . .

# Make port 80 available to the outside world
EXPOSE 80

# Define the command to run your app
CMD [ "npm", "start" ] 
