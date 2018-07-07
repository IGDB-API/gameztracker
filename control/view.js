'use strict';



$(function hideScroll() {
    $('.scroll-top').hide();
});
//scroll up button//
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
//scroll up button end here//

$(function hightLight() {
    $('#navbar').on('click', 'li', function () {
        $('#navbar ul li').removeClass("active");
        $(this).addClass("active");

    })

})