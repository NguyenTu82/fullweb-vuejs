export default {
  name: "TabContent",
  data() {
    return {
      classNavTabs: "button__square",
      classNavTabSelected: "button__square--selected",
      components: {
        MARKET_CONDITION: "MarketCondition",
        MARKET_NEWS: "MarketNews",
      },
      tabIndex: {
        MARKET_CONDITION: "1",
        MARKET_NEWS: "2",
      },
    };
  },
  mounted() {
    const navTabs = document.querySelectorAll(`.${this.classNavTabs}`);

    navTabs.forEach((el, index) => {
      let attrIndex = el.getAttribute("data-index");
      el.classList.remove(this.classNavTabSelected);

      if (
        (this.$router.currentRoute.value.name ===
          this.components.MARKET_CONDITION &&
          attrIndex === this.tabIndex.MARKET_CONDITION) ||
        (this.$router.currentRoute.value.name === this.components.MARKET_NEWS &&
          attrIndex === this.tabIndex.MARKET_NEWS)
      ) {
        navTabs[index].classList.add(this.classNavTabSelected);
      }
    });
  },
};
