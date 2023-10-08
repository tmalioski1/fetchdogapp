# Stage 1: Build the React App
FROM node:14 AS build-stage

# Set the working directory within the Docker container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve the React App
FROM nginx:alpine AS production-stage

# Copy the built React app from the build-stage to the web server's HTML directory
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# The default command starts the nginx web server
CMD ["nginx", "-g", "daemon off;"]
