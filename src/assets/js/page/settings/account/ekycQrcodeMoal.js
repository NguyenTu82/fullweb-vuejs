import { mapGetters, mapMutations, mapState } from "vuex";
import QRCode from "qrcodejs2";

export default {
  name: "EkycQrcodeMoal",
  components: {
    QRCode,
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations("ekyc", ["setShowFlg"]),
    onClose() {
      this.setShowFlg(false);
    },
    qrcode() {
      if (!this.getQrLink) {
        return;
      }
      let text = this.getQrLink;
      new QRCode(this.$refs.modleQrCode, {
        width: 150,
        height: 150,
        text,
      });
    },
  },
  computed: {
    ...mapGetters("ekyc", ["getShowFlg", "getQrLink"]),
  },
  created() {
    this.$nextTick(function () {
      this.qrcode();
    });
  }
  
};
