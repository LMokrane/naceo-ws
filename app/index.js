import * as fs from 'fs';
import WebSocket, { createWebSocketStream } from 'ws';

import config from './config.js';

import mongodb from './mongodb.js';

mongodb.initClientDbConnection();
const messageSchema = new mongoose.Schema({
  log: String
});
const Message = mongoose.model('Message', messageSchema);

const wss = new WebSocket(`wss://${ config.host }`);

const messageStream = createWebSocketStream(wss, { encoding: 'utf8' });

async function run() {
  for await (let data of messageStream) {
    const message = new Message({ log: data });
    await message.save();
  }
}

await run();