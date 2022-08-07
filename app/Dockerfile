FROM node:18

WORKDIR /home/node/app
COPY . .
RUN groupadd -g 1024 mygroup
RUN mkdir -p logs && npm ci && chown -R node:node /home/node/app
RUN usermod -a -G mygroup node

# USER node
RUN adduser --disabled-password --gecos "" --force-badname --ingroup mygroup myuser
USER myuser

CMD [ "npm", "start" ]
