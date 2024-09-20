import { getDomElementFromURL } from './utils.js';
let deviceSubTypeArray = require('./data/device_sub_types_test.json');

async function parseSubTypePage() {
    
}

async function parseSubTypeSection(deviceSubTypeArg) {
    console.log(" >> Start parse device section id: " + deviceSubTypeArg.id);
    
    const pageBaseUrl = deviceSubTypeArg.url + "?ps=x3&page=";
    console.log(" >> Section url: " + pageBaseUrl);
    
    let curPageCount = 1;
    let curPage = getDomElementFromURL(pageBaseUrl+ curPageCount);
    while (curPage) {
        console.log(" >> >> Start parse device page count: " + curPageCount);
        console.log(" >> >> Start parse device page count: " + curPageCount);
        
        curPageCount++;
        curPage = getDomElementFromURL(pageBaseUrl+ curPageCount);
        console.log(" >> >> Start parse device page count: " + curPageCount);
    }

    console.log(" >> Finish parse device section id: " + deviceSubTypeArg.id + "\n");
}

async function parseDevices() {
    console.log("Start parse all device");
    
    for (const deviceSubType of deviceSubTypeArray) {
        parseSubTypeSection(deviceSubType)
    }

    console.log("Finish parse all device");
}

await parseDevices();