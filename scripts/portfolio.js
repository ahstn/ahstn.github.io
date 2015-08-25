
$(window).scroll( function(){
    // Change Navbar styling after scrolling
    if ($(".navbar-custom").offset().top > 150) {
        $(".navbar-custom").addClass("navbar-fixed-collapse");
    }
    else {
        $(".navbar-custom").removeClass("navbar-fixed-collapse");
    }

    // Reveal Screen Images after scrolling
    $('.section img').each( function(i) {
        // Locate the image position (Y coord) and offset it by 300
        var imgY = ($(this).offset().top + $(this).outerHeight()) - 300;
        // Window position (Y coord) relative to the page scroll
        var windowY = $(window).scrollTop() + $(window).height();
        // If the window has passed the imgY position, reveal the image
        if (windowY > imgY) {
            $(this).removeClass("screens-collapse");
        }
    });

});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});
