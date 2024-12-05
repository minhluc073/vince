if ($(".tf-sw-top_bar").length > 0) {
  var tfSwTopbar = $(".tf-sw-top_bar");
  var preview = tfSwTopbar.data("preview");
  var spacing = tfSwTopbar.data("space");
  var loop = tfSwTopbar.data("loop");
  var speed = tfSwTopbar.data("speed");
  var play = tfSwTopbar.data("auto-play");
  var delay = tfSwTopbar.data("delay");
  var swiper = new Swiper(".tf-sw-top_bar", {
    autoplay: {
      delay: delay,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    observer: true,
    observeParents: true,
    autoplay: play,
    slidesPerView: preview,
    loop: loop,
    spaceBetween: spacing,
    speed: speed,
    navigation: {
      clickable: true,
      nextEl: ".nav-prev-topbar",
      prevEl: ".nav-next-topbar",
    },
  });

  tfSwTopbar.hover(
    function () {
      this.swiper.autoplay.stop();
    },
    function () {
      this.swiper.autoplay.start();
    }
  );
}



















if ($(".tf-sw-partner").length > 0) {
  var preview = $(".tf-sw-partner").data("preview");
  var tablet = $(".tf-sw-partner").data("tablet");
  var mobile = $(".tf-sw-partner").data("mobile");
  var mobileSm = $(".tf-sw-partner").data("mobile-sm");
  var spacingLg = $(".tf-sw-partner").data("space-lg");
  var spacingMd = $(".tf-sw-partner").data("space-md");
  var spacing = $(".tf-sw-partner").data("space");
  var loop = $(".tf-sw-partner").data("loop");
  var play = $(".tf-sw-partner").data("auto-play");
  var speed = $(".tf-sw-partner").data("speed") !== undefined ? $(".tf-sw-slideshow").data("speed") : 1000;
  var swiper = new Swiper(".tf-sw-partner", {
    autoplay: {
      delay: delay,
      disableOnInteraction: false,
    },
    autoplay: play,
    slidesPerView: mobile,
    spaceBetween: spacing,
    speed: speed,
    loop: loop,
    observer: true,
    observeParents: true,
    pagination: {
      el: ".sw-pagination-partner",
      clickable: true,
    },
    navigation: {
      clickable: true,
      nextEl: ".nav-next-partner",
      prevEl: ".nav-prev-partner",
    },
    breakpoints: {
      575: {
        slidesPerView: mobileSm,
        spaceBetween: spacingMd,
      },

      768: {
        slidesPerView: tablet,
        spaceBetween: spacingMd,
      },
      1200: {
        slidesPerView: preview,
        spaceBetween: spacingLg,
      },
    },
  });
  $(".tf-sw-partner").hover(
    function () {
      this.swiper.autoplay.stop();
    },
    function () {
      this.swiper.autoplay.start();
    }
  );
}


if ($(".tf-sw-mobile").length > 0) {
  var swiperMb;
  var screenWidth = $('.tf-sw-mobile').data('screen');
  function initSwiper() {
    if (matchMedia(`only screen and (max-width: ${screenWidth}px)`).matches) {
      if (!swiperMb) {
        var preview = $(".tf-sw-mobile").data("preview");
        var spacing = $(".tf-sw-mobile").data("space");

        swiperMb = new Swiper(".tf-sw-mobile", {
          slidesPerView: preview,
          spaceBetween: spacing,
          speed: 1000,
          pagination: {
            el: ".sw-pagination-mb",
            clickable: true,
          },
          navigation: {
            clickable: true,
            nextEl: ".nav-prev-mb",
            prevEl: ".nav-next-mb",
          },
        });
      }
    } else {
      if (swiperMb) {
        swiperMb.destroy(true, true); 
        swiperMb = null; 
        $(".tf-sw-mobile .swiper-wrapper").removeAttr('style');
        $(".tf-sw-mobile .swiper-slide").removeAttr('style');
      }
    }
  }

  initSwiper();
  window.addEventListener("resize", function () {
    initSwiper();
  });
}
