/* * @Author: KHANHNV * @Last Modified by: KHANHNV * @Last Modified time:
2022-06-09 * @ID Function: E110-1 * @Description: 振込 */

<template>
  <div class="tab_wrapper">
    <div class="bg-img">
      <img src="/assets/images/welcome.svg" />
    </div>
    <div class="payment__spacer"></div>
    <div class="payment__spacer"></div>
    <div class="table payment__table card card--sphidden">
      <p class="payment__table-infomation--top">お振込による入金</p>
      <p class="payment__table-infomation--sub">
        下記のお客さま専用の口座にお振り込みください。
      </p>
      <ListInCard :listInCard="listInCard" />
    </div>
    <p class="payment__text--caution payment__spacer">
      必ずご本人名義の金融機関口座からご入金ください。<br />
      ご本人名義以外の口座（ご家族名義を含みます）からお振込みされた場合はご入金を受付ておりません。
    </p>
  </div>
</template>

<script src="@/assets/js/page/payment/deposit/components/tabTransferCashIn"></script>

<style lang="less" scoped></style>
