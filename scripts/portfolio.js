$(document).ready(function(){
    // overflow-x breaks $(window).scroll
    $('body').scroll(function(event){
        $('section').each( function() {
            // Locate the section position and
            // add an offset based on the window height
            var sectionY = $(this).offset().top + ($(window).height() / 5);
            // Window position (Y coord) relative to the page scroll
            var windowY = $(window).scrollTop() + $(window).height();
            // If the window has passed the sectionY position, reveal the image
            if (windowY > sectionY) {
                $(this).addClass("animate-in");
            }
        });

        // Change Navbar styling after scrolling
        if ($('.navbar-custom').offset().top > 150) {
            $('.navbar-custom').addClass('navbar-fixed-collapse');
        }
        else {
            $('.navbar-custom').removeClass('navbar-fixed-collapse');
        }
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Modal click event for Education items
    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').focus()
    })

    // Tabs click event
    $('#myTabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    })

    // Tab filtering
    $('#page-header-tabbed li a').click(function() {
        var clickedClass = $(this).attr('data-filter');
        console.log('clicked ' + clickedClass);

        // Remove the active class from all tabs, and add it to the clicked tab
        $('#page-header-tabbed li').removeClass('active');
        $(this).parent().addClass('active');

        $('.item-grid').children('div').hide();

        if (clickedClass == 'all') {
            $('.item-grid').children('div').hide();
            $('.item-grid').children('div').show();
        }
        else {
            $('.item-grid').children('div[data-filter!=' + clickedClass + ']').hide();
            $('.item-grid').children('div[data-filter=' + clickedClass +']').show();
        }
    });
});
