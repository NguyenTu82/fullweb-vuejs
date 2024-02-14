<template>
  <main class="no_header_padding">
    <button class="scrollTopButton hidden">
      <img src="/assets/images/topbtn.png" alt="TOP" />
    </button>
    <div class="wrapper">
      <section class="order">
        <h1 class="title">パスワード再設定</h1>
        <div class="container card">
          <div class="tab_wrapper">
            <div class="result">
              <h2 class="result__title">ログインパスワードを再設定しました</h2>
              <div class="result__image">
                <div class="result__image-status result__image-status--lock">
                  <img src="/assets/images/check.png" alt="チェックアイコン" />
                </div>
                <img src="/assets/images/lock.svg" alt="アイコン" />
              </div>
              <button class="button button__main button__full" @click="goHome">
                ログイン画面へ
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
<script src="@/assets/js/page/resetLoginPassword/setPwdSuccess"></script>
