//SLIDER WITH JQUERY

$(document).ready(function () {
    x = 0;

    //for next slide 
    $('.btn-next').click(function () {
        if (x < 400) {
            x += 100;
        } else {
            x = 0;
        }
        $('figure').css('left', -x + "%")
    });
    $('.btn-prev').click(function () {
        if (x >= 100) {
            x -= 100;
        } else {
            x = 0;
        }
        $('figure').css('left', -x + "%")
    });
})