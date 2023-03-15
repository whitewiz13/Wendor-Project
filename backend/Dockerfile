FROM node:16
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 4000
CMD ["yarn", "start:prod"]