/*global google, $*/
function initMap() {
    'use strict';
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -36.785908, lng: 175.013876},
        scrollwheel: false,
        zoom: 14
    });

    var infowindow = new google.maps.InfoWindow({
        content: '<h5 class="map-text">Mudbrick Restaurant &amp; Vinyard</h5>' +
            '<div class="map-text"><span class="region">126 Church Bay Rd</span><br>' +
            '<span class="postal-code">Waiheke Island</span></div>',
        maxWidth: 250,
        position: {lat: -36.792404, lng: 175.000154}
    });

    infowindow.open(map);
}

$(function() {
    'use strict';
    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a:not(.dropdown-toggle)').click(function() {
    'use strict';
    $('.navbar-toggle:visible').click();
});

$('.modal-close').click(function(e) {
    'use strict';
    e.preventDefault();
    $('#rsvpModal').modal('hide');
});

/* ======= Countdown ========= */
// set the date we're counting down to
var targetDate = new Date('October 28, 2016').getTime();

// variables for time units
var days, hours, minutes, seconds;

// get tag element
var countdown =  $('#countdown-box');

var daysSpan = $('<span></span>');
daysSpan.addClass('days');
countdown.append(daysSpan);

var hoursSpan = $('<span></span>');
hoursSpan.addClass('hours');
countdown.append(hoursSpan);

var minutesSpan = $('<span></span>');
minutesSpan.addClass('minutes');
countdown.append(minutesSpan);

var secsSpan = $('<span></span>');
secsSpan.addClass('secs');
countdown.append(secsSpan);

// update the tag with id "countdown" every 1 second
setInterval(function() {
    'use strict';
    // find the amount of "seconds" between now and target
    var currentDate = new Date().getTime();
    var secondsLeft = (targetDate - currentDate) / 1000;

    // do some time calculations
    days = parseInt(secondsLeft / 86400);
    secondsLeft = secondsLeft % 86400;

    hours = parseInt(secondsLeft / 3600);
    secondsLeft = secondsLeft % 3600;

    minutes = parseInt(secondsLeft / 60);
    seconds = parseInt(secondsLeft % 60);

    // format countdown string + set tag value.
    daysSpan.html('<span class="number">' + days + '</span>' + '<span class="unit script">Days</span>');
    hoursSpan.html('<span class="number">' + hours + '</span>' + '<span class="unit script">Hrs</span>');
    minutesSpan.html('<span class="number">' + minutes + '</span>' + '<span class="unit script">Mins</span>');
    secsSpan.html('<span class="number">' + seconds + '</span>' + '<span class="unit script">Secs</span>');


}, 1000);

/*global $*/
$(function() {
    'use strict';

    $('#contactForm input, #contactForm textarea').jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
            console.log(errors);
        },
        submitSuccess: function($form, event) {
            event.preventDefault();

            var data = {
                names: $('#names').val(),
                bus: $('.bus[checked]').attr('name'),
                attending: $('.attending[checked]').attr('name'),
                email: $('#email').val(),
                extraInfo: $('#extraInfo').val()
            };

            $.ajax({
                url: '/api/people',
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                data: JSON.stringify(data),
                cache: false,
                success: function() {
                    // Success message
                    $('#success').html('<div class="alert alert-success">');
                    $('#success > .alert-success')
                        .html('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>');
                    $('#success > .alert-success').append('<strong>Your message has been sent. </strong>');
                    $('#success > .alert-success').append('</div>');

                    //clear all fields
                    $('#contactForm').trigger('reset');
                },
                error: function() {
                    // Fail message
                    $('#success')
                        .html('<div class="alert alert-danger">');
                    $('#success > .alert-danger')
                        .html('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>');
                    $('#success > .alert-danger')
                        .append('<strong>Sorry it seems that my mail server is not responding. Please try again later!');
                    $('#success > .alert-danger').append('</div>');

                    //clear all fields
                    $('#contactForm').trigger('reset');
                }
            });
        },
        filter: function() {
            return $(this).is(':visible');
        }
    });

    $('a[data-toggle=\"tab\"]').click(function(e) {
        e.preventDefault();
        $(this).tab('show');
    });

    /*When clicking on Full hide fail/success boxes */
    $('#names').focus(function() {
        $('#success').html('');
    });
});

