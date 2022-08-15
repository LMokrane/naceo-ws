import * as fs from 'fs';
import WebSocket, { createWebSocketStream } from 'ws';

import config from './config.js';

import mongodb from './mongodb.js';
const urlMongodb = `${ config.mongodb.host }:${ config.mongodb.port }`;

const wss = new WebSocket(`wss://${ config.host }`);
const messageStream = createWebSocketStream(wss, { encoding: 'utf8' });

async function run() {
  const Message = await mongodb(urlMongodb);
  for await (let data of messageStream) {
    const message = new Message({ log: data });
    await message.save();
  }
}

await run();
