import TopInfo from "@/components/common/TopInfo";
import commonJs from "@/assets/js/common/common";

export default {
  name: "SettingDocuments",
  components: {
    TopInfo,
  },
  data() {
    return {
      documentList: [],
      pdfOpening: "",
      docRead: "",
      confirmDocs: "",
      device_model: localStorage.getItem("device_model"),
    };
  },
  mounted() {},
  methods: {
    getListDocument() {
      this.$store.dispatch("getDocumentstData", {}).then(() => {
        this.documentList = this.$store.getters.getDataDocument;
      });
    },
    handelReadPdf(item) {
      console.log(item);
      this.pdfOpening = item;
      if (item.READ_FLG === 0) {
        this.aleadyRead(item.SEQ_NO, item.READ_FLG);
      }
      this.handleArggen(item.SEQ_NO, item.DOCUMENT_PDF_PATH);
    },
    aleadyRead(id, isread) {
      this.$store
        .dispatch("getDocumentsRead", {
          SEQ_NO: id,
          READ_FLG: isread,
        })
        .then(() => {
          this.docRead = this.$store.getters.getReadDocument;
          console.log(123, this.docRead);
        });
    },
    handleCheckPdf(id, isAgree) {
      if (isAgree == "1") {
        this.handleArggen(id);
      } else {
        this.setData();
      }
    },
    handleArggen(id, path) {
      this.$store
        .dispatch("getDocumentsConfirm", {
          SEQ_NO: id,
        })
        .then(() => {
          this.confirmDocs = this.$store.getters.getConfirmDocument;
          console.log(123, this.$store.getters.getConfirmDocument);
          if (this.$store.getters.getConfirmDocument.STATUS == "OK") {
            window.open(path, "_parent");
          }
        });
    },
    handleDateTime(datetime) {
      return commonJs.handleDateTime(datetime);
    },
  },
  created() {
    this.getListDocument();
    window.handleCheckPdf = this.handleCheckPdf;
  },
};
