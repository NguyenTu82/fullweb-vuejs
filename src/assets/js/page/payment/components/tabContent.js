export default {
  name: "TabContent",
  data() {
    return {
      classNavTabs: "button__square",
      classNavTabSelected: "button__square--selected",
      components: {
        PAYMENT: "Deposit",
        PAYMENT_WITHDRAWAL: "PaymentWithdrawal",
        PAYMENT_HISTORY: "WithdrawalHistory",
      },
      tabIndex: {
        PAYMENT: "1",
        PAYMENT_WITHDRAWAL: "2",
        PAYMENT_HISTORY: "3",
      },
    };
  },
  mounted() {
    const navTabs = document.querySelectorAll(`.${this.classNavTabs}`);
    navTabs.forEach((el, index) => {
      let attrIndex = el.getAttribute("data-index");
      el.classList.remove(this.classNavTabSelected);

      if (
        (this.$router.currentRoute._value.name === this.components.PAYMENT &&
          attrIndex === this.tabIndex.PAYMENT) ||
        (this.$router.currentRoute._value.name ===
          this.components.PAYMENT_WITHDRAWAL &&
          attrIndex === this.tabIndex.PAYMENT_WITHDRAWAL) ||
        (this.$router.currentRoute._value.name ===
          this.components.PAYMENT_HISTORY &&
          attrIndex === this.tabIndex.PAYMENT_HISTORY)
      ) {
        navTabs[index].classList.add(this.classNavTabSelected);
      }
    });
  },
};
