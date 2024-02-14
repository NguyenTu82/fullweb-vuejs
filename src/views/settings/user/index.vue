<template>
  <main>
    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <a href="/settings/"><strong>口座・設定</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="/settings/user/">アカウント・設定変更</a>
      </nav>
    </TopInfo>
    <section class="settings">
      <div class="wrapper">
        <h1 class="title">アカウント・設定変更</h1>
        <div class="container card">
          <div class="l_tab_wrapper">
            <div class="grid_list grid_list--four_columns">
              <div class="card settings__menu">
                <h3>
                  ログインID <br />
                  (メールアドレス)の変更
                </h3>
                <button @click="changeLoginId" class="button button__main">
                  変更する
                </button>
              </div>
              <div class="card settings__menu">
                <h3>ログインパスワードの<br />変更</h3>
                <button @click="changeLoginPass" class="button button__main">
                  変更する
                </button>
              </div>
              <div class="card settings__menu">
                <h3>取引暗証番号の変更</h3>
                <button @click="changeTradePass" class="button button__main">
                  変更する
                </button>
              </div>
              <div class="card settings__menu">
                <h3>取引暗証番号の再設定</h3>
                <button @click="resetTradePass" class="button button__main">
                  変更する
                </button>
              </div>
              <div class="card settings__menu">
                <h3>取引暗証番号のロック解除</h3>
                <button @click="unlockTradePass" class="button button__main">
                  変更する
                </button>
              </div>
            </div>
            <div class="settings__confirm">
              <a
                href="/settings"
                @click="$router.push({name:'settings'})"
                class="button button__white button__full button__back"
                ><img src="/assets/images/arrow_back_g.png" alt="" />
                口座情報・設定画面へ</a
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script src="@/assets/js/page/settings/user/index.js"></script>
