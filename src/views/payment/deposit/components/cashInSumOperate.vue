<template>
  <div class="tab_wrapper">
    <div style="text-align: center; margin-bottom: 20px">
      <img src="/assets/images/japYen.svg" />
    </div>
    <h2 class="payment__title">リアルタイム入金</h2>
    <a
      href="https://www.cheer-sec.co.jp/other/app-help/E110.html"
      class="payment__title-sub"
      >サービス詳細はこちら</a
    >
    <div class="payment__spacer"></div>
    <div class="payment__spacer"></div>
    <div class="table payment__table card card--sphidden">
      <div class="table__box">
        <div class="table__box-title">
          <p>入金先</p>
        </div>
        <div class="table__box-value">
          <p>預り金</p>
        </div>
      </div>
      <div class="table__box">
        <div class="table__box-title">
          <p>入金額</p>
        </div>
        <div class="table__box-value">
          <cStepperMoney
            :money="money"
            :step="UNIT_AMOUNT"
            :min="MIN_AMOUNT || 10000"
            :max="MAX_AMOUNT"
            :clickFirstPlus="MIN_AMOUNT || 10000"
            @changeValue="inputHandle"
            :isCheck="true"
          />
          <div>
            <p class="order__data--error">
              <img src="/assets/images/exclamation.png" alt="!" />
              入金手数料を含まない金額を入力
            </p>
          </div>
          <div>
            <small>入金手数料（税込み）{{ fixedFeeWithTax }}円</small>
          </div>
        </div>
      </div>
      <div class="table__box">
        <div class="table__box-title">
          <p>引落額</p>
        </div>
        <div class="table__box-value">
          <p>{{ withdrawalAmount }}&nbsp;円</p>
        </div>
      </div>
      <p class="payment__table-infomation">入金元情報</p>
      <div class="table__box" v-for="(item, index) in infos" :key="index">
        <div class="table__box-title">{{ item.title }}</div>
        <div class="table__box-value">{{ item.value }}</div>
      </div>
      <div class="payment__confirm">
        <cRoundButton
          class="execute-btn"
          buttonname="入力内容を確認する"
          :disabled="money == 0"
          @clickbtn="handelSure"
        ></cRoundButton>
      </div>
    </div>
  </div>
</template>

<script src="@/assets/js/page/payment/deposit/components/cashInSumOperate"></script>

<style scoped></style>
