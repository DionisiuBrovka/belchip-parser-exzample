const { deviceSubTypeDataFileName, deviceTypeDataFileName, baseCatalogPageUrl, baseRootPageUrl } = require('../config.js')
import { DeviceSubType } from '../models/models.js';
import { getDomElementFromURL } from '../utils/utils.js';

async function parseDeviceSubTypeFromEl(elArg, idArg, typeIdArg) {
    let newDeviceSubType = new DeviceSubType();

    newDeviceSubType.id = idArg
    newDeviceSubType.typeId = typeIdArg
    // newDeviceSubType.title = elArg.querySelector("a.like-header").textContent;
    // newDeviceSubType.url = baseRootPageUrl + elArg.querySelector("a.like-header").href;
    // newDeviceSubType.image = elArg.querySelector("a > img").src;

    return newDeviceSubType;
}

async function parseDeviceSubTypes(deviceTypeArg) {
    let dom = await getDomElementFromURL(deviceTypeArg.url);
}

async function parseAllDeviceSubTypes() {
    let DeviceSubTypeArray = [];
    let DeviceSubTypeArrayIdCounter = 1;

    let DeviceTypeArray = require('../data/' + deviceTypeDataFileName)

    console.log(` >> >> Start parse subtypes`);

    for (const deviceType of DeviceTypeArray) {
        DeviceSubTypeArray.push(await parseDeviceSubTypes(deviceType))
    }

    console.log(` >> >> Finish parse, parsed ${DeviceSubTypeArray.length} device types`);

    return DeviceSubTypeArray;
}

function cheakIfDeviceSubTypesExist() {
    const fs = require('fs');
    if (fs.existsSync('./data/' + deviceSubTypeDataFileName)) {
        return true;
    } else {
        return false;
    }
}

export async function taskParseAllDeviceSubTypes() {
    console.log(" START TASK ---> Parse all DeviceSubTypes\n");

    if (cheakIfDeviceSubTypesExist()) {
        console.log(" >> DeviceSubTypes exist\n");

    } else {
        console.log(" >> DeviceSubTypes don'n exist, run parse");

        var fs = require('fs');
        await fs.writeFile('./data/' + deviceSubTypeDataFileName, JSON.stringify(await parseAllDeviceSubTypes()),
            function (err) {
                if (err) {
                    console.log(err);
                }
            }
        );
        console.log(" >> DeviceSubTypes save to file");
    }

    console.log(" FINISH TASK ---> Parse all DeviceSubTypes\n");
}