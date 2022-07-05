const launcher = require('./launcherUSB');
const DEVICE_CONSTANTS = require('./deviceConstants')

 const signal = async function(cmd, durationMS) {
  return new Promise((resolve) => {
    launcher.controlTransfer(0x21, 0x09, 0x0, 0x0, Buffer.from([0x02, cmd, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]),
        function (data) {
          var movementCommand = [
            DEVICE_CONSTANTS.CMD.UP,
            DEVICE_CONSTANTS.CMD.DOWN,
            DEVICE_CONSTANTS.CMD.LEFT,
            DEVICE_CONSTANTS.CMD.RIGHT
          ];

          if (!Number.isInteger(durationMS)) return;
          if (durationMS <= 0) {
            resolve();
            return;
          }

          if (!movementCommand.includes(cmd)) {
            setTimeout(resolve, durationMS);
            return;
          }

          setTimeout( function() {
            resolve();
            signal(DEVICE_CONSTANTS.CMD.STOP);
          }, durationMS);
        }
    );
  })

  }
  module.exports = signal;
