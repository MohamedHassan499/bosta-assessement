FROM node:lts-alpine

WORKDIR /app

COPY package.json yarn.lock tsconfig.json ./

RUN yarn

COPY . .

RUN npx prisma generate

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "db:migrate" ]

ENTRYPOINT [ "yarn", "start" ]