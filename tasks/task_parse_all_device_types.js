const { deviceTypeDataFileName, baseCatalogPageUrl, baseRootPageUrl } = require('../config.js')
import { DeviceType } from '../models/models.js';
import { getDomElementFromURL } from '../utils/utils.js';

async function parseDeviceTypeFromEl(elArg, idArg) {
    let newDeviceType = new DeviceType();

    newDeviceType.id = idArg
    newDeviceType.title = elArg.querySelector("a.like-header").textContent;
    newDeviceType.url = baseRootPageUrl + elArg.querySelector("a.like-header").href;
    newDeviceType.image = elArg.querySelector("a > img").src;

    return newDeviceType;
}

async function parseAllDeviceTypes() {
    let deviceTypeArray = [];
    let deviceTypeArrayIdCounter = 1;


    let domEl = await getDomElementFromURL(baseCatalogPageUrl);
    let deviceTypeHederElArray = domEl?.querySelectorAll('.catalog__header');
    for (const element of deviceTypeHederElArray) {
        deviceTypeArray.push(await parseDeviceTypeFromEl(element, deviceTypeArrayIdCounter));
        deviceTypeArrayIdCounter++;
    }

    console.log(` >> Finish parse, parsed ${deviceTypeArray.length} device types\n`);

    return deviceTypeArray;
}

function cheakIfDeviceTypesExist() {
    const fs = require('fs');
    if (fs.existsSync('./data/' + deviceTypeDataFileName)) {
        return true;
    } else {
        return false;
    }
}

export async function taskParseAllDeviceTypes() {
    console.log(" START TASK ---> Parse all DeviceTypes\n");

    if (cheakIfDeviceTypesExist()) {
        console.log(" >> DeviceTypes exist\n");

    } else {
        console.log(" >> DeviceTypes don'n exist, run parse");

        var fs = require('fs');
        fs.writeFile('./data/' + deviceTypeDataFileName, JSON.stringify(await parseAllDeviceTypes()),
            function (err) {
                if (err) {
                    console.log(err);
                }
            }
        );
    }

    console.log(" FINISH TASK ---> Parse all DeviceTypes\n");
}