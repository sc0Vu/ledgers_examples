const util = require('./util');

util.connect(async function (err, instance) {
  if (err) {
    console.log('Connect to ledger failed, Error: ' + err.message);
    return;
  }
  let txData = {
    to: '0x9a896bdeec0aa6caa5a75dd56e017560b7b8c441',
    value: '0x0de0b6b3a7640000',
    // gas: '0x52',
    gasPrice: '0x04e3b29200',
    gasLimit: '0x5208',
    data: '',
    nonce: '0x00',
    chainId: 4,
  };

  util.signTransaction("m/44'/60'/0'/0", txData, function (err, signedTransaction) {
    if (err) {
      throw err;
    }
    console.log('Raw transaction: 0x' + signedTransaction.serialize().toString('hex'));
  });
});