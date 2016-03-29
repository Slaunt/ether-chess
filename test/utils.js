'use strict';

const Web3 = require('web3');

function getAccounts(web3) {
  return new Promise((resolve, reject) => {
    web3.eth.getAccounts((err, acc) => {
      if (err) {
        reject(err);
      } else {
        resolve(acc);
      }
    });
  });
}

function defaultWeb3() {
  return new Web3(require('ethereumjs-testrpc').provider());
}

module.exports = {defaultWeb3, getAccounts};
