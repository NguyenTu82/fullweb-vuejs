<template>
  <main>
    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <router-link to="/settings" v-slot="{ href, navigate }" custom>
          <a :href="href" @click="navigate"><strong>口座・設定</strong></a>
        </router-link>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <router-link to="/settings/user/" v-slot="{ href, navigate }" custom>
          <a :href="href" @click="navigate"
            ><strong>アカウント・設定変更</strong></a
          >
        </router-link>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <router-link to="" v-slot="{ navigate }" custom>
          <a @click="navigate">取引暗証番号の変更</a>
        </router-link>
      </nav>
    </TopInfo>
    <section class="settings">
      <div v-if="!doneFlag" class="wrapper">
        <h1 class="title">取引暗証番号の変更</h1>
        <div class="container card">
          <div class="l_tab_wrapper">
            <div class="settings__table card card--sphidden">
              <div class="table" v-for="item in formdata" :key="item.id">
                <div class="table__box">
                  <div class="table__box-title">
                    <p>{{ item.title }}</p>
                  </div>
                  <div class="table__box-value">
                    <div class="order__data-pass">
                      <input
                        v-if="item.id != 3"
                        :type="item.showPassword == 1 ? 'text' : 'password'"
                        class="order__data-input"
                        v-model.trim="item.value"
                        autocomplete="off"
                        pattern="[0-9]*"
                        :maxlength="4"
                        @input="item.value = format(item.value)"
                      />
                      <input
                        v-else
                        @paste.prevent
                        :type="item.showPassword == 1 ? 'text' : 'password'"
                        class="order__data-input"
                        v-model.trim="item.value"
                        autocomplete="off"
                        pattern="[0-9]*"
                        :maxlength="4"
                        @input="item.value = format(item.value)"
                      />
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="switch"
                          v-model="item.showPassword"
                          true-value="1"
                          false-value="0"
                          autocomplete="off"
                        />
                        <div class="switch__base"></div>
                        <div class="switch__circle"></div>
                      </label>
                    </div>
                    <div class="error-tip" v-if="item.showmsg">
                      {{ item.msg }}
                    </div>
                  </div>
                </div>
              </div>
              <p class="settings__table-text--forget">
                <img src="/assets/images/question.png" alt="?" />
                取引暗証番号をお忘れの方は<router-link :to="{ name: 'TradePassReset' }"
                  >こちら</router-link
                >をご確認ください。
              </p>
              <div class="settings__confirm">
                <button
                  @click="userSetting"
                  class="button button__white button__medium"
                >
                  キャンセル
                </button>
                <button
                  :class="
                    pwdTrue
                      ? 'button button__main button__medium'
                      : 'button button__disabled button__medium'
                  "
                  :disabled="!pwdTrue"
                  @click="jumpNext"
                >
                  変更する
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="wrapper">
        <h1 class="title">取引暗証番号の変更</h1>
        <div class="container card">
          <div class="result">
            <h2>取引暗証番号を変更しました</h2>
            <div class="result__image">
              <div class="result__image-status result__image-status--lock">
                <img
                  :class="['right', 'complete']"
                  src="/assets/images/right-green.svg"
                  alt="チェックアイコン"
                />
              </div>
              <img src="/assets/images/lock.svg" alt="アイコン" />
            </div>
            <a href="/home" class="button button__white button__full">
              ホームへ
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script src="@/assets/js/page/settings/user/changeTradePwd/index.js"></script>
