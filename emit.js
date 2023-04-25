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
    const payloadMod = [];

    if (payload[0] > 0) {
      payloadMod[0] = "+";
    } else {
      payloadMod[0] = "-";
      payload[0] = payload[0] * -1;
    }
    payloadMod[1] = payload[0];

    if (payload[1] > 0) {
      payloadMod[2] = "+";
    } else {
      payloadMod[2] = "-";
      payload[1] = payload[1] * -1;
    }
    payloadMod[3] = payload[1];
    console.log(payloadMod);
    const data = Buffer.from(["-",59,"-",30]);
    serialPort.write(data, undefined, () => {
      serialPort.close();
    });
  });
}

module.exports = {
  sendMessage,
  connectToChip,
};
