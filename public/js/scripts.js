jQuery(document).ready(function($) {
  var height_video = $(window).width();
  var height_responsive = (height_video / 1.78011) + 1;
  $('.video_slide').css("height", height_responsive);

  $(window).resize(function() {
    var height_video = $(window).width();
    var height_responsive = (height_video / 1.78011) + 1;
    $('.video_slide').css("height",height_responsive);
  });
});

var   window_height = $(window).height(),
      testMobile,
      easing = 'easeOutExpo';

$.browser.safari = ($.browser.webkit && !(/chrome/.test(navigator.userAgent.toLowerCase())));

if (!$.browser.safari) {
  $('.home-parallax').find('.home-text-wrapper').children('.container').addClass('no-safari');
}

$('.home-slide').each(function() {
  contentSize = $(this).find('.home-slide-content');
  contentSize.fitText(1.2);
});


var init = function() {
  $('nav').animate({'opacity': '1'}, 400);

  // Function to slabtext the H1 headings
  function slabTextHeadlines() {
    $(".home-quote h1").slabText({
      // Don't slabtext the headers if the viewport is under 479px
      "viewportBreakpoint":300
    });
  };

  $(window).load(function() {
    setTimeout(slabTextHeadlines, 5);
  });

  /*----------------------------------------------------*/
  /* FULLSCREEN IMAGE HEIGHT
  /*----------------------------------------------------*/

  function fullscreenImgHeight() {
    $('#home, .background-video').css({height:window_height});
  }

  fullscreenImgHeight();

  $(window).bind('resize',function() {
    fullscreenImgHeight();
    home_parallax();
  });
};


jQuery(window).load(function() {
  jQuery(document).ready(function($) {
    // cache container
    var container = $('#portfolio-wrap');

    container.isotope({
      animationEngine : 'best-available',
      animationOptions: {
        duration: 200,
      queue: false
      },
      layoutMode: 'fitRows'
    });

    // filter items when filter link is clicked
    $('#filters a').click(function() {
      $('#filters a').removeClass('active');
      $(this).addClass('active');
      var selector = $(this).attr('data-filter');
      container.isotope({ filter: selector });
      setProjects();
      return false;
    });

    function splitColumns() {
      var winWidth = $(window).width(),
          columnNumb = 1;

      if (winWidth > 1200) {
        columnNumb = 5;
      } else if (winWidth > 900) {
        columnNumb = 4;
      } else if (winWidth > 600) {
        columnNumb = 3;
      } else if (winWidth > 300) {
        columnNumb = 1;
      }

      return columnNumb;
    }

    function setColumns() {
      var winWidth = $(window).width(),
          columnNumb = splitColumns(),
          postWidth = Math.floor(winWidth / columnNumb);

      container.find('.portfolio-item').each(function () {
        $(this).css( {
          width : postWidth + 'px'
        });
      });
    }

    function setProjects() {
      setColumns();
      container.isotope('reLayout');
    }

    container.imagesLoaded(function () {
      setColumns();
    });


    $(window).bind('resize', function () {
      setProjects();
    });

  });
});

function home_parallax() {
  $(window).scroll(function() {
    var yPos = -($(window).scrollTop() / 2);

    // Put together our final background position
    var coords = '50% '+ yPos + 'px';

    // Move the background
    $('.home-parallax, .home-parallax2, .home-parallax3, .home-parallax4').css({ backgroundPosition: coords });
  });
}

home_parallax();

/*----------------------------------------------------*/
/* MOBILE DETECT FUNCTION
/*----------------------------------------------------*/

var isMobile = {
  Android: function() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};

//BEGIN DOCUMENT.READY FUNCTION
$(document).ready(function() {
  init();
  rnr_shortcodes();

  /* ------------------------------------------------------------------------ */
  /* BACK TO TOP
  /* ------------------------------------------------------------------------ */

  $(window).scroll(function() {
    if ($(window).scrollTop() > 200) {
      $("#back-to-top").fadeIn(200);
    } else{
      $("#back-to-top").fadeOut(200);
    }
  });

  $('#back-to-top, .back-to-top').click(function() {
    $('html, body').animate({ scrollTop:0 }, '800');
    return false;
  });

  /*----------------------------------------------------*/
  // ADD PRETTYPHOTO
  /*----------------------------------------------------*/
  $("a[data-rel^='prettyPhoto']").prettyPhoto();

  /*----------------------------------------------------*/
  // ADD VIDEOS TO FIT ANY SCREEN
  /*----------------------------------------------------*/
  $(".container").fitVids();

  /*----------------------------------------------------*/
  // PRELOADER CALLING
  /*----------------------------------------------------*/
  $("body.onepage").queryLoader2({
    barColor: "#111111",
    backgroundColor: "#ffffff",
    percentage: true,
    barHeight: 3,
    completeAnimation: "fade",
    minimumTime: 200
  });

  /*----------------------------------------------------*/
  // MENU SMOOTH SCROLLING
  /*----------------------------------------------------*/
  $(".main-menu a, .logo a, .home-logo-text a, .home-logo a, .scroll-to").bind('click',function(event) {
    $(".main-menu a").removeClass('active');
    $(this).addClass('active');
    var headerH = $('.navigation').outerHeight();

    $("html, body").animate({
      scrollTop: $($(this).attr("href")).offset().top - headerH + 'px'
    }, {
      duration: 1200,
      easing: "easeInOutExpo"
    });

    event.preventDefault();
  });

  /*----------------------------------------------------*/
  // PARALLAX CALLING
  /*----------------------------------------------------*/

  $(window).bind('load', function () {
    parallaxInit();
  });

  function parallaxInit() {
    testMobile = isMobile.any();

    if (testMobile == null) {
      $('.parallax .bg1').parallax("50%", 0.6);
      $('.parallax .bg2').parallax("50%", 0.6);
      $('.parallax .bg3').parallax("50%", 0.6);
      $('.parallax .bg4').parallax("50%", 0.6);
    }
  }

  jQuery('.milestone-counter').appear(function() {
    $('.milestone-counter').each(function() {
      dataperc = $(this).attr('data-perc'),
      $(this).find('.milestone-count').delay(6000).countTo({
        from: 0,
      to: dataperc,
      speed: 2000,
      refreshInterval: 100
      });
    });
  });
  parallaxInit();

  //img overlays
  $('.team-thumb').on('mouseover', function() {
    var overlay = $(this).find('.team-overlay');
    var content = $(this).find('.overlay-content');

    overlay.stop(true,true).fadeIn(600);
    content.stop().animate({'top': "40%",
      opacity:1 }, 600);

  }).on('mouseleave', function() {
    var overlay = $(this).find('.team-overlay');
    var content = $(this).find('.overlay-content');

    content.stop().animate({'top': "60%",
      opacity:0  }, 300, function() {
        content.css('top',"20%")});

    overlay.fadeOut(300);
  });

});

