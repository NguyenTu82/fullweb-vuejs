<template>
  <main class="no_header_padding">
    <button class="scrollTopButton hidden">
      <img src="/assets/images/topbtn.png" alt="TOP" />
    </button>
    <div class="wrapper">
      <section class="open">
        <div class="container card">
          <div class="l_tab_wrapper" v-if="!isMobile">
            <h1 class="open__title">本人確認書類の提出</h1>
            <p class="open__text open__text--center">
              QRコードを読み込むと、本人確認書類提出サイトへ遷移します。
            </p>
            <div class="open__ekyc">
              <div class="open__ekyc-list">
                <h2 class="open__ekyc-list-item--top card">
                  カメラ機能付スマートフォンのみ利用可能です（PC・タブレットは非対応）<br />
                  事前に
                  <!-- HDH00005_01-217 リンクがハードコーディングで実装され防止　2022-10-05 -->
                  <a :href="DEVICELIST"
                    target="_blank" 
                    class="low"
                    >動作環境</a
                  >（Liquid社サイト）をご確認ください。
                </h2>
                <h3>操作手順</h3>
                <div class="open__ekyc-step">
                  <div class="open__ekyc-list-item card">
                    <h4>STEP1</h4>
                    <p>
                      スマートフォンでQRコードの読み取って、スマートフォンの標準ブラウザを立ち上げてください。
                    </p>
                  </div>
                  <div class="open__ekyc-list-item card">
                    <h4>STEP2</h4>
                    <p>起動したブラウザ画面の案内に沿って本人確認書類およびご自身の顔を撮影してください。
                    </p>
                  </div>
                  <div class="open__ekyc-list-item card">
                    <h4>STEP3</h4>
                    <p>
                      当社による審査後、口座情報変更完了のメールが届いたら完了。
                    </p>
                  </div>
                </div>
              </div>
              <div class="open__ekyc-qr card">
                <p>ここから先は当社が委託する株式会社Liquidのサイトです。</p>
                <div id="qrcode"></div>
                <div class="open__ekyc-qr-question">
                  <img src="/assets/images/question.png" alt="?" />
                  <a :href="link" target="_blank">
                    QRコードを読み込めない場合はこちら</a
                  >
                </div>
                <div class="open__ekyc-qr-error">
                  定期メンテナンス：毎月第2木曜日3:00〜6:00<br />
                  ※メンテナンス中は提出できません。
                </div>
              </div>
            </div>
            <div class="open__next">
                <a
                  href="javascript:;"
                  class="button button__main button__medium"
                  @click="goAccount"
                  >口座情報へ</a
                >
              </div>
          </div>
          <div class="l_tab_wrapper" v-else>
            <EkycQrcodeMoal></EkycQrcodeMoal>
            <h1 class="open__title">本人確認書類の提出</h1>
            <p class="open__text open__text--center">
              起動したブラウザ画面の案内に沿って本人確認書類およびご自身の顔を撮影してください。
            </p>
            <p class="open__text open__text--center">
              ここから先は当社が委託する株式会社Liquidのサイトです。
            </p>
            <div class="open__next open__mt-2">
              <div class="open__ekyc-qr-question" @click="showPop()">
                <img src="/assets/images/question.png" alt="?" />
                ボタンを押して動作しない場合はこちら
              </div>
              <a
              href="javascript:;"
              class="button button__main open__button"
              @click="jumpEkyc()"
              >
                本人確認書類の提出へ</a
              >
            </div>
            <div class="open__next open__mt-2">
                <a
                  href="javascript:;"
                  class="button button__main button__medium"
                  @click="goAccount"
                  >口座情報へ</a
                >
            </div>              
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import eKYC from "@/assets/js/page/settings/account/eKYC";

export default eKYC;
</script>
<style lang="scss" scoped></style>
