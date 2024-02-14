import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    isShow: { type: Boolean, default: false },
    dataPDF: { type: Array, default: () => [] },
  },
  data() {
    return {
      arrPDF: [],
    };
  },
  computed: {
    ...mapGetters(["dataConfirmDocument"]),
  },
  methods: {
    ...mapActions(["cAPIConfirmDocument", "getDocumentsRead"]),
    actionCancel() {
      this.$router.go(-1);
      this.$emit("cancel", { name: "showModalPDF", value: false });
    },
    actionConfirm() {
      this.cAPIConfirmDocument({ SEQ_NOS: this.arrPDF.toString() }).then(() => {
        this.$emit("cancel", { name: "showModalPDF", value: false });
      });
    },
    funcReadPDF(SEQ_NO, READ_FLG) {
      if (READ_FLG == 0) {
        this.getDocumentsRead({SEQ_NO, READ_FLG});
      }

      if (this.arrPDF.includes(SEQ_NO)) return;
      this.arrPDF.push(SEQ_NO);
    },
  },
};
