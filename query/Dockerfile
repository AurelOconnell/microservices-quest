# pull official base image
FROM node:14.15.0-alpine3.10

# set working directory
WORKDIR /app

# install app dependencies
COPY package*.json ./
RUN npm ci

# add app
COPY . ./


# start app
CMD ["npm", "start"]
