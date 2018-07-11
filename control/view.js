'use strict';


/////scroll up button/////
$(function hideScroll() {
    $('.scroll-top').hide();
});
$(window).scroll(function () {
    if ($(this).scrollTop() > 500) {
        $('.scroll-top').fadeIn();
    }
    else {
        $('.scroll-top').fadeOut();
    }
});


$('.scroll-top').on('click', function (e) {
    e.preventDefault();
    $('body,html').animate({
        scrollTop: 0
    }, 800);
})
/////scroll up button end here/////

/////highlight active menu/////
$(function hightLight() {
    $('#navbar').on('click', 'li', function () {
        $('#navbar ul li').removeClass("active");
        $(this).addClass("active");

    });

});
/////highlight active menu end here/////


/////table sorter/////
function doIt() {
    $('#deals-table').tablesorter().trigger("update");
    // $('#deals-table').trigger("update");
}
/////table sorter end here /////

/////views for all pages/////
$(function () {
    $('.container').hide();
    $('.news').show(100);
})
$("#section-news").on('click', function (e) {
    e.preventDefault();
    $('.container').hide(300);
    $('.news').fadeIn(300);
})
$("#section-daily-deal").on('click', function (e) {
    e.preventDefault();
    $('.container').hide(300);
    $('.daily-deal').fadeIn(300);
})
$("#section-data-base").on('click', function (e) {
    e.preventDefault();
    $('.container').hide(300);
    $('.data-base').fadeIn(300);
})

/////views for all pages end here/////



let detailDealsResults = {};
$('#deals-search-filter').on('submit', (function (e) {
    e.preventDefault();
    console.log(this);
    $('#table-here').empty();
    let title = $('#detail-search-input').val();

    var val = [];
    $('input:checkbox:checked').each(function (i) {
        val[i] = $(this).val();
    });
    console.log(val);

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