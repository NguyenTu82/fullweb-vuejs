import TopInfo from "@/components/common/TopInfo";

export default {
  name: "SettingDocuments",
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
      this.$store.dispatch("getDocumentstData", {}).then(() => {
        console.log(this.$store.getters.getDataDocument);
        this.documentList = this.$store.getters.getDataDocument;
      });
    },
  },
  created() {
    this.getListDocument();
  },
};
