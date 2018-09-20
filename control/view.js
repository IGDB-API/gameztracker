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
}
/////table sorter end here /////

/////views for all pages/////

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

/////hide detail popup/////
$(function () {
    $('#popular-games-detail').hide();
    $('#quick-search-popup').hide();

})

$('#popular-games-detail').on('click', 'span', function () {
    $('#popular-games-detail').fadeOut(500);
})

function showPopUp() {
    $('#popular-games-detail img').hide();
    $('#popular-games-detail h2').hide();
    $('#popular-games-detail div').hide();
    $('#popular-games-detail h2').show(600);
    $('#popular-games-detail img').fadeIn(800);
    $('#popular-games-detail div').slideDown(600);
}
/////hide detail popup end here/////

/////hide quick search popup/////

$('#quick-search-popup').on('click', 'span', function () {
    $('#quick-search-popup').fadeOut(500);
})


/////hide quick search popup end here/////

/////show mobile navbar/////
$('.fa-bars').on('click',function(){
    $('nav ul').toggle(300);
    
})

