<template>
  <main class="no_header_padding">
    <div class="wrapper">
      <section class="loginform">
        <h1 class="title">証券口座番号の入力</h1>
        <form class="card" action="">
          <div class="sp_wrapper">
            <h2 class="loginform__title">証券口座番号の入力</h2>
            <p class="loginform__about">
              初回ログイン時には、当社からお送りした「証券口座開設お手続き完了のお知らせ」のメールに記載されている「証券口座番号」が必要になります。
            </p>
            <p class="loginform__caution">
              <img
                src="/assets/images/exclamation.png"
                alt="エクスクラメーションマーク"
              />一定回数以上間違えるとロックがかかります
            </p>
            <div class="loginform__item">
              <div class="loginform__item-upper">
                <div class="loginform__item-label">
                  <label for="account">証券口座番号を入力</label>
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
              </div>
              <div class="loginform__item-lower">
                <input
                  :type="showPassword == 1 ? 'text' : 'password'"
                  autocomplete="off"
                  v-model="loginId"
                  placeholder="***********"
                  :change="inputLoginId()"
                />
              </div>
            </div>
            <button
              :class="
                isOver
                  ? 'button button__main button__full'
                  : 'button button__disabled button__full'
              "
              :disabled="!isOver"
              v-on:click.prevent="handleSend"
            >
              入力完了
            </button>
            <div class="loginform__faq">
              <a
                href="https://www.cheer-sec.co.jp/other/app-help/login.html#anyway"
              >
                <img
                  src="/assets/images/question.png"
                  alt="クエスチョンマーク"
                />
                証券口座番号がわからない方、またはロックされた方は、カスタマーセンターまでご連絡ください
              </a>
            </div>
          </div>
        </form>
      </section>
    </div>
  </main>
</template>
<script src="@/assets/js/page/login/securityAccountNumber"></script>
