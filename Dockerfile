FROM node:16.14

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /app

# Copying source files
COPY --from=BUILD_IMAGE /app/package.json ./package.json
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/.next ./.next
COPY --from=BUILD_IMAGE /app/public ./public
# Building app
RUN npm run build

# Running the app
CMD [ "npm", "start"]