const App = {
    SetBackground: () => {
        $('[setBackground]').each(function() {
            var background = $(this).attr('setBackground')
            $(this).css({
                "background-image": "url(" + background + ")",
                "background-size": "cover",
                "background-position": "center center"
            })
        })
        $('[setBackgroundRepeat]').each(function() {
            var background = $(this).attr('setBackgroundRepeat')
            $(this).css({
                "background-image": "url(" + background + ")",
                "background-repeat": "repeat"
            })
        })
    },
    equalHeightElement: el => {
        let height = 0;
        let thisHeight = 0;
        $(el).each(function() {
            thisHeight = $(this).height();
            if (thisHeight > height) {
                height = thisHeight;
            }
        });
        $(el).height(height)
    },
    initLazyLoad: () => {
        return new LazyLoad({
            elements_selector: ".lazy"
        });
    },
    scrollTo: y => {
        $('html, body').animate({
            scrollTop: y
        }, 1000)
    },
    init: () => {
        App.SetBackground()
        App.initLazyLoad()
    }
}

function initMapping() {
    let search = new MappingListener({
        selector: 'header .searchbox',
        mobileWrapper: 'header .header-menu',
        mobileMethod: 'appendTo',
        desktopWrapper: 'header .header-top',
        desktopMethod: 'prependTo',
        breakpoint: 1025
    }).watch()
}

function initSlider() {
    let homeBanner = new Swiper('.home-banner .swiper-container', {
        slidesPerView: 1,
        speed: 1000,
        autoplay: {
            delay: 5000
        }
    })

    let experienceCarousel = new Swiper('.home-4 .swiper-container', {
        slidesPerView: 3,
        speed: 1000,
        autoplay: {
            delay: 5000
        },
        spaceBetween: 30,
        navigation: {
            nextEl: '.home-4 .swiper-next',
            prevEl: '.home-4 .swiper-prev'
        },
        breakpoints: {
            1025: {
                slidesPerView: 2
            },
            576: {
                slidesPerView: 1
            }
        }
    })
    let categoryCarousel = new Swiper('.san-pham-ds .category-list .swiper-container', {
        slidesPerView: 9,
        speed: 1000,
        autoplay: {
            delay: 5000
        },
        spaceBetween: 20,
        navigation: {
            nextEl: '.san-pham-ds .category-list .swiper-next',
            prevEl: '.san-pham-ds .category-list .swiper-prev'
        },
        breakpoints: {
            1025: {
                slidesPerView: 7
            },
            768: {
                slidesPerView: 5
            },
            576: {
                slidesPerView: 4
            }
        }
    })
    let otherProjectCarousel = new Swiper('.du-an-ct-2 .swiper-container', {
        slidesPerView: 4,
        speed: 1000,
        autoplay: {
            delay: 5000
        },
        spaceBetween: 15,
        navigation: {
            nextEl: '.du-an-ct-2 .swiper-next',
            prevEl: '.du-an-ct-2 .swiper-prev'
        },
        breakpoints: {
            1025: {
                slidesPerView: 3
            },
            768: {
                slidesPerView: 2
            },
            576: {
                slidesPerView: 1
            }
        }
    })
    var productThumbs = new Swiper('.san-pham-ct-1 .thumb-image .swiper-container', {
        spaceBetween: 10,
        slidesPerView: 4,
        speed: 1000,
        watchSlidesVisibility: true,
        direction: 'vertical',
        watchSlidesProgress: true,
        breakpoints: {
            1200: {
                slidesPerView: 3
            },
            576: {
                slidesPerView: 2
            }
        }

    })
    var productTop = new Swiper('.san-pham-ct-1 .main-image .swiper-container', {
        spaceBetween: 10,
        speed: 1000,
        effect: 'fade',
        navigation: {
            nextEl: '.san-pham-ct-1 .thumb-image .swiper-next',
            prevEl: '.san-pham-ct-1 .thumb-image .swiper-prev',
        },
        thumbs: {
            swiper: productThumbs,
        }
    });

    let projectThumb = new Swiper('.du-an-ct-1 .thumb-image .swiper-container', {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true
    });
    var projectTop = new Swiper('.du-an-ct-1 .main-image .swiper-container', {
        spaceBetween: 10,
        thumbs: {
            swiper: projectThumb
        },
        navigation: {
            nextEl: '.du-an-ct-1 .swiper-next',
            prevEl: '.du-an-ct-1 .swiper-prev',
        }
    });
}

