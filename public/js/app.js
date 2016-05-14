$(function() {
    
    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    /* ======= Google Map ======= */
    map = new GMaps({
        div: '#map',
        lat: -36.785908,
        lng: 175.013876,
        scrollwheel: false,
        zoom: 14,
    });

    map.addMarker({
        lat: -36.792404,
        lng: 175.000154,    
        infoWindow: {
            content: '<h5 class="map-text">Mudbrick Restaurant &amp; Vinyard</h5>' +
                '<div class="map-text"><span class="region">126 Church Bay Rd</span><br>' +
                '<span class="postal-code">Waiheke Island</span></div>'
        } 
        
    });

    google.maps.event.trigger(map.markers[0], 'click');
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a:not(.dropdown-toggle)').click(function() {
    $('.navbar-toggle:visible').click();
});

/* ======= Countdown ========= */
// set the date we're counting down to
var target_date = new Date("October 28, 2016").getTime();
 
// variables for time units
var days, hours, minutes, seconds;
 
// get tag element
var countdown =  $("#countdown-box");

var days_span = $("<span></span>");
days_span.addClass('days');
countdown.append(days_span);

var hours_span = $("<span></span>");
hours_span.addClass('hours');
countdown.append(hours_span);

var minutes_span = $("<span></span>");
minutes_span.addClass('minutes');
countdown.append(minutes_span);

var secs_span = $("<span></span>");
secs_span.addClass('secs');
countdown.append(secs_span);
 
// update the tag with id "countdown" every 1 second
setInterval(function () {
 
    // find the amount of "seconds" between now and target
    var current_date = new Date().getTime();
    var seconds_left = (target_date - current_date) / 1000;
 
    // do some time calculations
    days = parseInt(seconds_left / 86400);
    seconds_left = seconds_left % 86400;
     
    hours = parseInt(seconds_left / 3600);
    seconds_left = seconds_left % 3600;
     
    minutes = parseInt(seconds_left / 60);
    seconds = parseInt(seconds_left % 60);
     
    // format countdown string + set tag value.
    days_span.html('<span class="number">' + days + '</span>' + '<span class="unit script">Days</span>');
    hours_span.html('<span class="number">' + hours + '</span>' + '<span class="unit script">Hrs</span>');
    minutes_span.html('<span class="number">' + minutes + '</span>' + '<span class="unit script">Mins</span>');
    secs_span.html('<span class="number">' + seconds + '</span>' + '<span class="unit script">Secs</span>');
    
  
    //countdown.innerHTML = days + "d, " + hours + "h, "
   // + minutes + "m, " + seconds + "s";  
 
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

