import Web3 from 'web3';

import {connectionError} from './errors.js';

export const HTTP = Symbol('HTTP');
export const IPC = Symbol('IPC');

export default class EthNode {
  constructor(protocol, host, port) {
    let provider;
    if (protocol === HTTP) {
      provider = new Web3.providers.HttpProvider(`http://${host}:${port}`);
    } else if (protocol === IPC) {
      provider = new Web3.providers.IpcProvider(`ipc://${host}:${port}`);
    } else {
      connectionError(`Unsupported protocol ${protocol}`);
    }
    this.web3 = new Web3(provider);
  }
}
