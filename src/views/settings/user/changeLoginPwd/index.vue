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
          <a @click="navigate">ログインパスワードの変更</a>
        </router-link>
      </nav>
    </TopInfo>
    <section class="settings">
      <div v-if="!doneFlag" class="wrapper">
        <h1 class="title">ログインパスワードの変更</h1>
        <div class="container card">
          <div class="l_tab_wrapper">
            <div class="settings__table card card--sphidden">
              <p class="settings__table-text--mb">
                ログインパスワードについては<br />
                ①8〜16文字の間で設定してください。<br />
                ②半角英字、半角数字、半角記号より2種類以上を組み合わせて設定してください。<br />
                ③使用可能な記号は以下の通りです。<br />
                ! # % ' ( ) , . / : ; &lt; = > ? @ [ ] ^ _ { } ~ |<br />
                ・ここで設定したパスワードは、口座開設以降のログイン時に使います。
              </p>
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
                        class="data-input"
                        v-model.trim="item.value"
                        autocomplete="off"
                      />
                      <input
                        v-else
                        @paste.prevent
                        :type="item.showPassword == 1 ? 'text' : 'password'"
                        class="data-input"
                        v-model.trim="item.value"
                        autocomplete="off"
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
                ログインパスワードをお忘れの方は
                <!-- HDH00005_01-217 リンクがハードコーディングで実装され防止　2022-10-05 -->
                <a
                  :href="RESETPASSWORD"
                  >こちら</a
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
        <h1 class="title">ログインパスワードの変更</h1>
        <div class="container card">
          <div class="result">
            <h2>ログインパスワードを変更しました</h2>
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

<script src="@/assets/js/page/settings/user/changeLoginPwd/index.js"></script>
