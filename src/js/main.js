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
    let homeBanner = new Swiper('.home-banner .swiper-container',{
        slidesPerView: 1,
        speed: 1000,
        autoplay: {
            delay: 5000
        }
    })
    
    let experienceCarousel = new Swiper('.home-4 .swiper-container',{
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
}

function initHeight() {
    App.equalHeightElement('.home-2 .item figure figcaption')
}
function toggleMenu(){
    $('header .btn-openmenu').on('click',function(){
        $('header .header-menu').addClass('active')
        $('header .header-overlay').addClass('active')
    })
    $('header .btn-closemenu, header .header-overlay').on('click', function(){
        $('header .header-menu').removeClass('active')
        $('header .header-overlay').removeClass('active')
    })
}
function homeProductTab(){
    $('.home-3 .main-tab .tab-nav .item').on('click',function(){
        let e = $(this).attr('data-id')
        $('.home-3 .main-tab .tab-nav .item').removeClass('active')
        $(this).addClass('active')
        $(`.home-3 .main-tab .tab-content .item`).removeClass('active')
        $(`.home-3 .main-tab .tab-content .item[data-id='${e}']`).addClass('active')
    })
    $('.home-3 .main-tab .tab-nav .item:first-child').trigger('click')
}
$(document).ready(function() {
    initMapping()
    initSlider()
    initHeight()
    App.init()
    toggleMenu()
    homeProductTab()
})
$(window).resize(function() {
})