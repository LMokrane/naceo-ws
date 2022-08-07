import * as fs from 'fs';
import WebSocket, { createWebSocketStream } from 'ws';

import config from './config.js';

const wss = new WebSocket(`wss://${ config.host }`);

wss.on('open', () => {
  console.log('Connecte');
});

let id = 0;

wss.on('message', () => {
  id += 1;
  const duplex = createWebSocketStream(wss, { encoding: 'utf8' });
  const fichier = `${ config.path }/log_${ id }`;
  console.log(`fichier ${ fichier } cree`);
  const writer = fs.createWriteStream(fichier);
  duplex.pipe(writer);
});

wss.on('close', () => {
  console.log('Deconnecte');
});
