<template>
  <div class="cRoundButton">
    <button
      class="button button__main button__full"
      :class="{ disableds: disabled, 'button-fill-small': small }"
      @click="clickbtn"
      :style="setStyle"
    >
      {{ buttonname }}
    </button>
  </div>
</template>

<script src="@/assets/js/components/button/setPwdButton.js"></script>

<style lang="less"></style>
