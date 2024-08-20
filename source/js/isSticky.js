(function ($, document) {

    "use strict";

	var updateStickyClass = function() {
		var body = 'body';

		var scroll = $(window).scrollTop();

		if ( scroll >= 110 ) {
			$(body).addClass('is-sticky');
		} else {
			$(body).removeClass('is-sticky');
		}
	};

	$(document).ready(function() {
		updateStickyClass();
	});

	$(window).scroll(function() {
		updateStickyClass();
	});

}(jQuery, document));
