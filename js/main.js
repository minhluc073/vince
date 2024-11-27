/**

  * selectImages
  * btnQuantity
  * delete_file
  * goTop
  * closeAnnouncement
  * sidebar_mb
  * tabs
  * swatchColor
  * changeValue
  * footer
  * btn_wishlist
  * btn_loading
  * loadItem
  * stagger_wrap
  * clickModalSecond
  * scrollProgress
  * headerSticky
  * img_group
  * filterTab
  * autoPopup
  * rangePrice
  * clickControl
  * checkClick
  * write_review
  * customInput
  * chooseOption
  * withDiscount
  * totalPriceVariant
  * variantPicker
  * scrollGridProduct
  * hoverPin
  * togglePassword
  * customDropdown
  * ajaxContactForm
  * loadmore
  * hasPurchased
  * checkPaymentCard
  * handleFooter
  * handleProgress
  * heightModalmenu
  * ajaxSubscribe.eventLoad
  * preloader

 */

(function ($) {
  "use strict";


   /* selectImages
  -------------------------------------------------------------------------------------*/
  var selectImages = function () {
    if ($(".image-select").length > 0) {
      const selectIMG = $(".image-select");

      selectIMG.find("option").each((idx, elem) => {
        const selectOption = $(elem);
        const imgURL = selectOption.attr("data-thumbnail");
        if (imgURL) {
          selectOption.attr(
            "data-content",
            `<img src="${imgURL}" /> ${selectOption.text()}`
          );
        }
      });
      selectIMG.selectpicker();
    }
  };

 
  /* preloader
  -------------------------------------------------------------------------------------*/
  const preloader = function () {
    if ($("body").hasClass("preload-wrapper")) {
      setTimeout(function () {
        $(".preload").fadeOut("slow", function () {
          $(this).remove();
        });
      }, 100);
    }
  };



 


  /* Go Top
  -------------------------------------------------------------------------------------*/
  var goTop = function () {
    let scrollTopButton = $("#scroll-top");
    let isButtonVisible = false;

    function checkScroll() {
      let scrollTop = $(window).scrollTop();

      if (scrollTop > 500 && !isButtonVisible) {
        scrollTopButton.addClass("show");
        isButtonVisible = true;
      } else if (scrollTop <= 500 && isButtonVisible) {
        scrollTopButton.removeClass("show");
        isButtonVisible = false;
      }
    }

    function onScroll() {
      requestAnimationFrame(checkScroll);
    }

    $(window).on("scroll", onScroll);

    scrollTopButton.on("click", function (e) {
      e.preventDefault();
      $("html, body").scrollTop(0);
    });
  };




  /* color swatch product
  -------------------------------------------------------------------------*/
  var swatchColor = function () {
    if ($(".card-product").length > 0) {
      $(".color-swatch").on("click, mouseover", function () {
        var swatchColor = $(this).find("img").attr("src");
        var imgProduct = $(this).closest(".card-product").find(".img-product");
        imgProduct.attr("src", swatchColor);
        $(this)
          .closest(".card-product")
          .find(".color-swatch.active")
          .removeClass("active");

        $(this).addClass("active");
      });
    }
  };


  /* close announcement bar
  -------------------------------------------------------------------------*/
  var closeAnnouncement = function () {
    $(".close-announcement-bar").on("click", function (e) {
      e.preventDefault();
      var $this = $(this);
      var $height = $(".announcement-bar").height() + "px";
      $this.closest(".announcement-bar").css("margin-top", `-${$height}`);

      $(".announcement-bar").fadeOut("slow", function () {
        $this.closest(".announcement-bar").remove();
      });
    });
  };




  /* sidebar mobile
  -------------------------------------------------------------------------*/
  var sidebar_mb = function () {
    if ($(".wrap-sidebar-account").length > 0) {
      var sidebar = $(".wrap-sidebar-account").html();
      $(".sidebar-mobile-append").append(sidebar);
    }
  };

  /* infinite scroll
  -------------------------------------------------------------------------*/
  var loadItem = function () {
    const gridInitialItems = 8;
    const listInitialItems = 4;
    const gridItemsPerPage = 4;
    const listItemsPerPage = 2;

    let listItemsDisplayed = listInitialItems;
    let gridItemsDisplayed = gridInitialItems;
    let scrollTimeout;

    function hideExtraItems(layout, itemsDisplayed) {
      layout.find(".loadItem").each(function (index) {
        if (index >= itemsDisplayed) {
          $(this).addClass("hidden");
        }
      });
      if (layout.is("#listLayout")) updateLastVisible(layout);
    }

    function showMoreItems(layout, itemsPerPage, itemsDisplayed) {
      const hiddenItems = layout.find(".loadItem.hidden");

      setTimeout(function () {
        hiddenItems.slice(0, itemsPerPage).removeClass("hidden");
        if (layout.is("#listLayout")) updateLastVisible(layout);
        checkLoadMoreButton(layout);
      }, 600);

      return itemsDisplayed + itemsPerPage;
    }

    function updateLastVisible(layout) {
      layout.find(".loadItem").removeClass("last-visible");
      layout
        .find(".loadItem")
        .not(".hidden")
        .last()
        .addClass("last-visible");
    }
    function checkLoadMoreButton(layout) {
      if (layout.find(".loadItem.hidden").length === 0) {
        if (layout.is("#listLayout")) {
          $("#loadMoreListBtn").hide();
          $("#infiniteScrollList").hide();
        } else if (layout.is("#gridLayout")) {
          $("#loadMoreGridBtn").hide();
          $("#infiniteScrollGrid").hide();
        }
      }
    }

    hideExtraItems($("#listLayout"), listItemsDisplayed);
    hideExtraItems($("#gridLayout"), gridItemsDisplayed);

    $("#loadMoreListBtn").on("click", function () {
      listItemsDisplayed = showMoreItems(
        $("#listLayout"),
        listItemsPerPage,
        listItemsDisplayed
      );
    });



    $("#loadMoreGridBtn").on("click", function () {
      gridItemsDisplayed = showMoreItems(
        $("#gridLayout"),
        gridItemsPerPage,
        gridItemsDisplayed
      );
    });

    // Infinite Scrolling
    function onScroll() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function () {
        const infiniteScrollList = $("#infiniteScrollList");
        const infiniteScrollGrid = $("#infiniteScrollGrid");

        if (
          infiniteScrollList.is(":visible") &&
          isElementInViewport(infiniteScrollList)
        ) {
          listItemsDisplayed = showMoreItems(
            $("#listLayout"),
            listItemsPerPage,
            listItemsDisplayed
          );
        }

        if (
          infiniteScrollGrid.is(":visible") &&
          isElementInViewport(infiniteScrollGrid)
        ) {
          gridItemsDisplayed = showMoreItems(
            $("#gridLayout"),
            gridItemsPerPage,
            gridItemsDisplayed
          );
        }
      }, 300);
    }
    function isElementInViewport(el) {
      const rect = el[0].getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
        (window.innerWidth || document.documentElement.clientWidth)
      );
    }
    $(window).on("scroll", onScroll);
  };





  /* modal second
  -------------------------------------------------------------------------*/
  var clickModalSecond = function () {
    $(".btn-add-to-cart").click(function () {
      $(".tf-add-cart-success").addClass("active");
    });
    $(".tf-add-cart-success .tf-add-cart-close").click(function () {
      $(".tf-add-cart-success").removeClass("active");
    });
    $(".show-size-guide").click(function () {
      $("#size-guide").modal("show");
    });
    $(".show-shopping-cart").click(function () {
      $("#shoppingCart").modal("show");
    });
    $(".btn-icon-action.wishlist").click(function () {
      $("#wishlist").modal("show");
    });

    $(".btn-add-note").click(function () {
      $(".add-note").addClass("open");
    });
    $(".btn-add-coupon").click(function () {
      $(".add-coupon").addClass("open");
    });
    $(".btn-estimate-shipping").click(function () {
      $(".estimate-shipping").addClass("open");
    });
    $(".tf-mini-cart-tool-close").click(function () {
      $(".tf-mini-cart-tool-openable").removeClass("open");
    });
  };

  /* header sticky
  -------------------------------------------------------------------------*/
  var headerSticky = function () {
    let lastScrollTop = 0;
    let delta = 5;
    let navbarHeight = $("header").outerHeight();
    let didScroll = false;

    $(window).scroll(function () {
      didScroll = true;
    });

    setInterval(function () {
      if (didScroll) {
        let st = $(window).scrollTop();
        navbarHeight = $("header").outerHeight();

        if (st > navbarHeight) {
          if (st > lastScrollTop + delta) {
            $("header").css("top", `-${navbarHeight}px`);
          } else if (st < lastScrollTop - delta) {
            $("header").css("top", "0");
            $("header").addClass("header-bg");
          }
        } else {
          $("header").css("top", "unset");
          $("header").removeClass("header-bg");
        }
        lastScrollTop = st;
        didScroll = false;
      }
    }, 250);
  };



  /* contact form
  ------------------------------------------------------------------------------------- */
  var ajaxContactForm = function () {
    $("#contactform").each(function () {
      $(this).validate({
        submitHandler: function (form) {
          var $form = $(form),
            str = $form.serialize(),
            loading = $("<div />", { class: "loading" });

          $.ajax({
            type: "POST",
            url: $form.attr("action"),
            data: str,
            beforeSend: function () {
              $form.find(".send-wrap").append(loading);
            },
            success: function (msg) {
              var result, cls;
              if (msg == "Success") {
                result =
                  "Email Sent Successfully. Thank you, Your application is accepted - we will contact you shortly";
                cls = "msg-success";
              } else {
                result = "Error sending email.";
                cls = "msg-error";
              }
              $form.prepend(
                $("<div />", {
                  class: "flat-alert " + cls,
                  text: result,
                }).append(
                  $(
                    '<a class="close" href="#"><i class="icon icon-close2"></i></a>'
                  )
                )
              );

              $form.find(":input").not(".submit").val("");
            },
            complete: function (xhr, status, error_thrown) {
              $form.find(".loading").remove();
            },
          });
        },
      });
    }); 
  };

  /* subscribe mailchimp
  ------------------------------------------------------------------------------------- */
  var ajaxSubscribe = {
    obj: {
      subscribeEmail: $("#subscribe-email"),
      subscribeButton: $("#subscribe-button"),
      subscribeMsg: $("#subscribe-msg"),
      subscribeContent: $("#subscribe-content"),
      dataMailchimp: $("#subscribe-form").attr("data-mailchimp"),
      success_message:
        '<div class="notification_ok text-success">Thank you for joining our mailing list!</div>',
      failure_message:
        '<div class="notification_error text-critical">Error! <strong>There was a problem processing your submission.</strong></div>',
      noticeError: '<div class="notification_error">{msg}</div>',
      noticeInfo: '<div class="notification_error">{msg}</div>',
      basicAction: "mail/subscribe.php",
      mailChimpAction: "mail/subscribe-mailchimp.php",
    },

    eventLoad: function () {
      var objUse = ajaxSubscribe.obj;

      $(objUse.subscribeButton).on("click", function () {
        if (window.ajaxCalling) return;
        var isMailchimp = objUse.dataMailchimp === "true";

        ajaxSubscribe.ajaxCall(objUse.basicAction);
      });
    },

    ajaxCall: function (action) {
      window.ajaxCalling = true;
      var objUse = ajaxSubscribe.obj;
      var messageDiv = objUse.subscribeMsg.html("").hide();
      $.ajax({
        url: action,
        type: "POST",
        dataType: "json",
        data: {
          subscribeEmail: objUse.subscribeEmail.val(),
        },
        success: function (responseData, textStatus, jqXHR) {
          if (responseData.status) {
            objUse.subscribeContent.fadeOut(500, function () {
              messageDiv.html(objUse.success_message).fadeIn(500);
            });
          } else {
            switch (responseData.msg) {
              case "email-required":
                messageDiv.html(
                  objUse.noticeError.replace(
                    "{msg}",
                    "Error! <strong>Email is required.</strong>"
                  )
                );
                break;
              case "email-err":
                messageDiv.html(
                  objUse.noticeError.replace(
                    "{msg}",
                    "Error! <strong>Email invalid.</strong>"
                  )
                );
                break;
              case "duplicate":
                messageDiv.html(
                  objUse.noticeError.replace(
                    "{msg}",
                    "Error! <strong>Email is duplicate.</strong>"
                  )
                );
                break;
              case "filewrite":
                messageDiv.html(
                  objUse.noticeInfo.replace(
                    "{msg}",
                    "Error! <strong>Mail list file is open.</strong>"
                  )
                );
                break;
              case "undefined":
                messageDiv.html(
                  objUse.noticeInfo.replace(
                    "{msg}",
                    "Error! <strong>undefined error.</strong>"
                  )
                );
                break;
              case "api-error":
                objUse.subscribeContent.fadeOut(500, function () {
                  messageDiv.html(objUse.failure_message);
                });
            }
            messageDiv.fadeIn(500);
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          alert("Connection error");
        },
        complete: function (data) {
          window.ajaxCalling = false;
        },
      });
    },
  };

  /* auto popup
  ------------------------------------------------------------------------------------- */
  var autoPopup = function () {
    if ($(".auto-popup").length > 0) {
      let showPopup = sessionStorage.getItem("showPopup");
      if (!JSON.parse(showPopup)) {
        setTimeout(function () {
          $(".auto-popup").modal("show");
        }, 3000);
      }
    }
    $(".btn-hide-popup").on("click", function () {
      sessionStorage.setItem("showPopup", true);
    });
  };





  /* totalPriceVariant
  ------------------------------------------------------------------------------------- */
  var totalPriceVariant = function () {
    $(".tf-product-info-list,.tf-cart-item").each(function () {
      var productItem = $(this);
      var basePrice = parseFloat(productItem.find(".price-on-sale").data("base-price")) || parseFloat(productItem.find(".price-on-sale").text().replace("$", ""));
      var quantityInput = productItem.find(".quantity-product");

      productItem.find(".color-btn, .size-btn").on("click", function () {
        var newPrice = parseFloat($(this).data("price")) || basePrice;
        quantityInput.val(1);
        productItem.find(".price-on-sale").text(
          "$" + newPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        );
        updateTotalPrice(newPrice, productItem);
      });

      productItem.find(".btn-increase").on("click", function () {
        var currentQuantity = parseInt(quantityInput.val());
        quantityInput.val(currentQuantity + 1);
        updateTotalPrice(null, productItem);
      });

      productItem.find(".btn-decrease").on("click", function () {
        var currentQuantity = parseInt(quantityInput.val());
        if (currentQuantity > 1) {
          quantityInput.val(currentQuantity - 1);
          updateTotalPrice(null, productItem);
        }
      });

      function updateTotalPrice(price, scope) {
        var currentPrice = price || parseFloat(scope.find(".price-on-sale").text().replace("$", ""));
        var quantity = parseInt(scope.find(".quantity-product").val());
        var totalPrice = currentPrice * quantity;
        scope.find(".total-price").text(
          "$" + totalPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        );
      }
    });
  };


  /* scroll grid product
  ------------------------------------------------------------------------------------- */
  var scrollGridProduct = function () {
    var headerHeight = $("#header").outerHeight();
    var activescrollBtn = null;
    $(".btn-scroll-target").on("click", function () {
      var scroll = $(this).data("scroll");
      var target = $(".item-scroll-target[data-scroll='" + scroll + "']");
      $("html, body").animate(
        {
          scrollTop: target.offset().top - headerHeight,
        },
        100
      );

      $(".btn-scroll-target").removeClass("active");
      $(this).addClass("active");
      activescrollBtn = $(this);
    });

    $(window).on("scroll", function () {
      var isActiveSet = false;
      $(".item-scroll-target").each(function () {
        var targetTop = $(this).offset().top - headerHeight;
        if (
          $(window).scrollTop() >= targetTop &&
          $(window).scrollTop() < targetTop + $(this).outerHeight()
        ) {
          var scroll = $(this).data("scroll");
          if (
            !isActiveSet &&
            (activescrollBtn === null ||
              activescrollBtn.data("scroll") !== scroll)
          ) {
            $(".btn-scroll-target").removeClass("active");
            $(".btn-scroll-target[data-scroll='" + scroll + "']").addClass(
              "active"
            );
          }
          isActiveSet = true;
        }
      });
      if (!isActiveSet && activescrollBtn !== null) {
        $(".btn-scroll-target").removeClass("active");
        activescrollBtn.addClass("active");
      }
    });
  };

  var scrollQuickView = function () {
  
    var scrollContainer = $(".modal-quick-view .wrapper-scroll-quickview");
    var activescrollBtn = null;
    var offsetTolerance = 100; 
  
    function getTargetScroll(target, isHorizontal) {
      if (isHorizontal) {
        return (
          target.offset().left - scrollContainer.offset().left + scrollContainer.scrollLeft()
        );
      } else {
        return (
          target.offset().top - scrollContainer.offset().top + scrollContainer.scrollTop()
        );
      }
    }
  
    function isHorizontalMode() {
      return window.innerWidth < 767; 
    }
  
    $(".btn-scroll-quickview").on("click", function () {
      console.log("Button clicked!");
  
      var scroll = $(this).data("scroll-quickview");
      var target = $(
        `.item-scroll-quickview[data-scroll-quickview='${scroll}']`
      );
  
      if (target.length > 0) {
        var isHorizontal = isHorizontalMode(); 
        var targetScroll = getTargetScroll(target, isHorizontal);
  
        console.log("Scrolling to:", targetScroll, "Mode:", isHorizontal ? "Horizontal" : "Vertical");
  
        if (isHorizontal) {
          scrollContainer.animate({ scrollLeft: targetScroll }, 600);
        } else {
          scrollContainer.animate({ scrollTop: targetScroll }, 600);
        }
  
        $(".btn-scroll-quickview").removeClass("active");
        $(this).addClass("active");
        activescrollBtn = $(this);
      } else {
        console.error("Target not found for scroll:", scroll);
      }
    });
  
    scrollContainer.on("scroll", function () {  
      var isHorizontal = isHorizontalMode(); 
  
      $(".item-scroll-quickview").each(function () {
        var targetStart = getTargetScroll($(this), isHorizontal) - offsetTolerance;
        var targetEnd = targetStart + (isHorizontal ? $(this).outerWidth() : $(this).outerHeight()) + offsetTolerance;
  
        var currentScroll = isHorizontal
          ? scrollContainer.scrollLeft()
          : scrollContainer.scrollTop();
  
        if (currentScroll >= targetStart && currentScroll < targetEnd) {
          var scroll = $(this).data("scroll-quickview");
  
          $(".btn-scroll-quickview").removeClass("active");
          $(`.btn-scroll-quickview[data-scroll-quickview='${scroll}']`).addClass(
            "active"
          );
        }
      });
    });


  };
  
  var hoverVideo = function (){
    $('.hover-video').on('mouseenter', function () {
      this.play(); 
  });
  // $('.hover-video').on('mouseleave', function () {
  //   this.pause();
  // });

  $('.collection-social').each(function () {
    const container = $(this); 
    const video = container.find('video'); 
    const poster = container.find('.poster'); 

    container.on('mouseenter', function () {
        poster.addClass('hide'); 
        video[0].play(); 
    });

    container.on('mouseleave', function () {
        video[0].pause(); 
        poster.removeClass('hide'); 
    });
  });

  }
  
  


  /* footer accordion
  -------------------------------------------------------------------------*/
  var handleFooter = function () {
    var footerAccordion = function () {
      var args = { duration: 250 };
      $(".footer-heading-mobile").on("click", function () {
        $(this).parent(".footer-col-block").toggleClass("open");
        if (!$(this).parent(".footer-col-block").is(".open")) {
          $(this).next().slideUp(args);
        } else {
          $(this).next().slideDown(args);
        }
      });
    };
    function handleAccordion() {
      if (matchMedia("only screen and (max-width: 767px)").matches) {
        if (!$(".footer-heading-mobile").data("accordion-initialized")) {
          footerAccordion();
          $(".footer-heading-mobile").data("accordion-initialized", true);
        }
      } else {
        $(".footer-heading-mobile").off("click");
        $(".footer-heading-mobile").parent(".footer-col-block").removeClass("open");
        $(".footer-heading-mobile").next().removeAttr("style");
        $(".footer-heading-mobile").data("accordion-initialized", false);
      }
    }
    handleAccordion();
    window.addEventListener("resize", function () {
      handleAccordion();
    });
  };


  // Dom Ready
  $(function () {
    selectImages();
    btnQuantity();
    delete_file();
    goTop();
    closeAnnouncement();
    sidebar_mb();
    tabs();
    swatchColor();
    changeValue();
    footer();
    btn_wishlist();
    btn_loading();
    loadItem();
    stagger_wrap();
    clickModalSecond();
    scrollProgress();
    headerSticky();
    img_group();
    filterTab();
    autoPopup();
    rangePrice();
    clickControl();
    checkClick();
    write_review();
    customInput();
    chooseOption();
    withDiscount();
    totalPriceVariant();
    variantPicker();
    scrollGridProduct();
    hoverPin();
    togglePassword();
    customDropdown();
    ajaxContactForm();
    loadmore();
    hasPurchased();
    checkPaymentCard();
    handleFooter();
    handleProgress();
    heightModalmenu();
    scrollQuickView();
    hoverVideo();
    ajaxSubscribe.eventLoad();
    new WOW().init();
    // preloader();
    
  });
})(jQuery);
