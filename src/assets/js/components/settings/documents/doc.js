import TopInfo from "@/components/common/TopInfo";

export default {
  name: "SettingDoc",
  components: {
    TopInfo,
  },
  data() {
    return {
      documentList: [],
    };
  },
  mounted() {},
  methods: {
    getListDocument() {
      this.$store.dispatch("getdocInfotData", {}).then(() => {
        console.log(this.$store.getters.getdocInfoList);
        this.documentList = this.$store.getters.getdocInfoList;
      });
    },
  },
  created() {
    this.getListDocument();
  },
};
