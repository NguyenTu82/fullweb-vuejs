<template>
  <section class="modal">
    <div class="tab_wrapper">
      <div class="modal__content card">
        <h2>入力された内容で変更しますか。</h2>
        <p class="modal__text">暗証番号をご入力ください</p>
        <div class="modal__password">
          <!--HDH00005_01-404 変更するボタンの初期値：非活性 4桁未満の場合非活性 2022-10-04 -->
          <input
            type="password"
            name="password"
            placeholder="****"
            maxlength="4"
            @oninput="this.value=this.value.replace(/[^\d]/g,'');"
            v-model="changePasswrod"  
            @input="isBtnFlag"
          />
        </div>
        <div class="modal__buttons">
          <a
            href="javascript:;"
            class="button button__white button__medium"
            @click="btnCancel"
          >
            キャンセル
          </a>
          <!--HDH00005_01-404 変更するボタンの初期値：非活性 4桁未満の場合非活性 2022-10-04 -->
          <a
            href="javascript:;"
            :class="[
                    { disable: !btnFlag },
                    'button button__main button__medium',
                  ]"
            @click="btnOK"
          >
            変更する
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import dialogPwd from "@/assets/js/page/settings/components/DialogPwd";
export default dialogPwd;
</script>

<style></style>
