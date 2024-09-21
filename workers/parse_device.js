import { getDomElementFromURL, sleep } from '../utils/utils.js';
let deviceSubTypeArray = require('../data/device_sub_types_test.json');

const basePageUrl = "https://www.chipdip.by";

let devicePagesArray = []
let for_debug_page_count;
let for_debug_subtype_id;

async function parseSubTypeSectionPage(pageDom, subTypeIdArg) {
    console.log("\n >> >> >> Start procces");

    const deviceHeaderEls = pageDom.querySelectorAll(".with-hover a.link") ; 
    for (const item of deviceHeaderEls) {
        devicePagesArray.push({
            "id":1,
            "isParsed":false,
            "subTypeId":subTypeIdArg,
            "link": basePageUrl + item.href,
        })
    }

    console.log(" >> >> >> Finish procces");
}

async function parseSubTypeSection(deviceSubTypeArg) {
    console.log("\n >> Start parse device section id: " + deviceSubTypeArg.id);
    
    const pageBaseUrl = deviceSubTypeArg.url + "?ps=x3&page=";
    console.log(" >> Section url: " + pageBaseUrl);
    
    let curPageCount = 1;
    let flag = true;
    let curPage;
    while (flag) {
        console.log("\n >> >> Start parse device page count: " + curPageCount);
        console.log(" >> >> Start parse device page url: " + pageBaseUrl+ curPageCount);

        for_debug_page_count = curPageCount;
        curPage = await getDomElementFromURL(pageBaseUrl+ curPageCount);
        if (curPage == null) {
            flag = false;
            break
        }        
        
        await parseSubTypeSectionPage(curPage, deviceSubTypeArg.id);
        
        console.log(" >> >> Finish parse device page count: " + curPageCount);
        curPageCount++;

        await sleep(1000 * (Math.random() * (2 - 1) + 1));
    }

    console.log(" >> Finish parse device section id: " + deviceSubTypeArg.id);
}

async function parseDevices() {
    console.log("\nStart parse all device");
    
    for (const deviceSubType of deviceSubTypeArray) {
        for_debug_subtype_id = deviceSubType.id
        await parseSubTypeSection(deviceSubType)
    }

    console.log("Finish parse all device");
}
try {
    await parseDevices();
} catch (error) {
    console.log("cath error");
    
    var fs = require('fs');

    devicePagesArray.push({
        "error":"captcha",
        "error_page":for_debug_page_count,
        "error_subtype_id":for_debug_subtype_id,
        
    })

    fs.writeFile("data/device_pre_parse.json", JSON.stringify(devicePagesArray), function(err) {
        if (err) {
            console.log(err);
        }
    });
}

var fs = require('fs');
fs.writeFile("data/device_pre_parse.json", JSON.stringify(devicePagesArray), function(err) {
    if (err) {
        console.log(err);
    }
});