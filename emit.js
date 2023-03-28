const { SerialPort } = require("serialport");

const port = "COM3";
const staringDegree = 25;
const endingDegree = 255;
// every 1.2777 is one degree
function connectToChip() {
  // create connection to serial port
  const serialPort = new SerialPort({
    path: port,
    baudRate: 9600,
  });
  return serialPort;
}

function sendMessage(payload) {
  let serialPort = connectToChip();
  if (!serialPort) return;
  serialPort.on("open", () => {
    const data = Buffer.from(payload);
    serialPort.write(data, undefined, () => {
      serialPort.close();
    });
  });
}

module.exports = {
  sendMessage,
  connectToChip,
};
