import * as fs from 'fs';
import config from './config.js';

import * as bunyan from 'bunyan';
const logger = bunyan.createLogger({
  name: 'websocket',
  streams: [
    {
      level: 'debug',
      type: 'rotating-file',
      period: '1d',
      count: 3,
      path: `${ config.path }/debug.log`
    },
    {
      level: 'error',
      type: 'rotating-file',
      period: '1d',
      count: 3,
      path: `${ config.path }/error.log`
    },
    {
      level: 'info',
      type: 'rotating-file',
      period: '1d',
      count: 3,
      path: `${ config.path }/info.log`
    }
  ]
});

import WebSocket, { createWebSocketStream } from 'ws';

import mongodb from './mongodb.js';
const urlMongodb = `${ config.mongodb.host }:${ config.mongodb.port }`;
const mongoDbName = config.mongodb.dbname;
logger.debug({ urlMongodb: urlMongodb });

async function run() {
  logger.info('début app');
  let messageStream = null;
  try {
    logger.info('connexion au websocket...');
    const wss = new WebSocket(`wss://${ config.host }:${ config.port }`);
    messageStream = await createWebSocketStream(wss, { encoding: 'utf8' });
    logger.info('connecté au websocket');
  } catch(err) {
    logger.error(err);
  }

  try {
    logger.info('connexion à mongodb...');
    const Message = await mongodb(urlMongodb, mongoDbName);
    logger.info('connecté à mongodb');
    for await (let data of messageStream) {
      logger.debug({ log: data });
      const message = new Message({ log: data });
      await message.save();
      logger.debug('enregistré dans mongodb');
    }
  } catch(err) {
    logger.error(err);
  }
}

run();
