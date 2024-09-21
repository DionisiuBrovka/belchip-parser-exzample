import { DeviceSubType } from '../models/models.js';
import { getDomElementFromURL, sleep } from '../utils/utils.js';
let deviceTypeArray = require('../data/device_types.json');

const basePageUrl = "https://www.chipdip.by";

let deviceSubTypeArray = [];
let subtupe_id_counter = 1;

async function getSubTypeFromTypePage(typePageUrlArg, idArg) {
    const pageDomEl = await getDomElementFromURL(typePageUrlArg);
    const deviceSubTypeHederEl = pageDomEl.querySelectorAll('.catalog__g2_row');


    for (const deviceSubTypeEl of deviceSubTypeHederEl) {
        let newDeviceSubType = new DeviceSubType();

        newDeviceSubType.id = subtupe_id_counter;
        newDeviceSubType.typeId = idArg;
        newDeviceSubType.title = deviceSubTypeEl.querySelector('a.link').textContent;
        newDeviceSubType.url = basePageUrl + deviceSubTypeEl.querySelector('a.link').href;
        if (deviceSubTypeEl.querySelector('img') != undefined) {
            newDeviceSubType.image = deviceSubTypeEl.querySelector('img').src;
        }


        console.log("get new element");
        console.log(newDeviceSubType);

        deviceSubTypeArray.push(newDeviceSubType);

        subtupe_id_counter++;
    }
}

for (const  deviceType of deviceTypeArray ) {
    await sleep(1000);
    await getSubTypeFromTypePage( deviceType.url, deviceType.id)
    
}

var fs = require('fs');
fs.writeFile("data/device_sub_types.json", JSON.stringify(deviceSubTypeArray), function(err) {
    if (err) {
        console.log(err);
    }
});

