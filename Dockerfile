FROM node:16-alpine

# Create app directory
WORKDIR /app

# Include backend code and install dependencies
COPY dist .
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
RUN npm ci --only=production

ENV NODE_ENV production

USER node
CMD [ "node", "index.js" ]
