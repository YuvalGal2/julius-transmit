const { SerialPort } = require('serialport')

SerialPort.list().then(ports => {
    console.log(ports);
    ports.forEach(function(port) {
        console.log(port.path)
    })
},(e) => {
    console.log(e);
})

// path: 'COM5',
// manufacturer: 'FTDI',
// serialNumber: 'A50285BI',
// pnpId: 'FTDIBUS\\VID_0403+PID_6001+A50285BIA\\0000',
// locationId: undefined,
// friendlyName: 'USB Serial Port (COM5)',
// vendorId: '0403',
// productId: '6001'