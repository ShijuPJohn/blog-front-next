FROM node:16.14

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR ./

# Copying source files
COPY /app/package.json ./package.json
COPY /app/node_modules ./node_modules
COPY /app/.next ./.next
COPY /app/public ./public
# Building app
RUN npm run build

# Running the app
CMD [ "npm", "start"]