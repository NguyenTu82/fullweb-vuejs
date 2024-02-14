<template>
  <div>
    <div class="modal_bg" :class="showDialog ? 'show' : ''"></div>
    <div class="modal" :class="showDialog ? 'show' : ''">
      <div class="modal_title mb_medium">取引規制</div>
      <div class="modal_text mb_medium">
        {{ message }}
      </div>
      <div class="modal_title mb_medium">コーポレートアクション</div>
      <div class="modal_text mb_medium">
        <a
          href="https://www.cheer-sec.co.jp/service/us-stock/ca-list.html"
          target="_blank"
          >詳細はこちら</a
        ><br />
        ※外部リンク
      </div>
      <button class="btn primary" @click="closeDialog">OK</button>
    </div>
  </div>
</template>

<script src="@/assets/js/components/common/dialog/TradeErrorDialog.js"></script>
