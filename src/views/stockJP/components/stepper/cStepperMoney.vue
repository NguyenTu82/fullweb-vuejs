<template>
  <div class="counter order__data-counter">
    <button
      type="button"
      :disabled="money <= this.min || isDisabled"
      :class="
        money <= this.min || isDisabled
          ? 'counter__button disabled'
          : 'counter__button'
      "
      @mousedown="mouseDownHandle(-1)"
      @mouseup="mouseUpHandle"
      @click="minusPlusClick(-1)"
    >
      ー
    </button>

    <div v-show="isDisabled" class="viewDisable">
      {{ handNumFloat(money) }}
    </div>

    <input
      v-if="focused"
      pattern="[0-9]*"
      oninput="value=value.slice(0,9)"
      class="counter__number"
      @input="inputHandle"
      :value="money"
      @blur="onblur"
      v-set-focus="focused"
      :disabled="isDisabled"
      @keypress="isNumber($event)"
    />
    <input
      v-show="!isDisabled"
      v-else
      type="text"
      pattern="[0-9]*"
      class="counter__number"
      placeholder="0"
      :value="valueFormatter"
      :disabled="isDisabled"
      @focus="focused = true"
    />
    <button
      type="button"
      :disabled="money >= this.max || isDisabled"
      :class="
        money >= this.max || isDisabled
          ? 'counter__button disabled'
          : 'counter__button'
      "
      @mousedown="mouseDownHandle(1)"
      @mouseup="mouseUpHandle"
      @click="minusPlusClick(1)"
    >
      ＋
    </button>
  </div>
</template>

<script src="@/assets/js/page/stockJP/components/stepper/cStepperMoney"></script>
