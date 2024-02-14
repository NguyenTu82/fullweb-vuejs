import { mapGetters, mapMutations } from "vuex";
export default {
  name: "TabItem",
  data() {
    return {
      classNavTabs: "tabs__item",
      classNavTabSelected: "tabs__item--selected",
    };
  },
  mounted() {},
  computed: {
    ...mapGetters(["depositCurrentTab"]),
  },
  methods: {
    ...mapMutations(["DEPOSIT_CHANGE_TAB"]),
    navigate(tab) {
      this.DEPOSIT_CHANGE_TAB(tab);
    },
  },
};
