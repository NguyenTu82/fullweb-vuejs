import TopInfo from "@/components/common/TopInfo";
import commonJs from "@/assets/js/common/common";

export default {
  name: "SettingDoc",
  components: {
    TopInfo,
  },
  data() {
    return {
      docList: [],
    };
  },
  mounted() {},
  methods: {
    getListDocument() {
      this.$store
        .dispatch("getdocInfotData", {
          inv_trust_assoc_cd: null,
          doc_cls: null,
          agree_sts: 1,
          search_ver_cls: 2,
          agreement_cls: 1,
        })
        .then(() => {
          this.docList = this.$store.getters.getdocInfoList.doc_info_list;
        });
    },
    handelReadPdf(item) {
      window.open(item.doc_pdf_path, "_parent");
    },
    aleadyRead(id, isread) {
      this.$store
        .dispatch("getDocsRead", {
          SEQ_NO: id,
          READ_FLG: isread,
        })
        .then(() => {});
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
        .dispatch("getDocConfirm", {
          SEQ_NO: id,
        })
        .then(() => {
          if (this.$store.getters.getConfirmDoc.STATUS == "OK") {
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
  },
};
