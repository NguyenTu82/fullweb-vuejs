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
          <a @click="navigate">ログインID（メールアドレス）の変更</a>
        </router-link>
      </nav>
    </TopInfo>
    <section class="settings">
      <div class="wrapper">
        <h1 class="title">ログインIDの変更</h1>
        <div class="container card">
          <div class="l_tab_wrapper">
            <div class="settings__table card card--sphidden">
              <div class="table">
                <div
                  :class="
                    item.id != 4
                      ? 'table__box'
                      : 'table__box table__box--password'
                  "
                  v-for="(item, index) in formdata"
                  :key="index"
                >
                  <div class="table__box-title">
                    <p>{{ item.title }}</p>
                  </div>
                  <div class="table__box-value">
                    <div
                      class="settings__table-input settings__table-input--full"
                    >
                      <input
                        v-if="item.id == 3"
                        @paste.prevent
                        v-model="item.value"
                        :placeholder="item.placeholder"
                        :type="item.type"
                        :maxlength="254"
                        autocomplete="off"
                      />
                      <input
                        v-else-if="item.id == 4"
                        v-model="item.value"
                        :placeholder="item.placeholder"
                        :type="item.type"
                        class="order__data-input"
                        pattern="[0-9]*"
                        autocomplete="off"
                        :maxlength="4"
                        @input="item.value = format(item.value)"
                      />
                      <input
                        v-else
                        v-model="item.value"
                        :placeholder="item.placeholder"
                        :type="item.type"
                        :maxlength="254"
                        autocomplete="off"
                      />
                    </div>
                    <div class="error-tip" v-if="item.showmsg">
                      {{ item.msg }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="settings__confirm">
                <button
                  @click="userSetting"
                  class="button button__white button__medium"
                >
                  キャンセル
                </button>
                <button
                  :class="
                    mailTrue
                      ? 'button button__main button__medium'
                      : 'button button__disabled button__medium'
                  "
                  :disabled="!mailTrue"
                  @click="judgeMail"
                >
                  変更する
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script src="@/assets/js/page/settings/user/changeLoginId/index.js"></script>
