var exec = require('cordova/exec');

var PLUGIN_NAME = "NTESAnticheat";

function isFunction(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
};

var YidunAnticheat = function(options, onCallback) {
  if (!options) {
    if (isFunction(onCallback)) {
      onCallback(new Error ('productNumber is required'));
    } else {
      throw new Error('productNumber is required');
    }
    return;
  }

  options.productNumber = options.productNumber;
  options.isCollectApk = options.isCollectApk || false;
  options.isCollectSensor = options.isCollectSensor || false;
  options.channel = options.channel || '';
  
  this.onSuccess = function (ev) {
    onCallback(ev);
  }
  
  this.onError = function (err) {
    onCallback(err);
  }

  exec(this.onSuccess, this.onError, PLUGIN_NAME, "init", [
    options.productNumber,
    options.isCollectApk,
    options.isCollectSensor,
    options.channel
  ]);

};

YidunAnticheat.prototype.getToken = function(timeout) {
  timeout = timeout || 3000;
  exec(this.onSuccess, this.onError, PLUGIN_NAME, "getToken", [timeout]);
};

YidunAnticheat.prototype.setSeniorCollectStatus = function(flag) {
  exec(this.onSuccess, this.onError, PLUGIN_NAME, "setSeniorCollectStatus", [flag]);
};

module.exports = YidunAnticheat;

