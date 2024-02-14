export default {
  title: "成功",
  name: "Success",
  components: {},
  data() {
    return {};
  },
  methods: {
    withdrawalHistory() {
      this.$router.push({
        name: "WithdrawalHistory",
        query: {},
      });
    },
  },
};
