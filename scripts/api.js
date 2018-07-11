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

$(function populateNews() {
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

});
// populateNews();

/////news api section end here/////



/////IGDB api section/////
/////ID IMPORTANT/////

// https://api-endpoint.igdb.com/games/103020?fields=*

let popularResults = {};
var igdbSettings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api-endpoint.igdb.com/games/?order=popularity%3Adesc&fields=summary%2Cstoryline%2Curl%2Cname%2Cthemes.name%2Cgame.name%2Ccover&expand=game%2Cgenres%2Cthemes%2Cdevelopers",
    "method": "GET",
    "headers": {
        // "Access-Control-Allow-Origin": "https://www.gameztracker.com",
        "Access-Control-Allow-Origin": "*",
        "user-key": "ebb3db734a407207d7297d14332708f5",
        "cache-control": "no-cache"
        // "postman-token": "4716cfab-088a-e453-5795-cc5f9850cd64"
    }
}
{

}
function populatePopular() {
    $.ajax(igdbSettings).then(function (res, status) {
        console.log(res);
        console.log(status);
        // console.log('fk');
        popularResults = res;
    }).fail(e => {
        console.log("error", e);

    });
}
// populatePopular();
/////IGDB api section end here/////


/////CheapShark api section/////
// https://www.cheapshark.com/api/1.0/deals?storeID=1,4,5,11&lowerPrice=0&pageSize=50

let dealsResults = {};
let storeInfo = {};

// https://www.cheapshark.com/api/1.0/stores
/////retrive StoreNames matching ID/////
$(function storeNames() {
    $.ajax("https://www.cheapshark.com/api/1.0/stores").done(function (res) {
        console.log(res);
        storeInfo = res;

    });
});

let dealsSetting = { "url": "https://www.cheapshark.com/api/1.0/deals?storeID=1,4,5,11&lowerPrice=0&pageSize=50" };

let justDoIt = function popluateDeals() {
    $.ajax(dealsSetting).done(function (res) {
        console.log(res);
        $('#table-here').empty();
        dealsResults = res;
        for (let i in dealsResults) {
            let storeID = dealsResults[i].storeID
            let storeNames = storeInfo[storeID - 1].storeName;
            let dealUrl = `"https://www.cheapshark.com/redirect?dealID=${dealsResults[i].dealID}"`;
            let title = dealsResults[i].title;
            let dealRating = dealsResults[i].dealRating;
            let salePrice = dealsResults[i].salePrice;
            let normalPrice = dealsResults[i].normalPrice;
            let savings = Math.round(dealsResults[i].savings);
            let thumb = dealsResults[i].thumb;
            let metacriticScore = dealsResults[i].metacriticScore;
            $('#table-here').append(
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
        /////apply tablesorter after table generated/////
        doIt();
        /////apply tablesorter after table generated/////

    }).fail(e => {
        console.log("error", e);
    });

};


/////detail daily deails search/////
let detailDealsResults = {};

$('#detail-daily-deals').on('click', function () {
    justDoIt();
})

$('#deals-search-filter').on('submit', (function (e) {
    e.preventDefault();
    $('#table-here').empty();
    console.log(this);
    let title = $('#detail-search-input').val();
    let val = [];

    $('input:checkbox:checked').each(function (i) {
        val[i] = $(this).val();
    });
    // console.log(val);

    var filterId = val.toString();
    console.log(filterId);



    let detailDealsSetting = { "url": `https://www.cheapshark.com/api/1.0/deals?storeID=${filterId}&lowerPrice=0&title=${title}&pageSize=50` };
    console.log(detailDealsSetting);

    $(function popluateDeals() {
        $.ajax(detailDealsSetting).done(function (res) {
            console.log(res);
            detailDealsResults = res;
            for (let i in detailDealsResults) {
                let storeID = detailDealsResults[i].storeID
                let storeNames = storeInfo[storeID - 1].storeName;
                let dealUrl = `"https://www.cheapshark.com/redirect?dealID=${detailDealsResults[i].dealID}"`;
                let title = detailDealsResults[i].title;
                let dealRating = detailDealsResults[i].dealRating;
                let salePrice = detailDealsResults[i].salePrice;
                let normalPrice = detailDealsResults[i].normalPrice;
                let savings = Math.round(detailDealsResults[i].savings);
                let thumb = detailDealsResults[i].thumb;
                let metacriticScore = detailDealsResults[i].metacriticScore;
                $('#table-here').append(
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
            /////apply tablesorter after table generated/////
            doIt();
            /////apply tablesorter after table generated/////

        }).fail(e => {
            console.log("error", e);
        });

    });
}));


$(document).ready(justDoIt);

/////CheapShark api section end here/////