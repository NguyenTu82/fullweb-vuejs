<template>
  <header class="header">
    <UserLogout v-if="logoutUser" @turnOffModal="userLogout"></UserLogout>
    <div class="wrapper">
      <div class="header__container">
        <a href="/home" class="header__logo">
          <img src="/assets/images/logo.svg" alt="サイトロゴ" />
        </a>
        <nav class="header__nav">
          <a
            href="https://www.cheer-sec.co.jp/rule/risk.html"
            class="header__notification"
          >
            <img
              src="/assets/images/edit.png"
              srcset="/assets/images/edit2x.png 2x"
              alt="edit"
            />
          </a>
          <div
            style="cursor: pointer"
            @click="notices"
            class="header__notification"
            :class="{'header__notification--point' : isReaded}"
          >
            <img src="/assets/images/bell.png" alt="ベルマーク" />
          </div>
          <a
            target="_blank"
            href="https://secure.okbiz.okwave.jp/cheer-sec/?site_domain=default"
            class="header__nav-item"
            >FAQ<img src="/assets/images/question_black.png" alt="質問マーク" />
          </a>
          <a
            target="_blank"
            href="https://www.cheer-sec.co.jp/support/contact.html"
            class="header__nav-item"
            >お問合せフォーム<img
              src="/assets/images/mail.png"
              alt="メールマーク"
          /></a>
          <a class="header__nav-item button__pointer" @click="userLogout"
            >ログアウト<img src="/assets/images/logout.png" alt="サインアウト"
          /></a>
          <div class="header__hamburger">
            <img src="/assets/images/hamburger.png" alt="メニューバー" />
          </div>
          <nav class="header__spmenu sp_close">
            <a href="/home" class="header__spmenu-item">ホーム</a>
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
            <div class="header__spmenu-sub" id="sp_item_6"></div>
            <a
              target="_blank"
              href="https://secure.okbiz.okwave.jp/cheer-sec/?site_domain=default"
              class="header__spmenu-item"
              >FAQ</a
            >
            <div class="header__spmenu-sub" id="sp_item_7"></div>
            <a
              target="_blank"
              href="https://www.cheer-sec.co.jp/support/contact.html"
              class="header__spmenu-item"
              >お問合せフォーム</a
            >
            <div class="header__spmenu-sub" id="sp_item_8"></div>
            <a href="#" class="header__spmenu-item" @click="logout"
              >ログアウト</a
            >
          </nav>
        </nav>
      </div>
    </div>
    <div class="header__sub">
      <div class="wrapper">
        <div class="header__sub-container">
          <a href="/home" class="header__sub-item">ホーム</a>
          <!--          <button class="header__sub-item" @click="showMenuMini($event)">国内株式</button>-->
          <!--          <button class="header__sub-item" @click="showMenuMini($event)">米国株式</button>-->
          <!--          <button class="header__sub-item" @click="showMenuMini($event)">投資信託</button>-->
          <!--          <button class="header__sub-item" @click="showMenuMini($event)">資産・照会</button>-->
          <!--          <button class="header__sub-item" @click="showMenuMini($event)">入出金</button>-->

          <button class="header__sub-item">国内株式</button>
          <button class="header__sub-item">米国株式</button>
          <button class="header__sub-item">投資信託</button>
          <button class="header__sub-item">資産・照会</button>
          <button class="header__sub-item">入出金</button>
          <a href="/settings" class="header__sub-item">口座・設定</a>
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
<script src="@/assets/js/common/headerMain"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
