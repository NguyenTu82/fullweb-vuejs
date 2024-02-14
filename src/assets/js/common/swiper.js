import Swiper from "swiper/bundle";
import "swiper/css/bundle";

const swiper = () =>
  new Swiper(".double-rows", {
    // Optional parameters
    direction: "horizontal",
    loop: true,
    slidesPerView: 2,
    spaceBetween: 10,
    breakpoints: {
      768: {
        slidesPerView: 3,
      },
    },
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-next",
      prevEl: ".swiper-prev",
    },
  });

const swiperSingle = () =>
  new Swiper(".single-row", {
    // Optional parameters
    direction: "horizontal",
    loop: true,
    slidesPerView: 2,
    spaceBetween: 10,
    a11y: false,
    breakpoints: {
      768: {
        slidesPerView: 3,
      },
    },
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-next--single",
      prevEl: ".swiper-prev--single",
    },
  });

export default { swiper, swiperSingle };
