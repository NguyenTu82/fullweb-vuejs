/* eslint no-irregular-whitespace: ["error", {"skipTemplates": true}] */
<template>
  <footer class="footer">
    <div class="wrapper">
      <picture class="footer__logo">
        <img src="/assets/images/logo.png" alt="サイトロゴ" />
      </picture>
      <div class="footer__infomation">
        <p>商号等 / 株式会社西日本シティ銀行</p>
        <p>登録金融機関　福岡財務支局長(登金)第6号</p>
      </div>
      <div class="footer__bottom">
        <nav class="footer__links">
          <a href=""
            >会社概要<img src="/assets/images/arrow.png" alt="矢印"
          /></a>
          <a href=""
            >開示情報<img src="/assets/images/arrow.png" alt="矢印"
          /></a>
          <a href=""
            >お問い合わせ<img src="/assets/images/arrow.png" alt="矢印"
          /></a>
        </nav>
        <div class="footer__copyright">
          <small lang="en"
            >Copyright © CHEER Securities Inc. ALL RIGHTS RESERVED.</small
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "NcbFooterOfNormal",
  data() {
    return {};
  },
};
</script>
