const usb = require('usb');
const signal = require('./signal');
const DEVICE_CONSTANTS = require('./deviceConstants');
const launcher = require('./launcherUSB');

const DCDriver = {
  DEVICE_CONSTANTS: DEVICE_CONSTANTS,
  turnOnDebugMode: function(){ 
    usb.setDebugLevel(4);
  },
  turnOffDebugMode: function(){
    usb.setDebugLevel(0);
  },
  moveUp: async function (durationMS) {
    return signal(DEVICE_CONSTANTS.CMD.UP, durationMS);
  },
  moveDown: async function (durationMS) {
    return signal(DEVICE_CONSTANTS.CMD.DOWN, durationMS);
  },
  moveLeft: async function (durationMS) {
    return signal(DEVICE_CONSTANTS.CMD.LEFT, durationMS);
  },
  moveRight: async function (durationMS) {
    return signal(DEVICE_CONSTANTS.CMD.RIGHT, durationMS);
  },
  stop: async function () {
      return signal(DEVICE_CONSTANTS.CMD.STOP, 1000);
  },
  release: async function () {
    return new Promise((resolve) => {
      const launcherInterface = launcher.interface(0);
      launcherInterface.release(true, () => {
        resolve();
      });
    });
  },
  fire: async function (number) {
    number = Number.isInteger(number) && number >= 0 && number <= DEVICE_CONSTANTS.MISSILES.NUMBER ? number : 1;
    if (number === 0) {
      return DCDriver.stop();
    } else {
      while (number !== 0) {
        if (number === 0) {
          return signal(DEVICE_CONSTANTS.CMD.FIRE, DEVICE_CONSTANTS.MISSILES.RELOAD_DELAY_MS);
        }
        await signal(DEVICE_CONSTANTS.CMD.FIRE, DEVICE_CONSTANTS.MISSILES.RELOAD_DELAY_MS);
        number --;
      }
    }
  },
  park: async function () {
    await DCDriver.moveLeft(8000)
    return DCDriver.moveDown(2000);
  },
};
module.exports = DCDriver