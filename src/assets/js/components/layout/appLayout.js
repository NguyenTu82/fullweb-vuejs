import homeLayout from "@/components/layout/homeLayout";
import defaultLayout from "@/components/layout/defaultLayout";
import pageLayout from "@/components/layout/pageLayout";
import emptyLayout from "@/components/layout/emptyLayout";

export default {
  name: "AppLayout",
  components: { defaultLayout, homeLayout, pageLayout, emptyLayout },
  computed: {
    layout() {
      return this.$route.meta.layout || defaultLayout;
    },
  },
  methods: {
    initStateOfMsg() {
      this.$store.commit("hidePrompt");
      let popupConfig = {
        isShow: false,
        text: "",
        btnName: "",
        title: "",
      };
      this.$store.commit("showPopup", popupConfig);
    },
  },
  created() {
    this.initStateOfMsg();
  },
};
