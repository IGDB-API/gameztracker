'use strict';
/////news api section/////
const news_api_key = "45829221655b4ae8a3f912d8b16b331a";
let newsResults = {};
let newsSettings = {
    "async": true,
    "crossDomain": true,
    "url": `https://newsapi.org/v2/top-headlines?language=en&sources=ign,polygon,the-verge&apiKey=${news_api_key}`,
    "method": "GET",
    // "headers": {
    // "cache-control": "no-cache",
    // "postman-token": "f72e2062-8ef6-70d1-4cb7-cb27ad5e11bb"
    // }
}

function populateNews() {
    $.ajax(newsSettings).done(function (res) {
        console.log(res);
        // console.log(res.articles[0].title)

        newsResults = res;
        for (let i in res.articles) {
            let title = newsResults.articles[i].title;
            let author = newsResults.articles[i].author;
            let description = newsResults.articles[i].description;
            let url = newsResults.articles[i].url;
            let urlToImage = newsResults.articles[i].urlToImage;
            let publishedAt = newsResults.articles[i].publishedAt;
            let source = newsResults.articles[i].source.name;

            $('.news').append(
                `<div class="news-template">
                <div class="news-left">
                <h3>${title}</h3>
                <p>By ${author}</p>
                <small>${publishedAt}</small>
                <br>
                <br>
                <p>Description: ${description}</p>
                <br>
                <br>
                <p>Source: ${source}</p>
                <a href="${url}" target="_blank">Click for more detail</a>
                </div>
                <img src="${urlToImage}"/>
                </div>`
            )
        }
    }).fail(e => {
        console.log("error", e);

    });

}
populateNews();
// author, description, publishedAt, url, urlToImage,title
/////news api section end here/////



/////IGDB api section/////
/////ID IMPORTANT/////

// https://api-endpoint.igdb.com/games/103020?fields=*

let popularResults = {};
let igdbSettings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api-endpoint.igdb.com/games/?fields=name%2Cpopularity&order=popularity%3Adesc",
    "method": "GET",
    // "dataType":"jsonp",
    "headers": {
        "access-control-allow-origin": "*",
        "user-key": "61a389d905c858b1876e64145ecdaa50",
        "cache-control": "no-cache",
        // "postman-token": "c27e088d-464d-8b66-a7e6-4ef8a3a8f329"
    }
}
function populatePopular() {
    $.ajax(igdbSettings).done(function (res) {
        console.log(res);
        // console.log('fk');
        popularResults = res;
    }).fail(e => {
        console.log("error", e);

    });
}
// populatePopular();
/////IGDB api section end here/////


/////CheapShark api section/////
// http://www.cheapshark.com/api/1.0/deals?storeID=1,4,5,11&lowerPrice=0&pageSize=50

let dealsResults = {};
// let dealID={};

// http://www.cheapshark.com/api/1.0/stores
/////retrive StoreNames matching ID/////
let storeInfo = {};
$(function storeNames() {
    $.ajax("http://www.cheapshark.com/api/1.0/stores").done(function (res) {
        console.log(res);
        storeInfo = res;

    });
});

let dealsSetting = { "url": "http://www.cheapshark.com/api/1.0/deals?storeID=1,4,5,11&lowerPrice=0&pageSize=50" };

$(function popluateDeals() {
    $.ajax(dealsSetting).done(function (res) {
        console.log(res);
        dealsResults = res;
        for (let i in dealsResults) {
            let storeID = dealsResults[i].storeID
            let storeNames = storeInfo[storeID - 1].storeName;
            let dealUrl = `"http://www.cheapshark.com/redirect?dealID=${dealsResults[i].dealID}"`;
            let title = dealsResults[i].title;
            let dealRating = dealsResults[i].dealRating;
            let salePrice = dealsResults[i].salePrice;
            let normalPrice = dealsResults[i].normalPrice;
            let savings = Math.round(dealsResults[i].savings);
            let thumb = dealsResults[i].thumb;
            let metacriticScore = dealsResults[i].metacriticScore;
            $('.deals-table').append(
                `
                <tr>
                <td>${storeNames}</td>
                <td>$ ${salePrice} / <del>$ ${normalPrice}</del></td>
                <td>${savings} % </td>
                <td class="deals-title"><img class="deals-thumb" src="${thumb}"/><a href=${dealUrl} target="_blank">${title}</a></td>
                <td>${dealRating}</td>
                <td>${metacriticScore}</td>
                </tr>
                `
            )
        }

    }).fail(e => {
        console.log("error", e);
    });
});



/////CheapShark api section end here/////