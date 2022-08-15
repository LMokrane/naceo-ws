import * as fs from 'fs';
import WebSocket, { createWebSocketStream } from 'ws';

import config from './config.js';

import mongodb from './mongodb.js';

const wss = new WebSocket(`wss://${ config.host }`);
const messageStream = createWebSocketStream(wss, { encoding: 'utf8' });

async function run() {
  const Message = await mongodb('172.17.0.3:27017');
  for await (let data of messageStream) {
    const message = new Message({ log: data });
    await message.save();
  }
}

await run();
