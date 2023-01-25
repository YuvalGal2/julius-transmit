const usb = require('usb');
const { SerialPort } = require('serialport');
const path = require('path');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function findeDeviceBySerialNumber(serialNumber){
    const res = await usb.findBySerialNumber(String(serialNumber));
    console.log(res);
}

async function readFromUsb() {
    let objArr = [];
    const ports = await SerialPort.list()
    objArr = ports.map((port) => port);
    objArr.forEach((obj, index) => {

        console.log(`name: ${obj.friendlyName}`);
    });
    return objArr;
}
async function main() {
    const usbList = await readFromUsb();
    return new Promise((resolve, reject) => {
        resolve(usbList);
    });
}
main().then((devices) => {
    devices.forEach((device) => {
        const usb = new SerialPort({path: device.path, baudRate: 9600});
        usb.on('open', () => {
            console.log("connected!");
            usb.on('data', (data) => {
                const buffer = data;
                const t = buffer.toString();
                console.log(t);
            })
        })
    });

})