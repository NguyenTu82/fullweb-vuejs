<template>
  <div class="wrapper" v-show="getShowFlg">
    <section class="modal">
      <div class="tab_wrapper">
        <div class="modal__content card">
          <div class="open__text open__text--center">
            ※ボタンを押して動作しない場合はQRコードを（ほかの）スマートフォン端末で読み取ってお試しください。
            操作が終わりましたら「閉じる」ボタンで本画面を閉じてください。
          </div>
          <div class="open__ekyc-qr card open__mt-2">
            <p>ここから先は当社が委託する株式会社Liquidのサイトです。</p>
            <!-- @二维码 -->
            <div id="modleQrCode" ref="modleQrCode" class="open__mt-2"></div>
            <div class="open__ekyc-qr-error">
              定期メンテナンス：毎月第2木曜日3:00〜6:00<br />
              ※メンテナンス中は提出できません。
            </div>
          </div>
          <div class="modal__buttons">
            <a class="button button__white button__medium" @click="onClose">
              閉じる
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ekycQrcodeMoal from "@/assets/js/page/settings/account/ekycQrcodeMoal";

export default ekycQrcodeMoal;
</script>
