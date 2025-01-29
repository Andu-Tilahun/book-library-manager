# Stage 1: Build the Angular application
FROM node:16.10.0 AS builder

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

RUN npm cache clean --force
# Install dependencies
RUN npm install --force

# Copy the rest of the application code to the working directory
COPY . .


RUN npm install npm@7.24.0

# Build the Angular application
RUN npm run build --prod

# Stage 2: Use a lightweight Nginx image as the final base image
FROM nginx:alpine

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built Angular application from the previous stage to the Nginx web server directory
COPY --from=builder /usr/src/app/dist/bms-web-app /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
