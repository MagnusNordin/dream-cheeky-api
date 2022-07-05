dream-cheeky-api
================

Nodejs API for controller dream cheeky missile launcher.
This is a reinforcement of [pathikrit's *node-thunder-driver* library](https://github.com/pathikrit/node-thunder-driver), with some unexpected behaviours removed and extra features. Now supports Node v16.

____________________
Prerequisite
==============
For module usb and linux: `sudo apt-get install build-essential libudev-dev`

Installation
==============
1. `npm install dream-cheeky-driver`
2. In your js file, add `var DCDriver = require('dream-cheeky-driver');`

____________________

API
==============

###DCDriver
####DCDriver.DEVICE_CONSTANTS
**Description:** 

A JS object containing constants for Dream Cheeky Thunder Launcher.

####DCDriver.turnOnDebugMode()
**Description:** 

Turn on debug mode (level 4) of USB.

####DCDriver.turnOffDebugMode()
**Description:** 

Turn off USB debug mode (ie. debug level 0).

####DCDriver.moveUp(`durationMS`)
**Description:**

Move up for a period of time.

**Parameters:**

#####`durationMS`
Type: Number

####DCDriver.moveDown(`durationMS`)
**Description:**

Move down for a period of time.

**Parameters:**

#####`durationMS`
Type: Number

####DCDriver.moveLeft(`durationMS`)
**Description:**

Move left for a period of time.

**Parameters:**

#####`durationMS`
Type: Number

####DCDriver.moveRight(`durationMS`)
**Description:**

Move right for a period of time.

**Parameters:**

#####`durationMS`
Type: Number

####DCDriver.stop()

Stop movement immediately.

**Parameters:**

####DCDriver.fire(`numberOfShot`)

Shoot for `numberOfShot` times consecutively.

**Parameters:**

#####`numberOfShot`
Type: Number

Number of shots


####DCDriver.park()

Go back to a fixed default location (leftmost and bottommost position).

**Parameters:**


