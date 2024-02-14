<template>
  <div class="container card">
    <Success v-if="successConfirm"></Success>
    <div v-else class="tab_wrapper">
      <div class="payment__table card card--sphidden">
        <div class="table">
          <div class="table__box">
            <div class="table__box-title">
              <p>出金予定日</p>
            </div>
            <div class="table__box-value">
              <p>
                {{
                  handleFormatDate(
                    infoWithdrawal.WITHDRAW_ACNT_INF.WITHDRAW_SCHEDULED_DATE
                  )
                }}
              </p>
            </div>
          </div>
          <div class="table__box">
            <div class="table__box-title">
              <p>出金依頼額</p>
            </div>
            <div class="table__box-value">
              <p>{{ cashFormatter(amountWithdrawal) }}<small>円</small></p>
            </div>
          </div>
          <div class="table__box">
            <div class="table__box-title">
              <p>銀行振込手数料（税込み）</p>
            </div>
            <div class="table__box-value">
              <p>{{ cashFormatter(feeWithdrawal) }}<small>円</small></p>
            </div>
          </div>
          <div class="table__box">
            <div class="table__box-title">
              <p>振込額</p>
            </div>
            <div class="table__box-value">
              <p>
                {{ cashFormatter(TransferAmount - feeWithdrawal)
                }}<small>円</small>
              </p>
            </div>
          </div>
          <div class="table__box">
            <div class="table__box-title">
              <p>金融機関名</p>
            </div>
            <div class="table__box-value">
              <p>
                {{ infoWithdrawal.WITHDRAW_ACNT_INF.WITHDRAW_FACIL_NAME }}銀行
              </p>
            </div>
          </div>
          <div class="table__box">
            <div class="table__box-title">
              <p>本支店名</p>
            </div>
            <div class="table__box-value">
              <p>
                {{ infoWithdrawal.WITHDRAW_ACNT_INF.WITHDRAW_SUB_NAME }}支店
              </p>
            </div>
          </div>
          <div class="table__box">
            <div class="table__box-title">
              <p>預金種目</p>
            </div>
            <div class="table__box-value">
              <p>普通</p>
            </div>
          </div>
          <div class="table__box">
            <div class="table__box-title">
              <p>口座番号</p>
            </div>
            <div class="table__box-value">
              <p>
                {{
                  infoWithdrawal.WITHDRAW_ACNT_INF.WITHDRAW_ACCOUNT_NUMBER.replace(
                    /[0-9]{4}$/g,
                    "****"
                  )
                }}
              </p>
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
            class="button button__white button__medium"
            @click="handleBackUsDetail"
          >
            戻る
          </button>
          <button
            class="button button__primary button__medium"
            @click="submitConfirm"
            :disabled="tradepwd.length < 4"
          >
            出金する
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="@/assets/js/page/payment/withdrawal/components/confirm"></script>
<style scoped></style>
