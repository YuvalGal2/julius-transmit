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
  console.log(payload);
  let serialPort = connectToChip();
  if (!serialPort) return;
  serialPort.on("open", () => {
    console.log("yuval");
    const payloadMod = [];

    if (payload[0] > 0) {
      payloadMod[0] = 1; // 1 = +
    } else {
      payloadMod[0] = 2; // 2 = -
      payload[0] = payload[0] * -1;
    }
    payloadMod[1] = payload[0];

    if (payload[1] > 0) {
      payloadMod[2] = 1; // 1 = +
    } else {
      payloadMod[2] = 2; // 2 = -
      payload[1] = payload[1] * -1;
    }
    payloadMod[3] = payload[1];
    console.log(payloadMod);

    // i had this pat for test the servo movment.
    const data = Buffer.from(payloadMod);
    console.log(payloadMod);
    serialPort.write(data, undefined, () => {
      serialPort.close();
    });
  });
}

module.exports = {
  sendMessage,
  connectToChip,
};
