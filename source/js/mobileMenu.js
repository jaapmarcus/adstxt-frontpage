(function ($, document) {

    "use strict";

    $(document).ready(function () {

        var $body            = $('body'),
            $hamburgerButton = $('.js-mobile-menu-toggler'),
            isMobileNavOpen  = 'is-mobile-menu-open';

        function mobileMenuToggle(open) {
            $body.toggleClass(isMobileNavOpen, open);
            $hamburgerButton.toggleClass('is-active', open);
        }

        $hamburgerButton.on('click', function (e) {
            e.preventDefault();
            mobileMenuToggle(!$body.hasClass(isMobileNavOpen));
        });

        function anchorMenuHelper() {
            $('.mobile-menu a[href*="#"]').on('click', function (e) {
                mobileMenuToggle(false);
            });
        }

        $(window).resize(function () {
            if ($(window).width() > 990) {
                mobileMenuToggle(false);
            }
        });

        // Initialize the menu setup on page load
        mobileMenuToggle(false);
        setTimeout(anchorMenuHelper(), 300);
    });

}(jQuery, document));