function ProcessAjax(pageurl) {
    //to get the ajax content and display in div with id 'content'
    $.ajax({
        url: pageurl,
        data: { isajax: true },
        success: function(data) {
            $('.ajaxresponse').html($(data).find('.ajaxresponse').html());
            $('.ajaxfilterresponse').html($(data).find('.ajaxfilterresponse').html());
            $('.ajaxbrandresponse').html($(data).find('.ajaxbrandresponse').html());
            $('.productpager').remove();
            $(data).find('.productpager').insertAfter($('.ajaxresponse'));
        }
    });

    //to change the browser URL to 'pageurl'
    if (pageurl != window.location) {
        window.history.pushState({ path: pageurl }, '', pageurl);
    }
}

function initHeight() {
    App.equalHeightElement('.home-2 .service-item figure figcaption')
}

function toggleMenu() {
    $('header .btn-openmenu').on('click', function() {
        $('header .header-menu').addClass('active')
        $('header .header-overlay').addClass('active')
    })
    $('header .btn-closemenu, header .header-overlay').on('click', function() {
        $('header .header-menu').removeClass('active')
        $('header .header-overlay').removeClass('active')
    })
}

function textViewMore() {
    if ($('.dich-vu-ct-1 .secvice-description .content').height() > 600) {
        $('.dich-vu-ct-1 .secvice-description .content').addClass('viewmore')
        $('.san-pham-ct-1 .product-description .nav-content .content.viewmore .btn-viewmore').on('click', function() {
            $(this).parent().removeClass('viewmore')
        })
    }
    if ($('.dich-vu-ct-1 .secvice-description .content').height() > 350) {
        $('.dich-vu-ct-1 .secvice-description .content').addClass('viewmore')
        $('.dich-vu-ct-1 .secvice-description .content.viewmore .btn-viewmore').on('click', function() {
            $(this).parents('.content').removeClass('viewmore')
        })
    }
}

function productTab() {
    $('.san-pham-ct-1 .product-description .nav-tab .item').on('click', function() {
        let e = $(this).attr('data-item')
        console.log(e)
        $('.san-pham-ct-1 .product-description .nav-tab .item').removeClass('active')
        $(this).addClass('active')
        $(`.san-pham-ct-1 .product-description .nav-content .item`).removeClass('active')
        $(`.san-pham-ct-1 .product-description .nav-content .item[data-item='${e}']`).addClass('active')
        textViewMore()
    })
    $('.san-pham-ct-1 .product-description .nav-tab .item:first-child').trigger('click')
}

function homeProductTab() {
    $('.home-3 .main-tab .tab-nav .item').on('click', function() {
        let e = $(this).attr('data-id')
        $('.home-3 .main-tab .tab-nav .item').removeClass('active')
        $(this).addClass('active')
        $(`.home-3 .main-tab .tab-content .item`).removeClass('active')
        $(`.home-3 .main-tab .tab-content .item[data-id='${e}']`).addClass('active')
    })
    $('.home-3 .main-tab .tab-nav .item:first-child').trigger('click')
}

function toggleNavigation() {
    $('.zone-nav .heading, .main-navigation .heading').on('click', function() {
        $(this).siblings().slideToggle()
    })
}

function mappingElement() {
    // Zone Select
    if ($('.zone.form-group').length) {
        $('.zone.form-group').prependTo($('.san-pham-ds .filter-wrap'))

    }
    if ($('.product-detail-page .policy-wrap').length) {
        $('.product-detail-page .policy-wrap').insertBefore($('.san-pham-ct-1 .product-related'))
    }
}

function rescruitmentPopup() {
    $('.tuyen-dung-ct  a.apply').on('click', function() {
        $('.tuyen-dung-ct .popup-wrapper').addClass('active')
    })
    $('.tuyen-dung-ct .popup-wrapper .close-button').on('click', function() {
        $(this).parents('.popup-wrapper').removeClass('active')
    })
}

function questionAccordion() {
    $('.hoi-dap .question-item .heading').on('click', function() {
        if ($(this).siblings().is(':hidden')) {
            $(this).siblings().slideDown()
            $(this).addClass('active')
        } else {
            $(this).siblings().slideUp()
            $(this).removeClass('active')
        }
    })
}

