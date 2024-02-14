<template>
  <div class="container card payment__History">
    <div class="tab_wrapper">
      <div class="payment__title-detail">
        <h1 class="detail__title">出金</h1>
      </div>
      <div class="payment__tags">
        <p class="color_tag--black">手続中</p>
      </div>
      <div class="payment__date">
        <p class="payment__date-text">依頼日</p>
        <p class="payment__date-time">{{ cancelId.REQUEST_DT }}</p>
      </div>
      <div class="payment__table card card--sphidden">
        <div class="table">
          <div class="table__box">
            <div class="table__box-title">
              <p>入出金番号</p>
            </div>
            <div class="table__box-value">
              <p>{{ cancelId.SCHEDULE_SEQ_NO }}</p>
            </div>
          </div>
          <div class="table__box">
            <div class="table__box-title">
              <p>{{ cancelId.CASH_IO_TYPE == 2 ? "出金依頼額" : "入金額" }}</p>
            </div>
            <div class="table__box-value">
              <p>
                {{ cashFormatter(parseInt(cancelId.TOTAL_AMOUNT))
                }}<small>円</small>
              </p>
            </div>
          </div>
          <div class="table__box">
            <div class="table__box-title">
              <p>
                銀行振込手数料{{
                  cancelId.CASH_IO_TYPE == 2 ? "（税込み）" : ""
                }}
              </p>
            </div>
            <div class="table__box-value">
              <p>
                {{ cashFormatter(cancelId.FEE_WITH_TAX_FOR_DISPLAY) || 0
                }}<small>円</small>
              </p>
            </div>
          </div>
          <div class="table__box">
            <div class="table__box-title">
              <p>振込額</p>
            </div>
            <div class="table__box-value">
              <p>
                {{
                  cashFormatter(
                    cancelId.TOTAL_AMOUNT - cancelId.FEE_WITH_TAX_FOR_DISPLAY
                  )
                }}<small>円</small>
              </p>
            </div>
          </div>
          <div class="table__box">
            <div class="table__box-title">
              <p v-if="cancelId.CASH_IO_TYPE == 2">
                {{ cancelId.EXECUTE_FLG == 1 ? "出金日" : "出金予定日" }}
              </p>
              <p v-else>入金日</p>
            </div>
            <div class="table__box-value">
              <p>{{ cancelId.SCHEDULE_DT }}</p>
            </div>
          </div>
        </div>
        <div class="table__box table__box--password">
          <div class="table__box-title">
            <p>取引暗証番号</p>
          </div>
          <div class="table__box-value">
            <div class="order__data-pass">
              <input
                type="password"
                class="order__data-input"
                placeholder="****"
                v-model="tradepwd"
                autocomplete="off"
                onkeyup="value=value.replace(/[^\d０-９]/g,'')"
                oninput="value=value.replace(/[^\d０-９]/g,'');if(value.length>4)value=value.slice(0,4)"
                @blur="handleBlur"
              />
            </div>
          </div>
        </div>
        <div class="payment__confirm">
          <button
            @click="offCancel"
            class="button button__white button__medium"
          >
            戻る
          </button>
          <button
            @click="submitCancel"
            :disabled="tradepwd.length < 4"
            class="button button__primary button__medium"
          >
            出金取消
          </button>
        </div>
      </div>
    </div>
    <Done v-if="DoneCancelPayment" @backHistory="offCancel"></Done>
  </div>
</template>
<script src="@/assets/js/page/payment/history/components/cancel"></script>
<style scoped></style>
