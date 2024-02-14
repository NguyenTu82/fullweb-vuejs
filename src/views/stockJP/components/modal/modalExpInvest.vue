<template>
  <section v-show="isShow" class="modal">
    <div class="tab_wrapper">
      <div class="modal__content card">
        <h2>投資経験</h2>
        <div class="modal__list-nomaru">
          <ul>
            <li>
              本銘柄は仕組みが複雑な商品です。下記についてご確認いただきお取引ください。
            </li>
            <li>
              <a
                target="_blank"
                href="https://www.cheer-sec.co.jp/about/pdf/etf-descriotion.pdf"
              >
              複雑な仕組みの商品について
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://www.cheer-sec.co.jp/rule/risk.html"
                >リスク・手数料等について</a
              >
            </li>
            <li>
              *本ご注意はご経験のある取引として「国内株式」「外国株式」のいずれもご登録されていないお客様へご案内しております。
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

<script src="@/assets/js/page/stockJP/components/modal/modalExpInvest.js"></script>
