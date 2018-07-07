'use strict';
/////news api section/////
const news_api_key = "45829221655b4ae8a3f912d8b16b331a";
let newsResults = {};

const newsSettings = {
    "async": true,
    "crossDomain": true,
    "url": `https://newsapi.org/v2/everything?sources=polygon&apiKey=${news_api_key}`,
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


            // console.log(author);
            // console.log(title);
            // console.log(description);
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
                <a href="${url}" target="_blank">Click for more detail</a>
                </div>
                <img src="${urlToImage}"/>
                </div>`
            )
        }
    });

}
populateNews();
// author, description, publishedAt, url, urlToImage,title
/////news api section end here/////



/////IGDB api section/////

/////ID IMPORTANT/////

// https://api-endpoint.igdb.com/games/103020?fields=*

let popularResults = {};
const igdbSettings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api-endpoint.igdb.com/games/?fields=name%2Cpopularity&order=popularity%3Adesc",
    "method": "GET",
    "headers": {
        "user-key": "61a389d905c858b1876e64145ecdaa50",
        "cache-control": "no-cache",
        "postman-token": "c27e088d-464d-8b66-a7e6-4ef8a3a8f329"
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