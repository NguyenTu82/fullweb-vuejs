import commonJs from "@/assets/js/common/common";

export default {
  props: {
    quantity: {
      type: Number,
      default: 0,
    },
    step: {
      type: Number,
      default: 100,
    },
    max: {
      type: Number,
      default: 10000000,
    },
    min: {
      type: Number,
      default: 0,
    },
    disableminus: { type: Boolean, default: false },
    disableplus: { type: Boolean, default: false },
  },
  data() {
    return {
      intervalId: -1,
      focused: false,
    };
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
      return commonJs.cashFormatter(this.quantity);
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
      if (this.quantity < this.min && this.quantity != 0) {
        this.$emit("changeValue", this.min);
      }
    },
    minusPlusClick(type) {
      if (
        (type == -1 && this.disableminus) ||
        (type == 1 && this.disableplus)
      ) {
        return;
      }
      let quantity = this.quantity;
      if (quantity % this.step == 0) {
        quantity += type * this.step;
      } else {
        if (type == 1) {
          quantity += type * this.step;
        }
        quantity -= quantity % this.step;
      }

      if (quantity >= this.min && quantity <= this.max) {
        this.$emit("changeValue", quantity);
      } else if (quantity < this.min) {
        this.$emit("changeValue", this.min);
      } else {
        this.$emit("changeValue", this.max);
      }
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
  },
};
