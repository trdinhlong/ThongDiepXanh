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
    if ($('.san-pham-ct-1 .product-description .nav-content .content').height() > 600) {
        $('.san-pham-ct-1 .product-description .nav-content .content').addClass('viewmore')
        $('.san-pham-ct-1 .product-description .nav-content .content.viewmore .btn-viewmore').on('click', function() {
            $(this).parent().removeClass('viewmore')
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

function loadPageBySelect() {
    $('.zone.form-group select, .sort.form-group select').on('change', function() {
        let i = $(this).val()
        window.location = i
    })
}

function scrollToSection() {
    $('.main-navigation ul li').on('click', function() {
        let sectionId = $(this).find('a').attr('data-scroll')
        let sectionOffset = $(`section[data-id='${sectionId}']`).offset().top - $('header').outerHeight()
        App.scrollTo(sectionOffset)
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
    loadPageBySelect()
    rescruitmentPopup()
    questionAccordion()
    scrollToSection()
})
$(window).resize(function() {})