export default {
  data() {
    return {
      showtimer: false,
      timercount: "",
      timer: null,
    };
  },
  methods: {
    getAgainCode() {
      if (!this.showtimer) {
        this.$emit("getCode");
      }
    },
    getCode(diffSeconds) {
      const TIME_COUNT = 60;
      if (!this.timer) {
        if (diffSeconds && diffSeconds <= 60) {
          this.timercount = 60 - diffSeconds;
        } else {
          this.timercount = TIME_COUNT;
        }
        this.showtimer = true;
        this.timer = setInterval(() => {
          if (this.timercount > 0 && this.timercount <= TIME_COUNT)
            return this.timercount--;

          return this.handleClearInterval();
        }, 1000);
      }
    },
    handleClearInterval() {
      this.showtimer = false;
      clearInterval(this.timer);
      this.timer = null;
    },
  },
};
