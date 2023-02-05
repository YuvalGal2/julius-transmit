const usb = require('usb');
const { SerialPort } = require('serialport');
const path = require('path');
const sendRequest = require('./http_client');
const apiUrl = `http://127.0.0.1:3000`
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

async function sendAllData(payload) {
    const url = `${apiUrl}/station/payload`;
    sendRequest(url, 'POST', {data:payload})
        .then((res) => {
            if (res.status !== 500) {
                console.log(res.status);
                console.log(res.data);
            }
        })
        .catch((err) => {
            console.error(err);
        });
}

main().then((devices) => {
    devices.forEach((device) => {
        const usb = new SerialPort({path: device.path, baudRate: 9600});
        usb.on('open', async () => {
            console.log("connected!");
            usb.on('data', async (data) => {
                const buffer = data;
                const t = buffer.toString();
                await sendAllData(t);
            })
        })
    });

})