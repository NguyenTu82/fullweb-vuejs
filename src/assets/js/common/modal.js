const initModal = () => {
  const topButton = document.querySelector(".searchbar__top-button");
  const buttons = document.querySelectorAll(".searchbar__bottom-button");
  const modal = document.querySelector(".modal");
  const modalClose = document.querySelector(".modal__close");

  if (buttons !== null) {
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        modal.classList.remove("hidden");
      });
    });
  }

  if (topButton !== null) {
    topButton.addEventListener("click", () => {
      modal.classList.remove("hidden");
    });
  }

  if (modalClose !== null) {
    modalClose.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  }
};

export default { initModal };
