# Use a lightweight Node.js image as the base
FROM node:20-alpine

# Set the working directory
WORKDIR /src

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's code
COPY . .

# Build the app
RUN npm run build

EXPOSE 8080

# CMD [ "npm", "run", "preview" ]
CMD ["npm", "start"]
