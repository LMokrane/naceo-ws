FROM node:18

WORKDIR /home/node/app
COPY . .
RUN mkdir -p logs && npm ci && chown -R node:node /home/node/app
USER node

EXPOSE 3000
CMD [ "npm", "start" ]