// BEGIN WINDOW.LOAD FUNCTION
$(window).load(function() {

  $('#load').fadeOut().remove();
  $(window).trigger( 'hashchange' );
  $(window).trigger( 'resize' );
  $('[data-spy="scroll"]').each(function () {
    var $spy = $(this).scrollspy('refresh');
  });

  /* ------------------------------------------------------------------------ */
  /* FLEX SLIDER */
  /* ------------------------------------------------------------------------ */

  if ( $.browser.safari ) {
    $('.flexslider').flexslider({
      animation: "slide",
      direction: "horizontal", 
      slideshow: false,
      slideshowSpeed: 3500,
      animationDuration: 500,
      directionNav: true,
      controlNav: false,
      useCSS: false
    });
  }
  $('.flexslider').flexslider({
    animation: "slide",
    direction: "horizontal", 
    slideshow: false,
    slideshowSpeed: 3500,
    animationDuration: 500,
    directionNav: true,
    controlNav: false

  });

  /* ------------------------------------------------------------------------ */
  /* Skillbar */
  /* ------------------------------------------------------------------------ */
  jQuery('.skillbar').appear(function() {
    $('.skillbar').each(function() {
      dataperc = $(this).attr('data-perc'),
      $(this).find('.skill-percentage').animate({ "width" : dataperc + "%"}, dataperc*10);
    });
  });

  /* ------------------------------------------------------------------------ */
  /* TEXT FITTING FOR HOME STYLING 2 */
  /* ------------------------------------------------------------------------ */
  $('.home-slide-content').fitText(1.2);
  $('.fittext-content').fitText(2);

  /* ------------------------------------------------------------------------ */
  /* STICKY NAVIGATION */
  /* ------------------------------------------------------------------------ */

  $("nav.sticky-nav").sticky({ topSpacing: 0, className: 'sticky', wrapperClassName: 'main-menu-wrapper' });

  if ($(window).scrollTop() > $(window).height()) {
    $('nav.transparent').addClass('scroll');
  } else {
    $('nav.transparent').removeClass('scroll');
  }

  $(window).on("scroll", function() {
    var winHeight = $(window).height();
    var windowWidth = $(window).width();
    var windowScroll = $(window).scrollTop();
    var home_height =  $('#home').outerHeight();

    if ($(window).scrollTop() > home_height) {
      $('nav.transparent').addClass('scroll');
    } else {
      $('nav.transparent').removeClass('scroll');
    }
  });

  /* ------------------------------------------------------------------------ */
  /* SELECTNAV - A DROPDOWN NAVIGATION FOR SMALL SCREENS */
  /* ------------------------------------------------------------------------ */
  selectnav('nav', {
    nested: true,
    indent: '-'
  });
});

$('#home-slider.flexslider').flexslider({
  animation: "swing",
  direction: "vertical", 
  slideshow: true,
  slideshowSpeed: 3500,
  animationDuration: 1000,
  directionNav: false,
  controlNav: true,
  smootheHeight:true,
  after: function(slider) {
    slider.removeClass('loading');
  }
});

(function($) {
  $.fn.countTo = function(options) {
    // merge the default plugin settings with the custom options
    options = $.extend({}, $.fn.countTo.defaults, options || {});

    // how many times to update the value, and how much to increment the value on each update
    var loops = Math.ceil(options.speed / options.refreshInterval),
        increment = (options.to - options.from) / loops;

    return $(this).delay(1000).each(function() {
      var _this = this,
           loopCount = 0,
           value = options.from,
           interval = setInterval(updateTimer, options.refreshInterval);

    function updateTimer() {
      value += increment;
      loopCount++;
      $(_this).html(value.toFixed(options.decimals));

      if (typeof(options.onUpdate) == 'function') {
        options.onUpdate.call(_this, value);
      }

      if (loopCount >= loops) {
        clearInterval(interval);
        value = options.to;

        if (typeof(options.onComplete) == 'function') {
          options.onComplete.call(_this, value);
        }
      }
    }
    });
  };

  $.fn.countTo.defaults = {
    from: 0,  // the number the element should start at
    to: 100,  // the number the element should end at
    speed: 1000,  // how long it should take to count between the target numbers
    refreshInterval: 100,  // how often the element should be updated
    decimals: 0,  // the number of decimal places to show
    onUpdate: null,  // callback method for every time the element is updated,
    onComplete: null,  // callback method for when the element finishes updating
  };
})(jQuery);
