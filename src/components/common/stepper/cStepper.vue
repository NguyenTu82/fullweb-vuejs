<template>
  <div class="counter counter--stock order__data-counter">
    <button
      type="button"
      class="counter__button"
      :class="quantity <= this.min && 'disabled'"
      @mousedown="mouseDownHandle(-1)"
      @mouseup="mouseUpHandle()"
      @click="minusPlusClick(-1)"
    >
      ー
    </button>
    <input
      v-if="focused"
      type="number"
      pattern="[0-9]*"
      oninput="value=value.slice(0,8)"
      class="counter__number"
      @input="inputHandle"
      :value="quantity"
      @blur="onblur"
      v-set-focus="focused"
      :disabled="disableminus || disableplus"
    />
    <input
      v-else
      type="text"
      pattern="[0-9]*"
      class="counter__number"
      placeholder="0"
      :value="valueFormatter"
      :disabled="disableminus || disableplus"
      @focus="focused = true"
    />
    <button
      type="button"
      class="counter__button"
      :class="quantity >= this.max && 'disabled'"
      @mousedown="mouseDownHandle(1)"
      @mouseup="mouseUpHandle()"
      @click="minusPlusClick(1)"
    >
      ＋
    </button>
  </div>
</template>

<script src="@/assets/js/components/common/stepper/cStepper.js"></script>
