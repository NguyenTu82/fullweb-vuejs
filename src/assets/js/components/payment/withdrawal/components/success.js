export default {
  title: "成功",
  name: "Success",
  components: {},
  data() {
    return {};
  },
  watch: {},
  methods: {
    withdrawalHistory() {
      this.$router.push({
        name: "WithdrawalHistory",
        query: {},
      });
    },
  },
};
