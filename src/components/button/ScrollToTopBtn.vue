/* * @Author: toanlm * @Email: withease-partner4@hashdash-group.com * @Last
Modified by: toanlm * @Last Modified time: 2022-06-02 * @Description: this
button is used in - 「L001 ログイン画面-1 CHEER証券」 */
<template>
  <button
    ref="scrollTopButton"
    class="scrollTopButton hidden"
    @click="scrollToTop"
  >
    <img src="/assets/images/topbtn.png" alt="TOP" />
  </button>
</template>

<script src="@/assets/js/components/button/ScrollToTopBtn.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
