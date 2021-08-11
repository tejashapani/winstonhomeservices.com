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
    if (jQuery(".swift-accordian-group-477767").length > 0) {
        jQuery(".swift-accordian-group-477767").smk_Accordion({
            showIcon: true, //boolean
            closeAble: true, //boolean
            slideSpeed: 200 //integer, miliseconds
        });
    }

    $("#servicesSlider").owlCarousel({
        navigation: true,
        singleItem: true,
        transitionStyle: "fade",
        responsiveClass: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: false,
        navText: ['<span class="fa fa-chevron-left"></span>', '<span class="fa fa-chevron-right"></span>'],
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        mouseDrag: false,
        responsive: {
            0: {
                items: 1,
                margin: 0
            }
        }
    });
    $("#companyReviewSlider").owlCarousel({
        loop: true,
        responsiveClass: true,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: false,
        navText: ['<span class="fa fa-chevron-left"></span>', '<span class="fa fa-chevron-right"></span>'],
        navigation: false,
        dots: true,
        responsive: {
            0: {
                items: 1,
                margin: 0
            },
            600: {
                items: 2,
                margin: 20
            },
            1000: {
                items: 4,
                margin: 20
            }
        }
    });

    $(".btnRequestMyQuote").click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1000);

        $("#keyword").focus();
    });

    $('#keyword').autoComplete({
        minChars: 1,
        source: function (term, suggest) {
            term = term.toLowerCase();
            var choices = ['plumbing', 'roofing', 'hvac', 'electrical', 'lawn care', 'cleaning', 'moving', 'handyman', 'video', 'assisted living', 'photographer'];
            var suggestions = [];
            for (i = 0; i < choices.length; i++)
                if (~choices[i].toLowerCase().indexOf(term))
                    suggestions.push(choices[i]);
            suggest(suggestions);
        }
    });

    var words = document.getElementsByClassName('word');
    var wordArray = [];
    var currentWord = 0;

    words[currentWord].style.opacity = 1;
    for (var i = 0; i < words.length; i++) {
        splitLetters(words[i]);
    }

    function changeWord() {
        var cw = wordArray[currentWord];
        var nw = currentWord == words.length - 1 ? wordArray[0] : wordArray[currentWord + 1];
        for (var i = 0; i < cw.length; i++) {
            animateLetterOut(cw, i);
        }

        for (var i = 0; i < nw.length; i++) {
            nw[i].className = 'letter behind';
            nw[0].parentElement.style.opacity = 1;
            animateLetterIn(nw, i);
        }

        currentWord = (currentWord == wordArray.length - 1) ? 0 : currentWord + 1;
    }

    function animateLetterOut(cw, i) {
        setTimeout(function () {
            cw[i].className = 'letter out';
        }, i * 50);
    }

    function animateLetterIn(nw, i) {
        setTimeout(function () {
            nw[i].className = 'letter in';
        }, 340 + (i * 50));
    }

    function splitLetters(word) {
        var content = word.innerHTML;
        word.innerHTML = '';
        var letters = [];
        for (var i = 0; i < content.length; i++) {
            var letter = document.createElement('span');
            letter.className = 'letter';
            letter.innerHTML = content.charAt(i);
            word.appendChild(letter);
            letters.push(letter);
        }

        wordArray.push(letters);
    }

    changeWord();
    setInterval(changeWord, 3000);

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Sorry, but Geolocation is not supported by this browser.");
        }
    }

    function showPosition(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=AIzaSyBvcAXg1ocsFA4q0Vj72erVYINdsi7vHDc";
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            success: function (msg) {
                var results = msg.results;
                var zip = results[0].address_components[7].long_name;
                $(".zipField").val(zip);
                console.log(results[0]);
            },
            error: function (req, status, error) {
                alert('Sorry, an error occurred.');
                console.log(req.responseText);
            }
        });
    }
    getLocation();
});