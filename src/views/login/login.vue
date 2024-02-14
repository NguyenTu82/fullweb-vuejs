/* * @Author: toanlm * @Email: withease-partner4@hashdash-group.com * @Last
Modified by: toanlm * @Last Modified time: 2022-06-02 * @Description:
Screen「L001 ログイン画面-1 CHEER証券」 */

<template>
  <main class="no_header_padding">
    <div class="wrapper">
      <section class="loginform">
        <form class="card" @submit.prevent="submit">
          <div class="sp_wrapper">
            <div class="loginform__item">
              <div class="loginform__item-upper">
                <div class="loginform__item-label">
                  <label for="email">メールアドレス（ログインID）</label>
                </div>
                <input
                  type="checkbox"
                  id="reserve"
                  v-model="emailReserve"
                  true-value="1"
                  false-value="0"
                />
                <label class="checkbox" for="reserve">保存</label>
              </div>
              <div class="loginform__item-lower">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="mail@mail.com"
                  autocomplete="email"
                  v-model="form.username"
                  :maxlength="254"
                />
              </div>
            </div>
            <div class="loginform__item">
              <div class="loginform__item-upper">
                <div class="loginform__item-label">
                  <label for="password">パスワード</label>
                  <label for="switch" class="switch">
                    <input
                      type="checkbox"
                      id="switch"
                      v-model="showPassword"
                      true-value="1"
                      false-value="0"
                    />
                    <div class="switch__base"></div>
                    <div class="switch__circle"></div>
                  </label>
                </div>
                <input
                  type="checkbox"
                  id="reserve2"
                  v-model="passwordReserve"
                  true-value="1"
                  false-value="0"
                />
                <label class="checkbox" for="reserve2">保存</label>
              </div>
              <div class="loginform__item-lower">
                <input
                  :type="showPassword == 1 ? 'text' : 'password'"
                  placeholder="********"
                  id="password"
                  v-model="form.password"
                  autocomplete="false"
                  :maxlength="16"
                />
              </div>
            </div>
            <div v-if="errors.length" class="error_message">{{ errors }}</div>
            <button type="submit" class="button button__main button__full">
              ログイン
            </button>
            <div class="loginform__automation">
              <input
                type="checkbox"
                id="autoLogin"
                :disabled="disableAutoFlag"
                v-model="autoLogin"
                true-value="1"
                false-value="0"
              />
              <label class="checkbox" for="autoLogin"
                >次回から自動でログインする</label
              >
            </div>
            <div class="loginform__faq">
              <a :href="url">
                <img
                  src="/assets/images/question.png"
                  alt="クエスチョンマーク"
                />
                ログインIDをお忘れの方はこちら
              </a>

              <router-link
                :to="{ name: 'ResetLoginPwd' }"
                custom
                v-slot="{ navigate, href }"
              >
                <a :href="href" @click="navigate">
                  <img
                    src="/assets/images/question.png"
                    alt="クエスチョンマーク"
                  />
                  パスワードをお忘れの方はこちら
                </a>
              </router-link>

              <router-link
                :to="{ name: 'UnlockAccount' }"
                custom
                v-slot="{ navigate, href }"
              >
                <a :href="href" @click="navigate">
                  <img
                    src="/assets/images/question.png"
                    alt="クエスチョンマーク"
                  />
                  アカウントがロックされた方はこちら
                </a>
              </router-link>
            </div>
          </div>
        </form>
      </section>
    </div>
  </main>
</template>
<script src="@/assets/js/page/login/login"></script>
