FROM node:alpine

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
RUN npm ci

# Copying source files
COPY . .

# TODO need improve this line
RUN cp arena.env .env

# Building app
RUN npm run build

# Expose the listening port
EXPOSE 4000

# Running the app
CMD [ "npm", "run", "prod" ]