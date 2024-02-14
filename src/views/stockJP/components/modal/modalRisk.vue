<template>
  <section v-show="isShow" class="modal">
    <div class="tab_wrapper">
      <div class="modal__content card">
        <h2>投資目的</h2>
        <div class="modal__list-nomaru">
          <ul>
            <li>
              {{ content }}
            </li>
            <li>
              <a
                target="_blank"
                href="https://www.cheer-sec.co.jp/rule/risk.html"
                >リスク・手数料等について</a
              >
            </li>
            <li v-show="showLinkComplexProducts">
              <a
                target="_blank"
                href="https://www.cheer-sec.co.jp/about/pdf/etf-descriotion.pdf"
                >複雑な商品の仕組みについて</a
              >
            </li>
          </ul>
        </div>
        <div class="modal__buttons">
          <button
            @click="actionCancel"
            type="button"
            class="button button__white button__medium"
          >
            キャンセル
          </button>
          <button
            @click="actionConfirm"
            type="button"
            class="button button__main button__medium"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script src="@/assets/js/page/stockJP/components/modal/modalRisk.js"></script>
