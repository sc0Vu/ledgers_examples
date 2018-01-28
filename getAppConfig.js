const util = require('./util');

util.connect(async function (err, instance) {
  if (err) {
    console.log('Connect to ledger failed, Error: ' + err.message);
    return;
  }

  util.getAppConfig(function (err, config) {
    if (err) {
      throw err;
    }
    console.log('Arbitrary Data Enabled: ' + config.arbitraryDataEnabled);
    console.log('Version: ' + config.version);
  });
});