function loadDataAjax() {
    $('.zone.form-group select, .sort.form-group select').on('change', function() {
        let i = $(this).val()
        ProcessAjax(i)
    })
    $('.san-pham-ds .main-btn.plus').on('click', function() {
        let pageurl = $(this).attr('data-url')
        $.ajax({
            url: pageurl,
            data: { isajax: true },
            success: function(data) {
                console.log(data)
                let el = $(data).find('.project-item').parent()
                let nextUrl = $(data).find('.main-btn.plus').attr('data-url')
                el.each(function() {
                    $(this).appendTo($('.san-pham-ds .ajaxresponse>div'))
                })
                if (nextUrl != '' && nextUrl != undefined) {
                    $('.san-pham-ds .main-btn.plus').attr('data-url', nextUrl)
                } else {
                    $('.san-pham-ds .main-btn.plus').hide()
                }
            }
        });
    })
    $('.du-an .main-btn.plus.btn-viewmore').on('click', function() {
        let pageurl = $(this).attr('data-url')
        $.ajax({
            url: pageurl,
            data: { isajax: true },
            success: function(data) {
                console.log(data)
                let el = $(data).find('.project-item').parent()
                let nextUrl = $(data).find('.main-btn.plus').attr('data-url')
                el.each(function() {
                    $(this).appendTo($('.du-an .ajaxresponse>.row'))
                })
                console.log(nextUrl)
                if (nextUrl != '' && nextUrl != undefined) {
                    $('.du-an .main-btn.plus.btn-viewmore').attr('data-url', nextUrl)
                } else {
                    $('.du-an .main-btn.plus.btn-viewmore').hide()
                }
            }
        });
    })
}

function scrollToSection() {
    $('.main-navigation ul li').on('click', function() {
        let sectionId = $(this).find('a').attr('data-scroll')
        let sectionOffset = $(`section[data-id='${sectionId}']`).offset().top - $('header').outerHeight() - $('.main-navigation').outerHeight()
        $('.main-navigation ul li').removeClass('active')
        $(this).addClass('active')
        App.scrollTo(sectionOffset)
    })
}

function servicePopup() {
    $('.gioi-thieu-2 .main-list .service-item a').on('click', function() {
        console.log($(this).parents('.service-item').find('.popup-wrap'))
        $(this).parents('.service-item').find('.popup-wrap').addClass('active')
    })
    $('.popup-wrap .popup-main .close-button, .popup-wrap .popup-overlay').on('click', function() {
        $(this).parents('.popup-wrap').removeClass('active')
    })
}

function prodcutContactPopup() {
    $('.san-pham-ct-1 .product-info .main-btn, .dich-vu-ct-1 .service-intro .text-wrap .main-btn').on('click', function() {
        $('.product-contact-wrapper').addClass('active')
        let title = $('h1').text()
        $('.popup-product-name input').val(title)
        $('.popup-product-name input').attr('disabled', true)
    })
    $('.product-contact-wrapper .popup-main .close-button, .product-contact-wrapper .popup-overlay').on('click', function() {
        $(this).parents('.product-contact-wrapper').removeClass('active')
    })
}

function socialShare() {
    let link = window.location.href
    $('.fb-share').attr('href', `https://facebook.com/sharer/sharer.php?u=${link}`)
    $('.in-share').attr('href', `http://www.linkedin.com/shareArticle?mini=true&url=${link}`)
    $('.mail-share').attr('href', `mailto:?subject=I wanted you to see this site&amp;body=Check out this site ${link}.`)
    $('.tw-share').attr('href', `https://twitter.com/intent/tweet?url=${link}`)
    $('.pr-share').on('click', function() {
        window.print()
    })
}

function toggleDocumentPage() {
    $('.sidebar-wrap .heading').on('click', function() {
        $(this).siblings().slideToggle()
    })
}
$(document).ready(function() {
    initMapping()
    initSlider()
    initHeight()
    App.init()
    toggleMenu()
    homeProductTab()
    toggleNavigation()
    textViewMore()
    productTab()
    mappingElement()
    loadDataAjax()
    rescruitmentPopup()
    questionAccordion()
    scrollToSection()
    servicePopup()
    prodcutContactPopup()
    socialShare()
    toggleDocumentPage()
    $('[data-fancybox').fancybox({
        thumbs: {
            autoStart: true,
            axis: 'x'
        }
    });
    if ($('.san-pham-ds .filter-wrap').length) {

        let filterOffset = $('.san-pham-ds .filter-wrap').offset().top - $('header').outerHeight()
        $(window).on('scroll', function() {
            if ($(window).scrollTop() > filterOffset) {
                $('.san-pham-ds .filter-wrap').addClass('fixed')
            } else {

                $('.san-pham-ds .filter-wrap').removeClass('fixed')
            }
        })
    }
    if ($('.tai-lieu .sidebar-wrap').length) {

        let sidebarOffset = $('.tai-lieu .sidebar-wrap').offset().top - $('header').outerHeight()
        $(window).on('scroll', function() {

            if ($(window).scrollTop() > sidebarOffset) {
                $('.tai-lieu .sidebar-wrap').addClass('fixed')
            } else {
                $('.tai-lieu .sidebar-wrap').removeClass('fixed')
            }

        })
    }

})
$(window).resize(function() {})