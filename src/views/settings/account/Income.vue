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
        <a href="">主な収入源の変更</a>
      </nav>
    </TopInfo>

    <section class="settings">
      <div class="wrapper">
        <h1 class="title">主な収入源の変更</h1>
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
                    <p>現在の主な収入源</p>
                  </div>
                  <div class="table__box-value">
                    <div class="settings__table-value">
                      <p>{{ oldIncom }}</p>
                    </div>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>新しい主な収入源</p>
                  </div>
                  <div class="table__box-value">
                    <div class="settings__table-input">
                      <select
                        class="selectbox selectbox__gray"
                        name="address_prefecture"
                        id=""
                        v-model="formData.REVENUE_TYPE"
                        @change="isBtnFlag"
                      >
                        <option :value="0" style="display: none">
                          主な収入源を選択してください
                        </option>
                        <option
                          v-for="item in income"
                          :key="item.id"
                          :value="item.id"
                        >
                          {{ item.title }}
                        </option>
                      </select>
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
                  :class="[
                    { disable: !btnFlag },
                    'button button__main button__medium',
                  ]"
                  @click="change"
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
import income from "@/assets/js/page/settings/account/income";
export default income;
</script>

<style></style>
