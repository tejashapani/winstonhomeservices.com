$.fn.smk_Accordion = function (options) {

    // Defaults
    var settings = $.extend({
        // These are the defaults.
        animation: true,
        showIcon: true,
        closeAble: true,
        slideSpeed: 2000
    }, options);

    // Cache current instance
    // To avoid scope issues, use 'plugin' instead of 'this'
    // to reference this class from internal events and functions.
    var plugin = this;

    //"Constructor"
    var init = function () {
        plugin.createStructure();
        plugin.clickHead();
    }

    // Add .smk_accordion class
    this.createStructure = function () {

        //Add Class
        plugin.addClass('smk_accordion');
        if (true === settings.showIcon) {
            plugin.addClass('acc_with_icon');
        }

        //Append icon
        if (true === settings.showIcon) {
            plugin.find('.acc_head').prepend('<div class="acc_icon_expand"></div>');
        }

        plugin.find('.accordion_in .acc_content').not('.acc_active .acc_content').hide();

    }

    // Action when the user click accordion head
    this.clickHead = function () {

        plugin.on('click', '.acc_head', function () {

            var s_parent = $(this).parent();

            if (s_parent.hasClass('acc_active') == false) {
                plugin.find('.accordion_in').removeClass('acc_active');
                plugin.find('.acc_content').slideUp();
            }

            if (s_parent.hasClass('acc_active')) {
                if (false !== settings.closeAble) {
                    s_parent.removeClass('acc_active');
                    s_parent.children('.acc_content').slideUp();
                }
            } else {
                $(this).next('.acc_content').slideDown();
                s_parent.addClass('acc_active');
            }

        });

    }

    //"Constructor" init
    init();
    return this;

};

jQuery(document).ready(function ($) {
    $(".jumbotron").css({height: $(window).height() + "px"});

    $(window).on("resize", function () {
        $(".jumbotron").css({height: $(window).height() + "px"});
    });

    $('.pro-box').click(function (e) {
        e.stopPropagation();
        if ((e.target.tagName.toLowerCase() != 'a')) {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
                // $(this).find('.pro-content').find('.selected_option').remove();
                $(this).find('.content-button').find('.btnRequestQuote').text('Request a quote');
                $(this).find(':checkbox').prop('checked', '');
            } else {
                $(this).addClass('selected');
                // $(this).find('.pro-content').find('h3.content-title').append('<span class="selected_option"><i class="fa fa-check-circle fa-lg"></i></span>');
                $(this).find(':checkbox').prop('checked', 'checked');
            }
        }

        var totalQuote = ($('.pro-box.selected').length > 1) ? "Request My " + $('.pro-box.selected').length + " Quotes" : (($('.pro-box.selected').length == 1) ? "Request My 1 Quote" : "Select Vendor(s) Below");
        $(".btnTopRequestQuote").text(totalQuote);
    });

    $('.pro-box').hover(function () {
        if (!$(this).hasClass('selected')) {
            $(this).find('.btnRequestQuote').text('Add to Quotes Request');
        }
    }, function () {
        if (!$(this).hasClass('selected')) {
            $(this).find('.btnRequestQuote').text('Request a quote');
        }
    });

    $(".btnRequestQuote").click(function () {
        if ($(this).parents('.pro-box').hasClass('selected')) {
            $('.btnTopRequestQuote').trigger('click');
        }
    });

    if (jQuery(".swift-accordian-group-477767").length > 0) {
        jQuery(".swift-accordian-group-477767").smk_Accordion({
            showIcon: true, //boolean
            closeAble: true, //boolean
            slideSpeed: 200 //integer, miliseconds
        });
    }

    if (jQuery('.grid').length > 0) {
        jQuery('.grid').isotope({
            itemSelector: '.grid-item',
            masonry: {
                columnWidth: 200,
                isFitWidth: true,
                gutter: 10
            }
        });
    }

    if (jQuery("#file-demo").length > 0) {
        jQuery("#file-demo").fileinput({
            dropZoneTitle: "<i class='fa fa-cloud-upload'></i> Click to Upload Video<br>or drag & drop your video here.",
            dropZoneClickTitle: "",
            showCaption: false,
            showBrowse: false,
            browseOnZoneClick: true,
            hideContent: true,
            minImageWidth: "100%",
            maxFileCount: 1,
            showUpload: false,
            showRemove: false,
            allowedFileTypes: ['video'],
        });
    }

    if (jQuery('.swift_phone_field_us').length > 0) {
        jQuery('.swift_phone_field_us').inputmask({"mask": "1 (999) 999-9999"});
    }

    if ($(window).width() > 991) {
        var stickySidebar = new StickySidebar('#sticky_sidebar', {
            topSpacing: 60,
            bottomSpacing: 20,
            containerSelector: '.container',
            innerWrapperSelector: '.profile-contactbox'
        });
    }

    $("#reqAddress").geocomplete();

    jQuery(".btnSubmit").on("click", function (e) {
        jQuery(".form-error").removeClass('form-error');
        var error = false;

        // honeypot
        var fakeEmail = $("#reqEmail").val();
        if (fakeEmail.length > 0) {
            error = true;
            return false;
        }

        $("#FrmQuote .reqField").each(function () {
            var val = $.trim($(this).val());
            if (val.length <= 0) {
                $(this).addClass('form-error');
                error = true;
            }

            if (val.length > 0 && $(this).attr('type') == "email" && $(this).attr('id') != 'reqEmail') {
                if (!ValidateEmail(val)) {
                    $(this).addClass('form-error');
                    error = true;
                }
            }
        });

        if (!error) {
            if (jQuery('.SC_fh_timezone').length > 0) {
                jQuery('#SC_fh_timezone').val(jstz.determine().name());
            }
            if (jQuery('.SC_fh_capturepage').length > 0) {
                jQuery('.SC_fh_capturepage').val(window.location.origin + window.location.pathname);
            }
            if (jQuery('.SC_fh_language').length > 0) {
                jQuery('.SC_fh_language').val(window.navigator.userLanguage || window.navigator.language);
            }

            jQuery('#FrmQuote #reqEmail').remove();
            jQuery('#FrmQuote #reqEmailOffDomain').attr('name', 'reqEmail');

            jQuery(".btnSubmit").attr("disabled", "disabled").html('<i class="fa fa-spinner fa-pulse fa-lg fa-fw"></i> Submitting....');
            $("#FrmQuote").attr('action', 'https://portal.swiftcrm.com/f/fhx.php').submit();
        }
    });
});

function ValidateEmail(mail) {
    if (/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,6}|[0-9]{1,3})(\]?)$/.test(mail))
    {
        return (true);
    }
    return (false);
}