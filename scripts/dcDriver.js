const usb = require('usb');
const signal = require('./signal');
const trigger = require('./trigger');
const DEVICE_CONSTANTS = require('./deviceConstants')
const shortHandTranslationMap =  require('./shortHandTranslationMap');

const DCDriver = {
  DEVICE_CONSTANTS: DEVICE_CONSTANTS,
  turnOnDebugMode: function(){ 
    usb.setDebugLevel(4);
  },
  turnOffDebugMode: function(){
    usb.setDebugLevel(0);
  },
  moveUp: function (durationMS, callback) {
    signal(DEVICE_CONSTANTS.CMD.UP, durationMS, callback);
  },
  moveDown: function (durationMS, callback) {
    signal(DEVICE_CONSTANTS.CMD.DOWN, durationMS, callback);
  },
  moveLeft: function (durationMS, callback) {
    signal(DEVICE_CONSTANTS.CMD.LEFT, durationMS, callback);
  },
  moveRight: function (durationMS, callback) {
    signal(DEVICE_CONSTANTS.CMD.RIGHT, durationMS, callback);
  },
  stop: function (callback) {
    if (typeof callback === 'function' && callback !== DCDriver.stop) {
      signal(DEVICE_CONSTANTS.CMD.STOP, 0, callback);
    } else {
      signal(DEVICE_CONSTANTS.CMD.STOP);
    }
  },
  fire: function (number, callback) {
    number = Number.isInteger(number) && number >= 0 && number <= DEVICE_CONSTANTS.MISSILES.NUMBER ? number : 1;
    if (number === 0) {
      DCDriver.stop(callback);
    } else {
      signal(DEVICE_CONSTANTS.CMD.FIRE, DEVICE_CONSTANTS.MISSILES.RELOAD_DELAY_MS, trigger(DCDriver.fire, number - 1, callback));
    }
  },
  park: function (callback) {
    DCDriver.execute('l8000,d2000', callback);
  },
  execute: function (commands, callback) {
    if (typeof commands === 'string') {
      DCDriver.execute(commands.split(','), callback);
    } else if (commands.length === 0) {
      DCDriver.stop(callback);
    } else {
      var command = commands.shift();
      var func = command.length > 0 ? DCDriver[shortHandTranslationMap[command[0]]] : null;
      if (typeof func === 'function') {
        var next = trigger(DCDriver.execute, commands, callback);
        if (func === DCDriver.park || func === DCDriver.stop) {
          func(next);
        } else {
          var number;
          try {
            number = parseInt(command.substring(1), 10);
          } catch (ignore) {
            number = null;
          }
          func(number, next);
        }
      } else {
        console.warn('Ignoring bad command: ' + command);
        DCDriver.execute(commands, callback);
      }
    }
  }
};
module.exports = DCDriver