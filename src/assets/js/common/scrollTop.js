const initScrollTop = () => {
  const scrollTopButton = document.querySelector(".scrollTopButton");
  if (scrollTopButton == undefined || scrollTopButton == null) {
    return;
  }
  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      scrollTopButton.classList.remove("hidden");
    } else {
      scrollTopButton.classList.add("hidden");
    }
  });
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  scrollTopButton.addEventListener("click", scrollToTop);
};

export default { initScrollTop };
