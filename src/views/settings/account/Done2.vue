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
        <a href="">出金先金融機関の変更</a>
      </nav>
    </TopInfo>

    <section class="order">
      <div class="wrapper">
        <h1 class="title">出金先金融機関の変更</h1>
        <div class="container card">
          <div class="result">
            <h2>出金先金融機関を変更しました</h2>
            <div class="result__image">
              <div class="result__image-status">
                <img src="/assets/images/check.png" alt="チェックアイコン" />
              </div>
              <img src="/assets/images/lock.svg" alt="アイコン" />
            </div>
            <a
              href="javascript:;"
              class="button button__white button__full"
              @click="$router.push('/account')"
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
import done2 from "@/assets/js/page/settings/account/done2";
export default done2;
</script>

<style></style>
