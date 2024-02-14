<template>
  <Model
    @click.prevent.stop
    @touchmove.prevent
    :show="dataDialog.isShow && check == false"
  >
    <h2>{{ dataDialog.title }}</h2>
    <p class="modal__text">{{ dataDialog.text }}</p>
    <div class="modal__buttons">
      <cRoundButton
        buttonname="OK"
        :disabled="dataDialog.isDisable"
        @clickbtn="handleOkDialog"
      ></cRoundButton>
    </div>
  </Model>
</template>

<script src="@/assets/js/page/payment/deposit/components/loadingDialog"></script>

<style scoped lang="less"></style>
