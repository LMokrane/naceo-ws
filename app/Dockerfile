FROM node:18

WORKDIR /home/node/app
COPY . .
RUN npm i --omit=dev && chown -R node:node /home/node/app
USER node

CMD [ "npm", "start" ]
