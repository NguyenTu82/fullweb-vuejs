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
      status: "",
      lists: [],
    };
  },
  props: {},
  methods: {
    handleBackList() {
      this.$router.push({
        name: "orderInvest",
      });
    },
  },
  computed: {},
  created() {
    this.orderName = this.$route.query.name;
    this.status = this.$route.query.status;
    this.lists = this.$route.query.tagList ? JSON.parse(this.$route.query.tagList) : [];
    if (!this.orderName && this.status) {
      this.$router.push({
        path: "/home",
      });
    }
  },
};
