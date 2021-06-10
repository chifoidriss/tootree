$(function () {
    $('#open-message').on('click', function (e) {
        e.preventDefault();

        $(this).find('.bx').toggleClass('bx-chevron-up bx-chevron-down');
        $('#body-message').toggleClass('open');
    });
    $('#post-message').on('click', function (e) {
        e.preventDefault();
        $('#poster-message').addClass('open');
        $('.overlay').addClass('visible-no-backdrop');
    });

    $('#open-aside-left').on('click', function (e) {
        e.preventDefault();
        $('.aside-left').toggleClass('open');
        $('.overlay').toggleClass('visible');
    });

    $('.overlay').on('click', function () {
        $('#poster-message').removeClass('open');
        $('.aside-left').removeClass('open');
        $('.overlay').removeClass('visible-no-backdrop visible');
    });

    var prevScrollPosition = window.pageYOffset;
    var header = document.querySelector(".header");
    window.onscroll= function () {
        if (window.innerWidth < 766) {
            var currentScrollPosition = window.pageYOffset;
            if (prevScrollPosition > currentScrollPosition) {
                header.style.top = "0";
            } else {
                header.style.top = "-100px";
            }
            prevScrollPosition = currentScrollPosition;
        } else {
            header.style.top = "0";
        }
    };
});

function _(element) {
    var elt = document.querySelectorAll(element);
}

function includeFile() {
    var htmlDocument = document.querySelectorAll('*');

    htmlDocument.forEach(function (element) {
        if (element.hasAttribute('#include')) {
            var file = element.getAttribute('#include').trim();

            httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        element.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        element.innerHTML = "Page not found.";
                    }
                    element.removeAttribute("w3-include-html");
                    includeFile();
                }
            };
            httpRequest.open("GET", file, true);
            httpRequest.send();
            return;
        }
    });
}