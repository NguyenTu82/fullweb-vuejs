<template>
  <header class="header">
    <div class="wrapper">
      <div class="header__container">
        <a href="/home/" class="header__logo">
          <img src="/assets/images/logo.png" alt="サイトロゴ" />
        </a>
        <nav class="header__nav">
          <div class="header__notification">
            <img
              src="/assets/images/edit.png"
              srcset="/assets/images/edit2x.png 2x"
              alt="edit"
            />
          </div>
          <div class="header__notification header__notification--point">
            <img
              src="/assets/images/bell.png"
              srcset="/assets/images/bell2x.png 2x"
              alt="ベルマーク"
            />
          </div>
          <a href="" class="header__nav-item"
            >FAQ<img
              src="/assets/images/question_black.png"
              srcset="/assets/images/question_black2x.png 2x"
              alt="質問マーク"
            />
          </a>
          <a href="" class="header__nav-item"
            >お問合せフォーム<img
              src="/assets/images/mail.png"
              srcset="/assets/images/mail2x.png 2x"
              alt="メールマーク"
          /></a>
          <a href="" class="header__nav-item"
            >ログアウト<img
              src="/assets/images/logout.png"
              srcset="/assets/images/logout2x.png 2x"
              alt="サインアウト"
          /></a>
          <div class="header__hamburger">
            <img src="/assets/images/hamburger.png" alt="メニューバー" />
          </div>
          <nav class="header__spmenu sp_close">
            <a href="/home/" class="header__spmenu-item">ホーム</a>
            <button class="header__spmenu-item">国内株式</button>
            <div class="header__spmenu-sub" id="sp_item_1"></div>
            <button class="header__spmenu-item">米国株式</button>
            <div class="header__spmenu-sub" id="sp_item_2"></div>
            <button class="header__spmenu-item">投資信託</button>
            <div class="header__spmenu-sub" id="sp_item_3"></div>
            <button class="header__spmenu-item">資産・照会</button>
            <div class="header__spmenu-sub" id="sp_item_4"></div>
            <button class="header__spmenu-item">入出金</button>
            <div class="header__spmenu-sub" id="sp_item_5"></div>
            <a href="/settings/" class="header__spmenu-item">口座・設定</a>
          </nav>
        </nav>
      </div>
    </div>
    <div class="header__sub">
      <div class="wrapper">
        <div class="header__sub-container">
          <a href="/home/" class="header__sub-item">ホーム</a>
          <button class="header__sub-item">国内株式</button>
          <button class="header__sub-item">米国株式</button>
          <button class="header__sub-item">投資信託</button>
          <button class="header__sub-item">資産・照会</button>
          <button class="header__sub-item">入出金</button>
          <a href="/settings/" class="header__sub-item">口座・設定</a>
        </div>
      </div>
    </div>
    <div class="header__sub-list hidden">
      <div class="wrapper">
        <nav class="header__sub-links hidden"></nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "NcbHeaderOfMember",
  data() {
    return {};
  },
};
</script>
