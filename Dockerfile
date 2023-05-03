FROM node:16.14

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR .

# Copying source files
COPY --from=builder --chown=nextjs:nodejs /app/.next/server ./.next/server

# Building app
RUN npm run build

# Running the app
CMD [ "npm", "start"]