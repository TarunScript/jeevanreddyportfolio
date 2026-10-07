
$(document).ready(function () {
  $(window).scroll(function () {
    //  sticky navbar on scroll script  //
    if (this.scrollY > 20) {
      $(".navbar").addClass("sticky");
    } else {
      $(".navbar").removeClass("sticky");
    }

    //  scroll-up button show/hide script  //
    if (this.scrollY > 500) {
      $(".scroll-up-btn").addClass("show");
    } else {
      $(".scroll-up-btn").removeClass("show");
    }
  });

  //  slide-up script  //

  $(".scroll-up-btn").click(function () {
    $("html").animate({ scrollTop: 0 });
    //  removing smooth scroll on slide-up button click  //
    $("html").css("scrollBehavior", "auto");
  });

  $(".navbar .menu li a").click(function () {
    //  Smooth scroll on Menu Items click  //

    $("html").css("scrollBehavior", "smooth");
  });

  //  Toggle Navbar  //

  $(".menu-btn").click(function () {
    $(".navbar .menu").toggleClass("active");
    $(".menu-btn i").toggleClass("active");
  });

  //  Typing Text Animation  //

  var typed = new Typed(".typing", {
    strings: [
      "Founder & CEO",
      "Entrepreneur",
      "Venture Builder",
      "Public Speaker"
    ],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
  });

  var typed = new Typed(".typing-2", {
    strings: [
      "Founder & CEO",
      "Entrepreneur",
      "Venture Builder",
      "Public Speaker"
    ],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
  });

  //  Owl Carousel  //

  $(".carousel").owlCarousel({
    margin: 20,
    loop: true,
    autoplay: true,
    autoplayTimeOut: 2000,
    autoplayHoverPause: true,
    nav: true,
    navText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>'
    ],
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 2,
        nav: true
      },
      1000: {
        items: 3,
        nav: true
      }
    }
  });

  // ===== Moments & Milestones Gallery Tabs ===== //
  $(".gallery-tab-btn").click(function () {
    var category = $(this).data("category");
    $(".gallery-tab-btn").removeClass("active");
    $(this).addClass("active");

    $(".gallery-category-pane").removeClass("active");
    $("#pane-" + category).addClass("active");
  });

  // ===== Gallery Expand / Show Less Toggle ===== //
  $(".gallery-toggle-btn").click(function () {
    var targetId = $(this).data("target");
    var total = $(this).data("total");
    var $pane = $("#" + targetId);
    var $hiddenItems = $pane.find(".gallery-card.gallery-item-hidden, .gallery-card.gallery-item-revealed");

    if ($(this).hasClass("expanded")) {
      $hiddenItems.addClass("gallery-item-hidden").removeClass("gallery-item-revealed");
      $(this).removeClass("expanded");
      $(this).html('<i class="fas fa-th-large"></i> View All Photos (' + total + ')');
    } else {
      $hiddenItems.removeClass("gallery-item-hidden").addClass("gallery-item-revealed");
      $(this).addClass("expanded");
      $(this).html('<i class="fas fa-compress-alt"></i> Show Less');
    }
  });

  // ===== Photo Lightbox Modal ===== //
  var currentLightboxIndex = 0;
  var currentLightboxItems = [];

  function openLightbox(index, items) {
    currentLightboxIndex = index;
    currentLightboxItems = items;
    updateLightboxContent();
    $("#photoLightbox").addClass("active");
    $("body").css("overflow", "hidden");
  }

  function closeLightbox() {
    $("#photoLightbox").removeClass("active");
    $("body").css("overflow", "auto");
  }

  function updateLightboxContent() {
    if (!currentLightboxItems.length) return;
    var item = currentLightboxItems[currentLightboxIndex];
    $("#lightboxImg").attr("src", item.src).attr("alt", item.title);
    $("#lightboxTitle").text(item.title);
    $("#lightboxTag").text(item.tag);
  }

  $(document).on("click", ".gallery-card", function () {
    var $activePane = $(this).closest(".gallery-category-pane");
    var $cards = $activePane.find(".gallery-card");
    var items = [];
    var clickedIndex = 0;
    var thisCard = this;

    $cards.each(function (idx) {
      var src = $(this).find("img").attr("src");
      var title = $(this).data("title") || $(this).find("h4").text();
      var tag = $(this).data("tag") || $(this).find(".gallery-badge").text();
      items.push({ src: src, title: title, tag: tag });
      if (this === thisCard) {
        clickedIndex = idx;
      }
    });

    openLightbox(clickedIndex, items);
  });

  $("#lightboxClose, .lightbox-backdrop").click(function () {
    closeLightbox();
  });

  $("#lightboxPrev").click(function (e) {
    e.stopPropagation();
    if (currentLightboxItems.length > 0) {
      currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxItems.length) % currentLightboxItems.length;
      updateLightboxContent();
    }
  });

  $("#lightboxNext").click(function (e) {
    e.stopPropagation();
    if (currentLightboxItems.length > 0) {
      currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxItems.length;
      updateLightboxContent();
    }
  });

  $(document).keydown(function (e) {
    if (!$("#photoLightbox").hasClass("active")) return;
    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowLeft") {
      $("#lightboxPrev").click();
    } else if (e.key === "ArrowRight") {
      $("#lightboxNext").click();
    }
  });
});