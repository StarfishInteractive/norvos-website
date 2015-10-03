/*
	Alpha by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

    skel.breakpoints({
        wide: '(max-width: 1680px)',
        normal: '(max-width: 1280px)',
        narrow: '(max-width: 980px)',
        narrower: '(max-width: 840px)',
        mobile: '(max-width: 736px)',
        mobilep: '(max-width: 480px)'
    });

    $(function () {

        var $window = $(window),
            $body = $('body'),
            $header = $('#header'),
            $banner = $('#banner');

        // Fix: Placeholder polyfill.
        $('form').placeholder();

        // Prioritize "important" elements on narrower.
        skel.on('+narrower -narrower', function () {
            $.prioritize(
                '.important\\28 narrower\\29',
                skel.breakpoint('narrower').active
            );
        });

        // Dropdowns.
        $('#nav > ul').dropotron({
            alignment: 'right'
        });

        // Off-Canvas Navigation.

        // Navigation Button.
        $(
                '<div id="navButton">' +
                '<a href="#navPanel" class="toggle"></a>' +
                '</div>'
            )
            .appendTo($body);

        // Navigation Panel.
        $(
                '<div id="navPanel">' +
                '<nav>' +
                $('#nav').navList() +
                '</nav>' +
                '</div>'
            )
            .appendTo($body)
            .panel({
                delay: 500,
                hideOnClick: true,
                hideOnSwipe: true,
                resetScroll: true,
                resetForms: true,
                side: 'left',
                target: $body,
                visibleClass: 'navPanel-visible'
            });

        // Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
        if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
            $('#navButton, #navPanel, #page-wrapper')
            .css('transition', 'none');

        // Header.
        // If the header is using "alt" styling and #banner is present, use scrollwatch
        // to revert it back to normal styling once the user scrolls past the banner.
        // Note: This is disabled on mobile devices.
        if (!skel.vars.mobile && $header.hasClass('alt') && $banner.length > 0) {

            $window.on('load', function () {

                $banner.scrollwatch({
                    delay: 0,
                    range: 0.5,
                    anchor: 'top',
                    on: function () {
                        $header.addClass('alt reveal');
                    },
                    off: function () {
                        $header.removeClass('alt');
                    }
                });

            });

        }

    });

    $(".scrolly").scrolly();

    setupDownloads();

})(jQuery);


function setupDownloads() {
    $("#" + getOS()).remove;
}

function getOS() {
    var OSName = "portable";
    if (navigator.appVersion.indexOf("Win") != -1) OSName = "windows";
    if (navigator.appVersion.indexOf("Mac") != -1) OSName = "mac";
    if (navigator.appVersion.indexOf("Linux") != -1) OSName = "linux";
    return OSName;
}

function downloadCurrentOS() {
    doDownload(getOS());
}

function downloadMac() {
    doDownload("mac");
}

function downloadWindows() {
    doDownload("windows");
}

function downloadLinux() {
    doDownload("linux");
}

function doDownload(os) {
    var baseURL = "<baseURL>";
    var releaseURL = "<releaseURL>";
    var newURL = baseURL + os + releaseURL;
    console.debug("Starting download from URL: " + newURL);

    showSignupPopup();
    //later: window.location = baseURL + getOS() + releaseURL;
}

function showSignupPopup() {

    swal({
        title: 'Thanks, but…',
        html: "<p>Norvos is not yet released.<br><br>Tell us your email to get notified as soon as it's ready.<br><br><form id='contact-form'><input id='input-field' placeholder='you@example.org' type='email' name='_replyto' style='width:50%; margin: 0 auto; text-align:center'><input type='hidden' name='_subject' value='Registration for Release Notification' /><input type='text' name='message' style='display:none' value='This user requested to be notified upon release.' /><br><br>Don't worry, we will delete your email right after the release.",
        showCancelButton: true,
        closeOnConfirm: false
    }, function () {
        var inputValue = $('#input-field').val();
        if (inputValue === false) return false;
        if (inputValue === "") {
            return false
        }
        swal.disableButtons();
        var $contactForm = $('#contact-form');
        $.ajax({
            url: 'https://formspree.io/signup@norvos.de',
            method: 'POST',
            data: $contactForm.serialize(),
            dataType: 'json',
            success: function (data) {
                swal({
                    title: 'Great!',
                    html: "We will notify you at <br><br><i style='font-size:120%'>" + inputValue + "</i><br><br> as soon as our release is available. See you!",
                    type: "success",
                    closeOnConfirm: true
                });
            },
            error: function (data) {
                sweetAlert('Oops...', 'Something went wrong. Maybe try again later.', 'error');
            }
        });

    });

}
