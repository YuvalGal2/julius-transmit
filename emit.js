const { SerialPort } = require('serialport')

const port = "COM5";
const staringDegree = 25;
const endingDegree = 255;
// every 1.2777 is one degree

const serialPort = connectToChip();
linarMoveToEnd();

function connectToChip() {
  // create connection to serial port
  const serialPort = new SerialPort({
    path:port,
    baudRate:9600,
  });
  return serialPort;
}

function sendMessage(dg) {
  const buffer = new Buffer([ dg]);
  serialPort.write(buffer, (err) => {
    if (err) {
      return console.log("Error on write: ", err.dg);
    }
    console.log(dg);
  });
}

function linarMoveToEnd() {
let linarCurrentDegree = staringDegree;
  const linarInterval = setInterval(() => { 
    if (linarCurrentDegree <= endingDegree) {
      sendMessage(linarCurrentDegree);
      linarCurrentDegree++;
    }
    else {
      clearInterval(linarInterval);
    }
  }, 4);
}

