<template>
  <div>
    <FirstCashInBind
      v-show="waiting && !isCashInSumFinal && bindState <= 0 && !bindFailed"
      :errors="errors"
    />
    <CashInBindFinish
      v-show="!isCashInSumFinal && bindState > 0 && cashInState <= 0"
    />
    <CashInBindFailed
      v-show="!isCashInSumFinal && bindState <= 0 && bindFailed"
    />
    <CashInSumOperate
      v-show="waiting && !isCashInSumFinal && bindState > 0 && cashInState > 0"
      :paymentData="paymentData"
      :fixedFeeWithTax="fixedFeeWithTax"
      :withdrawalAmount="withdrawalAmount"
      @currentMoney="fixFeeWithTax"
    />
    <CashInSumOperateFailed v-show="isCashInSumFinal == 2" />
    <ApplyCashInSuccess v-show="isCashInSumFinal == 1" />
  </div>
</template>

<script src="@/assets/js/page/payment/deposit/components/tabRealTimeCashIn"></script>

<style scoped></style>
