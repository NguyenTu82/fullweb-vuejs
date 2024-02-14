<template>
  <main>
    <button class="scrollTopButton hidden">
      <img src="/assets/images/topbtn.png" alt="TOP" />
    </button>

    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <a href="/reference/condition/"><strong>資産・照会</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="/reference/order/jp/"><strong>注文一覧</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="/reference/order/jp/">投資信託</a>
      </nav>
    </TopInfo>

    <section :class="[!showModal ? 'hidden' : '', 'modal']">
      <div class="tab_wrapper">
        <div class="modal__content card">
          <h2>表示条件</h2>
          <div class="table">
            <div class="table__box">
              <div class="table__box-title">
                <p>銘柄名</p>
              </div>
              <div class="table__box-value">
                <input
                  type="text"
                  placeholder="銘柄名"
                  class="modal__input"
                  v-model="params.keywords"
                  @change="(val) => changeParams(val, 'keywords')"
                />
              </div>
            </div>
            <div
              class="table__box"
              v-for="(item, index) in selectData"
              :key="index"
            >
              <div class="table__box-title">
                <p>{{ item.title }}</p>
              </div>
              <div class="table__box-value">
                <select
                  class="selectbox selectbox__gray"
                  name="transaction"
                  id=""
                  :value="params[item.abbr]"
                  @change="(val) => changeParams(val, item.abbr)"
                >
                  <option
                    v-for="(data, index) in item.items"
                    :key="index"
                    :value="data.id"
                  >
                    {{ data.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="table__box">
              <div class="table__box-title">
                <p>注文日</p>
              </div>
              <div class="table__box-value modal__datepicker modal__datepicker_hyphen">
                <input
                  type="date"
                  :value="params.from_date"
                  :data-date="getOrdDayFrom ? getOrdDayFrom : '-'"
                  @change="(val) => changeParams(val, 'from_date')"
                />
                <p>〜</p>
                <input
                  type="date"
                  :value="params.to_date"
                  :data-date="getOrdDayTo ? getOrdDayTo : '-'"
                  @change="(val) => changeParams(val, 'to_date')"
                />
              </div>
            </div>
          </div>
          <div class="modal__buttons">
            <button
              class="button button__white button__medium modal__close"
              @click="closeModal"
            >
              キャンセル
            </button>
            <button
              class="button button__main button__medium"
              @click="searchData"
            >
              変更する
            </button>
          </div>
        </div>
      </div>
    </section>
    <section class="reference_order">
      <div class="wrapper">
        <div class="grid_buttons">
          <router-link to="/reference/condition" class="button__square"
            >資産状況</router-link
          >
          <router-link
            to="/reference/order/invest"
            class="button__square--selected"
            @click="refresh"
            >注文一覧</router-link
          >
          <router-link to="/reference/contract/jp" class="button__square"
            >約定一覧</router-link
          >
          <router-link to="/reference/deposit" class="button__square"
            >預り金増減</router-link
          >
        </div>
        <h1 class="title">注文一覧</h1>
        <div class="container card">
          <div class="tabs tabs--pagetab">
            <router-link to="/reference/order/jp" class="tabs__item"
              >国内株式</router-link
            >
            <router-link to="/reference/order/us" class="tabs__item"
              >米国株式</router-link
            >
            <router-link
              to="/reference/order/invest"
              class="tabs__item--selected"
              @click="refresh"
              >投資信託</router-link
            >
          </div>
          <div class="l_tab_wrapper">
            <div class="searchbar">
              <div class="searchbar__top">
                <img src="/assets/images/search.png" alt="虫眼鏡" />
                <p>表示条件</p>
                <button
                  class="button button__main searchbar__top-button"
                  @click="showModal = true"
                >
                  条件変更
                </button>
                <button
                  class="button button__white searchbar__top-button--reset"
                  @click="handelRemake()"
                >
                  リセット
                </button>
              </div>
              <div class="searchbar__bottom">
                <div class="searchbar__bottom-flex">
                  <button
                    class="searchbar__bottom-button"
                    @click="showModal = true"
                  >
                    <p class="searchbar__bottom-requirement">銘柄名検索</p>
                    <p class="searchbar__bottom-value">
                      {{ searchText.keywords || "すべて" }}
                    </p>
                  </button>
                </div>
                <div class="searchbar__bottom-flex">
                  <button
                    class="searchbar__bottom-button"
                    @click="showModal = true"
                  >
                    <p class="searchbar__bottom-requirement">売買</p>
                    <p class="searchbar__bottom-value">
                      {{ searchText.trade_type_text }}
                    </p>
                  </button>
                  <button
                    class="searchbar__bottom-button"
                    @click="showModal = true"
                  >
                    <p class="searchbar__bottom-requirement">状況</p>
                    <p class="searchbar__bottom-value">
                      {{ searchText.order_status_text }}
                    </p>
                  </button>
                </div>
                <div class="searchbar__bottom-flex">
                  <button
                    class="searchbar__bottom-button"
                    @click="showModal = true"
                  >
                    <p class="searchbar__bottom-requirement">分配金受取種類</p>
                    <p class="searchbar__bottom-value">
                      {{ searchText.profit_take_type_text }}
                    </p>
                  </button>
                  <button
                    class="searchbar__bottom-button"
                    @click="showModal = true"
                  >
                    <p class="searchbar__bottom-requirement">ファンドタイプ</p>
                    <p class="searchbar__bottom-value">
                      {{ searchText.found_type_text }}
                    </p>
                  </button>
                </div>
              </div>
              <div>
                <div class="searchbar__bottom-flex">
                  <button
                    class="searchbar__bottom-button"
                    @click="showModal = true"
                  >
                    <p class="searchbar__bottom-requirement">注文日</p>
                    <p
                      class="searchbar__bottom-value"
                      v-if="!searchText.from_date && !searchText.to_date"
                    >
                      すべて
                    </p>
                    <p class="searchbar__bottom-value" v-else>
                      {{ searchText.from_date }}~{{ searchText.to_date }}
                    </p>
                  </button>
                </div>
              </div>
            </div>
            <div class="grid_list">
              <div class="list_card" v-for="(item, index) in list" :key="index">
                <div class="list_card__title list_card__title--two">
                  <!-- 西安 HDH00005_01-331 ① 10/5 -->
                  <h2>
                    {{ item.fund_nm_short
                    }}{{ item.fund_nickname ? `(${item.fund_nickname})` : "" }}
                  </h2>
                  <div class="list_card__title-infomation">
                    <p class="color_tag--main">
                      {{ item.order_sts_nm }}
                    </p>
                    <p
                      :class="{
                        'color_tag--sold': item.TRADE_TYPE == 1,
                        'color_tag--secondary': item.TRADE_TYPE == 3,
                      }"
                      v-if="item.TRADE_TYPE == 1 || item.TRADE_TYPE == 3"
                    >
                      {{ tableTypeIt[item.TRADE_TYPE] }}
                    </p>
                    <p
                      class="color_tag--main"
                      v-if="
                        [0, 1, 2, 3, 4, 5, 11, 12].includes(item.ORDER_STATUS)
                      "
                    >
                      {{ item.ORDER_STATUS_DISP }}
                    </p>
                    <p
                      class="color_tag--main"
                      v-if="[].includes(item.ORDER_STATUS)"
                    >
                      <!-- 委託取引 -->
                      {{ item.ORDER_STATUS_DISP }}
                    </p>
                  </div>
                </div>
                <div class="list_card__subtext">
                  <!-- 西安 HDH00005_01-331 ② 10/5 -->
                  <div class="list_card__type-tags">
                    <p class="tag" v-if="item.dividend_handling_cls_nm">
                      {{ item.dividend_handling_cls_nm }}
                    </p>
                    <p
                      class="tag"
                      v-if="item.fund_attr_cls_nm && item.fund_attr_cls != 1"
                    >
                      {{ item.fund_attr_cls_nm }}
                    </p>
                    <p
                      class="tag"
                      v-for="(a, b) in item.fund_type_list"
                      :key="b"
                    >
                      {{ a.fund_type_nm }}
                    </p>
                  </div>
                  <p v-if="item.ORDER_ACCEPT_DT">
                    注文日時<span>{{
                      commonJs.handleDateMinute(item.ORDER_ACCEPT_DT)
                    }}</span>
                  </p>
                </div>
                <div class="list_card__detail">
                  <div class="list_card__detail-price">
                    <p>注文方法</p>
                    <p>
                      <span>{{
                        getItlistData(item).amt_qty_designated_cls_nm
                      }}</span
                      ><strong>{{
                        commonJs.handNumFloat(item.ORDER_AMOUNT)
                      }}</strong
                      ><small>{{
                        getItlistData(item).sell_buy_cls == 1 &&
                        getItlistData(item).amt_qty_designated_cls == 3
                          ? "口"
                          : "円"
                      }}</small>
                    </p>
                  </div>
                </div>
                <div class="list_card__detail-button">
                  <a @click="goOrderDetail(item)" class="button button__main">{{
                    item.ORDER_STATUS == 1 ? "注文明細·取消" : "注文明細"
                  }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import orderInvest from "@/assets/js/page/reference/order/orderInvest";
export default orderInvest;
</script>
