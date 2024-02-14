<template>
  <main>
    <button class="scrollTopButton hidden">
      <img src="/assets/images/topbtn.png" alt="TOP" />
    </button>

    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <a href="/settings/"><strong>口座・設定</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="/account/"><strong>口座情報</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="">携帯電話番号の変更</a>
      </nav>
    </TopInfo>

    <section class="settings">
      <div class="wrapper">
        <h1 class="title">携帯電話番号の変更</h1>
        <div class="container card">
          <div class="card__help">
            <!-- HDH00005_01-217 リンクがハードコーディングで実装され防止　2022-10-05 -->
            <a
              :href="HELPACCOUNT"
              target="_blank"
              >本画面のヘルプ
              <img src="/assets/images/question.png" alt="" />
            </a>
          </div>
          <div class="l_tab_wrapper">
            <div class="settings__table card card--sphidden">
              <div class="table">
                <div class="table__box">
                  <div class="table__box-title">
                    <p>現在の携帯電話番号</p>
                  </div>
                  <div class="table__box-value">
                    <p>{{ oldTEL }}</p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>新しい携帯電話番号</p>
                  </div>
                  <div class="table__box-value">
                    <div
                      class="settings__table-input settings__table-input--full"
                    >
                      <div>
                        <input
                          type="text"
                          v-model="formData.TEL_NO"
                          oninput="this.value=this.value.replace(/[^\d]/g,'')"
                          maxlength="11"
                          placeholder="携帯電話番号を入力してください"
                          @input="changePhone(formData.TEL_NO)"
                        />
                        <div class="inputMessage_value">
                          <p v-show="phoneFlag">
                            正しい携帯ばんごー番号を入力してください
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="settings__confirm">
                <a
                  href="javascript:;"
                  @click="$router.back()"
                  class="button button__white button__medium"
                  >キャンセル</a
                >
                <a
                  href="javascript:;"
                  @click="change"
                  :class="[
                    { disable: !btnFlag },
                    'button button__main button__medium',
                  ]"
                  >変更する</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <dialog-pwd
    v-if="showDialog"
    :formData="formData"
    :API="API"
    @btnCancel="cancel"
  ></dialog-pwd>
</template>

<script>
import phone from "@/assets/js/page/settings/account/phone";
export default phone;
</script>

<style></style>
