const ledger = require('ledgerco');
const ethUtil = require('ethereumjs-util');
const wallet = require('yoethwallet');
let util = {};

util.ledger = ledger;
util.ehtUtil = ethUtil;
util.wallet = wallet;
util.isConnected = false;


util.connect = function (cb) {
  if (this.isConnected) {
    cb(new Error('Ledger s is connected.'), null);
    return;
  }
  ledger.comm_node.create_async().then(function(comm) {
    const eth = new ledger.eth(comm);

    this.eth = eth;
    this.comm = comm;
    this.isConnected = true;

    cb(null, eth);
  }.bind(this)).catch(function (err) {
    cb(err, null);
  }.bind(this))
}

util.getAddress = function (path, cb) {
  if (!this.isConnected) {
    cb(new Error('Ledger s isnot connected.'), null);
    return;
  }
  this.eth.getAddress_async(path, false, true).then(function (address) {
    cb(null, address);
  }.bind(this)).catch(function (err) {
    cb(err, null);
  }.bind(this));
}

util.getAppConfig = function (cb) {
  if (!this.isConnected) {
    cb(new Error('Ledger s isnot connected.'), null);
    return;
  }
  this.eth.getAppConfiguration_async().then(function (config) {
    cb(null, config);
  }.bind(this)).catch(function (err) {
    cb(err, null);
  }.bind(this));
}

// util.close = function (cb) {
//   if (!this.isConnected) {
//     cb(new Error('Ledger s isnot connected.'), null);
//     return;
//   }
//   this.comm.close_async().then(function (close) {
//     cb(null, close);
//   }.bind(this)).catch(function (err) {
//     cb(err, null);
//   }.bind(this));
// }

util.signTransaction = function (path, txData, cb) {
  if (!this.isConnected) {
    cb(new Error('Ledger s isnot connected.'), null);
    return;
  }
  tx = wallet.tx.valueTx(txData);
  txHex = tx.serialize().toString('hex');

  this.eth.signTransaction_async(path, txHex).then(function (signedTransaction) {
    txData.v = '0x' + signedTransaction.v;
    txData.r = '0x' + signedTransaction.r;
    txData.s = '0x' + signedTransaction.s;

    cb(null, wallet.tx.valueTx(txData));
  }.bind(this)).catch(function (err) {
    cb(err, null);
  }.bind(this));
}

module.exports = util;