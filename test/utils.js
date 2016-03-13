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

module.exports = {getAccounts};
