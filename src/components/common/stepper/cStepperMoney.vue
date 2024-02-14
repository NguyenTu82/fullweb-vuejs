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
      {{ handNumberInt(money) }}
    </div>

    <input
      v-if="focused"
      type="number"
      pattern="[0-9]*"
      oninput="value=value.slice(0,9)"
      class="counter__number"
      @input="inputHandle"
      :value="money"
      @blur="onblur"
      v-set-focus="focused"
      :disabled="isDisabled"
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
      :disabled="getPlusButtonDisabled"
      :class="
        getPlusButtonDisabled
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

<script src="@/assets/js/components/common/stepper/cStepperMoney.js"></script>
