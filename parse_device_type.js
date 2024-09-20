import { DeviceType } from './models.js';
import { getDomElementFromURL } from './utils.js';

const parsePageUrl = "https://www.chipdip.by/catalog/electronic-components";
const basePageUrl = "https://www.chipdip.by";

const pageDomEl = await getDomElementFromURL(parsePageUrl);
const deviceTypeHederEl = pageDomEl.querySelectorAll('.catalog__header');

console.log(`get ${deviceTypeHederEl.length} header elements`)

let id = 1;
let deviceTypeArray = [];
for (const deviceTypeEl of deviceTypeHederEl) {
    let newDeviceType = new DeviceType();

    newDeviceType.id = id
    newDeviceType.title = deviceTypeEl.querySelector("a.like-header").textContent;
    newDeviceType.url = basePageUrl + deviceTypeEl.querySelector("a.like-header").href;
    newDeviceType.image = deviceTypeEl.querySelector("a > img").src;

    console.log("get new element");
    console.log(newDeviceType);

    deviceTypeArray.push(newDeviceType);

    id++;
}

var fs = require('fs');
fs.writeFile("data/device_types.json", JSON.stringify(deviceTypeArray), function(err) {
    if (err) {
        console.log(err);
    }
});