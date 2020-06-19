// $(".header-banner-images").slick({
//   dots: true,
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   prevArrow: false,
//   nextArrow: false,
// });

$(".best-sellers-carousel").slick({
  arrows: false,
  dots: true,
  slidesToShow: 2,
  slidesToScroll: 1,
  infinite: true,
  mobileFirst: true,
  responsive: [
    {
      breakpoint: 899,
      settings: {
        slidesToShow: 4,
        arrows: true,
        dots: false,
        infinite: true,
      },
    },
    {
      breakpoint: 767,
      settings: {
        infinite: true,
        dots: true,
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 419,
      settings: {
        infinite: true,
        dots: true,
        centerMode: false,
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 200,
      settings: {
        infinite: true,
        dots: true,
        centerMode: false,
        slidesToShow: 2,
      },
    },
  ],
});
