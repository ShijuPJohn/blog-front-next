FROM node:16.14

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Copying source files
COPY . .

# Building app
RUN npm run build

# Running the app
CMD [ "npm", "start"]