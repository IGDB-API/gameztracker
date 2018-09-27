'use strict';
/////news api section/////
const news_api_key = "45829221655b4ae8a3f912d8b16b331a";
let newsResults = {};
let newsSettings = {
    "async": true,
    "crossDomain": true,
    "url": `https://newsapi.org/v2/top-headlines?language=en&sources=ign,polygon,the-verge&apiKey=${news_api_key}`,
    "method": "GET",
}

$(function populateNews() {
    $.ajax(newsSettings).done((res) => {
        console.log(res);
        newsResults = res;
        for (let i in res.articles) {
            /////placeholder for missing img/////
            // let coverUrl = "../src/NoImageAvailable.jpg";
            /////placeholder for missing img/////

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


/////news api section end here/////



/////IGDB api section/////
/////ID IMPORTANT/////

// https://api-endpoint.igdb.com/games/103020?fields=*

let popularResults = {};
var igdbSettings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api-endpoint.igdb.com/games/?order=popularity%3Adesc&fields=summary%2Cstoryline%2Curl%2Cname%2Cthemes.name%2Cgame.name%2Ccover%2Cplatforms&expand=game%2Cgenres%2Cthemes%2Cdevelopers%2Cplatforms",
    "method": "GET",
    "headers": {
        "user-key": "ebb3db734a407207d7297d14332708f5"
        // "access-control-allow-origin": "*",
        // "Accept": "application/json"
    }
}

function populatePopular() {
    $.ajax(igdbSettings).then((res, status) => {
        // console.log(res);
        // console.log(status);
        popularResults = res;
        for (let i in popularResults) {
            let id = popularResults[i].id;
            let name = popularResults[i].name;
            let coverUrl = popularResults[i].cover.cloudinary_id;
            // console.log(coverUrl);
            $('#popular-games').append(
                `
                <li>
                <div class="game-preview">
                    <p>${name}</p>
                    <div><img src="https://images.igdb.com/igdb/image/upload/t_cover_big/${coverUrl}.png" id="${id}"/></div>
                </div>
                </li>
                `

            )
            console.log(popularResults)
        }

    }).fail(e => {
        console.log("error", e);
    });
}
populatePopular();

$('#popular-games').on('click', 'img', function () {
    console.log(this.id);
    $('#popular-games-detail').hide();
    $("#popular-games-detail").empty();
    $('#popular-games-detail').fadeIn(200);


    for (let j in popularResults) {

        if ((this.id) == popularResults[j].id) {
            let name = popularResults[j].name;
            let genres = popularResults[j].genres;
            let platforms = popularResults[j].platforms;
            let coverUrl = popularResults[j].cover.cloudinary_id;
            let summary = popularResults[j].summary;
            let storyline = popularResults[j].storyline;
            let url = popularResults[j].url;
            // let developer = popularResults[j].developers[0].name 
            if (typeof (popularResults[j]["developers"]) == "undefined") {
                var developer = "Unknown";
                // console.log(developer);
            }

            else {
                var developer = popularResults[j].developers[0].name;

            }

            // console.log(developer);
            // <p>${storyline}</p>

            $("#popular-games-detail").append(
                `
                <div>
                <img src="https://images.igdb.com/igdb/image/upload/t_cover_big/${coverUrl}.png"/>
                
                <h2>${name}</h2><span class="fas fa-window-close"></span>
                <div>
                <p id="genres"><strong>Genres: </strong></p><br>
                <p id="platforms"><strong>Platforms: </strong></p><br>
                <p><strong>Developler: </strong>${developer}</p><br>
                <p><strong>Summary: </strong>${summary}</p>
                <br>
                <a href=${url} target="_blank" class="fas fa-external-link-alt"> More Detail</a>
                </div>
                </div>
                `
            )
            for (let k in genres) {
                $('#genres').append(` "${genres[k].name}" `);
            }
            for (let l in platforms) {
                $('#platforms').append(` "${platforms[l].name}" `);
            }

        }
    }

    showPopUp();
})


///// IGDB quick search here/////
// https://api-endpoint.igdb.com/games/?search=halo&fields=summary,storyline,url,name,themes.name,game.name,cover,hypes,popularity,platforms&filter[rating][gt]=50&expand=game,genres,themes,developers,game_modes


let quickSearchResults = {};
$('#quick-search-form').on('submit', function (e) {
    e.preventDefault();
    $('#quick-search-popup li').empty();
    $('#quick-search-popup').show(200);
    $('#quick-search-popup span').show(200);
    let searchTitle = $('#quick-search-input').val();
    let quickSearchSettings = {
        "async": true,
        "crossDomain": true,
        "url": `https://api-endpoint.igdb.com/games/?search=${searchTitle}&fields=summary,storyline,url,name,themes.name,game.name,cover,hypes,popularity,platforms&expand=game,genres,themes,developers,game_modes,platforms`,
        "method": "GET",
        "headers": {
            "user-key": "ebb3db734a407207d7297d14332708f5"
            // "access-control-allow-origin": "*",
            // "Accept": "application/json"
        }
    }

    $(function quickSearch() {
        $.ajax(quickSearchSettings).then((res, status) => {
            quickSearchResults = res;
            console.log(res);
            for (let i in quickSearchResults) {
                let id = quickSearchResults[i].id;
                let name = quickSearchResults[i].name;
                if (typeof (quickSearchResults[i].cover) == "undefined") {
                    var coverUrl = "../src/NoImageAvailable.jpg";

                    // console.log(coverUrl);
                }
                else {
                    var coverUrl = `https://images.igdb.com/igdb/image/upload/t_logo_med/${quickSearchResults[i].cover.cloudinary_id}.png`;
                    console.log(coverUrl);
                }


                $('#quick-search-popup').append(
                    `
                    <li>
                    <img src="${coverUrl}" id="${id}"/>
                    <p>${name}</p>
                    </li>
                    `
                )
            }
        })
    }).fail(e => {
        console.log("error", e);
    })
});

$('#quick-search-popup').on('click', 'img', function () {
    console.log(this.id);
    $('#popular-games-detail').hide();
    $('#popular-games-detail').empty();
    $('#popular-games-detail').fadeIn(200);


    for (let j in quickSearchResults) {

        if ((this.id) == quickSearchResults[j].id) {
            let name = quickSearchResults[j].name;
            let genres = quickSearchResults[j].genres;
            let platforms = quickSearchResults[j].platforms;

            // let coverUrl = quickSearchResults[j].cover.cloudinary_id;
            if (typeof (quickSearchResults[j].cover) == "undefined") {
                var coverUrl = "../src/NoImageAvailable.jpg";

                console.log(coverUrl);
            }
            else {
                var coverUrl = `https://images.igdb.com/igdb/image/upload/t_cover_big/${quickSearchResults[j].cover.cloudinary_id}.png`;
                console.log(coverUrl);
            }
            let summary = quickSearchResults[j].summary;
            let storyline = quickSearchResults[j].storyline;
            let url = quickSearchResults[j].url;
            if (typeof (quickSearchResults[j].developer) == "undefined") {
                var developer = " MissingData ";
            }
            else {

                var developer = quickSearchResults[j].developers[0].name || 'Unknown';
                console.log(developer);
            }
            // <p>${storyline}</p>

            $("#popular-games-detail").append(
                `
                <div>
                <img src="${coverUrl}"/>
                
                <h2>${name}</h2><span class="fas fa-window-close"></span>
                <div>
                <p id="genres"><strong>Genres: </strong></p><br>
                <p id="platforms"><strong>Platforms: </strong></p><br>
                <p><strong>Developler: </strong>${developer}</p><br>
                <p><strong>Summary: </strong>${summary}</p>
                <br>
                <a href=${url} target="_blank" class="fas fa-external-link-alt"> More Detail</a>
                </div>
                </div>
                `
            )
            for (let k in genres) {
                $('#genres').append(` "${genres[k].name}" `);
            }
            for (let l in platforms) {
                $('#platforms').append(` "${platforms[l].name}" `);
            }

        }
    }

    showPopUp();
})


/////IGDB api section end here/////


/////CheapShark api section/////
// https://www.cheapshark.com/api/1.0/deals?storeID=1,4,5,11&lowerPrice=0&pageSize=50

let dealsResults = {};
let storeInfo = {};

// https://www.cheapshark.com/api/1.0/stores
/////retrive StoreNames matching ID/////
$(function storeNames() {
    $.ajax("https://www.cheapshark.com/api/1.0/stores").done((res) => {
        console.log(res);
        storeInfo = res;

    });
});

let dealsSetting = { "url": "https://www.cheapshark.com/api/1.0/deals?storeID=1,4,5,11&lowerPrice=0&pageSize=50" };

let justDoIt = function popluateDeals() {
    $.ajax(dealsSetting).done((res) => {
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
                <td class="deals-saving">${savings} % </td>
                <td class="deals-title"><img class="deals-thumb" src="${thumb}"/><a href=${dealUrl} target="_blank">${title}</a></td>
                <td class="deals-rating">${dealRating}</td>
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
    $('.error-message').empty();
    justDoIt();
    $('.search-input').val('');

})

$('#deals-search-filter').on('submit', (function (e) {
    e.preventDefault();
    $('.error-message').empty();
    $('#table-here').empty();

    /////title/////
    let title = $('#detail-search-input').val();
    /////checkbox value/////
    let val = [];
    $('input:checkbox:checked').each(function (i) {
        val[i] = $(this).val();
    });
    var filterId = val.toString();
    console.log(filterId);
    /////price range/////
    var upperPrice = $('#price_range_disp').text();
    /////metacritc score/////
    var metacritic = $('#score_range_disp').text();

    // console.log(val);
    let detailDealsSetting = { "url": `https://www.cheapshark.com/api/1.0/deals?storeID=${filterId}&upperPrice=${upperPrice}&metacritic=${metacritic}&title=${title}&pageSize=50` };
    console.log(detailDealsSetting);

    $(function popluateDetailDeals() {
        $.ajax(detailDealsSetting).done((res) => {
            console.log(res);
            detailDealsResults = res;
            if (detailDealsResults.length == 0) {
                $('.error-message').append(
                    '<h1>Ops,no results</h1>'
                )

            }
            else {
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
                    <td class="deals-saving">${savings} % </td>
                    <td class="deals-title"><img class="deals-thumb" src="${thumb}"/><a href=${dealUrl} target="_blank">${title}</a></td>
                    <td class="deals-rating">${dealRating}</td>
                    <td>${metacriticScore}</td>
                    </tr>
                    `
                    )
                }
                /////apply tablesorter after table generated/////
                doIt();
                $('.search-input').val('');
                /////apply tablesorter after table generated/////

            }
        }).fail(e => {
            console.log("error", e);
        });

    });
}));


$(document).ready(justDoIt);

/////CheapShark api section end here/////