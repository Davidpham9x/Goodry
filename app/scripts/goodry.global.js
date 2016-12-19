var goodry = window.goodry || {}; //global namespace for YOUR goodry, Please change goodry to your goodry name

var isMobile = {
    isAndroid: function() {
        return navigator.userAgent.match(/Android/i);
    },
    isBlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    isiOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    isOpera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    isWindows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.isAndroid() || isMobile.isBlackBerry() || isMobile.isiOS() || isMobile.isOpera() || isMobile.isWindows());
    }
};

(function($) {
    goodry.Global = {
        init: function() { //initialization code goes here
            $.support.cors = true;

            this.initFormElements();
            /*goodry.Global.initShowPopupInfo();*/

            if ( $('[data-toggle="datepicker"]').length ) {
                $('[data-toggle="datepicker"]').datepicker();
                $('[data-toggle="datepicker"]').on('pick.datepicker', function(e) {
                    e.preventDefault();

                    var dob = $('[data-toggle="datepicker"]').datepicker('getDate', true).split('/');
                        $('.dob-date').text(dob[0]);
                        $('.dob-month').text(dob[1]);
                        $('.dob-year').text(dob[2]);

                    $('[data-toggle="datepicker"]').datepicker('hide');
                });
            }
        },

        initFormElements: function() {
            $('input, textarea').placeholder(); //enable placeholder support for all browsers

            //Radio Wrapper
            $(".radio-wrapper .input-radio").each(function() {
                if ($(this).is(":checked")) {
                    $('.input-radio[name="' + $(this).attr('name') + '"]').parents(".radio-selected").removeClass("radio-selected");
                    $(this).parents('.radio-wrapper').addClass("radio-selected");
                }
            });

            $(document).on('change', ".radio-wrapper .input-radio", function() {
                $('input[name="' + $(this).attr('name') + '"]').each(function() {
                    if ($(this).not(':checked')) {
                        $(this).parent().removeClass("radio-selected");
                    }
                });

                if ($(this).is(":checked")) {
                    $(this).parents('.radio-wrapper').addClass("radio-selected");
                }
            });

            //Checkbox Wrapper
            $('.checkbox-wrapper .input-checkbox').each(function() {
                if ($(this).is(':checked')) {
                    $(this).parents('.checkbox-wrapper').addClass('checked');
                }
            });

            $(document).on('click', '.checkbox-wrapper .input-checkbox', function() {

                if ($(this).is(':checked')) {
                    $(this).parents('.checkbox-wrapper').addClass('checked');
                } else if ($(this).not(':checked')) {
                    $(this).parents('.checkbox-wrapper').removeClass('checked');
                }
            });

            //Select Wrapper
            $('.select-wrapper').each(function() {
                if ($(this).find('span').length <= 0) {
                    $(this).prepend('<span>' + $(this).find('select option:selected').text() + '</span>');
                }
            });

            $(document).on('change', '.select-wrapper select', function() {
                $(this).prev('span').replaceWith('<span>' + $(this).find('option:selected').text() + '</span>');
            });
        },

        initShowPopupInfo: function() {
            // Open directly via API
            $.magnificPopup.open({
                items: {
                    src: '#modal-info'
                },
                callbacks: {
                    open: function() {
                        $('#modal-info').find('.close').click(function(e) {
                            e.preventDefault();

                            $.magnificPopup.close();
                        });
                    }
                },
                type: 'inline'
            });
        }
    };
})(jQuery);

$(document).ready(function($) {
    goodry.Global.init();
});
