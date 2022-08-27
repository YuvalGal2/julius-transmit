const { SerialPort } = require('serialport')

const port = "COM5";
const staringDegree = 25;
const endingDegree = 255;
// every 1.2777 is one degree

// create connection to serial port
const serialPort = new SerialPort({
  path:port,
  baudRate:9600,
});


let dg = staringDegree;
setInterval(() => { 
  if (dg < endingDegree) {
    dg++;
    sendMessage(dg);
  }
  else {
    dg = 25;
  }
}, 4);

function sendMessage(dg) {
  const buffer = new Buffer([ dg]);
  serialPort.write(buffer, (err) => {
    if (err) {
      return console.log("Error on write: ", err.dg);
    }
    console.log(dg);
  });
}