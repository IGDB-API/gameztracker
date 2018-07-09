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
// $(function() {
//     $("#deals-table").tablesorter();
//   });
function doIt() {
    $("#deals-table").tablesorter();
}
/////table sorter end here /////

/////views for all pages/////
$(function () {
    $('.container').hide();
    $('.news').show(100);
})


$("#section-news").on('click', function () {
    $('.container').hide(300);
    $('.news').fadeIn(300);
})
$("#section-daily-deal").on('click', function () {
    $('.container').hide(300);
    $('.daily-deal').fadeIn(300);
})
$("#section-data-base").on('click', function () {
    $('.container').hide(300);
    $('.data-base').fadeIn(300);
})

/////views for all pages end here/////