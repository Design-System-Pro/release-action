# Use an official Node.js runtime as the base image
FROM node:20-slim

# Install git
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /action

# Copy package.json and release config template
COPY package.json ./
COPY template.release.config.js ./release.config.js

# Install dependencies
RUN npm install

# Set default value for DIST_DIR
ARG DIST_DIR=./dist

# Replace dist directory path in release config
RUN sed -i "s|{{dist-dir}}|$DIST_DIR|g" ./release.config.js

# Copy the entrypoint script
COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh

# Set the entrypoint
ENTRYPOINT ["/action/entrypoint.sh"]
