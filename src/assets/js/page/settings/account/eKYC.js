import { mapGetters, mapMutations } from "vuex";
import pageInfoConst from "@/const/pageInfo";
import QRCode from "qrcodejs2";
import httpRequest from "@/assets/js/common/httpRequest";
import commonJs from "@/assets/js/common/common";
import Message from "@/views/settings/components/Message.vue";
import commonConst from "@/const/common";
import EkycQrcodeMoal from "@/views/settings/account/EkycQrcodeMoal.vue";
export default {
  name: "eKYC",
  data() {
    return {
      password: "",
      savePassword: true,
      autoLogin: true,
      formData: {},
      platformType: "",
      link: "",
      getStatusTimer: null,
      // HDH00005_01-217 �����N���n�[�h�R�[�f�B���O�Ŏ�������h�~�@2022-10-05
      DEVICELIST: commonConst.DEVICELIST,
      isMobile: commonJs.isMobile(),
    };
  },
  components: { QRCode, Message, EkycQrcodeMoal },

  mounted() {
    this.$nextTick(function () {
      this.qrcode();
    });
  },
  methods: {
    ...mapMutations("common", [
      "setPageTittle",
      "setPageHeaderType",
      "setPageFooterType",
    ]),
    ...mapMutations("ekyc", ["setShowFlg", "setQrLink"]),
    isBranch(branchDivision) {
      if (this.branchDivision === branchDivision) {
        return true;
      }

      return false;
    },
    jump(url) {
      //新しい画面開く
      if (navigator.userAgent.indexOf('Firefox') !== -1 || navigator.userAgent.indexOf('Chrome') !== -1) {
          this.opened = window.open(url);
        } else {
          this.opened = window.open(url);
        }
    },
    jumpEkyc() {
      commonJs.saveLocalData("openEkycFromSp", {openEkycFromSp:true});
      this.jump(this.link);
    },
    showPop() {
      this.setShowFlg(true);
    },
    qrcode() {
      let that = this;
      let qrcode = new QRCode("qrcode", {
        width: 150,
        height: 150,
        text: this.link,
      });
    },
    getUrl() {
      if (!this.$route.query.URL) {
        this.$router.back();
      } else {
        this.link = this.$route.query.URL;
      }
    },
    goAccount() {
      this.$router.push("/account");
    }
  },

  computed: {
    ...mapGetters("common", ["branchDivision"]),
  },
  created() {
    this.setPageTittle(pageInfoConst.TITTLE.SETTING);
    this.setPageHeaderType(pageInfoConst.HEADER_TYPE.GUEST);
    this.setPageFooterType(pageInfoConst.FOOTER_TYPE.NORMAL);
    this.getUrl();
    this.setQrLink(this.$route.query.URL);
  },
  beforeUnmount() {
    clearInterval(this.getStatusTimer)
  }
};
