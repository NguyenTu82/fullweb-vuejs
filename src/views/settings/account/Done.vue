<template>
  <main>
    <button class="scrollTopButton hidden">
      <img src="/assets/images/topbtn.png" alt="TOP" />
    </button>

    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <a href="/settings/"><strong>口座・設定</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="/account/"><strong>口座情報</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="">住所の変更</a>
      </nav>
    </TopInfo>

    <section class="settings">
      <div class="wrapper">
        <h1 class="title">住所の変更</h1>
        <div class="container card">
          <div class="result">
            <h2>確認書類の提出が完了しました</h2>
            <div class="result__image">
              <div class="result__image-status">
                <img src="/assets/images/check.png" alt="チェックアイコン" />
              </div>
              <img src="/assets/images/address.png" alt="アイコン" />
            </div>
            <a
              href="/account/"
              class="button button__white button__full"
            >
              戻る
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import done from "@/assets/js/page/settings/account/done";
export default done;
</script>

<style></style>
