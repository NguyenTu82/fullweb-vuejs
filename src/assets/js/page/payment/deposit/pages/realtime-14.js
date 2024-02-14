export default {
  data() {
    return {
      noticeType: 0
    }
  },
  created(){
      this.init();
  },
  methods: {
      init() {
        let noticeType = this.$route.query.noticeType;
        if (noticeType) {
          this.noticeType = noticeType;
        }
      },
      closeWindow() {
        window.close();
      }
  }
};