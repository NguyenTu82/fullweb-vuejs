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
        <a href="/reference/order/us/">米国株式</a>
      </nav>
    </TopInfo>

    <section :class="[!showModal ? 'hidden' : '', 'modal']">
      <div class="tab_wrapper">
        <div class="modal__content card">
          <h2>表示条件</h2>
          <div class="table">
            <div class="table__box">
              <div class="table__box-title">
                <p>銘柄名·ティッカー</p>
              </div>
              <div class="table__box-value">
                <input
                  type="text"
                  placeholder="銘柄名·ティッカー"
                  class="modal__input"
                  v-model="params.stock_nm"
                  @change="(val) => changeParams(val, 'stock_nm')"
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
                  :value="params.ord_day_from"
                  :data-date="getOrdDayFrom ? getOrdDayFrom : '-'"
                  @change="(val) => changeParams(val, 'ord_day_from')"
                />
                <p>〜</p>
                <input
                  type="date"
                  :value="params.ord_day_to"
                  :data-date="getOrdDayTo ? getOrdDayTo : '-'"
                  @change="(val) => changeParams(val, 'ord_day_to')"
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
          <router-link to="/reference/order/us" @click="refresh" class="button__square--selected"
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
            <router-link to="/reference/order/jp" class="tabs__item">国内株式</router-link>
            <router-link to="/reference/order/us" @click="refresh" class="tabs__item--selected"
              >米国株式</router-link
            >
            <router-link
              to="/reference/order/invest"
              class="tabs__item"
              v-if="processEnv != 'NCB'"
              >投資信託</router-link
            >
          </div>
          <div class="l_tab_wrapper">
            <div class="searchbar">
              <div class="searchbar__top searchbar__top--between">
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
                    <p class="searchbar__bottom-requirement">上場市場</p>
                    <p class="searchbar__bottom-value">
                      {{ searchText.market_text }}
                    </p>
                  </button>
                </div>
                <div class="searchbar__bottom-flex">
                  <button
                    class="searchbar__bottom-button"
                    @click="showModal = true"
                  >
                    <p class="searchbar__bottom-requirement">状況</p>
                    <p class="searchbar__bottom-value">
                      {{ searchText.order_status_text }}
                    </p>
                  </button>
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
                    <p v-else class="searchbar__bottom-value">
                      {{ searchText.from_date }}~{{ searchText.to_date }}
                    </p>
                  </button>
                </div>
              </div>
            </div>
            <div class="grid_list">
              <div class="list_card" v-for="(item, index) in list" :key="index">
                <div class="list_card__title">
                  <h2>{{ item.company || "--" }}</h2>
                  <div class="list_card__title-infomation">
                    <p
                      class="color_tag--main"
                      v-if="
                        [0, 1, 2, 3, 4, 5, 11, 12].includes(item.ORDER_STATUS)
                      "
                    >
                      {{ item.ORDER_STATUS_DISP }}
                    </p>
                    <p
                      class="color_tag--black"
                      v-if="[].includes(item.ORDER_STATUS)"
                    >
                      {{ item.ORDER_STATUS_DISP }}
                    </p>
                    <p
                      v-if="[1, 2].includes(item.TRADE_TYPE)"
                      :class="
                        item.TRADE_TYPE == '1'
                          ? 'color_tag--secondary'
                          : item.TRADE_TYPE == '2'
                          ? 'color_tag--primary'
                          : ''
                      "
                    >
                      {{ tableType[item.TRADE_TYPE] }}
                    </p>
                  </div>
                </div>
                <div class="list_card__subtext">
                  <h3>{{ item.stock }}</h3>
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
                      <span>{{ item.ORDER_METHOD_TEXT }}</span
                      ><strong>{{
                        commonJs.handNumFloat(item.ORDER_AMOUNT)
                      }}</strong
                      ><small>円</small>
                    </p>
                  </div>
                </div>
                <div class="list_card__detail-button">
                  <a
                    @click="goOrderDetail(item)"
                    class="button button__main button"
                    >注文明細</a
                  >
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
import orderUs from "@/assets/js/page/reference/order/orderUs";
export default orderUs;
</script>
