import commonJs from "@/assets/js/common/common";

export default {
  props: {
    money: {
      type: Number,
      default: 0,
    },
    step: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 10000000,
    },
    min: {
      type: Number,
      default: 0,
    },
    clickFirstPlus: {
      type: Number,
      default: 0,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    withdrawByBank: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      intervalId: -1,
      focused: false,
      currentMoney: 0,
      maxAmount: 100000000,
      isPlusButtonDisabled: false,
    };
  },
  watch: {    
    money(newVal, oldVal) {
      console.log("cStepperMoney.js watch money>> newVal=", newVal, ",oldVal=", oldVal);
      console.log("cStepperMoney.js watch money>> this.max=", this.max);
      console.log("cStepperMoney.js watch money>> this.money=", this.money);
      if (newVal >= this.max || this.isDisabled) {
        this.isPlusButtonDisabled = true;
        newVal = this.max;
      } else if (newVal < this.max) {
        this.isPlusButtonDisabled = false;
      }
    },
  },
  directives: {
    setFocus(el, binding) {
      if (el && binding.value) {
        el.focus();
      }
    },
  },
  computed: {
    valueFormatter() {
      const number = commonJs.number_format(this.money, 1);
      if (number.toString().split(".")[1] == 0) {
        return number.slice(0, number.indexOf("."));
      }
      return number;
    },
    getPlusButtonDisabled() {
      return this.isPlusButtonDisabled;
    },
  },
  methods: {
    inputHandle(event) {
      if (parseInt(event.target.value) > this.max) {
        this.$emit("changeValue", this.max);
      } else {
        this.$emit("changeValue", parseInt(event.target.value) || 0);
      }
    },
    onblur() {
      this.focused = false;
      if (this.money < this.min && this.money != 0) {
        this.$emit("changeValue", this.min);
      } else if (this.money > this.min && this.withdrawByBank) {
        let money = this.money;
        money -= money % this.step;
        this.$emit("changeValue", money);
      }
    },

    async minusPlusClick(type) {
      let money = this.money;

      if (money >= this.min && money <= this.max) {
        if (money % this.step === 0) {
          await this.$emit('changeValue', money += type * this.step);
        } else if (type === 1) {
          await this.$emit('changeValue', Math.ceil(money/this.step) * this.step)
        }
        else {
          await this.$emit('changeValue', Math.floor(money/this.step) * this.step)
        }
      }
      if (money < this.min) {
        await this.$emit('changeValue', this.min);
      }
      if (money > Math.min(this.max, 999999999)) {
        await this.$emit('changeValue', Math.min(this.max, 999999999));
      }
      this.curMoney = this.money
      this.$emit('money', this.curMoney);
    },

    mouseDownHandle(type) {
      this.mouseUpHandle();
      this.intervalId = setInterval(() => {
        this.minusPlusClick(type);
      }, 400);
    },
    mouseUpHandle() {
      clearInterval(this.intervalId);
      this.intervalId = -1;
    },
    handNumberInt(number) {
      return commonJs.handNumberInt(number);
    },
  },
};
