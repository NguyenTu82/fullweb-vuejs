<template>
  <main>
    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <router-link to="/payment" v-slot="{ href, navigate }" custom>
          <a :href="href" @click="navigate"><strong>入出金</strong></a>
        </router-link>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <router-link
          to="/payment/withdrawal"
          v-slot="{ href, navigate }"
          custom
        >
          <a :href="href" @click="navigate">出金</a>
        </router-link>
      </nav>
    </TopInfo>
    <section class="payment">
      <div class="wrapper">
        <TabContent></TabContent>
        <h1 class="title">出金</h1>
        <ConfirmWithdrawal
          v-if="showConfirmWhithdrawal"
          :amountWithdrawal="amoutInput"
          :feeWithdrawal="WITHDRAW_FEE"
          :infoWithdrawal="getDataAmount"
          @backData="(data) => backConfirm(data)"
        >
        </ConfirmWithdrawal>
        <div class="container card" v-else>
          <div class="tab_wrapper">
            <div class="payment__table card card--sphidden">
              <div class="table">
                <div class="table__box">
                  <div class="table__box-title">
                    <p>出金可能額</p>
                  </div>
                  <div class="table__box-value">
                    <p>
                      {{ cashFormatter(withdrawInfo.WITHDRAW_AVAILABLE_AMOUNT)
                      }}<small>円</small>
                    </p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>出金額</p>
                  </div>
                  <div class="table__box-value">
                    <div class="order__data-buttons">
                      <button
                        :class="`button button__square${
                          setSelectAmount === 1 ? '--selected' : ''
                        }`"
                        @click="changeSelectAmount(1)"
                      >
                        金額指定
                      </button>
                      <button
                        :class="`button button__square${
                          setSelectAmount === 2 ? '--selected' : ''
                        }`"
                        @click="fullAmount"
                      >
                        全額
                      </button>
                    </div>
                    <div class="counter order__data-counter">
                      <button
                        class="counter__button"
                        @click="reducAmount"
                        :disabled="
                          amoutInput == 0 ||
                          !amoutInput ||
                          (disabledIncrease && disabledReduce)
                        "
                      >
                        ー
                      </button>
                      <input
                        class="counter__number"
                        :value="
                          amoutInput === 0 || !amoutInput
                            ? 0
                            : isMouseUp
                            ? amoutInput
                            : cashFormatter(amoutInput)
                        "
                        :disabled="disabledInput"
                        pattern="[0-9]*"
                        @input="inputHandle"
                        @blur="handleMouse(false)"
                        @mouseup="handleMouse(true)"
                        @change="inputHandle2($event)"
                        oninput="value=value.replace(/[^\d０-９]/g,''); value=value.slice(0,10)"
                      />
                      <button
                        class="counter__button"
                        @click="increaseAmount"
                        :class="{ disabled: disabledIncrease }"
                        :disabled="disabledIncrease"
                      >
                        ＋
                      </button>
                    </div>
                    <p class="order__data--error">
                      <img src="/assets/images/exclamation.png" alt="!" />
                      銀行振込手数料を含んだ金額を入力してください
                    </p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>出金予定日</p>
                  </div>
                  <div class="table__box-value">
                    <p v-if="Object.keys(getDataAmount).length > 0">
                      {{ WITHDRAW_SCHEDULED_DATE }}
                    </p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>銀行振込手数料（税込み）</p>
                  </div>
                  <div class="table__box-value">
                    <p>{{ cashFormatter(WITHDRAW_FEE) }}<small>円</small></p>
                  </div>
                </div>
              </div>
              <p class="payment__table-infomation">出金先情報</p>
              <div class="table">
                <div class="table__box">
                  <div class="table__box-title">
                    <p>金融機関名</p>
                  </div>
                  <div class="table__box-value">
                    <p v-if="Object.keys(getDataAmount).length > 0">
                      {{ getDataAmount.WITHDRAW_ACNT_INF.WITHDRAW_FACIL_NAME }}
                      銀行
                    </p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>本支店名</p>
                  </div>
                  <div class="table__box-value">
                    <p v-if="Object.keys(getDataAmount).length > 0">
                      {{
                        getDataAmount.WITHDRAW_ACNT_INF.WITHDRAW_SUB_NAME
                      }}支店
                    </p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>預金種目</p>
                  </div>
                  <div class="table__box-value">
                    <p v-if="Object.keys(getDataAmount).length > 0">
                      {{
                        getDataAmount.WITHDRAW_ACNT_INF.WITHDRAW_ACCOUNT_TYPE
                      }}
                    </p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>口座番号</p>
                  </div>
                  <div class="table__box-value">
                    <p v-if="Object.keys(getDataAmount).length > 0">
                      {{
                        getDataAmount.WITHDRAW_ACNT_INF.WITHDRAW_ACCOUNT_NUMBER.replace(
                          /[0-9]{4}$/g,
                          "****"
                        )
                      }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="payment__confirm">
                <button
                  class="button button__primary button__medium"
                  :disabled="isButtonDisabled"
                  @click="confirmWithdraw($event)"
                >
                  確認する
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script src="@/assets/js/page/payment/withdrawal/index"></script>
<style scoped></style>
