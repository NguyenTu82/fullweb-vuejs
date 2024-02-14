<template>
  <main>
    <TopInfoItem></TopInfoItem>
    <section class="payment payment-deposit">
      <div class="wrapper">
        <h1 class="title">リアルタイム入金</h1>
        <div class="container card">
          <div class="tab_wrapper">
            <div class="payment__table card card--sphidden">
              <div class="table">
                <h2 class="payment__table-title">
                  以下のリアルタイム入金を実行しますか。
                </h2>
                <div class="table__box table__box--password">
                  <div class="table__box-title">
                    <p>引落額</p>
                  </div>
                  <div class="table__box-value">
                    <p>
                      {{
                        confirmData.TOTAL_AMOUNT
                          ? cashFormatter(confirmData.TOTAL_AMOUNT)
                          : 0
                      }}
                      <small>円</small>
                    </p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>入金希望額</p>
                  </div>
                  <div class="table__box-value">
                    <p>
                      {{
                        confirmData.AMOUNT
                          ? cashFormatter(confirmData.AMOUNT)
                          : 0
                      }}
                      <small>円</small>
                    </p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>入金手数料（税込）</p>
                  </div>
                  <div class="table__box-value">
                    <p>
                      {{ confirmData.AMOUNT ? confirmData.FEE_WITH_TAX : 0 }}
                      <small>円</small>
                    </p>
                  </div>
                </div>
                <div
                  class="table__box"
                  v-for="(item, index) in infos"
                  :key="index"
                >
                  <div class="table__box-title">
                    <p>{{ item.title }}</p>
                  </div>
                  <div class="table__box-value">
                    <p>{{ item.value }}</p>
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
                        pattern="[0-9]*"
                        class="order__data-input order__data-input"
                        placeholder="****"
                        maxlength="4"
                        v-model="pwd"
                        autocomplete="off"
                        onkeyup="value=value.replace(/[^\d０-９]/g,'')"
                        oninput="value=value.replace(/[^\d０-９]/g,'');if(value.length>4)value=value.slice(0,4)"
                        @input="pwdChange"
                        @blur="handleBlurPwd"
                      />
                    </div>
                    <!-- <p class="order__data--error">
                        エラーメッセージが入ります。
                      </p> -->
                  </div>
                </div>
              </div>
              <!--                <p class="payment__text&#45;&#45;caution">-->
              <!--                  ※銀行の暗証番号ではなく、{{ COMPANY_NAME }}取引アプリにご登録の取引暗証番号をご入力ください。-->
              <!--                </p>-->
              <div class="payment__two_column_button">
                <cRoundButton
                  class="button__white"
                  buttonname="戻る"
                  @clickbtn="handleBack"
                ></cRoundButton>
                <cRoundButton
                  class="button__main"
                  buttonname="入金する"
                  :disabled="pwd.length != 4"
                  @clickbtn="handelSure"
                ></cRoundButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <LoadingDialog
      :stage="stage"
      :pinError="pinError"
      @handleOkDialog="handleOkDialog"
    />
  </main>
</template>

<script src="@/assets/js/page/payment/deposit/pages/realTimeCashInPwd"></script>

<style scoped></style>
