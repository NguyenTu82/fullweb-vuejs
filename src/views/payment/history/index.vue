<template>
  <main>
    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <router-link to="/payment/" v-slot="{ href, navigate }" custom>
          <a :href="href" @click="navigate"><strong>入出金</strong></a>
        </router-link>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <router-link to="/payment/history/" v-slot="{ href, navigate }" custom>
          <a :href="href" @click="navigate">入出金履歴</a>
        </router-link>
      </nav>
    </TopInfo>
    <section
      :class="`modal ${turnOffModal === true ? 'hidden' : ''}`"
      @click="offModalSelect"
    >
      <div class="tab_wrapper">
        <div class="modal__content card">
          <h2>表示条件</h2>
          <div class="table">
            <div class="table__box">
              <div class="table__box-title">
                <p>期間</p>
              </div>
              <div class="table__box-value modal__datepicker modal__datepicker_hyphen">
                <input
                  type="date"
                  v-model="fromDate"
                  :data-date="getDayFrom ? getDayFrom : '-'"
                  min="fromDate"
                  max="toDate"
                />
                <p>〜</p>
                <input
                  type="date"
                  v-model="toDate"
                  :data-date="getDayTo ? getDayTo : '-'"
                  min="fromDate"
                  max="toDate"
                />
              </div>
            </div>
            <div class="table__box">
              <div class="table__box-title">
                <p>状況</p>
              </div>
              <div class="table__box-value">
                <select
                  v-model="EXECUTE_FLG"
                  class="selectbox selectbox__gray"
                  name="condition"
                  id=""
                >
                  <option value="9">すべて</option>
                  <option value="0">手続中</option>
                  <option value="1">完了</option>
                  <option value="2">失効</option>
                  <option value="3">処理中</option>
                  <option value="4">取消</option>
                </select>
              </div>
            </div>
          </div>
          <div class="modal__buttons">
            <button
              class="button button__white button__medium modal__close"
              @click="showModal"
            >
              キャンセル
            </button>
            <button
              class="button button__main button__medium"
              @click="searchListHistory"
            >
              変更する
            </button>
          </div>
        </div>
      </div>
    </section>
    <ModalConfirm
      v-if="isShowModalConfirm"
      :message="'期間の開始・終了の時系列は逆転させないで〈ださい。'"
      v-on:handleConfirm="handleConfirm"
    />
    <section class="payment">
      <div class="wrapper">
        <TabContent></TabContent>
        <h1 v-if="showCancel" class="title">出金の取消</h1>
        <h1 v-else class="title">入出金履歴</h1>
        <Cancel
          v-if="showCancel"
          :cancelId="cancelId"
          @turnOffCancel="showCancelPayment"
        >
        </Cancel>
        <div v-else class="container card">
          <div class="l_tab_wrapper">
            <div class="searchbar">
              <div class="searchbar__top">
                <img src="/assets/images/search.png" alt="虫眼鏡" />
                <p>表示条件</p>
                <button
                  class="button button__main searchbar__top-button"
                  @click="showModal"
                >
                  条件変更
                </button>
              </div>
              <div class="searchbar__bottom">
                <div class="searchbar__bottom-flex">
                  <button @click="showModal" class="searchbar__bottom-button">
                    <p class="searchbar__bottom-requirement">期間</p>
                    <p class="searchbar__bottom-value">
                      {{
                        fromDateAfterConfirm || toDateAfterConfirm
                          ? handleFormatDate(fromDateAfterConfirm) +
                            "~" +
                            handleFormatDate(toDateAfterConfirm)
                          : "すべて"
                      }}
                    </p>
                  </button>
                  <button @click="showModal" class="searchbar__bottom-button">
                    <p class="searchbar__bottom-requirement">状況</p>
                    <p class="searchbar__bottom-value">
                      {{
                        EXECUTE_FLG_AFTER_CF == 9
                          ? "すべて"
                          : EXECUTE_FLG_AFTER_CF == 0
                          ? "手続中"
                          : EXECUTE_FLG_AFTER_CF == 1
                          ? "完了"
                          : EXECUTE_FLG_AFTER_CF == 2
                          ? "失効"
                          : EXECUTE_FLG_AFTER_CF == 3
                          ? "処理中"
                          : EXECUTE_FLG_AFTER_CF == 4
                          ? "取消"
                          : "すべて"
                      }}
                    </p>
                  </button>
                </div>
              </div>
            </div>
            <div class="grid_list">
              <div
                class="list_card"
                v-for="(listHistory, index) in listDataHistory"
                :key="index"
              >
                <div class="list_card__title">
                  <h2 v-if="listHistory.CASH_IO_TYPE === 1">入金</h2>
                  <h2 v-else>出金</h2>
                  <div class="list_card__title-infomation">
                    <p
                      class="color_tag--gray"
                      v-if="listHistory.EXECUTE_FLG === 0"
                    >
                      手続中
                    </p>
                    <p
                      class="color_tag--main"
                      v-if="listHistory.EXECUTE_FLG === 1"
                    >
                      完了
                    </p>
                    <p
                      class="color_tag--main"
                      v-if="listHistory.EXECUTE_FLG === 2"
                    >
                      失効
                    </p>
                    <p
                      class="color_tag--main"
                      v-if="listHistory.EXECUTE_FLG === 3"
                    >
                      処理中
                    </p>
                    <p
                      class="color_tag--main"
                      v-if="listHistory.EXECUTE_FLG === 4"
                    >
                      取消
                    </p>
                  </div>
                </div>
                <div class="list_card__subtext">
                  <h3></h3>
                  <p>
                    依頼日<span>{{ listHistory.REQUEST_DT }}</span>
                  </p>
                </div>
                <div class="list_card__detail">
                  <div class="list_card__detail-price">
                    <p>入出金番号</p>
                    <p>{{ listHistory.SCHEDULE_SEQ_NO }}</p>
                  </div>
                  <div class="list_card__detail-price">
                    <p>
                      {{
                        listHistory.CASH_IO_TYPE == 2 ? "出金依頼額" : "入金額（手数料等除く）"
                      }}
                    </p>
                    <p>
                      {{ listHistory.CASH_IO_TYPE == 2 ? cashFormatter(parseInt(listHistory.TOTAL_AMOUNT)) : cashFormatter(parseInt(listHistory.TOTAL_AMOUNT) - parseInt(listHistory.FEE_WITH_TAX_FOR_DISPLAY))
                      }}<small>円</small>
                    </p>
                  </div>
                  <div
                    class="list_card__detail-price"
                    v-if="listHistory.CASH_IO_TYPE == 2"
                  >
                    <p>
                      銀行振込手数料{{
                        listHistory.CASH_IO_TYPE == 2 ? "（税込み）" : ""
                      }}
                    </p>
                    <p>
                      {{
                        cashFormatter(listHistory.FEE_WITH_TAX_FOR_DISPLAY) ||
                        0
                      }}<small>円</small>
                    </p>
                  </div>
                  <div
                    class="list_card__detail-price"
                    v-if="listHistory.CASH_IO_TYPE == 2"
                  >
                    <p>振込額</p>
                    <p>
                      {{
                        cashFormatter(
                          listHistory.TOTAL_AMOUNT -
                            listHistory.FEE_WITH_TAX_FOR_DISPLAY
                        )
                      }}<small>円</small>
                    </p>
                  </div>
                  <div class="list_card__detail-price">
                    <p v-if="listHistory.CASH_IO_TYPE == 2">
                      {{
                        listHistory.EXECUTE_FLG == 1 ? "出金日" : "出金予定日"
                      }}
                    </p>
                    <p v-else>入金日</p>
                    <p>{{ listHistory.SCHEDULE_DT }}</p>
                  </div>
                  <div
                    class="list_card__detail-button"
                    v-if="
                      listHistory.EXECUTE_FLG == 0 &&
                      !disaplay &&
                      listHistory.CASH_IO_TYPE == 2
                    "
                  >
                    <button
                      @click="showCancelPayment(listHistory)"
                      class="button button__main button__medium"
                    >
                      取消依頼
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script src="@/assets/js/page/payment/history/index"></script>
<style scoped></style>
