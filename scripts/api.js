'use strict';
///news api section/////
const news_api_key = "45829221655b4ae8a3f912d8b16b331a";
let newsResults = {};
let settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://newsapi.org/v2/top-headlines?sources=polygon&apiKey=${news_api_key}`,
    "method": "GET",
    // "headers": {
    // "cache-control": "no-cache",
    // "postman-token": "f72e2062-8ef6-70d1-4cb7-cb27ad5e11bb"
    // }
}

function populateNews() {
    $.ajax(settings).done(function (res) {
        console.log(res);
        console.log(res.articles[0].title)

        newsResults = res;
    });

}
// populateNews();
