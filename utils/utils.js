const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

export async function getDomElementFromURL(urlArg) {
    const waitTime = 1000 * (Math.random() * (2 - 1) + 1);
    console.log("\n=== GET ==========================================================\n");
    console.log("Wait befor request : " + waitTime + "ms");
    
    await sleep(waitTime);
    console.log(" >> Request");
    
    
    const response = await axios.get(urlArg).catch((error) => {
        console.log("................................................");
        console.log("\t\tERROR\n");
        console.log(error.status);
        console.log("................................................");
    });
    
    if (response == undefined) {
        return null;
    }
    
    console.log(" >> Status : " + response.status);

    const html = response.data;
    const dom = new JSDOM(html);
    
    if (dom.window.document.querySelector(".captcha-w") != null) {
        console.log("................................................");
        console.log("\t\tCAPTCHA");
        console.log("................................................");
        
        throw Error
    }
    
    console.log("\n==================================================================\n");
    return dom.window.document;
}

export function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}