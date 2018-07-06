'use strict';
/////news api section/////
const news_api_key = "45829221655b4ae8a3f912d8b16b331a";
let newsResults = {};
// let author = {};
let newsSettings = {
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
            let publisheAt = newsResults.articles[i].publisheAt;


            // console.log(author);
            // console.log(title);
            // console.log(description);
            $('.news').append(
                `<div>
                <h3>${title}</h3>
                <p>By ${author}</p>
                <a href="${url}">link</a>
                <p>Description: ${description}</p>

                
                </div>`
            )
        }
    });

}
// populateNews();
// author, description, publisheAt, url, urlToImage,title


/////news api section end here/////

/////IGDB api section/////