FROM node:16.14

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /app

# Copying source files
COPY ./package.json ./package.json
COPY ./node_modules ./node_modules
COPY .next .next
COPY ./public ./public
COPY ./app ./app

# Building app
RUN npm run build

# Running the app
CMD [ "npm", "start"]