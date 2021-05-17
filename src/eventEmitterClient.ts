import {EventEmitter} from 'events';

export class MessageEventEmitterClient extends EventEmitter {
  constructor(connection: EventEmitter) {
    super();

    let wholeData = '';
    connection.on('data', (dataChunk) => {
      wholeData += dataChunk;

      let messageLimit = wholeData.indexOf('\0');
      while (messageLimit !== -1) {
        wholeData = wholeData.substring(0, messageLimit);
        this.emit('request', JSON.parse(wholeData));
      }
    });
  }
}