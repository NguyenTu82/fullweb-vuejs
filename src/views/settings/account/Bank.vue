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
        <a href="">出金先金融機関の変更</a>
      </nav>
    </TopInfo>

    <section class="settings">
      <div class="wrapper">
        <h1 class="title">出金先金融機関の変更</h1>
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
                    <p>現在の出金先金融機関</p>
                  </div>
                  <div class="table__box-value">
                    <div class="settings__table-value">
                      <p><span>金融機関</span></p>
                      <p>{{ oldBank[0] }}</p>
                    </div>
                    <div class="settings__table-value">
                      <p><span>支店名</span></p>
                      <p>{{ oldBank[1] }}</p>
                    </div>
                    <div class="settings__table-value">
                      <p><span>口座区分</span></p>
                      <p>{{ oldBank[2] }}</p>
                    </div>
                    <div class="settings__table-value">
                      <p><span>口座番号</span></p>
                      <p>{{ oldBank[3] }}</p>
                    </div>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>新しい出金先金融機関</p>
                  </div>
                  <div class="table__box-value">
                    <p class="settings__table-text">金融機関</p>
                    <div class="settings__table-grid">
                      <button
                        v-for="item in bankData"
                        :key="item.id"
                        :class="
                          item.ischeck
                            ? 'button__square--selected'
                            : 'button__square'
                        "
                        @click="selectBank(item.id)"
                      >
                        {{ item.name }}
                      </button>
                    </div>
                    <div class="settings__table-input" v-if="bankSearch">
                      <div>
                        <p>金融機関</p>
                        <input
                          type="text"
                          placeholder="金融機関名を入力してください"
                          v-model="bankName"
                          maxlength="10"
                          @input="isBtnFlag"
                        />
                      </div>
                      <button
                        :class="[
                          { disable: !bankName },
                          'button button__main button__chip',
                        ]"
                        @click="searchBank"
                      >
                        金融機関検索
                      </button>
                    </div>
                    <div class="settings__table-input">
                      <div>
                        <p>支店名</p>
                        <input
                          type="text"
                          placeholder="支店名を入力してください"
                          v-model="formData.WITHDRAW_SUB_NAME"
                          maxlength="10"
                          @input="isBtnFlag"
                        />
                      </div>
                      <button
                        :class="[
                          {
                            disable:
                              !formData.WITHDRAW_FACIL_CD ||
                              !formData.WITHDRAW_SUB_NAME,
                          },
                          'button button__main button__chip',
                        ]"
                        @click="searchBranch"
                        :disabled="
                          !formData.WITHDRAW_FACIL_CD ||
                          !formData.WITHDRAW_SUB_NAME
                        "
                      >
                        支店検索
                      </button>
                    </div>
                    <div class="settings__table-input">
                      <p>口座区分</p>
                    </div>
                    <div class="settings__table-input-buttons">
                      <button
                        v-for="item in accountData"
                        :key="item.id"
                        :class="
                          item.ischeck
                            ? 'button__square--selected'
                            : 'button__square'
                        "
                        @click="selectAccount(item.id)"
                      >
                        {{ item.name }}
                      </button>
                    </div>
                    <div
                      class="settings__table-input settings__table-input--full"
                    >
                      <div>
                        <p>口座番号</p>
                        <input
                          type="text"
                          maxlength="7"
                          oninput="this.value=this.value.replace(/[^\d]/g,'')"
                          placeholder="口座番号を入力してください"
                          v-model="formData.WITHDRAW_ACCOUNT_NUMBER"
                          @input="isBtnFlag"
                        />
                      </div>
                    </div>
                    <!-- 西安 HDH00005_01-242 10/4 -->
                    <p class="settings__table-text--error">
                      <img src="/assets/images/exclamation.png" alt="!" />
                      ご本人名義の口座をご登録ください。
                    </p>
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
  <!-- 検索画面 star -->
  <Search
    v-if="searchDialog"
    :searchTitle="searchTitle"
    :withdrawCD="formData.WITHDRAW_FACIL_CD"
    :searchResolve="text"
    @searchOK="searchOK"
    @searchCancel="searchCancel"
  ></Search>
  <!-- 検索画面 end -->
</template>

<script>
import bank from "@/assets/js/page/settings/account/bank";
export default bank;
</script>

<style></style>
