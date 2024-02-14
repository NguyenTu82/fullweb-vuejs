const initAccordion = () => {
  const accordionOrder = document.querySelector(".reference_order__accordion");
  const accordionList = document.querySelector(
    ".reference_order__accordion-list"
  );
  const accrodionTable = document.querySelectorAll(".accordion");
  const orderButton = document.getElementById("accordion");
  const introductionButton = document.querySelector(
    ".brand__introduction-accordion"
  );

  let flag = true;

  if (accordionOrder !== null) {
    accordionOrder.addEventListener("click", () => {
      accordionOrder.classList.toggle("reference_order__accordion--close");
      accordionList.classList.toggle("reference_order__accordion-list--close");
    });
  }

  if (orderButton !== null) {
    orderButton.addEventListener("click", () => {
      flag = !flag;
      accrodionTable.forEach((item) => {
        item.classList.toggle("order__forms--hidden");
      });
      orderButton.textContent = flag ? "開く" : "閉じる";
    });
  }

  if (introductionButton !== null) {
    introductionButton.addEventListener("click", () => {
      introductionButton.classList.toggle(
        "brand__introduction-accordion--close"
      );
    });
  }
};

export default { initAccordion };
