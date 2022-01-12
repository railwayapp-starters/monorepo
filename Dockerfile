FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

# Install deps
RUN yarn

# Build
RUN yarn build

# Start
CMD [ "yarn", "start" ]
