<template>
  <main>
    <button class="scrollTopButton hidden">
      <img src="/assets/images/topbtn.png" alt="TOP" />
    </button>

    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <a href="/settings/"><strong>口座・設定</strong></a>
      </nav>
    </TopInfo>
    
    <section class="settings">
      <div class="wrapper">
        <h1 class="title">口座情報・各種設定</h1>
        <div class="container card">
          <div class="l_tab_wrapper">
            <div class="settings__user">
              <h2 v-if="switchFlag">{{ userInfo.NAME }}&emsp;様</h2>
              <h2 v-else>******</h2>
              <div class="settings__user-switch hidden">
                <p>詳細表示</p>
                <label for="switch" class="switch">
                  <input type="checkbox" id="switch" @change="isDetails" />
                  <div class="switch__base"></div>
                  <div class="switch__circle"></div>
                </label>
              </div>
            </div>
            <div class="settings__infomation">              
              <div class="settings__infomation-item" style="width:35rem">
                <p>前回ログイン</p>
                <p v-if="switchFlag">
                  {{ lastTime }}
                </p>
                <p v-else>******</p>
              </div>
            </div>
            <div class="grid_list grid_list--four_columns">
              <div class="card settings__menu">
                <h3>口座情報</h3>
                <p>口座情報やメール受信設定の変更ができます。</p>
                <a
                  href="javascript:;"
                  class="button button__main"
                  @click="$router.push('/account')"
                  >確認する</a
                >
              </div>
              <div class="card settings__menu">
                <h3>電子交付</h3>
                <p>電子交付帳票を確認できます。</p>
                <a href="/settings/digital/" class="button button__main"
                  >確認する</a
                >
              </div>
              <div class="card settings__menu">
                <h3>取扱説明書・約款閲覧</h3>
                <p>契約締結前交付書面等の閲覧ができます。</p>
                <a href="/settings/documents/" class="button button__main"
                  >確認する</a
                >
              </div>
              <div class="card settings__menu" v-if="subTittle === 'CHEER証券'">
                <h3>投資信託関連書面</h3>
                <p>目論見書、運用報告書等の閲覧ができます。</p>
                <a
                  href="/settings/documents/doc/"
                  class="button button__main"
                  >確認する</a
                >
              </div>
              <div class="card settings__menu">
                <h3>手数料等・その他費用</h3>
                <p>各取引別の手数料等の確認ができます。</p>
                <!-- HDH00005_01-217 リンクがハードコーディングで実装され防止　2022-10-05 -->
                <a :href="COMMISSION" target="_blank" class="button button__main">確認する</a>
              </div>
              <div class="card settings__menu">
                <h3>アカウント・設定変更</h3>
                <p>ログイン情報や取引暗証番号の設定ができます。</p>
                <a href="/settings/user/" class="button button__main"
                  >確認する</a
                >
              </div>
              <div class="card settings__menu">
                <h3>よくあるご質問・お問い合わせ</h3>
                <p>サービスでお困りの方はこちらをご確認ください。</p>
                <!-- HDH00005_01-217 リンクがハードコーディングで実装され防止　2022-10-05 -->
                <a :href="CONTACT" target="_blank" class="button button__main">確認する</a>
              </div>
              <div class="card settings__menu">
                <h3>約款・方針等</h3>
                <p>各種約款や個人情報保護方針、説明書等を確認できます。</p>
                <!-- HDH00005_01-217 リンクがハードコーディングで実装され防止　2022-10-05 -->
                <a :href="HIMITU" target="_blank" class="button button__main">確認する</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import setting from "@/assets/js/page/settings/index";
export default setting;
</script>

<style></style>
