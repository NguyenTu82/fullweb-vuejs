<template>
  <div>
    <div v-if="isEkycBack" class="ekyc-back">
      <div class="title">{{titleName}}</div>
      <div class="bg">
        <div class="block" :style="{ marginTop: marginTop + 'px' }">
          <div v-if="isFromMobile">
            <div class="sub-title">eKyc認証は完了しました。</div>
            <button class="btn" @click="closeWindow">閉じる</button>
          </div>
          <div class="sub-title" v-else>
            eKyc認証は完了しました。<br/>
            もとの画面に戻り、お手続きを続けてください。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commonJs from "@/assets/js/common/common";
export default {
  data() {
    return {
      isFromMobile: commonJs.getLocalData("openEkycFromSp") ? commonJs.getLocalData("openEkycFromSp").openEkycFromSp : false,
    };
  },
  computed: {
    titleName() {
      let type = this.$route.query.type;
      return type == 'name' ? '氏名の変更' : '住所の変更';
    },
    marginTop() {
      return (window.innerHeight - 147) / 2;
    },
    isEkycBack() {
      let i = window.location.href.split('?i=')[1];
      return Boolean(i);
    }
  },
  methods: {
    closeWindow() {
      commonJs.removeLocalData("openEkycFromSp");
      window.close()
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
