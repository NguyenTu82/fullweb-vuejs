<template>
  <section v-show="isShow" class="modal">
    <div class="tab_wrapper">
      <div class="modal__content card">
        <div class="modal__list-nomaru">
          <ul>
            <li>ただいま取引時間外のためご注文できません。</li>
            <li>
              <a
                target="_blank"
                href="https://www.cheer-sec.co.jp/other/app-help/C510.html#tradingtime"
                >取引時間について</a
              >
            </li>
          </ul>
        </div>
        <div class="modal__buttons">
          <button
            @click="actionConfirm"
            type="button"
            class="button button__main button__medium"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script src="@/assets/js/page/stockJP/components/modal/modalAfterTrading.js"></script>
