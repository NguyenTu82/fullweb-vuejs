<template>
  <section class="modal">
    <div class="tab_wrapper">
      <div class="modal__content card">
        <div class="modal__buttons">
          <button
            v-if="disableButtonDecideAmount()"
            disabled
            :style="styleDisabled"
            class="modal__button modal__button--secondary"
          >
            <img
              src="/assets/images/diantou.png"
              alt="diantou"
              width="60"
              height="60"
            />
            <div class="modal__button-text">
              <p><strong>金額を決めて買う</strong></p>
              <p>※店頭取引となります。</p>
            </div>
          </button>
          <button
            v-else
            @click="goToBuyStockJp(2)"
            class="modal__button modal__button--secondary"
          >
            <img
              src="/assets/images/diantou.png"
              alt="diantou"
              width="60"
              height="60"
            />
            <div class="modal__button-text">
              <p><strong>金額を決めて買う</strong></p>
              <p>※店頭取引となります。</p>
            </div>
          </button>

          <button
            @click="goToBuyStockJp(1)"
            class="modal__button modal__button--secondary"
          >
            <img
              src="/assets/images/weituo.png"
              alt="weituo"
              width="60"
              height="60"
            />
            <div class="modal__button-text">
              <p><strong>株数を決めて買う</strong></p>
              <p>※委託取引となります。</p>
            </div>
          </button>
          <br />
        </div>
        <div class="noti-transaction">
          <p>
            {{
              disableButtonDecideAmount()
                ? "ただ今取引時間外のためご注文できません。"
                : ""
            }}
          </p>
        </div>
        <div class="modal__buttons">
          <button
            @click="closeBuyModal()"
            class="button button__white button__medium"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script src="@/assets/js/page/transaction/jp/brand/components/buyModal"></script>

<style scoped></style>
