FROM node:18.12.1-alpine3.17


WORKDIR /usr/src/app
COPY package*.json ./


ENV npm_config_cache=/usr/src/app


RUN npm ci --prefer-offline --no-audit


COPY . .


# RUN npx eslint src
RUN npx prisma generate
RUN npm run build


RUN chown -R 10500:10500 "/usr/src/app"


USER 10500


EXPOSE 3000


CMD [ "npm", "start" ]