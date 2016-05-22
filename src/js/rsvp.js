/*global $*/
$(function() {
    'use strict';

    $('#contactForm').submit(function(event) {
        var attending = $('.attending[checked]').attr('name');
        var bus = $('.bus[checked]').attr('name');

    });

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

            if (!data.attending) {
                $('.attending-error').text('Please select an option');
            } else  {
                $('.attending-error').empty();
            }

            if (!data.bus) {
                $('.bus-error').text('Please select an option');
            } else {
                $('.bus-error').empty();
            }

            if (!data.attending || !data.bus) {
                return;
            }

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

