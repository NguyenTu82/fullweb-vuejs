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
        <a href="">住所の変更</a>
      </nav>
    </TopInfo>

    <section class="settings">
      <div class="wrapper">
        <h1 class="title">住所の変更</h1>
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
                    <p>現在の住所</p>
                  </div>
                  <div class="table__box-value">
                    <p>〒{{ oldAddress.userAddress1 }}</p>
                    <p>{{ oldAddress.userAddress2 }}</p>
                    <p>{{ oldAddress.userAddress3 }}</p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>新しい住所</p>
                  </div>
                  <div class="table__box-value">
                    <div
                      class="settings__table-input settings__table-input--small"
                    >
                      <div>
                        <p>郵便番号</p>
                        <input
                          type="text"
                          placeholder="郵便番号"
                          maxlength="7"
                          oninput="this.value=this.value.replace(/[^\d]/g,'')"
                          v-model="formData.POSTAL_CD"
                          @input="isBtnFlag"
                        />
                      </div>
                      <div>
                        <button
                          :class="[
                            { disable: this.formData.POSTAL_CD.length !== 7 },
                            'button button__main button__chip',
                          ]"
                          @click="searchCode"
                        >
                          検索
                        </button>
                      </div>
                    </div>
                    <p class="settings__table-text">
                      ※郵便番号はハイフンなしの半角数字7桁でご入力ください。<br />
                    <!-- HDH00005_01-217 リンクがハードコーディングで実装され防止　2022-10-05 -->
                    <a :href="EXTERNAL"
                        target="_blank"
                        >郵便番号がわからない方はこちら（外部サイト）</a
                      >
                    </p>
                    <div
                      class="settings__table-input settings__table-input--full"
                    >
                      <div>
                        <p>市区町村</p>
                        <input
                          type="text"
                          placeholder="市区町村・町域名"
                          :value="municipalDistrict"
                          @input="isBtnFlag"
                        />
                      </div>
                    </div>
                    <div class="settings__table-input">
                      <div>
                        <p>番地・号</p>
                        <input
                          type="text"
                          placeholder="番地"
                          v-model="newAddress.newAddress1"
                          @blur="blurKanaHandle(newAddress.newAddress1, 0)"
                          @input="isBtnFlag"
                        />
                        <div class="inputMessage_value">
                          <p v-show="false"></p>
                        </div>
                      </div>
                      <div>
                        <p>番地・号（カナ）</p>
                        <input
                          type="text"
                          placeholder="番地（カナ）"
                          v-model="newAddress.newAddress2"
                          @blur="blurKanaHandle(newAddress.newAddress2, 1)"
                          @input="changeNameKana(newAddress.newAddress2, 0)"
                        />
                        <div class="inputMessage_value">
                          <p v-show="flags[0]">全角カナ/数字/ー</p>
                        </div>
                      </div>
                    </div>
                    <div class="settings__table-input">
                      <div>
                        <p>建物名・号室</p>
                        <input
                          type="text"
                          placeholder="建物名・号室"
                          v-model="newAddress.newAddress3"
                          @blur="blurKanaHandle(newAddress.newAddress3, 2)"
                          @input="isBtnFlag"
                        />
                        <div class="inputMessage_value">
                          <p v-show="false"></p>
                        </div>
                      </div>
                      <div>
                        <p>建物名・号室（カナ）</p>
                        <input
                          type="text"
                          placeholder="建物名・号室（カナ）"
                          v-model="newAddress.newAddress4"
                          @blur="blurKanaHandle(newAddress.newAddress4, 3)"
                          @input="changeNameKana(newAddress.newAddress4, 1)"
                        />
                        <div class="inputMessage_value">
                          <p v-show="flags[1]">全角カナ/数字/ー</p>
                        </div>
                      </div>
                    </div>
                    <p class="settings__table-text">本年1月1日時点での住所</p>
                    <div class="settings__table-input-buttons">
                      <button
                        :class="
                          addressConfirm === 0
                            ? 'button__square--selected'
                            : 'button__square'
                        "
                        @click="addressYes"
                      >
                        変更前の住所と同じ
                      </button>
                      <button
                        :class="
                          addressConfirm === 1
                            ? 'button__square--selected'
                            : 'button__square'
                        "
                        @click="addressNo"
                      >
                        変更前の住所と異なる
                      </button>
                    </div>
                    <div
                      v-if="addressConfirm === 1"
                      class="settings__table-input"
                    >
                      <div>
                        <p>変更前の住所と異なる方は下記を選択してください。</p>
                        <select
                          class="selectbox selectbox__gray"
                          name="address_city"
                          id=""
                          v-model="city"
                          @change="selectAddress"
                        >
                          <option :value="-1" selected style="display: none">
                            都道府県
                          </option>
                          <option
                            v-for="(item, index) in addressCity"
                            :key="index"
                            :value="index + 1"
                          >
                            {{ item.value }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="settings__table-text">
                      <p>本人確認書類</p>
                    </div>
                    <ul>
                      <li>マイナンバーカード（表面）</li>
                      <li>運転免許証（表面・裏面の両面）</li>
                    </ul>
                    <p class="settings__table-text--error">
                      <img src="/assets/images/exclamation.png" alt="!" />
                      当社外部委託先である株式会社Liquidが提供する本人確認サービス（外部サイト）に移動し、撮影・送信を行います。
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
                  >オンラインで提出</a
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
    @btnCancel="cancel"
  ></dialog-pwd>
  <!-- 検索画面 star -->
  <Search
    v-if="searchDialog"
    :searchTitle="searchTitle"
    :searchResolve="formData.POSTAL_CD"
    :postFlag="postFlag"
    @searchOK="searchOK"
    @searchCancel="searchCancel"
  ></Search>
  <!-- 検索画面 end -->
</template>

<script>
import address from "@/assets/js/page/settings/account/address";
export default address;
</script>

<style></style>
