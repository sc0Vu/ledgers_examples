const util = require('./util');
// const total = 10;

// let eth;

util.connect(async function (err, instance) {
  if (err) {
    console.log('Connect to ledger failed, Error: ' + err.message);
    return;
  }

  util.getAddress("m/44'/60'/0'/0", function (err, address) {
    if (err) {
      throw err;
    }
    console.log('Address: ' + address.address);
  });

  // get addresses
  // eth = instance;
  // for (let i=0; i<total; i++) {
  //   try {
  //     let address = await eth.getAddress_async("m/44'/60'/0'/0/" + i, false, true);

  //     console.log('Address: ' + address.address);
  //   } catch (err) {
  //     console.log('Error: ' + err.message);
  //     return;
  //   }
  // }
});