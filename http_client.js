const http = require('http');
const https = require('https');

module.exports = async function sendRequest(url, method = 'GET', data) {
    const customHeaders = {
        "Content-Type": "application/json",
    }
    try {
        const response = await fetch(url, {
            method: method,
            headers: customHeaders,
            body: JSON.stringify(data),
        });
        // console.log(response)
        return response;
    }
    catch (e) {
        // console.log('Error fetching data')
        return {status:500}
    }
}