FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000

FROM base AS dev
CMD ["npm", "run", "dev"]

FROM base AS production
CMD ["node", "index.js"]
