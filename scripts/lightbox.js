$(document).ready(function() {
    var item, img, title, large_img;
    var CW, CH, CL, CT, hpadding, vpadding, padding, imgtag;
    var lb_loading = false;
    var doc = $(document);

    $('#screenshots .img').click(function() {
        if(lb_loading) return false;
        lb_loading = true;

        item = $(this);
        img = $(this).children('img');
        title = $(this).attr('data-tooltip');

        $('#screenshots .img').removeClass('active');
        item.addClass('active');

        large_img = new Image();
        large_img.src = img.attr('data-large') ? img.attr('data-large') : img.attr('src');

        // Add the Lightbox Markdown if it's not already there
        if ($('.lb_backdrop').length < 1) {
            var lb_backdrop = '<div class="lb_backdrop"></div>';
            var lb_canvas = '<div class="lb_canvas"></div>';
			var lb_title = '<span class="lb_title"></span>';
			var lb_controls = '<div class="lb_controls">' + lb_title + '</div>';
			var total_html = lb_backdrop + lb_canvas + lb_controls;

            $(total_html).appendTo('body');
        }

        if ($('.lb_backdrop:visible').length === 0) {
            $('.lb_backdrop, .lb_canvas, .lb_controls').fadeIn('slow');
        }

        if (!large_img.complete) {
            $('.lb_canvas').addClass('.lb_loading');
        }

        // Calcuate the canvas size and position before the image loads
        // to display a preloader
        CW = $('.lb_canvas').outerWidth() / 2;
        CH = $('.lb_canvas').outerHeight() / 2;
        CL = ($(window).width() - CW) / 2;
        CT = ($(window).height() - CH) / 2;
        $('.lb_canvas').css( { top: CT, left: CL });

        $(large_img).load(function() {
            // Resize the canvas if the image is wider than 800px
            if (large_img.width >= $(window).width()) {
                console.log($(window).width);
                CW = $(window).width() * 0.75;
                CH = $(window).height() * 0.75;
            }
            else {
                CW = large_img.width;
                CH = large_img.height;
            }

            // Get canvas padding
            padding = parseInt($('.lb_canvas').css('padding')) * 2;
            console.log(title);

            // Canvas Top and Left positioning based on canvas size and padding
            CL = ($(window).width() - CW - padding * 2) / 2;
            CT = ($(window).height() - CH - padding) / 2;

            // insert the image and fade it in
			$(".lb_canvas").html("").animate({width: CW, height: CH,
                top: CT, left: CL}, 500, function(){

				imgtag = '<img src="'+large_img.src +
                    '" style="opacity: 0;" width="' + CW + '" />';
				$(".lb_canvas").html(imgtag);

                // adjusting the canvas size after the image height is calcuated
                // based on the image ratio
                $('.lb_canvas').css('height', $('.lb_canvas img').height() + padding);
                $('.lb_canvas').css('width', $('.lb_canvas img').width() + padding);

				$(".lb_canvas img").fadeTo("slow", 1);
				$(".lb_title").html(title);
				lb_loading= false;
				$(".lb_canvas").removeClass("loading");
			});
        });
    });

    // Click listener to hide the image when the user clicks away from it
    $(document).on('click', '.lb_backdrop', function() {
    	$("#screenshots .img").removeClass("active");
		$(".lb_canvas").removeClass("loading");

		$(".lb_backdrop, .lb_canvas, .lb_controls").fadeOut("slow", function(){
			$(".lb_canvas, .lb_title").html("");
		});
		lb_loading= false;
    });
});
