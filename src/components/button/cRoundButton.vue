<template>
  <p
    class="button button__main button__medium"
    :class="{ disableds: disabled }"
    @click="clickbtn"
    :style="setStyle"
  >
    {{ buttonname }}
  </p>
</template>

<script src="@/assets/js/components/button/cRoundButton.js"></script>

<style lang="less"></style>
