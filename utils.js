const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

export async function getDomElementFromURL(urlArg) {
    const response = await axios.get(urlArg).catch((error) => {
        console.log(" ERROR --------------------------------- "); 
        console.log(error); 
        return null;
    });;
    const html = response.data;
    const dom = new JSDOM(html);

    return dom.window.document;
}

export function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }