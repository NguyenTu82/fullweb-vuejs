import TopInfo from "@/components/common/TopInfo";

export default {
  name: "TopInfoItem",
  components: { TopInfo },
  props: {
    breadName: {
      default: "リアルタイム入金",
      type: String,
    },
  },
};
