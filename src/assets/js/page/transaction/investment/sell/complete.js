import TopInfo from "@/components/common/TopInfo";

export default {
  title: "ホーム",
  name: "",
  components: {
    TopInfo,
  },
  data() {
    return {
      orderName: "",
    };
  },
  props: {},
  methods: {
    handleBackList() {
      this.$router.push({
        path: "/reference/order/invest",
      });
    },
    getConfirmCanelBuySuccess() {
      return this.$route.query.confirmCanelBuySuccess !== "false";
    }
  },
  computed: {},
  created() {
    this.orderName = this.$route.query.name;
    if (!this.orderName) {
      this.$router.push({
        path: "/home",
      });
    }
  },
};
