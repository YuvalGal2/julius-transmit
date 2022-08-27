const { SerialPort } = require('serialport')

// const port = "COM5";
// const staringNum = 0;
// const endingNum = 9;

// // create connection to serial port
// const serialPort = new SerialPort({
//   path:port,
//   baudRate:9600,
//   // encoding:'hex'
// });


let dg = [0,0,0];
const incInterval = setInterval(() => { 
  if (dg[0] == 9 && dg[1] === 9  && dg[2] === 9) {
    clearInterval(incInterval);
    return;
  }

  if (dg[2] < 9) {
    dg[2]++;
  }
  else if(dg[1] < 9) {
    dg[2] = 0;
    dg[1]++;
  }
  else if(dg[0] < 9) {
    dg[2] = 0;
    dg[1] = 0;
    dg[0]++;
  }
  // sendMessage(dg);
  console.log(dg);
}, 2);


// sendMessage(0)
// @param dg -  [0,0,1]  Hundreds, Tens, 0-9
function sendMessage(dg) {
  const buffer = new Buffer( [dg]);
  serialPort.write(buffer, (err) => {
    if (err) {
      return console.log("Error on write: ", err.dg);
    }
    console.log(dg);
  });
}